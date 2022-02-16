<template>
  
    <Header />
    <notifications />
    <router-view />    
   
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
};
</script>


<style>
</style>
