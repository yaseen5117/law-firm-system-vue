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
            <div class="card-body align-center case_heading">
              <div class="text-end">
                <button
                  style="margin-right: 2px"
                  @click="confirmToDelete($event)"
                  class="btn btn-sm btn-success action-btn"
                  v-if="petition && petition.pending_tag"
                  v-tooltip.top="'Click To Remove'"
                >
                  Pending Tag: {{ petition.pending_tag }}
                </button>

                <button
                  style="margin-right: 2px"
                  v-if="!insertPendingTag && !petition.pending_tag"
                  @click="openInsertField"
                  class="btn btn-sm btn-success action-btn"
                >
                  Insert "Pending" Tag
                </button>
                <button class="btn" v-if="insertPendingTag">
                  <div class="p-inputgroup">
                    <Button
                      @click="colseInsertField"
                      icon="pi pi-times"
                      class="p-button-danger p-button-sm"
                    />
                    <InputText
                      class="p-inputtext-sm"
                      v-model="pending_tag"
                      placeholder="Insert 'Pending' Tag"
                    />
                    <Button
                      @click="addPendingTag()"
                      icon="pi pi-check"
                      class="p-button-primary p-button-sm"
                      label="Insert"
                    />
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
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="View"
                  ><i class="fa fa-edit"></i> Edit Petition</router-link
                >
                <a
                  class="btn btn-warning action-btn"
                  :href="petition.pdf_download_url"
                  download=""
                  ><i class="fa fa-download"></i> Download PDF</a
                >
              </div>
              <h6>
                <u
                  >BEFORE THE
                  {{ petition.court ? petition.court.title : "Court NA" }}
                </u>
              </h6>
              <p>
                <strong>{{ petition.petition_standard_title }}</strong>
              </p>
              <p class="line_height">{{ petition.petitioner_names }}</p>
              <p>VERSUS</p>
              <p class="line_height">{{ petition.opponent_names }}</p>
              <p class="line_height">
                {{ petition.title }}
              </p>
              <p>
                <u><strong>INDEX</strong></u>
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <table class="table table-striped">
                <thead>
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
                  >
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
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Edit"
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
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Update"
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
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Cancel"
                      >
                        Cancel
                        <!-- <i class="fa fa-remove"></i> -->
                      </a>

                      <a
                        class="btn btn-sm btn-danger action-btn"
                        v-show="!petition_detail.editMode"
                        @click="
                          deletePetitionIndex(petition_detail.id, petitionIndex)
                        "
                        href="javascript:void"
                        style="margin-left: 2px"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Delete"
                      >
                        Delete
                        <!-- <i class="fa fa-trash-o"></i> -->
                      </a>
                    </td>
                  </tr>
                  <tr v-if="this.user.is_admin">
                    <td>
                      <AutoComplete
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

export default {
  components: {
    NavComponents,
    PageHeader,
    InputText,
    Button,
    Tooltip,
    ConfirmPopup,
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
    confirmToDelete(event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Do you want to Remove Pending Tag?",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.removePendingTag();
        },
        reject: () => {
          this.$confirm.close();
        },
      });
    },

    openInsertField() {
      this.insertPendingTag = true;
    },
    colseInsertField() {
      this.insertPendingTag = false;
    },
    removePendingTag() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
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
    addPendingTag() {
      if (this.pending_tag) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
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
            this.insertPendingTag = false;
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
      } else {
        this.$notify({
          type: "error",
          title: "Add Something Before Click On Insert",
        });
      }
    },
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
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/petitions/" + this.id, { headers })
        .then((response) => {
          this.petition = response.data.petition;
          this.petition_details = response.data.petition_details;
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
    deletePetitionIndex(petitionId, petitionIndex) {
      if (confirm("Do you really want to delete?")) {
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
      }
    },
  },
  mounted() {
    console.log("Case Details Component Mounted");
    document.title = "Petitions";
  },
};
</script>

<style></style>
