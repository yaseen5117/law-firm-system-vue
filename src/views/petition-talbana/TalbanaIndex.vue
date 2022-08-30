<template>
  <ConfirmPopup />
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
      :class="removePageHeader ? '' : ''"
    >
      <nav-components activeNavPill="talbana" :petition_id="petition.id" />
      <div class="container mt-2" data-aos="fade-up">
        <div class="row">
          <div class="col-12 mb-1">
            <!-- v-if="!removePageHeader" -->
            <button
              v-if="removePageHeader"
              @click="pageHeader()"
              class="btn btn-success btn-sm"
              style="margin-right: 2px"
              for="flexSwitchCheckDefault"
            >
              <i class="fa fa-eye"></i> Show Header
            </button>
            <button
              v-if="!removePageHeader"
              @click="pageHeader()"
              class="btn btn-success btn-sm"
              style="margin-right: 2px"
              for="flexSwitchCheckDefault"
            >
              <i class="fa fa-eye-slash"></i> Hide Header
            </button>

            <router-link
              v-if="this.user.is_admin"
              class="btn btn-primary btn-sm"
              :to="{
                name: 'petition-talbana-save',
                params: { petition_id: petition.id },
              }"
            >
              Add New Talbana
            </router-link>

            <div class="mt-4" v-if="TalbanaActive">
              <div class="mb-4">
                <p>
                  <strong>Title: </strong>{{ TalbanaActive.title }}
                  <strong>Description: </strong>{{ TalbanaActive.description }}
                  <strong>Talbana Date: </strong
                  >{{ TalbanaActive.talbana_date }}
                  <router-link
                    v-tooltip.top="'Edit'"
                    v-if="this.user.is_admin"
                    class="btn btn-success btn-sm action-btn"
                    :to="{
                      name: 'petition-talbana-edit',
                      params: {
                        petition_id: petition.id,
                        editable_talbana_id: TalbanaActive.id,
                      },
                    }"
                  >
                    Edit
                  </router-link>
                  <a
                    v-if="this.user.is_admin"
                    class="btn btn-danger btn-sm action-btn"
                    style="margin-left: 2px"
                    @click="deletePetitionTalbana($event, TalbanaActive.id)"
                    v-tooltip.top="'Delete'"
                  >
                    Delete
                  </a>
                </p>
                <file-upload
                  v-if="this.user.is_admin"
                  @afterUpload="getTalbana"
                  type="App\Models\PetitionTalbana"
                  :attachmentable_id="TalbanaActive.id"
                  :petition_id="petition.id"
                />
              </div>
              <not-found-message :index_details="TalbanaActive" />
              <div v-if="TalbanaActive.attachments.length > 0">
                <div
                  class="row mb-2 text-center"
                  :id="'image-container-' + attachment.id"
                  v-for="attachment in TalbanaActive.attachments"
                  :key="attachment"
                >
                  <div class="col-12">
                    <img
                      v-if="attachment.mime_type != 'application/pdf'"
                      :class="activePage == attachment.id ? 'active-img' : ''"
                      class="img-fluid"
                      style="width: 90%"
                      :src="
                        this.base_url +
                        '/storage/attachments/petitions/' +
                        petition.id +
                        '/PetitionTalbana/' +
                        attachment.attachmentable_id +
                        '/' +
                        attachment.file_name
                      "
                    />
                    <a
                      :class="activePage == attachment.id ? 'active-img' : ''"
                      v-if="attachment.mime_type == 'application/pdf'"
                      :href="
                        this.base_url +
                        '/storage/attachments/petitions/' +
                        petition.id +
                        '/PetitionTalbana/' +
                        attachment.attachmentable_id +
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
          </div>
        </div>
      </div>
    </section>
    <Sidebar
      v-model:visible="visibleRight"
      position="right"
      class="p-sidebar-sm"
      :dismissable="false"
      :modal="false"
    >
      <div @show="!editView">
        <ul class="list-group">
          <router-link
            v-for="talbana in talbanas"
            :key="talbana"
            :class="talbana_id == talbana.id ? 'active' : ''"
            class="list-group-item"
            :to="{
              name: 'petition-talbana-index',
              params: { talbana_id: talbana.id, petition_id: petition.id },
            }"
            >{{ talbana.talbana_date }}</router-link
          >
        </ul>
      </div>
    </Sidebar>
    <div class="sidebarindexswitch">
      <button
        v-tooltip="'Show Annexsures'"
        class="btn sidebar-btn"
        @click="visibleRight = true"
      >
        <i class="fa fa-angle-left"></i>
      </button>
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
    NotFoundMessage,
  },
  computed: mapState(["user"]),
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
      removePageHeader: true,
      visibleRight: true,
    };
  },
  created() {
    this.getTalbanas();
  },
  mounted() {
    document.getElementById("header").style.display = "none";
  },
  updated() {
    if (this.TalbanaActive) {
      document.title = this.TalbanaActive.title + " | Talbana";
    } else {
      document.title = "Talbana";
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
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(
          this.base_url +
            "/api/petition_talbana?petition_id=" +
            this.petition_id,
          { headers }
        )
        .then((response) => {
          this.talbanas = response.data.records;
          this.petition = response.data.records.petition;

          this.getCaseDetails();
          this.getTalbana();
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

    getTalbana() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
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
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },

    getCaseDetails() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/petitions/" + this.petition_id, { headers })
        .then((response) => {
          this.petition = response.data.petition;
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
    deletePetitionTalbana(event, talbanaId) {
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
            .delete(this.base_url + "/api/petition_talbana/" + talbanaId, {
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
                  this.getTalbanas();
                  // this.petition_index_details.attachments.splice(
                  //   attachmentIndex,
                  //   1
                  // ); //removing record from list/index after deleting record from DB
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
