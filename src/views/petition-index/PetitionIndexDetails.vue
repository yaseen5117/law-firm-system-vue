<template>
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <page-header
      :title="petition_index_details.document_description"
      :petition="petition"
    />
    <!-- End Breadcrumbs -->
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-12 text-center">
            <!-- <button
              class="btn btn-primary btn-sm mb-3"
              v-on:click="horizontalView = !horizontalView"
            >
              Slide/Horizontal View
            </button> -->
            <!-- <carousel :items-to-show="1" v-show="horizontalView">
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
            </carousel> -->

            <div v-show="!horizontalView">
              <div
                class="row  mb-2"
                :id="'image-container-' + attachment.id"
                v-for="attachment in petition_index_details.attachments"
                :key="attachment"
              >
                <div  class="col-12">
                  <img
                    :class="activePage==attachment.id?'active-img':''" 
                    class="img-fluid" style="width:90%"
                    :src="
                      'http://127.0.0.1:8000/storage/attachments/' +
                      attachment.file_name
                    "
                  />
                  <hr class="mt-4 mb-4" style="border: solid 3px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div v-show="!horizontalView" class="fixed-page-numbers">
      <ul
        class="list-group"
        v-for="attachment in petition_index_details.attachments"
        :key="attachment"
      >
        <a class="list-group-item" :class="activePage==attachment.id?'active':''" href="javascript:void" @click="scrollIntoView(attachment.id)">{{
          attachment.id
        }}</a>
      </ul>
    </div>

    <div class="fixed-annexsures">
      <div
        class="list-group"
         v-for="petition_index_single in petition_index"
                :key="petition_index_single"
      >
        <router-link class="list-group-item"
                  :class="id==petition_index_single.id?'active':''"
                  :to="{
                    name: 'petition-index-details',
                    params: { id: petition_index_single.id },
                  }"
                  >{{ petition_index_single.annexure }}</router-link>
      </div>
      <!-- Prayers -->
      <!-- Stay Order -->
    </div>
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
      petition_index: [],
      petition_index_details: {},
      id: this.$route.params.id, //this is the id from the browser
      horizontalView: false, //it will show vertical images by default
      activePage:null
    };
  },
  created() {
    this.getCaseDetails();
  },
  methods: {
    scrollIntoView(id) {
      // document
      //   .getElementById("image-container-" + id)
      //   .scrollIntoView({ duration: 2000 });

      const yOffset = -200; 
      const element = document.getElementById("image-container-" + id);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
      //document.getElementById("image-container-" + id).style.border="solid 1px red"
      this.activePage=id;
    },
    async getCaseDetails() {
      await axios
        .get("http://127.0.0.1:8000/api/petitions_index/" + this.id)
        .then((response) => {
          this.petition_index_details = response.data.petition_index;
          this.petition = response.data.petition;

          this.getPetitionAnnexure(response.data.petition.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getPetitionAnnexure(petition_id) {
      await axios
        .get("http://127.0.0.1:8000/api/petitions/" + petition_id)
        .then((response) => {
          this.petition_index = response.data.petition_details;
          var arr = [];
          this.petition_index.forEach((element) => {
            if (element.annexure) {
              arr.push(element);
            }
          });
          console.log("arr", arr);
          this.petition_index = arr;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.fixed-page-numbers {
  position: fixed;
  left: 0;
  bottom: 0;
  font-size: 12px;

}
.fixed-annexsures {
  position: fixed;
  right: 0;
  bottom: 0;
}
.active-img {
  border: solid 1px red;
}
</style>