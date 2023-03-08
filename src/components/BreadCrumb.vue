<template>
  <section class="sub-breadcrumbs">
    <div class="">
      <ol style="font-size: 12px">
        <li><router-link to="/dashboard">Home</router-link></li>
        <li>
          <router-link to="/petitions">Petitions</router-link>
        </li>
        <li>
          <router-link
            v-if="isPetitionReplyDetail"
            :to="{
              name: pathName,
              params: {
                id: moduleDetail.petition_reply_parent_id,
              },
            }"
            ><span>{{
              petition
                ? petition.petition_standard_title +
                  " | " +
                  moduleDetail.document_description
                : ""
            }}</span>
          </router-link>

          <router-link
            v-if="isPetitionOrderSheet"
            :to="{
              name: pathName,
              params: {
                petition_id: petition.id,
                order_sheet_id: moduleDetail.id,
              },
            }"
          >
            <span
              >{{ petition ? petition.petition_standard_title : "" }}
              {{
                moduleDetail.order_sheet_types
                  ? " | " +
                    moduleDetail.order_sheet_types.title +
                    " | " +
                    moduleDetail.order_sheet_date
                  : ""
              }}
            </span>
          </router-link>
          <router-link
            v-if="isPetitionDetail"
            :to="{
              name: pathName,
              params: {
                id: petition.id,
              },
            }"
            >{{
              petition
                ? petition.petition_standard_title +
                  " | " +
                  moduleDetail.document_description
                : ""
            }}</router-link
          >
          <router-link
            v-if="isStandardIndexDetail"
            :to="{
              name: pathName,
              params: {
                petition_id: petition.id,
                module_type: module_type,
              },
            }"
            >{{
              petition
                ? petition.petition_standard_title +
                  " | " +
                  moduleDetail.document_description
                : ""
            }}</router-link
          >
          <router-link
            v-if="isPetitionNaqalForm"
            :to="{
              name: pathName,
              params: {
                petition_id: petition.id,
                naqal_form_id: moduleDetail.id,
              },
            }"
            >{{
              petition
                ? petition.petition_standard_title + " | " + moduleDetail.title
                : ""
            }}</router-link
          >
          <router-link
            v-if="isPetitionTalbana"
            :to="{
              name: pathName,
              params: {
                petition_id: petition.id,
                talbana_id: moduleDetail.id,
              },
            }"
            >{{
              petition
                ? petition.petition_standard_title + " | " + moduleDetail.title
                : ""
            }}</router-link
          >
          <router-link
            v-if="isPetitionSynopsis"
            :to="{
              name: pathName,
              params: {
                petition_id: petition.id,
                synopsis_id: moduleDetail.id,
              },
            }"
            >{{
              petition
                ? petition.petition_standard_title + " | " + moduleDetail.title
                : ""
            }}</router-link
          >
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
export default {
  props: [
    "moduleDetail",
    "isPetitionDetail",
    "isPetitionReplyDetail",
    "isPetitionOrderSheet",
    "isStandardIndexDetail",
    "isPetitionNaqalForm",
    "isPetitionTalbana",
    "isPetitionSynopsis",
    "petition",
    "pathName",
  ],
  data() {
    return {
      module_type: this.$route.params.module_type,
    };
  },
  methods: {},
};
</script>

<style></style>
