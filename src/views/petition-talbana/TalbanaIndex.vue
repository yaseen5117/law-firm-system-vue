<template>
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <page-header 
    :title="'Talbana'" 
    :petition="petition" 
    :hide="removePageHeader ? true : false"
    />     
    <!-- End Breadcrumbs -->
    <section
      id="services"
      class="services section-bg"
      :class="removePageHeader ? 'margintop85' : ''"
    >
    <nav-components activeNavPill = 'talbana' :petition_id="petition.id"  />
      <div class="container mt-4" data-aos="fade-up">
        <div class="row">
          <div class="col-12 mb-1">
            <div class="form-check form-switch">
              <input
                @change="removePageHeader = !removePageHeader"
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label class="form-check-label" for="flexSwitchCheckDefault"
                >Toggle Header</label
              >
            </div>
          </div>
          <div class="col-md-12 mb-4">
            <router-link
              v-if="!removePageHeader"
              class="btn btn-primary btn-sm"
              :to="{
                name: 'petition-talbana-save',
                params: { petition_id: petition.id },
              }"
            >
              Add New Talbana
            </router-link>

            <div class="mt-4" v-if="TalbanaActive">
              <div v-if="!removePageHeader" class="mb-4">
                <strong>Title: </strong>{{ TalbanaActive.title }}
                <strong>Description: </strong
                >{{ TalbanaActive.description }}
                <strong>Talbana Date: </strong
                >{{ TalbanaActive.talbana_date }}

                <file-upload
                  @afterUpload="getTalbana"
                  type="App\Models\PetitionTalbana"
                  :attachmentable_id="TalbanaActive.id"
                />
              </div>
              
              <div >
                <div
                  class="row mb-2 text-center"
                  :id="'image-container-' + attachment.id"
                  v-for="attachment in TalbanaActive.attachments"
                  :key="attachment"
                >
                  <div class="col-12">
                    <img
                      :class="activePage == attachment.id ? 'active-img' : ''"
                      class="img-fluid"
                      style="width: 90%"
                      :src="
                        this.base_url +
                        '/storage/attachments/' +
                        attachment.attachmentable_id +
                        '/' +
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
      </div>
    </section>

    <div class="fixed-annexsures">
      <ul class="list-group">
        <router-link
          v-for="talbana in talbanas"
          :key="talbana"
          :class="id == talbana.id ? 'active' : ''"
          class="list-group-item"
          :to="{
            name: 'petition-talbana-index',
            params: { talbana_id: talbana.id, petition_id: petition.id },
          }"
          >{{ talbana.talbana_date }}</router-link
        >
      </ul>
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
import NavComponents from "../Cases/NavComponents.vue";
import PageHeader from "../shared/PageHeader.vue";
import FileUpload from "../petition-index/FileUpload.vue";

export default {
  components: {
    PageHeader,
    Carousel,
    Slide,
    Pagination,
    Navigation,
    FileUpload,
    NavComponents,
  },
  data() {
    return {
      showImgCard: false,
      editView: false,
      base_url: process.env.VUE_APP_SERVICE_URL,
      talbanas: [],
      TalbanaActive: {},
      petition: {},
      petition_index: [],
      petition_index_details: {},
      talbana_id: this.$route.params.talbana_id, //this is the id from the browser
      petition_id: this.$route.params.petition_id, //this is the id from the browser
      horizontalView: false, //it will show vertical images by default
      activePage: null,
      removePageHeader: false,
    };
  },
  created() {
    this.getTalbanas();
  },
  methods: {
    scrollIntoView(id) {
      // document
      //   .getElementById("image-container-" + id)
      //   .scrollIntoView({ duration: 2000 });

      const yOffset = -200;
      const element = document.getElementById("image-container-" + id);
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      //document.getElementById("image-container-" + id).style.border="solid 1px red"
      this.activePage = id;
    },
    getTalbanas() {
      axios
        .get(
          this.base_url +
            "/api/petition_talbana?petition_id=" +
            this.petition_id
        )
        .then((response) => {
          this.talbanas = response.data.records;
          this.petition = response.data.records.petition;

          this.getCaseDetails();
          this.getTalbana();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getTalbana() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("rezo_customers_user"),
      };

      axios
        .post(
          this.base_url + "/api/petition_talbana/by_petition",
          {
            petition_id: this.petition_id,
            id: this.talbana_id,
          },
          {
            headers,
          }
        )
        .then((response) => {
          this.TalbanaActive = response.data.record;

          this.getCaseDetails();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCaseDetails() {
      axios
        .get(this.base_url + "/api/petitions/" + this.petition_id)
        .then((response) => {
          this.petition = response.data.petition;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editPetitionAttachment(attachmentToUpdate) {
      if (true) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        };

        axios
          .put(
            this.base_url + "/api/attachments/" + attachmentToUpdate.id,
            attachmentToUpdate,
            {
              headers,
            }
          )
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Updated Successfully!",
                });
                attachmentToUpdate.editMode = false;
              }
            },
            (error) => {
              console.log(error.response.data.error);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.error,
              });
            }
          );
      }
    },
    deletePetitionAttachment(petitionId, attachmentIndex) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        };

        axios
          .delete(this.base_url + "/api/attachments/" + petitionId, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Deleted Successfully!",
                });
                //this.getTalbanas()
                this.petition_index_details.attachments.splice(
                  attachmentIndex,
                  1
                ); //removing record from list/index after deleting record from DB
              }
            },
            (error) => {
              console.log(error.response.data.error);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.error,
              });
            }
          );
      }
    },
  },
};
</script>

<style>
.fixed-page-numbers {
  position: fixed;
  left: 0;
  top: 18%;
  font-size: 12px;
}
.fixed-annexsures {
  position: fixed;
  right: 0;
  top: 18%;
  font-size: 12px;
}
.active-img {
  border: solid 1px red;
}
.list-group-item {
  background-color: black;
  color: grey;
  font-weight: bold;
}
.list-group-item:hover {
  background-color: rgb(117, 117, 117);
  color: rgb(173, 173, 173);
}
.list-group-item + .list-group-item.active {
  background-color: rgb(117, 117, 117);
  color: rgb(173, 173, 173);
}
</style>