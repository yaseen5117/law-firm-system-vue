<template>
  <main id="main">
    <page-header
      title="Calendar"     
    />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">         
          <div class="col-12">              
              <FullCalendar :options="calendarOptions" />
            </div>      
        </div>
      </div>
    </section>
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

export default {
    components: { PageHeader,FullCalendar, },
    data(){
        return {
            base_url: process.env.VUE_APP_SERVICE_URL,
            calendarOptions: {        
                plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ],
                initialView: 'dayGridMonth',      
                //Dynamic Event Source
                events: [],
            },
        }
    },
    created() {     
    this.getCaseFiles();
  },
  methods: {
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
  }
}
</script>

<style>

</style>