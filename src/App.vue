<template>
  <component :is="dynamicHeader" v-if="!['login'].includes($route.name)" />

  <notifications />
  <router-view :key="$route.fullPath" />
</template>

<script>
import Header from "./views/Header.vue";
import HeaderLums from "./views/HeaderLums.vue";

import Footer from "./views/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    HeaderLums,
    Footer,
  },
  data: {
    cssFile: 'assets/css/lumsstyle.css' // Replace with the path to your CSS file
  },
  created() {
    this.$store.dispatch("authUser");
    this.$store.dispatch("loadGeneralSettings");

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = this.cssFile;
    document.head.appendChild(link);
  },
  computed: {
    dynamicHeader() {
      // Assuming you have a generalSettings property in your store that represents the current general settings
      const generalSettings = this.$store.state.generalSettings;
      return HeaderLums;
      
      // Based on a specific property in the general settings, determine which header component to use
      // if (generalSettings.template === 'lums') {
      //   return HeaderLums;
      // } else {
      //   return Header;
      // }
    },
  },
};
</script>

<style></style>
