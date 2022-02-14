<template>
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <page-header :title="'Petition Index'" :petition="petition" />
    <!-- End Breadcrumbs -->
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <p>{{ petition_index_details.document_description }}</p>
        <div>
          <div class="col-md-8">
            <carousel :items-to-show="1">
              <slide
                v-for="attachment in petition_index_details.attachments"
                :key="attachment"
              >
                <img
                  :src="
                    'http://127.0.0.1:8000/storage/attachments/' +
                    attachment.file_name
                  "
                />
              </slide>

              <template #addons>
                <navigation />
                <pagination />
              </template>
            </carousel>
          </div>

          <div class="col-md-3">
            <div
              class="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                class="nav-link"
                onclick="document.location='petition_slide_docs.html'"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                Petition
              </button>
              <button
                class="nav-link active"
                onclick="document.location='petition_slide_docs_a.html'"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-profile"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
              >
                A
              </button>
              <button
                class="nav-link"
                onclick="document.location='petition_slide_docs_b.html'"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-profile"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
              >
                B
              </button>
              <button
                class="nav-link"
                onclick="document.location='petition_slide_docs_c.html'"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-messages"
                type="button"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                C
              </button>
              <button
                class="nav-link"
                onclick="document.location='petition_slide_docs_d.html'"
                id="v-pills-settings-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-settings"
                type="button"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false"
              >
                D
              </button>

              <button
                class="nav-link"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                E
              </button>
              <button
                class="nav-link"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-profile"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
              >
                F
              </button>
              <button
                class="nav-link"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-messages"
                type="button"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                G
              </button>

              <button
                class="nav-link"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-messages"
                type="button"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                Prayers
              </button>

              <button
                class="nav-link"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-messages"
                type="button"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                Stay Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

import PageHeader from "../shared/PageHeader.vue";
export default {
  components: { PageHeader, Carousel, Slide, Pagination, Navigation },
  data() {
    return {
      petition: {},
      petition_index_details: {},
      id: this.$route.params.id, //this is the id from the browser
    };
  },
  created() {
    this.getCaseDetails();
  },
  methods: {
    async getCaseDetails() {
      await axios
        .get("http://127.0.0.1:8000/api/petitions_index/" + this.id)
        .then((response) => {
          this.petition_index_details = response.data.petition_index;
          this.petition = response.data.petition;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>