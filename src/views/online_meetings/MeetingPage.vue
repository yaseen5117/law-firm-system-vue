<template>
  <BlockUI :blocked="isLoaded" :fullScreen="true">
    <main id="main">
      <page-header
        :title="userMeeting.meeting_id_public"
        :copyToClipBtn="true"
        :hideBreadCrumbs="true"
        :createMeetingBtn="createMeetingBtn"
        :createMeetingBtnText="createMeetingBtnText"
        @afterMeetingCreate="getUserMeeting"
      />
      <section id="services" class="services section-bg">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <div class="col-12 col-md-12">
              <iframe
                :src="
                  userMeeting.host_meeting_iframe +
                  '&displayName=ELawFirmPk&pipButton=off'
                "
                allow="camera; microphone; fullscreen; speaker; display-capture"
                style="height: 700px; width: 100%"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  </BlockUI>
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
      isLoaded: false,
      createMeetingBtn: true,
      createMeetingBtnText: "New Meeting",
      base_url: process.env.VUE_APP_SERVICE_URL,
      server_time: null,
      popupTitle: null,
      userMeeting: {},
    };
  },
  computed: mapState(["user", "globalGeneralSetting"]),
  created() {
    this.getUserMeeting();
  },
  updated() {
    document.title = "Meeting";
  },
  methods: {
    getUserMeeting() {
      this.isLoaded = true;
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        let url = this.base_url + "/api/get_user_meeting";
        axios
          .post(url, {}, { headers })
          .then((response) => {
            this.isLoaded = false;
            this.userMeeting = response.data.meeting;
          })
          .catch((error) => {
            this.isLoaded = false;
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.message,
            });
          });
      }
    },
  },
};
</script>
<style></style>
