<template>
  <main id="main">
    <page-header :title="page_title" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-12"></div>
        </div>
      </div>
    </section>
  </main>
  <!-- End #main -->
</template>

<script>
import PageHeader from "../shared/PageHeader.vue";

export default {
  components: { PageHeader },
  data() {
    return {
      page_title: "Sample Page",
    };
  },
};
</script>

<style>
</style>