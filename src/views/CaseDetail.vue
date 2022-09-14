<template>
  <ConfirmPopup></ConfirmPopup>
  <main id="main">
    <page-header title="Petition" />
    <nav-components activeNavPill="petition" :petition_id="petition.id" />
    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="text-end">
              <button
                style="margin-right: 2px"
                @click="confirmToDelete($event)"
                class="btn btn-sm btn-grey action-btn"
                v-if="petition && petition.pending_tag && pendingTag"
                v-tooltip.top="'Click To Change/Remove'"
              >
                Pending Tag: {{ petition.pending_tag }}
              </button>

              <button
                style="margin-right: 2px"
                v-if="
                  !insertPendingTag &&
                  !petition.pending_tag &&
                  this.user.is_admin
                "
                @click="openInsertField"
                class="btn btn-sm btn-success action-btn"
              >
                Insert "Pending" Tag
              </button>
              <button class="btn" v-if="insertPendingTag">
                <div class="p-inputgroup">
                  <input
                    class="form-control form-control-sm"
                    v-on:keyup.enter="addPendingTag(petition_detail)"
                    v-model="pending_tag"
                    placeholder="Insert 'Pending' Tag"
                  />
                  <button
                    @click="addPendingTag()"
                    class="btn btn-success btn-sm action-btn"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i>
                  </button>
                  <button
                    @click="colseInsertField()"
                    class="btn btn-danger btn-sm action-btn"
                  >
                    <i class="fa fa-close" aria-hidden="true"></i>
                  </button>
                </div>
              </button>
              <router-link
                v-if="this.user.is_admin"
                class="btn btn-primary action-btn"
                style="margin-right: 2px"
                :to="{
                  name: 'edit-petition',
                  params: { id: petition.id },
                }"
                role="button"
                ><i class="fa fa-edit"></i> Edit Petition</router-link
              >
              <a
                class="btn btn-warning action-btn"
                :href="petition.pdf_download_url"
                download=""
                ><i class="fa fa-download"></i> Download PDF</a
              >
            </div>
            <div class="text-end">
              <hearing-date />
            </div>
            <div class="card-body align-center case_heading">
              <h6>
                <u
                  >BEFORE THE
                  {{ petition.court ? petition.court.title : "Court NA" }}
                </u>
              </h6>
              <p>
                <strong v-tooltip.top="petition.type.title">{{
                  petition.petition_standard_title
                }}</strong>
              </p>
              <p class="line_height">{{ petition.petitioner_names }}</p>
              <p>VERSUS</p>
              <p class="line_height">{{ petition.opponent_names }}</p>
              <!-- <p class="line_height">
                {{ petition.title }}
              </p> -->
              <p>
                <u><strong>INDEX</strong></u>
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <table class="table table-striped" v-if="isLoaded">
                <thead>
                  <th>Sr.</th>
                  <th>Description of Documents</th>
                  <th>Date</th>
                  <th>Annexure</th>
                  <th>Page</th>
                  <th v-if="this.user.is_admin" width="10%">Actions</th>
                </thead>
                <tbody>
                  <tr
                    v-for="(petition_detail, petitionIndex) in petition_details"
                    :key="petition_detail.id"
                    class="draggable"
                    draggable="true"
                    @dragstart="startDrag($event, petitionIndex)"
                    @drop="onDrop($event, petitionIndex)"
                    @dragenter.prevent
                    @dragover.prevent
                  >
                    <td width="3%">{{ petitionIndex + 1 }}</td>
                    <td>
                      <AutoComplete
                        v-show="petition_detail.editMode"
                        :delay="1"
                        v-model="petition_detail.document_description"
                        :suggestions="filteredDocumentDiscriptions"
                        @complete="searchForAutocomplete($event)"
                        :style="'width:100%'"
                        :inputStyle="'width:100%'"
                        v-on:keyup.enter="editPetitionIndex(petition_detail)"
                      />
                      <router-link
                        v-show="!petition_detail.editMode"
                        :to="{
                          name: 'petition-index-details',
                          params: { id: petition_detail.id },
                        }"
                        >{{ petition_detail.document_description }}
                      </router-link>
                    </td>
                    <td>
                      <InputMask
                        v-show="petition_detail.editMode"
                        v-model="petition_detail.date"
                        v-on:keyup.enter="editPetitionIndex(petition_detail)"
                        mask="99/99/9999"
                        aria-placeholder=""
                        placeholder="dd/mm/yyyy "
                      />

                      <span v-show="!petition_detail.editMode">{{
                        petition_detail.date
                      }}</span>
                    </td>
                    <td>
                      <input
                        v-show="petition_detail.editMode"
                        class="form-control"
                        v-model="petition_detail.annexure"
                        v-on:keyup.enter="editPetitionIndex(petition_detail)"
                      />
                      <span v-show="!petition_detail.editMode">{{
                        petition_detail.annexure
                      }}</span>
                    </td>
                    <td>
                      <input
                        v-show="petition_detail.editMode"
                        class="form-control"
                        v-model="petition_detail.page_info"
                        v-on:keyup.enter="editPetitionIndex(petition_detail)"
                      />
                      <span v-show="!petition_detail.editMode">{{
                        petition_detail.page_info
                      }}</span>
                    </td>
                    <td width="15%" v-if="this.user.is_admin">
                      <a
                        class="btn btn-sm btn-primary action-btn"
                        v-show="!petition_detail.editMode"
                        @click="petition_detail.editMode = true"
                        href="javascript:void"
                        style="margin-left: 2px"
                        v-tooltip.top="'Edit'"
                      >
                        Edit
                        <!-- <i class="fa fa-edit"></i> -->
                      </a>
                      <a
                        v-show="petition_detail.editMode"
                        class="btn btn-sm btn-warning action-btn"
                        @click="editPetitionIndex(petition_detail)"
                        href="javascript:void"
                        style="margin-left: 2px"
                        v-tooltip.top="'Update'"
                      >
                        Update
                        <!-- <i class="fa fa-save"></i> -->
                      </a>

                      <a
                        v-show="petition_detail.editMode"
                        @click="petition_detail.editMode = false"
                        class="btn btn-sm btn-info action-btn"
                        href="javascript:void"
                        style="margin-left: 2px"
                        v-tooltip.top="'Cancel'"
                      >
                        Cancel
                        <!-- <i class="fa fa-remove"></i> -->
                      </a>

                      <a
                        class="btn btn-sm btn-danger action-btn"
                        v-show="!petition_detail.editMode"
                        @click="
                          deletePetitionIndex(
                            $event,
                            petition_detail.id,
                            petitionIndex
                          )
                        "
                        href="javascript:void"
                        style="margin-left: 2px"
                        v-tooltip.top="'Delete'"
                      >
                        Delete
                        <!-- <i class="fa fa-trash-o"></i> -->
                      </a>
                    </td>
                  </tr>
                  <tr v-if="this.user.is_admin">
                    <td></td>
                    <td>
                      <AutoComplete
                        v-on:keyup.enter="submitPetitionIndex()"
                        :delay="1"
                        v-model="new_petition_index.document_description"
                        :suggestions="filteredDocumentDiscriptions"
                        @complete="searchForAutocomplete($event)"
                        v-bind:class="{
                          'error-boarder':
                            v$.new_petition_index.document_description.$error,
                        }"
                        :style="'width:100%'"
                        :inputStyle="'width:100%'"
                        @blur="
                          v$.new_petition_index.document_description.$touch
                        "
                        ref="documentDescription"
                      />
                      <span
                        v-if="v$.new_petition_index.document_description.$error"
                        class="errorMessage"
                        >Description field is required.</span
                      >
                    </td>
                    <td>
                      <InputMask
                        v-model="new_petition_index.date"
                        v-on:keyup.enter="submitPetitionIndex()"
                        mask="99/99/9999"
                        aria-placeholder=""
                        placeholder="dd/mm/yyyy "
                      />
                    </td>
                    <td>
                      <input
                        class="form-control"
                        v-model="new_petition_index.annexure"
                        v-on:keyup.enter="submitPetitionIndex()"
                      />
                    </td>
                    <td>
                      <input
                        class="form-control"
                        v-model="new_petition_index.page_info"
                        v-on:keyup.enter="submitPetitionIndex()"
                      />
                    </td>
                    <td>
                      <button
                        type="submit"
                        :disabled="saving"
                        @click="submitPetitionIndex()"
                        class="btn btn-sm btn-success action-btn"
                      >
                        Save
                        <!-- <i class="fa fa-save"></i> -->
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="!isLoaded" class="col-md-12">
                <p class="alert alert-warning">Loading....</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Services Section -->
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import NavComponents from "./Cases/NavComponents.vue";
import PageHeader from "../views/shared/PageHeader";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapState } from "vuex";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Tooltip from "primevue/tooltip";
import ConfirmPopup from "primevue/confirmpopup";
import HearingDate from "../views/shared/HearingDate.vue";

export default {
  components: {
    NavComponents,
    PageHeader,
    InputText,
    Button,
    Tooltip,
    ConfirmPopup,
    HearingDate,
  },
  computed: mapState(["user"]),
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      petition: {},
      petition_details: [],
      id: this.$route.params.id, //this is the id from the browser
      new_petition_index: {
        document_description: "",
      },
      saving: false,
      defaultDocumentDiscriptions: [
        "Power of Attorney",
        "Writ Petition along with Affidavit",
        "Application for stay cm",
        "Application for Exemption",
      ],
      filteredDocumentDiscriptions: null,
      insertPendingTag: false,
      pending_tag: "",
      showEditTagBtn: true,
      pendingTag: true,
      isLoaded: false,
    };
  },
  validations() {
    return {
      new_petition_index: {
        document_description: { required },
      },
    };
  },
  created() {
    this.getCaseDetails();
  },
  methods: {
    startDrag(event, index) {
      console.log(index);
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("petition_index_id", index);
    },

    onDrop(event, newIndex) {
      var old_index = event.dataTransfer.getData("petition_index_id");
      this.petition_details = this.array_move(
        this.petition_details,
        old_index,
        newIndex
      );
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .post(
          this.base_url + "/api/petitions_index/update_display_order",
          {
            petition_details: this.petition_details,
          },
          { headers }
        )
        .then((response) => {})
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },

    //Start Methods About All Pending Tag
    confirmToDelete(event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Do you want to Remove/Change Pending Tag?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Delete",
        acceptClass: "p-button-danger",
        rejectClass: "p-button-primary",
        rejectLabel: "Edit",
        accept: () => {
          this.removePendingTag();
        },
        reject: () => {
          this.editPendingTag(this.petition.pending_tag);
          this.$confirm.close();
        },
      });
    },
    editPendingTag(pending_tag) {
      this.insertPendingTag = true;
      this.pendingTag = false;
      this.pending_tag = pending_tag;
    },
    openInsertField() {
      this.insertPendingTag = true;
    },
    colseInsertField() {
      this.insertPendingTag = false;
      this.showEditTagBtn = true;
      this.pendingTag = true;
      this.pending_tag = "";
    },
    removePendingTag() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      this.insertPendingTag = false;
      this.pendingTag = false;
      this.petition.pending_tag = "";
      axios
        .post(
          this.base_url + "/api/remove_pending_tag",
          {
            pending_tag: this.pending_tag,
            petition_id: this.id,
          },
          { headers }
        )
        .then((response) => {
          this.$notify({
            type: "success",
            title: "Success",
            text: "Pending Tag Remove Successfully!",
          });
          this.pending_tag = "";
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
    addPendingTag() {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.insertPendingTag = false;
        this.pendingTag = true;
        this.petition.pending_tag = this.pending_tag;
        axios
          .post(
            this.base_url + "/api/insert_pending_tag",
            {
              pending_tag: this.pending_tag,
              petition_id: this.id,
            },
            { headers }
          )
          .then((response) => {
            this.$notify({
              type: "success",
              title: "Success",
              text: "Pending Tag Inserted Successfully!",
            });
            this.pending_tag = null;
          })
          .catch((error) => {
            console.log(error);
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.message,
            });
          });
      }
    },
    //END Methods About All Pending Tag
    searchForAutocomplete(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredDocumentDiscriptions = this.defaultDocumentDiscriptions;
        } else {
          this.filteredDocumentDiscriptions =
            this.defaultDocumentDiscriptions.filter((country) => {
              return country
                .toLowerCase()
                .startsWith(event.query.toLowerCase());
            });
        }
      }, 250);
    },
    getCaseDetails() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/petitions/" + this.id, { headers })
        .then((response) => {
          this.petition = response.data.petition;
          this.petition_details = response.data.petition_details;
          this.isLoaded = true;
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

    submitPetitionIndex() {
      this.v$.$validate();
      if (!this.v$.$error) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.new_petition_index.petition_id = this.id;
        this.saving = true;
        axios
          .post(
            this.base_url + "/api/petitions_index",
            this.new_petition_index,
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
                  text: "Saved Successfully!",
                });
                this.saving = false;
                this.new_petition_index = {};
                setTimeout(() => {
                  this.v$.$reset();
                  this.$refs.documentDescription.focus();
                }, 0);
                this.getCaseDetails();
              }
            },
            (error) => {
              this.saving = false;
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
    editPetitionIndex(petitionToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/petitions_index", petitionToUpdate, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                petitionToUpdate.editMode = false;
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
    deletePetitionIndex(event, petitionId, petitionIndex) {
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
            .delete(this.base_url + "/api/petitions_index/" + petitionId, {
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
                  //this.getCaseDetails()
                  this.petition_details.splice(petitionIndex, 1); //removing record from list/index after deleting record from DB
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
  updated() {
    document.title = this.petition.petition_standard_title + " | Petition";
  },
  mounted() {
    console.log("Case Details Component Mounted");
  },
};
</script>

<style>
/* .btn-grey {
  color: #fff;
  background-color: #7e7e7e;
  border-color: #7e7e7e;
} */

.draggable:active {
  cursor: move;
  cursor: -moz-grabbing;
  cursor: grabbing;
}
</style>
