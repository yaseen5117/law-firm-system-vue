<template>
  <ConfirmPopup />
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main" class="margintop85">
      <page-header :title="page_title" :hideBreadCrumbs="true" />
      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg mt-3">
        <BlockUI :blocked="general_case_laws" :fullScreen="true">
          <div class="container" data-aos="fade-up">
            <div class="row">
              <!-- search filters -->
              <div class="col-md-12 col-12">
                <Transition name="fade">
                  <form v-if="showSearchForm" class="row mb-2">
                    <div class="col-lg-3 col-md-3 col-sm-12">
                      <label for="">Proposition</label>
                      <input
                        type="text"
                        id="year"
                        v-model="filters.case_title"
                        class="form-control form-control-sm"
                      />
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12">
                      <label for="">Keyword</label>
                      <input
                        v-model="filters.keywords"
                        type="text"
                        id="ClientName"
                        class="form-control form-control-sm"
                      />
                    </div>

                    <div class="col-lg-1 col-md-1 col-sm-12">
                      <button
                        type="button"
                        class="btn btn-danger btn-sm mt-lg-4 mt-md-4 mt-2"
                        @click="reset()"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </Transition>
              </div>
              <!-- search filters -->
              <div
                style="display: none"
                class="col-lg-12 col-md-12 col-sm-12 mb-3"
              >
                <button
                  class="btn btn-secondary btn-sm"
                  v-if="showSearchForm"
                  @click="showSearchForm = !showSearchForm"
                >
                  Hide Filters
                </button>
                <button
                  class="btn btn-warning btn-sm"
                  v-else-if="!showSearchForm"
                  @click="showSearchForm = !showSearchForm"
                >
                  Show Filters
                </button>
              </div>
              <div class="table-responsive">
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <table class="table table-striped" v-if="isLoaded">
                    <thead>
                      <th>Propositions</th>
                      <th>Legal Provisions &#38; Citations</th>
                      <th width="10%">Actions</th>
                      <th>Upload File</th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(
                          general_case_law, row_index
                        ) in general_case_laws"
                        :key="general_case_law.id"
                      >
                        <td>
                          <input
                            v-show="general_case_law.editMode"
                            class="form-control"
                            v-model="general_case_law.case_title"
                            v-on:keyup.enter="
                              editGeneralLawIndex(general_case_law)
                            "
                          />
                          <span v-show="!general_case_law.editMode">
                            {{ general_case_law.case_title }}
                          </span>
                        </td>
                        <td>
                          <input
                            v-show="general_case_law.editMode"
                            class="form-control"
                            v-model="general_case_law.legal_provisions"
                            v-on:keyup.enter="
                              editGeneralLawIndex(general_case_law)
                            "
                          />
                          <span v-show="!general_case_law.editMode">{{
                            general_case_law.legal_provisions
                          }}</span>
                        </td>

                        <td width="15%">
                          <router-link
                            v-if="this.user.is_admin"
                            style="margin-right: 2px"
                            :to="{
                              name: 'edit-petition-general-case-law',
                              params: {
                                general_case_law_id: general_case_law.id,
                              },
                            }"
                            class="btn btn-primary btn-sm action-btn"
                            role="button"
                            v-tooltip.top="'Edit'"
                            v-on:click.stop
                            >Edit
                          </router-link>

                          <button
                            class="btn btn-sm btn-danger action-btn"
                            v-show="!general_case_law.editMode"
                            @click="
                              deleteGeneralLawIndex(
                                $event,
                                general_case_law.id,
                                row_index
                              )
                            "
                            :disabled="saving"
                            style="margin-left: 2px"
                            v-tooltip.top="'Delete'"
                          >
                            Delete
                            <!-- <i class="fa fa-trash-o"></i> -->
                          </button>
                        </td>
                        <td>
                          <file-upload
                            @afterUpload="getGeneralCaseLaws"
                            type="App\Models\GeneralCaseLaw"
                            :attachmentable_id="general_case_law.id"
                            :compactInlineView="compactInlineView"
                            class="mt-1"
                            :petition_id="petition.id"
                          />
                        </td>
                        <td>
                          <InvoiceThumb
                            :base_url="base_url"
                            folder_name="Frequently-Asked-Legal-Propositions"
                            :invoice="general_case_law"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <AutoComplete
                            :delay="1"
                            v-model="new_general_case_law.case_title"
                            :suggestions="filteredCaseTitle"
                            @complete="searchForAutocomplete($event)"
                            :style="'width:100%'"
                            :inputStyle="'width:100%'"
                            ref="caseTitle"
                          />
                        </td>
                        <td>
                          <input
                            class="form-control"
                            v-model="new_general_case_law.legal_provisions"
                            v-on:keyup.enter="submitGeneralCaseLaw()"
                          />
                        </td>
                        <td colspan="3">
                          <button
                            :disabled="saving"
                            @click="submitGeneralCaseLaw()"
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
                <div v-if="!isLoaded" class="col-md-12">
                  <p class="alert alert-warning">Loading....</p>
                </div>
              </div>
            </div>
          </div>
        </BlockUI>
      </section>
      <!-- End Services Section -->
    </main>
    <!-- End #main -->
  </BlockUI>
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader";
import useVuelidate from "@vuelidate/core";
import { mapState } from "vuex";
import FileUpload from "../petition-index/FileUpload.vue";
import InvoiceThumb from "../invoices/InvoiceThumb.vue";

export default {
  components: {
    PageHeader,
    FileUpload,
    InvoiceThumb,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      page_title: "Frequently Asked Legal Propositions",
      petition: {},
      new_general_case_law: {},
      general_case_laws: [],
      saving: false,
      showSearchForm: true,
      filters: {},
      defaultDocumentDiscriptions: [
        "Power of Attorney",
        "Writ Petition along with Affidavit",
        "Application for stay cm",
        "Application for Exemption",
      ],
      filteredCaseTitle: null,
      isLoaded: false,
      compactInlineView: "",
    };
  },
  validations() {
    // return {
    //   new_general_case_law: {
    //     case_title: { required },
    //   },
    // };
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.getGeneralCaseLaws();
            this.awaitingSearch = false;
          }, 1500); // 1 sec delay
        }
        this.awaitingSearch = true;
      },
    },
  },
  created() {
    this.getGeneralCaseLaws();
  },
  computed: mapState(["user"]),
  methods: {
    searchForAutocomplete(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredCaseTitle = this.defaultDocumentDiscriptions;
        } else {
          this.filteredCaseTitle = this.defaultDocumentDiscriptions.filter(
            (country) => {
              return country
                .toLowerCase()
                .startsWith(event.query.toLowerCase());
            }
          );
        }
      }, 250);
    },
    reset() {
      this.filters = {};
    },
    getGeneralCaseLaws() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/general_case_laws", {
          headers,
          params: this.filters,
        })
        .then((response) => {
          this.general_case_laws = response.data.general_case_Laws;
          this.compactInlineView = true;
          console.log(response.data.page_title);
          console.log(response.data.general_case_Laws);
          this.isLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submitGeneralCaseLaw() {
      // this.v$.$validate();
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;
        axios
          .post(
            this.base_url + "/api/general_case_laws",
            this.new_general_case_law,
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
                this.new_general_case_law = {};
                setTimeout(() => {
                  this.$refs.caseTitle.focus();
                }, 0);
                this.getGeneralCaseLaws();
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
    editGeneralLawIndex(standardIndexToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;
        axios
          .post(
            this.base_url + "/api/general_case_laws",
            standardIndexToUpdate,
            {
              headers,
            }
          )
          .then(
            (response) => {
              if (response.status === 200) {
                this.saving = false;
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                standardIndexToUpdate.editMode = false;
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
    deleteGeneralLawIndex(event, caseId, row_index) {
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
          this.saving = true;
          axios
            .delete(this.base_url + "/api/general_case_laws/" + caseId, {
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
                  this.saving = false;
                  this.general_case_laws.splice(row_index, 1); //removing record from list/index after deleting record from DB
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
        },
        reject: () => {
          this.$confirm.close();
        },
      });
    },
  },
  mounted() {
    document.getElementById("header");
    document.title = "Frequently Asked Legal Propositions";

    console.log("Frequently Asked Legal Propositions Component Mounted");
  },
};
</script>

<style></style>
