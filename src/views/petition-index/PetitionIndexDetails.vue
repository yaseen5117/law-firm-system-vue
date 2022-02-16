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
          <div class="col-9">
             <button class="btn btn-primary btn-sm mb-3" v-on:click="isShow = !isShow">Slide/Horizontal View</button>
            <carousel :items-to-show="1" v-show="isShow">
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
            
          <div v-show="!isShow">                 
            
            <div class="row" v-for="attachment in petition_index_details.attachments"
                :key="attachment">               
                <div :id="'image-container-'+attachment.id" class="col-12">
                    <img
                    :src="
                        'http://127.0.0.1:8000/storage/attachments/' +
                        attachment.file_name
                    "
                    />
                    <hr class="mt-4 mb-4" style="border: solid 3px" >
                </div>    
            </div>
            </div> 
          </div>

          <div class="col-3">
            <div
              class="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                v-for="petition_index_single in petition_index"
                :key="petition_index_single"
                class="nav-link"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                
                <router-link
                        :to="{
                          name: 'petition-index-details',
                          params: { id: petition_index_single.id },
                        }"
                        >{{ petition_index_single.annexure }}</router-link
                      >
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
     <div v-show="!isShow" class="fixed"> 
            <div class="list-group" v-for="attachment in petition_index_details.attachments"
                :key="attachment">
              <a class="list-group-item" @click="scrollIntoView(attachment.id)">{{ attachment.id }}</a>               
            </div>

            
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
      isShow:true,
    };
  },
  created() {
    this.getCaseDetails();
  },
  methods: {
    scrollIntoView(id) { 
      document.getElementById('image-container-'+id).scrollIntoView({ duration: 2000 });        
       
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
          console.log("arr",arr);
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
.fixed{
  position: absolute;  
  left: 0;
  top: 245px;   
}
</style>