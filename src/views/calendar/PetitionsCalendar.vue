<template>
  <main id="main">
    <page-header title="Calendar" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <FullCalendar :events="calEvents" :options="calendarOptions" />

            <p>
              <small>(Server Time: {{ server_time }})</small>
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <bootstrap-modal-no-jquery
    :title="popupTitle"
    :selected_date="selected_date"
    :eventToUpdateProp="eventToUpdate"
    v-if="displayModal && this.user.is_admin"
    @close-modal-event="hideModal"
    @triggerGetEvents="getEvents"
  />

  <!-- End #main -->
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapModalNoJquery from "./BootstrapModalNoJquery.vue";
import moment from "moment";
import { mapState } from "vuex";
import { Tooltip } from "bootstrap";
let tooltipInstance = null;

export default {
  components: { PageHeader, FullCalendar, BootstrapModalNoJquery },
  data() {
    return {
      displayModal: false,
      base_url: process.env.VUE_APP_SERVICE_URL,
      calendarOptions: {
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: "dayGridMonth", // listWeek,  dayGridWeek, dayGridMonth
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
        eventMouseEnter: this.handleMouseOver,
        eventMouseLeave: this.handleMouseLeave,
        //Dynamic Event Source
        events: [],
        editable: false,
      },

      eventToUpdate: {},
      server_time: null,
      popupTitle: null,
    };
  },
  computed: mapState(["user", "globalGeneralSetting"]),
  created() {
    this.getEvents();

    this.calendarOptions.initialView = this.isMobile()
      ? "dayGridWeek"
      : "dayGridMonth";
  },
  updated() {
    document.title = "Calendar";
  },
  methods: {
    isMobile() {
      if (screen.width <= 760) {
        return true;
      } else {
        return false;
      }
    },
    showModal() {
      this.displayModal = true;
    },
    hideModal() {
      this.displayModal = false;
    },

    closeModal() {
      this.$emit("close-modal-event");
    },

    dateTime(value) {
      return moment(value).format("DD/MM/YYYY");
    },

    async getEvents() {
      let url = this.base_url + "/api/petition_hearing";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      await axios
        .get(url, {
          headers,
          params: this.filters,
        })
        .then((response) => {
          this.calendarOptions.events = response.data.events;
          this.server_time = response.data.server_time;
          console.log(this.calendarOptions.events);
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });

          console.log(error);
        });
    },

    handleDateClick(arg) {
      this.showModal();
      this.popupTitle = "Add";
      //this.$emit('name', "Raja Tamil");
      this.eventToUpdate = null;

      this.selected_date = this.dateTime(arg.dateStr);
    },
    handleEventClick(info) {
      this.showModal();
      /* console.log('Event: ' + info.event.title);
      console.log('Event: ' + info.event.id);
      console.log('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      console.log('View: ' + info.view.type); */
      this.popupTitle = "Edit";
      this.eventToUpdate = info.event;
      //this.eventToUpdate.extendedProps.hearing_date = this.dateTime(info.eventToUpdate.extendedProps.hearing_date);

      // change the border color just for fun
      info.el.style.borderColor = "red";
    },

    handleMouseOver(info) {
      console.log(info.event.title);
      if (info.event.title) {
        tooltipInstance = new Tooltip(info.el, {
          title: info.event.title,
          html: true,
          placement: "top",
          trigger: "hover",
          container: "body",
        });

        tooltipInstance.show();
      }
    },
    handleMouseLeave(info) {
      if (tooltipInstance) {
        tooltipInstance.dispose();
        tooltipInstance = null;
      }
    },
  },
};
</script>
<style>
.fc-today-button {
  display: none !important;
}

@media only screen and (max-width: 600px) {
  .fc-toolbar-title {
    font-size: 16px !important;
  }
}
</style>
