<template>
  <div class="lawyer-list">
    <ul v-for="lawyer in lawyers" :key="lawyer.id">
      <li
        v-tooltip.top="'Click To Show Lawyer Detail'"
        @click="showProfilePopUp(lawyer)"
      >
        {{ lawyer.user.name }}
      </li>
    </ul>
  </div>

  <user-profile
    @afterHideProfileCard="isShowUserProfile = false"
    v-if="isShowUserProfile"
    :lawyer="lawyer"
    :display="true"
    :lawyerTotalPetitions="lawyerTotalPetitions"
  />
</template>

<script>
import UserProfile from "../users/UserProfile.vue";
import axios from "axios";

export default {
  props: ["lawyers"],
  components: {
    UserProfile,
  },
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      isShowUserProfile: false,
      lawyer: {},
      lawyerTotalPetitions: "",
    };
  },
  methods: {
    showProfilePopUp(lawyer) {
      this.isShowUserProfile = true;
      this.lawyer = lawyer;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/get_lawyer_total_petitions", {
          headers,
          params: { lawyer_id: lawyer.user.id },
        })
        .then((response) => {
          this.lawyerTotalPetitions = response.data.lawyer_total_petitions;
        })
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
  },
};
</script>

<style scoped>
.lawyer-list {
  float: right;
  line-height: 0px;
  font-size: 12px;
}
</style>
