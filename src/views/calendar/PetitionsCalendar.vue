<template>
  <main id="main">
    <page-header title="Calendar" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-12 col-md-8 offset-md-2">
            <FullCalendar :options="calendarOptions" />
          </div>
        </div>
      </div>
    </section>
  </main>

   <bootstrap-modal-no-jquery  v-if="displayModal" @close-modal-event="hideModal" @myVarChanged="updateMyVar" />

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

export default {
  components: { PageHeader, FullCalendar, BootstrapModalNoJquery },
  data() {
    return {
      displayModal: false,
      base_url: process.env.VUE_APP_SERVICE_URL,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        //Dynamic Event Source
        events: [],
      },
    };
  },
  created() {
    this.getCaseFiles();
  },
  methods: {
    showModal() {
      this.displayModal = true;
    },
    hideModal() {
      this.displayModal = false;
    },

    closeModal() {
      this.$emit("close-modal-event");
    },

    async getCaseFiles() {
      let url = this.base_url + "/api/petitions";
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
          console.log(this.calendarOptions.events);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleDateClick(arg) {
      this.showModal();
      //this.$emit('name', "Raja Tamil");
      this.$emit('myVarChanged', "asdasdasdasd");

      console.log("called");
    },
  },
};
</script>

