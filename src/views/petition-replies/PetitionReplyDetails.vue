<template>
  <ConfirmPopup></ConfirmPopup>
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <page-header
      :title="petition_reply_details.document_description"
      :petition="petition"
      :hide="removePageHeader ? true : false"
    />
    <!-- End Breadcrumbs -->
    <nav-components activeNavPill="reply" :petition_id="petition.id" />
    <section
      id="services"
      class="services section-bg"
      :class="removePageHeader ? '' : ''"
    >
      <div class="container mt-2" data-aos="fade-up">
        <div class="row mb-4">
          <div class="col-5">
            <!-- v-if="!removePageHeader" -->
            <button
              v-if="removePageHeader"
              @click="pageHeader()"
              class="btn btn-success btn-sm mb-2 action-btn"
              style="margin-right: 2px"
              for="flexSwitchCheckDefault"
            >
              <i class="fa fa-eye"></i> Show Header
            </button>
            <button
              v-if="!removePageHeader"
              @click="pageHeader()"
              class="btn btn-success btn-sm mb-2 action-btn"
              style="margin-right: 2px"
              for="flexSwitchCheckDefault"
            >
              <i class="fa fa-eye-slash"></i> Hide Header
            </button>

            <button
              v-if="this.user.is_admin || this.user.is_lawyer"
              v-show="!showImgCard"
              @click="showImgCard = true"
              class="btn btn-success btn-sm mb-2 action-btn"
              style="margin-right: 2px"
            >
              Upload New Image
            </button>
            <button
              v-show="showImgCard"
              @click="showImgCard = false"
              class="btn btn-primary btn-sm mb-2 action-btn"
              style="margin-right: 2px"
            >
              Cancel Upload
            </button>

            <button
              v-if="this.user.is_admin || this.user.is_lawyer"
              v-show="!editView"
              @click="
                editView = true;
                horizontalView = true;
              "
              style="margin-right: 2px"
              class="btn btn-primary btn-sm mb-2 action-btn"
            >
              Edit
            </button>
            <button
              v-show="editView"
              @click="
                editView = false;
                horizontalView = false;
              "
              style="margin-right: 2px"
              class="btn btn-success btn-sm mb-2 action-btn"
            >
              Cancel
            </button>
          </div>
          <div class="col-7">
            <BreadCrumb
              :moduleDetail="petition_reply_details"
              :isPetitionReplyDetail="true"
              :petition="petition"
              pathName="petition-replies"
            />
            <!-- <section class="sub-breadcrumbs">
              <div class="">
                <ol style="font-size: 12px">
                  <li><router-link to="/dashboard">Home</router-link></li>
                  <li>
                    <router-link to="/petitions">Petitions</router-link>
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'petition-reply-details',
                        params: {
                          id: petition_reply_details.id,
                        },
                      }"
                      ><span>{{
                        petition_reply_details.document_description
                      }}</span>
                    </router-link>
                  </li>
                </ol>
              </div>
            </section> -->
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12" v-show="showImgCard">
            <file-upload
              @afterUpload="getPetitionReplyDetails"
              type="App\Models\PetitionReply"
              :attachmentable_id="attachmentable_id"
              :petition_id="petition.id"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div v-show="!horizontalView && !editView">
              <not-found-message :index_details="petition_reply_details" />
              <div v-if="petition_reply_details.attachments.length > 0">
                <div
                  class="row mb-2 text-center"
                  :id="'image-container-' + (index_attachment + 1)"
                  v-for="(
                    attachment, index_attachment
                  ) in petition_reply_details.attachments"
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
                        '/PetitionReply/' +
                        this.$route.params.id +
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
                        '/PetitionReply/' +
                        this.$route.params.id +
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
                      v-if="showDeleteBtn"
                      class="btn btn-sm btn-danger action-btn"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Delete"
                      @click="deleteAll($event)"
                    >
                      Delete Selected
                    </button>
                    <table class="table table-bordered">
                      <thead>
                        <th
                          v-if="petition_reply_details.attachments.length > 0"
                        >
                          <input
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
                        <th>Actions</th>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(
                            attachment, attachmentReplyIndex
                          ) in petition_reply_details.attachments"
                          :key="attachment"
                        >
                          <td
                            v-if="petition_reply_details.attachments.length > 0"
                          >
                            <div class="checkbox">
                              <input
                                type="checkbox"
                                :value="attachment.id"
                                v-model="selected"
                                @change="updateCheckall()"
                              />
                            </div>
                          </td>
                          <td>
                            <img
                              :class="
                                activePage == attachment.id ? 'active-img' : ''
                              "
                              style="width: 80px"
                              :src="
                                this.base_url +
                                '/storage/attachments/petitions/' +
                                petition.id +
                                '/PetitionReply/' +
                                this.$route.params.id +
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
                                editPetitionReplyAttachment(attachment)
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
                                editPetitionReplyAttachment(attachment)
                              "
                            />
                            <span v-show="!attachment.editMode">
                              {{ attachment.display_order }}
                            </span>
                          </td>
                          <td width="15%">
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
                              @click="editPetitionReplyAttachment(attachment)"
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
                                deletePetitionReplyAttachment(
                                  $event,
                                  attachment.id,
                                  attachmentReplyIndex
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
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 text-center">
            <router-link
              v-tooltip.top="'Previous'"
              style="margin-right: 3px"
              v-if="previous_index_id"
              class="btn btn-success ml-3 mr-2"
              :to="{
                name: 'petition-reply-details',
                params: {
                  id: previous_index_id,
                },
              }"
              ><i class="fa fa-angle-up fa-2x btn-round"></i
            ></router-link>

            <router-link
              v-tooltip.top="'Next'"
              style="margin-right: 3px"
              v-if="next_index_id"
              class="btn btn-success ml-3"
              :to="{
                name: 'petition-reply-details',
                params: {
                  id: next_index_id,
                },
              }"
              ><i class="fa fa-angle-down fa-2x btn-round"></i
            ></router-link>
          </div>
        </div>
      </div>
    </section>
    <page-number-side-bar :petition_index_details="petition_reply_details" />

    <annexure-right-side-bar
      :petition_index="petition_reply_index"
      url="petition-reply-details"
    />
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
import AnnexureRightSideBar from "../shared/AnnexureRightSideBar.vue";
import { mapState } from "vuex";
import NotFoundMessage from "../shared/NotFoundMessage.vue";
import BreadCrumb from "../../components/BreadCrumb.vue";

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
    AnnexureRightSideBar,
    NotFoundMessage,
    BreadCrumb,
  },
  computed: mapState(["user"]),
  data() {
    return {
      next_index_id: null,
      previous_index_id: null,
      showImgCard: false,
      editView: false,
      base_url: process.env.VUE_APP_SERVICE_URL,
      petition: {},
      petition_reply_index: [],
      petition_reply_details: {},
      attachmentable_id: this.$route.params.id,
      id: this.$route.params.id, //this is the id from the browser
      horizontalView: false, //it will show vertical images by default
      activePage: null,
      removePageHeader: true,
      selected: [],
      selectedAllToDelete: false,
      showDeleteBtn: false,
    };
  },
  created() {
    this.getPetitionReplyDetails();
  },
  mounted() {
    document.getElementById("header").style.display = "none";
  },
  updated() {
    if (this.petition_reply_details) {
      document.title =
        this.petition_reply_details.document_description +
        " | Petition Reply Details";
    } else {
      document.title = "Petition Reply Details";
    }
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
    async getPetitionReplyDetails() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      await axios
        .post(
          this.base_url + "/api/petition_reply_details/" + this.id,
          {},
          {
            headers,
          }
        )
        .then((response) => {
          this.petition_reply_details = response.data.petition_reply;
          this.petition = response.data.petition;
          this.previous_index_id = response.data.previous_index_id;
          this.next_index_id = response.data.next_index_id;
          //console.log("petition",  response.data.petition.petition_reply_parent.petition);
          this.getPetitionReplyAnnexure(
            this.petition_reply_details.petition_reply_parent_id
          );
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

    async getPetitionReplyAnnexure(petition_reply_parent_id) {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      await axios
        .get(
          this.base_url + "/api/petition_replies/" + petition_reply_parent_id,
          { headers }
        )
        .then((response) => {
          this.petition_reply_index = response.data.petition_replies;

          var arr = [];
          this.petition_reply_index.forEach((element) => {
            if (element.annexure) {
              arr.push(element);
            }
          });
          console.log("arr", arr);
          this.petition_reply_index = arr;
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
    editPetitionReplyAttachment(attachmentToUpdate) {
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
                this.getPetitionReplyDetails();
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
    deletePetitionReplyAttachment(event, attachmentId, attachmentReplyIndex) {
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
                  //this.getPetitionReplyDetails()
                  this.petition_reply_details.attachments.splice(
                    attachmentReplyIndex,
                    1
                  ); //removing record from list/index after deleting record from DB
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
      this.selected = [];
      if (!this.selectedAllToDelete) {
        this.showDeleteBtn = true;
        for (let i in this.petition_reply_details.attachments) {
          this.selected.push(this.petition_reply_details.attachments[i].id);
        }
      } else {
        this.showDeleteBtn = false;
      }
    },
    updateCheckall: function () {
      if (
        this.petition_reply_details.attachments.length == this.selected.length
      ) {
        this.selectedAllToDelete = true;
      } else if (!this.selected.length) {
        this.showDeleteBtn = false;
      } else {
        this.showDeleteBtn = true;
        this.selectedAllToDelete = false;
      }
    },
    deleteAll() {
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
              { id: this.selected },
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
                  this.getPetitionReplyDetails(); //Reload all records from DB
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
  },
};
</script>

<style></style>
