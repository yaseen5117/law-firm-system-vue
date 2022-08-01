<template>
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <page-header
      :title="'Naqal Forms'"
      :petition="petition"
      :hide="removePageHeader ? true : false"
    />
    <!-- End Breadcrumbs -->
    <section
      id="services"
      class="services section-bg"
      :class="removePageHeader ? '' : ''"
    >
      <nav-components activeNavPill="naqal_forms" :petition_id="petition.id" />
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
                name: 'petition-naqal-forms-save',
                params: { petition_id: petition.id },
              }"
            >
              Add New Naqal Form
            </router-link>

            <div class="mt-4" v-if="NaqalFormActive">
              <div class="mb-4">
                <p>
                  <strong>Title: </strong>{{ NaqalFormActive.title }}
                  <strong>Description: </strong
                  >{{ NaqalFormActive.description }}
                  <strong>Naqal Form Date: </strong
                  >{{ NaqalFormActive.naqal_form_date }}
                  <router-link
                    v-if="this.user.is_admin"
                    class="btn btn-success btn-sm action-btn"
                    :to="{
                      name: 'petition-naqal-forms-edit',
                      params: {
                        petition_id: petition.id,
                        editable_naqal_form_id: NaqalFormActive.id,
                      },
                    }"
                  >
                    Edit
                  </router-link>
                  <a
                    v-if="this.user.is_admin"
                    class="btn btn-danger btn-sm action-btn"
                    style="margin-left: 2px"
                    @click="deletePetitionNaqalForm(NaqalFormActive.id)"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete"
                  >
                    Delete
                  </a>
                </p>
                <file-upload
                  v-if="this.user.is_admin"
                  @afterUpload="getNaqalForm"
                  type="App\Models\PetitionNaqalForm"
                  :attachmentable_id="NaqalFormActive.id"
                  :petition_id="petition.id"
                />
              </div>

              <div>
                <div
                  class="row mb-2 text-center"
                  :id="'image-container-' + attachment.id"
                  v-for="attachment in NaqalFormActive.attachments"
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
                        '/PetitionNaqalForm/' +
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
                        '/PetitionNaqalForm/' +
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
            v-for="naqal_form in naqal_forms"
            :key="naqal_form"
            :class="naqal_form_id == naqal_form.id ? 'active' : ''"
            class="list-group-item"
            :to="{
              name: 'petition-naqal-forms-index',
              params: {
                naqal_form_id: naqal_form.id,
                petition_id: petition.id,
              },
            }"
            >{{ naqal_form.naqal_form_date }}</router-link
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
  computed: mapState(["user"]),
  data() {
    return {
      showImgCard: false,
      editView: false,
      base_url: process.env.VUE_APP_SERVICE_URL,
      naqal_forms: [],
      NaqalFormActive: {},
      petition: {},
      petition_index: [],
      petition_index_details: {},
      naqal_form_id: this.$route.params.naqal_form_id, //this is the id from the browser
      petition_id: this.$route.params.petition_id, //this is the id from the browser
      horizontalView: false, //it will show vertical images by default
      activePage: null,
      removePageHeader: true,
      visibleRight: true,
    };
  },
  created() {
    this.getNaqalForms();
  },
  mounted() {
    document.getElementById("header").style.display = "none";
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
    getNaqalForms() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(
          this.base_url +
            "/api/petition_naqal_forms?petition_id=" +
            this.petition_id,
          { headers }
        )
        .then((response) => {
          this.naqal_forms = response.data.records;
          this.petition = response.data.records.petition;

          this.getCaseDetails();
          this.getNaqalForm();
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

    getNaqalForm() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };

      axios
        .post(
          this.base_url + "/api/petition_naqal_forms/by_petition",
          {
            petition_id: this.petition_id,
            id: this.naqal_form_id,
          },
          {
            headers,
          }
        )
        .then((response) => {
          this.NaqalFormActive = response.data.record;
          consol.log("success");
          consol.log(this.NaqalFormActive);
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
    deletePetitionNaqalForm(naqalFormId) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .delete(this.base_url + "/api/petition_naqal_forms/" + naqalFormId, {
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
                this.getNaqalForms();
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
      }
    },
  },
};
</script>

<style></style>
