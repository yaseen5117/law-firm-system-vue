<template>
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <page-header
      :title="index_detail_data.document_description"
      :petition="petition"
      :hide="removePageHeader ? true : false"
    />   
    <!-- End Breadcrumbs -->
    <section
      id="services"
      class="services section-bg"
      :class="removePageHeader ? 'margintop85' : ''"
    >
      <div class="container" data-aos="fade-up">
        <div class="row mb-2">
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
          <div v-if="!removePageHeader" class="col-12">
            <button
              v-show="!showImgCard"
              @click="showImgCard = true"
              class="btn btn-success btn-sm mb-2"
              style="margin-right: 2px"
            >
              Upload New Image
            </button>
            <button
              v-show="showImgCard"
              @click="showImgCard = false"
              class="btn btn-primary btn-sm mb-2"
              style="margin-right: 2px"
            >
              Cancel Upload
            </button>

            <button
              v-show="!editView"
              @click="
                editView = true;
                horizontalView: true;
              "
              style="margin-right: 2px"
              class="btn btn-primary btn-sm mb-2"
            >
              Edit
            </button>
            <button
              v-show="editView"
              @click="
                editView = false;
                horizontalView: false;
              "
              style="margin-right: 2px"
              class="btn btn-success btn-sm mb-2"
            >
              Cancel
            </button>
          </div>
          <div
            class="col-lg-12 col-md-12 col-sm-12"
            v-show="showImgCard"
          >
            <file-upload
              @afterUpload="getModuleIndexDetails"
              :type="model_type"
              :attachmentable_id= "module_id"
            />
          </div>
        </div>        
        <div class="row">
          <div class="col-12">
            <!-- <button
              class="btn btn-primary btn-sm mb-3"
              v-on:click="horizontalView = !horizontalView"
            >
              Slide/Horizontal View
            </button> -->
            <!-- <carousel :items-to-show="1" v-show="horizontalView">
              <slide
                v-for="attachment in index_detail_data.attachments"
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

            <div v-show="!horizontalView && !editView">
              <div
                class="row mb-2 text-center"
                :id="'image-container-' + attachment.id"
                v-for="attachment in index_detail_data.attachments"
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
                      this.$route.params.module_id +
                      '/' +
                      attachment.file_name
                    "
                  />
                  <hr class="mt-4 mb-4" style="border: solid 3px" />
                </div>
              </div>
            </div>

            <div v-show="editView">
              <div class="row">
                <div class="table-responsive">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <table class="table table-bordered">
                      <thead>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Display Order</th>
                        <th>Actions</th>
                      </thead>
                      <tbody>
                        <tr
                          @dblclick="attachment.editMode = true"
                          v-for="(
                            attachment, attachmentIndex
                          ) in index_detail_data.attachments"
                          :key="attachment"
                        >
                          <td>
                            <img
                              :class="
                                activePage == attachment.id ? 'active-img' : ''
                              "
                              style="width: 80px"
                              :src="
                                this.base_url +
                                '/storage/attachments/' +
                                '/' +
                                this.$route.params.module_id +
                                '/' +
                                attachment.file_name
                              "
                            />
                          </td>
                          <td>
                            <input
                              v-show="attachment.editMode"
                              class="form-control"
                              v-model="attachment.title"
                              v-on:keyup.enter="
                                editPetitionAttachment(attachment)
                              "
                            />
                            <router-link
                              v-show="!attachment.editMode"
                              :to="{
                                name: 'standard-index-details',
                                params: { 
                                  module_id: attachment.id,
                                  module_type: module_type 
                                },
                              }"
                              >{{ attachment.title }}
                            </router-link>
                          </td>

                          <td>
                            <input
                              v-show="attachment.editMode"
                              class="form-control"
                              v-model="attachment.display_order"
                              v-on:keyup.enter="
                                editPetitionAttachment(attachment)
                              "
                            />
                            <router-link
                              v-show="!attachment.editMode"
                              :to="{
                                name: 'standard-index-details',
                                params: { 
                                  module_id: attachment.id,
                                  module_type: module_type 
                                },
                              }"
                              >{{ attachment.display_order }}
                            </router-link>
                          </td>
                          <td width="15%">
                            <a
                              class="btn btn-sm btn-primary"
                              v-show="!attachment.editMode"
                              @click="attachment.editMode = true"
                              href="javascript:void"
                              style="margin-left: 2px"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Edit"
                            >
                              <i class="fa fa-edit"></i>
                            </a>
                            <a
                              v-show="attachment.editMode"
                              class="btn btn-sm btn-warning"
                              @click="editPetitionAttachment(attachment)"
                              href="javascript:void"
                              style="margin-left: 2px"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Update"
                            >
                              <i class="fa fa-save"></i>
                            </a>

                            <a
                              v-show="attachment.editMode"
                              @click="attachment.editMode = false"
                              class="btn btn-sm btn-info"
                              href="javascript:void"
                              style="margin-left: 2px"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Cacncel"
                            >
                              <i class="fa fa-remove"></i>
                            </a>

                            <a
                              class="btn btn-sm btn-danger"
                              v-show="!attachment.editMode"
                              @click="
                                deletePetitionAttachment(
                                  attachment.id,
                                  attachmentIndex
                                )
                              "
                              href="javascript:void"
                              style="margin-left: 2px"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                            >
                              <i class="fa fa-trash-o"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-show="!horizontalView && !editView" class="fixed-page-numbers d-none d-md-block">
      <ul class="list-group">
        <li
          v-for="attachment in index_detail_data.attachments"
          :key="attachment"
          :class="activePage == attachment.id ? 'active' : ''"
          class="list-group-item"
          @click="scrollIntoView(attachment.id)"
          style="cursor: pointer"
        >
          {{ attachment.id }}
        </li>
      </ul>
    </div>

    <div class="fixed-annexsures" @show="!editView">
      <ul class="list-group">
        <router-link
          v-for="index_data_single in module_index_data"
          :key="index_data_single"
          :class="id == index_data_single.id ? 'active' : ''"
          class="list-group-item"
          :to="{
            name: 'standard-index-details',
            params: { 
              module_id: index_data_single.id,
              module_type: module_type  
            },
          }"
          >{{ index_data_single.annexure }}</router-link
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
  },
  data() {
    return {
      showImgCard: false,
      editView: false,
      base_url: process.env.VUE_APP_SERVICE_URL,
      petition: {},
      module_index_data: [],
      index_detail_data: {},
      //id: this.$route.params.id, //this is the id from the browser
      horizontalView: false, //it will show vertical images by default
      activePage: null,
      removePageHeader: true, 
      module_type: this.$route.params.module_type,
      module_id: this.$route.params.module_id ,  
      model_type: "",     
    };
  },
  created() {
    this.getModuleIndexDetails();
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
    async getModuleIndexDetails() {
      await axios
        .post(this.base_url + "/api/module_index_details/" + this.module_id)
        .then((response) => {             
          this.index_detail_data = response.data.index_detail_data;
          this.petition = response.data.petition;
          this.model_type = response.data.model_type;

          this.getModuleAnnexure(response.data.petition.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getModuleAnnexure(petition_id) {
      await axios
        .get(this.base_url + "/api/"+this.module_type+"/" + petition_id)
        .then((response) => {            
          this.module_index_data = response.data.index_annexure_data;
          var arr = [];
          this.module_index_data.forEach((element) => {
            if (element.annexure) {
              arr.push(element);
            }
          });
          console.log("arr", arr);
          this.module_index_data = arr;
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
    deletePetitionAttachment(attachmentId, attachmentIndex) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        };

        axios
          .delete(this.base_url + "/api/attachments/" + attachmentId, {
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
                //this.getModuleIndexDetails()
                this.index_detail_data.attachments.splice(
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