<template>
  <Transition name="slide-fade">
    <section id="breadcrumbs" class="breadcrumbs" v-if="!hide">
      <div class="container">
        <div  :class="centerHeading?'text-center':'d-flex justify-content-between align-items-center'">
          <span v-if="isNotHeading">{{ title }}</span>
          <h4 v-if="title && !isNotHeading">
            {{ title }}
            <router-link
              v-if="
                header_button && (this.user.is_admin || this.user.is_lawyer)
              "
              class="btn btn-primary btn-sm"
              :to="route_object"
              >{{ header_button_text }}</router-link
            >
            <button
              v-if="copyToClipBtn"
              class="btn btn-success action-btn"
              type="button"
              @click="copyToClipboard(title)"
            >
              Copy To Clipboard
            </button>
            <button
              style="margin-left: 2px"
              v-if="createMeetingBtn"
              class="btn btn-info action-btn"
              type="button"
              @click="createNewMeeting()"
            >
              {{ createMeetingBtnText }}
            </button>
            <router-link
              v-if="isStatute"
              type="button"
              class="btn btn-success btn-sm mr-left"
              to="statutes"
            >
              Add/Edit Statutes
            </router-link>
          </h4>

          <template v-if="!hideBreadCrumbs">
            <ol style="font-size: 12px">
              <li><router-link to="/dashboard">Home</router-link></li>
              <li v-if="showFirReader">
                <router-link to="/fir-sections">FIR Reader</router-link>
              </li>
              <li v-if="showUsers">
                <router-link to="/users">Users</router-link>
              </li>
              <li v-if="showInvoices">
                <router-link to="/invoices">Invoices</router-link>
              </li>
              <li v-if="showLCLink">
                <router-link to="/limitation-calculator-index"
                  >Limitation Calculator Cases</router-link
                >
              </li>
              <li v-if="showLCLink">
                <router-link to="/limitation-calculator-case-question"
                  >Limitation Calculator Questions</router-link
                >
              </li>
              <li v-if="!hideCaseFiles">
                <router-link to="/petitions">Case Files</router-link>
              </li>
              <li v-if="petition">
                <router-link
                  :to="{
                    name: 'case-detail',
                    params: { id: petition ? petition.id : '#' },
                  }"
                  >Case File ({{ petition.case_no }})</router-link
                >
              </li>
            </ol>
          </template>
        </div>
      </div>
      <div class="container">
        <div style="font-size: 12px" v-if="petition">
          (
          <span
            ><strong>Case Title:</strong>
            {{ petition ? petition.title : "Loading" }},</span
          >
          <span
            ><strong>&nbsp;Case #:</strong>
            {{ petition ? petition.case_no : "" }},</span
          >
          <span
            ><strong>&nbsp;Client Name:</strong>
            {{ petition.petitioner_names }},</span
          >
          <span
            ><strong>&nbsp;Court:</strong>
            {{ petition && petition.court ? petition.court.title : "" }}</span
          >
          )
        </div>
      </div>
    </section>
  </Transition>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  computed: mapState(["user"]),
  emits: ["afterMeetingCreate"],
  props: [
    "title",
    "petition",
    "hideBreadCrumbs",
    "hide",
    "route_object",
    "header_button_text",
    "header_button",
    "showInvoices",
    "hideCaseFiles",
    "copyToClipBtn",
    "createMeetingBtn",
    "createMeetingBtnText",
    "showLCLink",
    "isNotHeading",
    "isStatute",
    "showFirReader",
    "showUsers",
    "centerHeading",
  ],
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
    };
  },
  methods: {
    createNewMeeting() {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        let url = this.base_url + "/api/create_new_meeting";
        axios
          .post(url, {}, { headers })
          .then((response) => {
            if (response.status === 200) {
              this.$emit("afterMeetingCreate", "Reloading the Data of Meeting");
              this.$notify({
                type: "success",
                title: "Success",
                text: "Meeting Created Successfully!",
              });
            }
          })
          .catch((error) => {
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

<style scoped>
.mr-left {
  margin-left: 1px;
}
</style>
