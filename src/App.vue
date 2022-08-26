<template>
  <Header v-if="!['login'].includes($route.name)" />
  <notifications />
  <router-view :key="$route.fullPath" />
</template>

<script>
import Header from "./views/Header.vue";

import Footer from "./views/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  created() {
    this.$store.dispatch("authUser");
    this.$store.dispatch("loadGeneralSettings");
  },
};
</script>

<style></style>
