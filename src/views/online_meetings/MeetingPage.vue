<template>
    <main id="main">
      <page-header :title="globalGeneralSetting.public_whereby_iframe" :hideBreadCrumbs="true" />
      <section id="services" class="services section-bg">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <div class="col-12 col-md-12 ">
              <iframe :src="globalGeneralSetting.host_whereby_iframe" allow="camera; microphone; fullscreen; speaker; display-capture" style="height: 700px; width: 100%"></iframe>
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
  
  import moment from "moment";
  import { mapState } from "vuex";
  
  export default {
    components: { PageHeader },
    data() {
      return {
        
        server_time: null,
        popupTitle: null,
      };
    },
    computed: mapState(["user", "globalGeneralSetting"]),
    created() {
        
    },
    updated() {
      document.title = "Meeting";
    },
    methods: {
    },
  };
  </script>
  <style >
  </style>