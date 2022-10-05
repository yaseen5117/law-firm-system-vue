<template>
  <Transition name="slide-fade">
    <section id="breadcrumbs" class="breadcrumbs" v-if="!hide">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <h4 v-if="title">
            {{ title }}
            <router-link
              v-if="header_button && this.user.is_admin"
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
          </h4>

          <template v-if="!hideBreadCrumbs">
            <ol style="font-size: 12px">
              <li><router-link to="/dashboard">Home</router-link></li>
              <li v-if="showInvoices">
                <router-link to="/invoices">Invoices</router-link>
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
import { mapState } from "vuex";
export default {
  computed: mapState(["user"]),
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
  ],
};
</script>

<style></style>
