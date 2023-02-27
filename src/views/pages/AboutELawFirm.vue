<template>
  <main id="main" class="margintop85">
    <!-- <page-header
      :title="'About ELAWFIRM'"
      :petition="null"
      :hideBreadCrumbs="true"
    /> -->
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-12">
            <span v-html="this.globalGeneralSetting.login_page_content"></span>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12">
            <Image
              v-if="globalGeneralSetting.site_file_name"
              :src="
                this.base_url +
                '/storage/attachments/settings' +
                '/' +
                setting_id +
                '/' +
                globalGeneralSetting.site_file_name
              "
              alt="Site Image"
              width="250"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- End #main -->
</template>

<script>
import PageHeader from "../shared/PageHeader.vue";
import { mapState } from "vuex";
import Image from "primevue/image";

export default {
  name: "Login",
  components: { PageHeader, Image },
  computed: mapState(["globalGeneralSetting"]),
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      setting_id: 1,
    };
  },
  mounted() {
    document.title = "About ELawFrim";
  },
  methods: {},
};
</script>

<style scoped></style>
