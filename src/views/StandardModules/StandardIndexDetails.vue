<template>
  <ConfirmPopup />
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <page-header
      :title="index_detail_data.document_description"
      :petition="petition"
      :hide="removePageHeader ? true : false"
    />
    <!-- End Breadcrumbs -->
    <nav-components :activeNavPill="module_type" :petition_id="petition.id" />
    <section
      id="services"
      class="services section-bg"
      :class="removePageHeader ? '' : ''"
    >
      <div class="container mt-2" data-aos="fade-up">
        <div class="row mb-2">
          <div class="col-12">
            <!-- v-if="!removePageHeader" -->
            <button
              v-if="removePageHeader"
              @click="pageHeader()"
              class="btn btn-success btn-sm mb-2"
              style="margin-right: 2px"
              for="flexSwitchCheckDefault"
            >
              <i class="fa fa-eye"></i> Show Header
            </button>
            <button
              v-if="!removePageHeader"
              @click="pageHeader()"
              class="btn btn-success btn-sm mb-2"
              style="margin-right: 2px"
              for="flexSwitchCheckDefault"
            >
              <i class="fa fa-eye-slash"></i> Hide Header
            </button>

            <button
              v-if="this.user.is_admin"
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
              v-if="this.user.is_admin"
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
            <span style="margin-left: 10px" class="text-primary"
              ><small
                >({{ index_detail_data.document_description }})</small
              ></span
            >
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12" v-show="showImgCard">
            <file-upload
              @afterUpload="getModuleIndexDetails"
              :type="model_type"
              :attachmentable_id="module_id"
              :petition_id="petition.id"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div v-show="!horizontalView && !editView">
              <not-found-message :index_details="index_detail_data" />
              <div v-if="index_detail_data.attachments.length > 0">
                <div
                  class="row mb-2 text-center"
                  :id="'image-container-' + (index_attachment + 1)"
                  v-for="(
                    attachment, index_attachment
                  ) in index_detail_data.attachments"
                  :key="attachment"
                >
                  <div class="col-12">
                    <img
                      v-if="
                        attachment.mime_type == 'image/png' ||
                        attachment.mime_type == 'image/jpeg' ||
                        attachment.mime_type == 'image/jpg' ||
                        attachment.mime_type == 'jpg'
                      "
                      :class="
                        activePage == index_attachment + 1 ? 'active-img' : ''
                      "
                      class="img-fluid"
                      style="width: 90%"
                      :src="
                        this.base_url +
                        '/storage/attachments/petitions/' +
                        petition.id +
                        '/' +
                        modal_name +
                        '/' +
                        this.$route.params.module_id +
                        '/' +
                        attachment.file_name
                      "
                    />
                    <a
                      :class="
                        activePage == index_attachment + 1 ? 'active-img' : ''
                      "
                      v-else
                      :href="
                        this.base_url +
                        '/storage/attachments/petitions/' +
                        petition.id +
                        '/' +
                        modal_name +
                        '/' +
                        this.$route.params.module_id +
                        '/' +
                        attachment.file_name
                      "
                      target="_blank"
                      ><u
                        ><span>Click to Open: </span>{{ attachment.title }}</u
                      ></a
                    >
                    <hr class="mt-4 mb-4" style="border: solid 3px" />
                  </div>
                </div>
              </div>
            </div>

            <div v-show="editView">
              <div class="row">
                <div class="table-responsive">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <button
                      v-if="showDeleteBtn && this.user.is_admin"
                      class="btn btn-sm btn-danger"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Delete"
                      @click="deleteAll($event)"
                    >
                      Delete Selected
                    </button>
                    <table class="table table-bordered">
                      <thead>
                        <th v-if="index_detail_data.attachments.length > 0">
                          <input
                            v-if="this.user.is_admin"
                            class="margin-left-checkbox"
                            type="checkbox"
                            v-model="selectedAllToDelete"
                            @click="selectAllToDelete()"
                          />
                          Select all
                        </th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Display Order</th>
                        <th v-if="this.user.is_admin">Actions</th>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(
                            attachment, attachmentIndex
                          ) in index_detail_data.attachments"
                          :key="attachment"
                        >
                          <td v-if="index_detail_data.attachments.length > 0">
                            <div class="checkbox">
                              <input
                                type="checkbox"
                                :value="attachment.id"
                                v-model="selected_attachment_ids"
                                @change="updateCheckall()"
                              />
                            </div>
                          </td>
                          <td>
                            <img
                              v-if="
                                attachment.mime_type == 'image/png' ||
                                attachment.mime_type == 'image/jpeg' ||
                                attachment.mime_type == 'image/jpg' ||
                                attachment.mime_type == 'jpg'
                              "
                              :class="
                                activePage == attachment.id ? 'active-img' : ''
                              "
                              style="width: 80px"
                              :src="
                                this.base_url +
                                '/storage/attachments/petitions/' +
                                petition.id +
                                '/' +
                                modal_name +
                                '/' +
                                this.$route.params.module_id +
                                '/' +
                                attachment.file_name
                              "
                            />
                            <a
                              :class="
                                activePage == index_attachment + 1
                                  ? 'active-img'
                                  : ''
                              "
                              v-else
                              :href="
                                this.base_url +
                                '/storage/attachments/petitions/' +
                                petition.id +
                                '/' +
                                modal_name +
                                '/' +
                                this.$route.params.module_id +
                                '/' +
                                attachment.file_name
                              "
                              target="_blank"
                              ><u
                                ><span>Click to Open: </span
                                >{{ attachment.title }}</u
                              ></a
                            >
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
                            <span v-show="!attachment.editMode"
                              >{{ attachment.title }}
                            </span>
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
                            <span v-show="!attachment.editMode"
                              >{{ attachment.display_order }}
                            </span>
                          </td>
                          <td width="15%" v-if="this.user.is_admin">
                            <a
                              class="btn btn-sm btn-primary action-btn"
                              v-show="!attachment.editMode"
                              @click="attachment.editMode = true"
                              href="javascript:void"
                              style="margin-left: 2px"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Edit"
                            >
                              Edit
                            </a>
                            <a
                              v-show="attachment.editMode"
                              class="btn btn-sm btn-warning action-btn"
                              @click="editPetitionAttachment(attachment)"
                              href="javascript:void"
                              style="margin-left: 2px"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Update"
                            >
                              Update
                            </a>

                            <a
                              v-show="attachment.editMode"
                              @click="attachment.editMode = false"
                              class="btn btn-sm btn-info action-btn"
                              href="javascript:void"
                              style="margin-left: 2px"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Cancel"
                            >
                              Cancel
                            </a>

                            <a
                              class="btn btn-sm btn-danger action-btn"
                              v-show="!attachment.editMode"
                              @click="
                                deletePetitionAttachment(
                                  $event,
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
                              Delete
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
    <page-number-side-bar :petition_index_details="index_detail_data" />

    <standard-annexure-right-side-bar :module_index_data="module_index_data" />
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
import PageNumberSideBar from "../shared/PageNumberLeftSideBar.vue";
import StandardAnnexureRightSideBar from "../shared/StandardAnnexureRightSideBar.vue";
import { mapState } from "vuex";
import NotFoundMessage from "../shared/NotFoundMessage.vue";

export default {
  components: {
    PageHeader,
    Carousel,
    Slide,
    Pagination,
    Navigation,
    FileUpload,
    NavComponents,
    PageNumberSideBar,
    StandardAnnexureRightSideBar,
    NotFoundMessage,
  },
  computed: mapState(["user"]),
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
      module_id: this.$route.params.module_id,
      model_type: "",
      selected_attachment_ids: [],
      selectedAllToDelete: false,
      showDeleteBtn: false,
      isShowPageNumOnMobile: true,
      modal_name: "",
      page_title: "",
    };
  },
  created() {
    this.getModuleIndexDetails();
  },
  mounted() {
    document.getElementById("header").style.display = "none";
  },
  updated() {
    document.title =
      this.index_detail_data.document_description + " | " + this.page_title;
  },
  methods: {
    pageHeader() {
      this.removePageHeader = !this.removePageHeader;
      if (this.removePageHeader) {
        document.getElementById("header").style.display = "none";
      } else {
        document.getElementById("header").style.display = "block";
      }
    },
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
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      await axios
        .post(
          this.base_url +
            "/api/module_index_details_" +
            this.module_type +
            "/" +
            this.module_id,
          { headers }
        )
        .then((response) => {
          this.index_detail_data = response.data.index_detail_data;
          this.petition = response.data.petition;
          this.page_title = response.data.page_title;
          this.model_type = response.data.model_type;
          this.modal_name = response.data.model_type.substr(11);
          this.getModuleAnnexure(response.data.petition.id);
          // document.getElementById("header").style.display = "none";
          // document.title = this.index_detail_data.document_description;
        })
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },

    async getModuleAnnexure(petition_id) {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      await axios
        .get(this.base_url + "/api/" + this.module_type + "/" + petition_id, {
          headers,
        })
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
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    editPetitionAttachment(attachmentToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
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
              console.log(error.response.data);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.message,
              });
            }
          );
      }
    },
    deletePetitionAttachment(event, attachmentId, attachmentIndex) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Do you want to Delete?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Delete",
        acceptClass: "p-button-danger",
        rejectClass: "p-button-primary",
        rejectLabel: "Cancel",
        accept: () => {
          var headers = {
            Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
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
                  this.index_detail_data.attachments.splice(attachmentIndex, 1); //removing record from list/index after deleting record from DB
                }
              },
              (error) => {
                console.log(error.response.data);
                this.$notify({
                  type: "error",
                  title: "Something went wrong!",
                  text: error.response.data.message,
                });
              }
            );
        },
        reject: () => {
          this.$confirm.close();
        },
      });
    },
    //select all to delete all
    selectAllToDelete() {
      this.selected_attachment_ids = [];
      if (!this.selectedAllToDelete) {
        this.showDeleteBtn = true;
        for (let i in this.index_detail_data.attachments) {
          this.selected_attachment_ids.push(
            this.index_detail_data.attachments[i].id
          );
        }
      } else {
        this.showDeleteBtn = false;
      }
    },
    updateCheckall: function () {
      if (
        this.index_detail_data.attachments.length ==
        this.selected_attachment_ids.length
      ) {
        this.selectedAllToDelete = true;
      } else if (!this.selected_attachment_ids.length) {
        this.showDeleteBtn = false;
      } else {
        this.showDeleteBtn = true;
        this.selectedAllToDelete = false;
      }
    },
    deleteAll(event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Do you want to Delete?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Delete",
        acceptClass: "p-button-danger",
        rejectClass: "p-button-primary",
        rejectLabel: "Cancel",
        accept: () => {
          var headers = {
            Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
          };

          axios
            .post(
              this.base_url + "/api/delete_selected",
              { id: this.selected_attachment_ids },
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
                    text: "Deleted Successfully!",
                  });
                  this.showDeleteBtn = false;
                  this.getModuleIndexDetails(); //Reload all records from DB
                }
              },
              (error) => {
                console.log(error.response.data);
                this.$notify({
                  type: "error",
                  title: "Something went wrong!",
                  text: error.response.data.message,
                });
              }
            );
        },
        reject: () => {
          this.$confirm.close();
        },
      });
    },
    showPageNumbers() {
      this.isShowPageNumOnMobile = !this.isShowPageNumOnMobile;
    },
  },
};
</script>

<style></style>
