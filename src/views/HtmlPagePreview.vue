<template>
  <main id="main">
    <page-header :title="page_slug" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-12" v-html="page_content"></div>
        </div>
      </div>
    </section>
  </main>
  <!-- End #main -->
</template>
  
  <script>
import axios from "axios";
import PageHeader from "./shared/PageHeader.vue";

export default {
  components: { PageHeader },
  data() {
    return {
      page_title: "Sample Page",
      page_content: "",
      page_type: this.$route.params.page_type,
      page_slug: this.$route.params.page_slug,
      base_url: process.env.VUE_APP_SERVICE_URL,
    };
  },

  mounted() {
    this.getHtmlContent();
  },
  methods: {
    getHtmlContent() {
      let url = this.base_url + "/api/get_html_content";
      axios
        .get(url, {
          params: {
            page_slug: this.page_slug,
            page_type: this.page_type,
          },
        })
        .then((response) => {
          this.page_content = response.data.content;
          console.log(response);
          
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
          console.log(error);
        });
    },
  },
};
</script>
  
  <style>
</style>