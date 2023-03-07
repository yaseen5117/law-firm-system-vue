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
    "petition",
    "pathName",
  ],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
