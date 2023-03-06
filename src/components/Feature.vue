<template>
  <div class="icon-box mt-3" data-aos="fade-up" data-aos-delay="100">
    <i :class="singleFeature.icon"></i>
    <h4 @click="showFeatureRestrictedPopup(singleFeature.url)">
      {{ singleFeature.heading }}
    </h4>
    <p>{{ singleFeature.body_text }}</p>
  </div>
  <Dialog
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '35vw' }"
    dismissableMask="true"
    modal="true"
    header="Are You a Member?"
    position="center"
    closable="true"
    v-model:visible="featureRestrictedDialog"
  >
    <div class="row">
      <div class="col-12">
        <p>Login or Signup for an account to access.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="d-grid">
          <router-link
            class="btn auth-btn btn-block"
            :to="{
              name: 'Login',
            }"
          >
            Login
          </router-link>
        </div>
      </div>
      <div class="col-6">
        <div class="d-grid">
          <router-link
            class="btn btn-block auth-btn"
            :to="{
              name: 'SignUp',
            }"
          >
            Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";

export default {
  props: ["singleFeature", "rowIndex"],
  components: { Dialog },
  data() {
    return {
      featureRestrictedDialog: false,
    };
  },
  methods: {
    showFeatureRestrictedPopup(url) {
      if (url) {
        this.$router.push({ path: url });
      } else {
        this.featureRestrictedDialog = true;
      }
    },
  },
};
</script>

<style scoped>
.icon-box h4 {
  cursor: pointer;
}
.icon-box h4 a {
  color: #444444 !important;
}
.icon-box h4:hover {
  text-decoration: underline;
}
</style>
