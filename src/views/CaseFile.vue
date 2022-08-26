<template>
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <div class="case_file">
      <main id="main">
        <page-header
          title="Case Files"
          :route_object="route_obj"
          :header_button="header_button"
          :header_button_text="header_button_text"
        />
        <!-- ======= Services Section ======= -->
        <section id="services" class="services section-bg">
          <div class="container" data-aos="fade-up">
            <div class="row">
              <!-- search filters -->
              <div class="col-lg-12 col-md-12 col-sm-12">
                <Transition name="fade">
                  <form v-if="showSearchForm" class="row mb-2">
                    <div class="col-lg-1 col-md-1 col-sm-6 col-6">
                      <label for="">Case #</label>
                      <input
                        type="text"
                        id="Case"
                        v-model="filters.case_no"
                        class="form-control form-control-sm"
                        aria-describedby="Case"
                      />
                    </div>
                    <div class="col-lg-1 col-md-1 col-sm-6 col-6">
                      <label for="">Year</label>
                      <input
                        type="text"
                        id="year"
                        v-model="filters.year"
                        class="form-control form-control-sm"
                        aria-describedby="year"
                      />
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-12">
                      <label for="">Court</label>
                      <select
                        class="form-select form-select-sm"
                        v-model="filters.court_id"
                      >
                        <option value="">--All--</option>

                        <option
                          v-for="court in courts"
                          :key="court.id"
                          :value="court.id"
                        >
                          {{ court.title }}
                        </option>
                      </select>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-6 col-6">
                      <label for="">Client Name</label>
                      <input
                        v-model="filters.petitioner_name"
                        type="text"
                        id="ClientName"
                        class="form-control form-control-sm"
                        aria-describedby="ClientName"
                      />
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-6 col-6 mt-4">
                      <div class="field-checkbox">
                        <Checkbox
                          inputClass="p-checkbox p-checkbox-box"
                          v-model="filters.pending_tag"
                          :binary="true"
                        />
                        <label style="margin-left: 5px"
                          >Pending Cases Only</label
                        >
                      </div>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-12 mt-lg-4 mt-md-4 mt">
                      <button
                        type="button"
                        class="btn btn-danger btn-sm mr-md-2"
                        @click="reset()"
                      >
                        Reset
                      </button>

                      <button
                        type="button"
                        class="btn btn-warning btn-sm mr-md-2"
                        style="margin-left: 2px"
                        v-tooltip.top="
                          filters.archived
                            ? 'Show Active Cases'
                            : 'Show Archived Cases'
                        "
                        @click="filters.archived = !filters.archived"
                      >
                        {{ filters.archived ? "Active Cases" : "Archived" }}
                      </button>
                      <button
                        type="button"
                        style="margin-left: 2px"
                        class="btn btn-primary btn-sm mr-md-2"
                        @click="openPrintPendingCasesModal()"
                      >
                        Print Pending Cases
                      </button>
                    </div>
                  </form>
                </Transition>
              </div>
              <!-- search filters -->
              <div class="col-lg-12 col-md-12 col-sm-12 mt-2">
                <div v-if="isLoaded" class="row">
                  <div
                    class="col-sm-12 col-md-3 col-lg-3 col-12 d-flex align-self-stretch"
                    v-for="(petition, petitionIndex) in petitions"
                    :key="petition.id"
                  >
                    <div
                      class="card listing-cards shadow-sm mb-4"
                      style="width: 100%"
                    >
                      <div class="pending_case_tag">
                        <span
                          v-show="!petition.editMode"
                          @click="
                            petition.editMode = true;
                            this.pending_tag = petition.pending_tag;
                          "
                          v-if="petition.pending_tag"
                          v-tooltip.top="'Click To Change/Remove'"
                          >{{ petition.pending_tag }}</span
                        >

                        <i
                          v-if="!petition.pending_tag"
                          v-show="!petition.editMode"
                          @click="
                            petition.editMode = true;
                            this.pending_tag = null;
                          "
                          v-tooltip.top="'Click To Add Pending Tag'"
                          class="fa fa-bookmark fa-1x"
                          aria-hidden="true"
                        ></i>
                      </div>

                      <div
                        v-show="petition.editMode"
                        class="input-group input-group-sm"
                        style="width: 73%"
                      >
                        <input
                          autofocus
                          type="text"
                          class="form-control form-control-sm"
                          v-on:keyup.enter="addPendingTag(petition)"
                          v-model="pending_tag"
                          placeholder="Insert 'Pending' Tag"
                        />
                        <button
                          @click="addPendingTag(petition)"
                          class="btn btn-success btn-sm action-btn"
                          v-tooltip.top="'Save'"
                        >
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </button>
                        <button
                          @click="petition.editMode = false"
                          class="btn btn-danger btn-sm action-btn"
                          v-tooltip.top="'Cancel'"
                        >
                          <i class="fa fa-close" aria-hidden="true"></i>
                        </button>
                      </div>
                      <div class="card-body" @click="goToDetails(petition.id)">
                        <div class="row">
                          <p class="card-title" style="margin-bottom: 0px">
                            <strong
                              ><span
                                v-tooltip.top="
                                  petition.type ? '' + petition.type.title : ''
                                "
                                >{{
                                  petition.type_abrivation != ""
                                    ? "" + petition.type_abrivation + ""
                                    : ""
                                }}</span
                              >
                              {{ petition.case_no }}/{{ petition.year }}</strong
                            >
                          </p>
                          <div class="col-md-5 col-5 col-sm-5">
                            <p class="card-text">
                              {{ petition.institution_date }}
                            </p>
                          </div>

                          <div class="col-md-7 col-7 col-sm-7">
                            <p class="card-text pull-right">
                              {{
                                petition.petitioner_names.length > 20
                                  ? petition.petitioner_names.substring(0, 19) +
                                    "..."
                                  : petition.petitioner_names
                              }}
                            </p>
                          </div>
                          <div class="col-md-12">
                            <p class="card-text">
                              {{
                                petition && petition.court
                                  ? petition.court.title
                                  : ""
                              }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="card-footer">
                        <div class="mt-auto">
                          <div class="pull-right">
                            <router-link
                              style="margin-right: 2px"
                              :to="{
                                name: 'case-detail',
                                params: { id: petition.id },
                              }"
                              class="btn btn-success btn-sm action-btn"
                              role="button"
                              v-tooltip.top="'View Case'"
                              >View
                            </router-link>
                            <router-link
                              v-if="this.user.is_admin"
                              style="margin-right: 2px"
                              :to="{
                                name: 'edit-petition',
                                params: { id: petition.id },
                              }"
                              class="btn btn-primary btn-sm action-btn"
                              role="button"
                              v-tooltip.top="'Edit Case'"
                              v-on:click.stop
                              >Edit
                            </router-link>
                            <router-link
                              v-if="this.user.is_admin"
                              style="margin-right: 2px"
                              to="#"
                              class="btn btn-info btn-sm action-btn"
                              role="button"
                              v-tooltip.top="'Alert'"
                              >Alert</router-link
                            >
                            <button
                              @click="
                                toggleArchiveStatus(petition, petitionIndex)
                              "
                              style="margin-right: 2px"
                              class="btn btn-warning btn-sm action-btn"
                              v-tooltip.top="
                                !petition.archived
                                  ? 'Add to Archive'
                                  : 'Remove From Archive'
                              "
                            >
                              {{ !petition.archived ? "Archive" : "Unarchive" }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="petitions.length == 0" class="col-md-12">
                    <p class="alert alert-warning">No Records found.</p>
                  </div>
                </div>
                <div v-if="!isLoaded" class="col-md-12">
                  <p class="alert alert-warning">Loading....</p>
                </div>
              </div>

              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-3">
                    <p v-show="isLoaded && petitions_pagination_info.total > 0">
                      <small
                        >Showing from {{ petitions_pagination_info.from }} to
                        {{ petitions_pagination_info.to }} of
                        {{ petitions_pagination_info.total }}</small
                      >
                    </p>
                  </div>
                  <div class="col-md-6">
                    <Paginator
                      v-show="isLoaded && petitions_pagination_info.total > 0"
                      v-model:first="petitions_pagination_info.from"
                      v-model:rows="petitions_pagination_info.per_page"
                      :totalRecords="petitions_pagination_info.total"
                      @page="onPage($event)"
                    ></Paginator>
                  </div>
                  <div class="col-md-12">
                    <!-- loader here -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- End Services Section -->
      </main>
      <!-- End #main -->
    </div>
  </BlockUI>
  <pending-cases-modal
    pendingCaseModal="true"
    @close-modal-event="closePrintPendingCasesModal"
    v-if="showPendingCasePrintModal"
    :petitions="petitions"
  />
</template>

<script>
import axios from "axios";
import PageHeader from "../views/shared/PageHeader";
import { mapState } from "vuex";
import Checkbox from "primevue/checkbox";
import PendingCasesModal from "../views/petitions/PendingCasesModal.vue";

export default {
  components: {
    PageHeader,
    Checkbox,
    PendingCasesModal,
  },
  name: "CaseFile",
  data() {
    return {
      route_obj: {
        name: "create-petition",
      },
      header_button: true,
      header_button_text: "New Case",
      base_url: process.env.VUE_APP_SERVICE_URL,
      petitions_pagination_info: Array,
      petitions: Array,
      filters: {
        court_id: "",
      },
      courts: [],

      showSearchForm: true,
      isLoaded: false,
      pending_tag: "",
      showPendingCasePrintModal: false,
    };
  },
  created() {
    this.getCourts();
    this.getCaseFiles();
  },
  computed: mapState(["user"]),
  methods: {
    //START EDIT PENDING TAG
    addPendingTag(petition) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        petition.editMode = false;
        petition.pending_tag = this.pending_tag;
        axios
          .post(
            this.base_url + "/api/insert_pending_tag",
            {
              pending_tag: this.pending_tag,
              petition_id: petition.id,
            },
            { headers }
          )
          .then((response) => {
            // this.$notify({
            //   type: "success",
            //   title: "Success",
            //   text: "Pending Tag Inserted Successfully!",
            // });
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
      } else {
        this.$notify({
          type: "error",
          title: "Add Something Before Click On Insert",
        });
      }
    },
    onPage(event) {
      this.isLoaded = false;
      var new_page_no = event.page + 1; //adding 1 because event.page returns index of page # clicked.

      this.filters.page = new_page_no;

      //event.page: New page number
      //event.first: Index of first record
      //event.rows: Number of rows to display in new page
      //event.pageCount: Total number of pages
    },
    getCourts() {
      let url = this.base_url + "/api/courts";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(url, { headers })
        .then((response) => {
          this.courts = response.data.courts;
          console.log(this.courts);
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
    goToDetails(petition_id) {
      this.$router.push({ path: "/petitions/" + petition_id });
    },
    async getCaseFiles() {
      this.isLoaded = false;
      let url = this.base_url + "/api/petitions";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      await axios
        .get(url, {
          headers,
          params: this.filters,
        })
        .then((response) => {
          this.petitions = response.data.petitions.data;
          this.petitions_pagination_info = response.data.petitions;
          console.log(this.petitions);
          this.isLoaded = true;
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
          console.log(error);
        });
    },

    toggleArchiveStatus(petition, petitionIndex) {
      let url = this.base_url + "/api/petitions/toggle_archived";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      this.petitions.splice(petitionIndex, 1);
      axios
        .post(
          url,
          {
            petition_id: petition.id,
            archived: !petition.archived,
          },
          {
            headers,
          }
        )
        .then((response) => {
          console.log("success");
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

    reset() {
      this.filters = {
        court_id: "",
      };
      this.getCaseFiles();
    },
    openPrintPendingCasesModal() {
      this.showPendingCasePrintModal = true;
    },
    closePrintPendingCasesModal() {
      this.showPendingCasePrintModal = false;
    },
  },
  mounted() {
    console.log("Case File Component Mounted");
    document.title = "Case Files";
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.getCaseFiles();
            this.awaitingSearch = false;
          }, 800); // 1 sec delay
        }
        this.awaitingSearch = true;
      },
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  label {
    font-size: 10px;
  }
}
.margin_left {
  margin-left: 1px;
}
label {
  font-size: 14px;
}
</style>
