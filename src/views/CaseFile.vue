<template>
  <ConfirmPopup></ConfirmPopup>
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <div class="case_file">
      <main id="main">
        <page-header
          :title="header_title"
          :archive_tag="archive_tag"
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
                        v-on:keyup.enter="searchPetition()"
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
                        v-on:keyup.enter="searchPetition()"
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
                      <label for="">Party Name</label>
                      <input
                        v-on:keyup.enter="searchPetition()"
                        v-model="filters.petitioner_name"
                        type="text"
                        id="ClientName"
                        class="form-control form-control-sm"
                        aria-describedby="ClientName"
                      />
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-6 col-6">
                      <label for="">Pending Tag</label>
                      <input
                        v-on:keyup.enter="searchPetition()"
                        v-model="filters.pendingTag"
                        type="text"
                        id="PendingTag"
                        class="form-control form-control-sm"
                        aria-describedby="PendingTag"
                      />
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-12 mt-lg-4 mt-md-4 mt">
                      <button
                        type="button"
                        class="btn btn-success btn-sm mr-md-2"
                        @click="searchPetition()"
                      >
                        Search
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger btn-sm mr-md-2"
                        @click="reset()"
                        style="margin-left: 2px"
                      >
                        Reset
                      </button>

                      <button
                        v-if="!this.user.is_student"
                        type="button"
                        class="btn btn-warning btn-sm mr-md-2"
                        style="margin-left: 2px"
                        v-tooltip.top="
                          filters.archived
                            ? 'Show Active Cases'
                            : 'Show Archived Cases'
                        "
                        @click="
                          filters.archived = !filters.archived;
                          searchPetition();
                        "
                      >
                        {{ filters.archived ? "Active Cases" : "Archived" }}
                      </button>
                      <button
                        v-if="!this.user.is_student"
                        type="button"
                        style="margin-left: 2px"
                        class="btn btn-primary btn-sm mr-md-2 mobile-margin-top tablet-margin-top"
                        @click="openPrintPendingCasesModal()"
                      >
                        Print Pending Cases
                      </button>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 mt-1">
                      <label style="margin-left: 5px">
                        <Checkbox
                          inputClass="p-checkbox p-checkbox-box"
                          v-model="filters.pending_tag"
                          :binary="true"
                        />
                        Pending Cases Only</label
                      >
                      <!-- <div class="field-checkbox">
                        
                      </div> -->
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
                          v-show="
                            !petition.pendingTagEditMode &&
                            !this.user.is_student
                          "
                          @click="
                            petition.pendingTagEditMode = true;
                            this.pending_tag = petition.pending_tag;
                          "
                          v-if="petition.pending_tag"
                          v-tooltip.top="'Click To Change/Remove'"
                          >{{ petition.pending_tag }}</span
                        >

                        <i
                          v-if="!petition.pending_tag"
                          v-show="
                            !petition.pendingTagEditMode &&
                            !this.user.is_student
                          "
                          @click="
                            petition.pendingTagEditMode = true;
                            this.pending_tag = null;
                          "
                          v-tooltip.top="'Click To Add Pending Tag'"
                          class="fa fa-bookmark fa-1x"
                          aria-hidden="true"
                        ></i>
                      </div>

                      <div
                        v-show="petition.pendingTagEditMode"
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
                          @click="petition.pendingTagEditMode = false"
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
                                v-if="
                                  petition.type && petition.type.abbreviation
                                "
                                >{{
                                  petition.type.abbreviation != ""
                                    ? "" + petition.type.abbreviation + ""
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
                      <div class="row" style="margin-left: 3px">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                          <router-link
                            :to="{
                              name: 'case-detail',
                              params: { id: petition.id },
                            }"
                          >
                            <i
                              v-tooltip.top="'Indexes: ' + petition.index_total"
                              class="fa fa-list petition_listing_icons"
                            ></i>
                          </router-link>
                          <router-link
                            :to="{
                              name: 'petition-reply-parents',
                              params: { id: petition.id },
                            }"
                          >
                            <i
                              v-if="this.user.is_admin || this.user.is_lawyer"
                              v-tooltip.top="
                                'Replies: ' +
                                petition.petition_reply_parent_total
                              "
                              class="fa fa-reply petition_listing_icons icon_margin_left"
                              aria-hidden="true"
                            ></i>
                          </router-link>
                          <router-link
                            :to="{
                              name: 'petition-order-sheets-index',
                              params: { petition_id: petition.id },
                            }"
                          >
                            <i
                              v-tooltip.top="
                                'Order Sheets: ' + petition.order_sheet_total
                              "
                              class="fa fa-file-text-o petition_listing_icons icon_margin_left"
                            ></i>
                          </router-link>
                          <span class="icon_margin_left">
                            <hearing-date
                              :petition_id="petition.id"
                              :isShowIcon="true"
                              v-if="this.user.is_admin || this.user.is_lawyer"
                            />
                          </span>
                          <span @click="printOrderSheets(petition.id)">
                            <i
                              v-if="this.user.is_admin || this.user.is_lawyer"
                              v-tooltip.top="'Print Order Sheets'"
                              class="fa fa-print petition_listing_icons icon_margin_left"
                            ></i>
                          </span>
                          <a :href="petition.pdf_download_url" download=""
                            ><i
                              v-tooltip.top="'Download PDF'"
                              class="fa fa-download petition_listing_icons icon_margin_left"
                            ></i
                          ></a>
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
                              v-if="this.user.is_admin || this.user.is_lawyer"
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
                            <!-- <router-link
                              v-if="this.user.is_admin"
                              style="margin-right: 2px"
                              to="#"
                              class="btn btn-info btn-sm action-btn"
                              role="button"
                              v-tooltip.top="'Alert'"
                              >Alert</router-link
                            > -->
                            <button
                              v-if="this.user.is_admin || this.user.is_lawyer"
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
                            <button
                              v-if="this.user.is_admin || this.user.is_lawyer"
                              @click="
                                deletePetition(
                                  $event,
                                  petition.id,
                                  petitionIndex
                                )
                              "
                              style="margin-right: 2px"
                              class="btn btn-danger btn-sm action-btn"
                              v-tooltip.top="'Delete'"
                            >
                              Delete
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
                        >Showing
                        {{ filters.archived ? "Archived Cases" : "" }} from
                        {{ petitions_pagination_info.from }} to
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
import HearingDate from "../views/shared/HearingDate.vue";

export default {
  components: {
    PageHeader,
    Checkbox,
    PendingCasesModal,
    HearingDate,
  },
  name: "CaseFile",
  data() {
    return {
      header_title: "Case Files",
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
        pendingTag: "",
      },
      courts: [],

      showSearchForm: true,
      isLoaded: false,
      pending_tag: "",
      showPendingCasePrintModal: false,
      resetDuration: false,
      archive_tag: "",
    };
  },
  updated() {
    this.archive_tag = this.filters.archived ? "(Archived) " : "";

  },
  created() {
    this.getCourts();
    this.getCaseFiles();
  },
  computed: mapState(["user"]),
  methods: {
    searchPetition() {
      this.getCaseFiles();
    },
    //START EDIT PENDING TAG
    addPendingTag(petition) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        petition.pendingTagEditMode = false;
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
      this.getCaseFiles();
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
      this.resetDuration = true;
      this.filters = {
        court_id: "",
        pendingTag: "",
      };
      this.getCaseFiles();
    },
    openPrintPendingCasesModal() {
      this.showPendingCasePrintModal = true;
    },
    closePrintPendingCasesModal() {
      this.showPendingCasePrintModal = false;
    },
    deletePetition(event, petitionId, petitionIndex) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Do you want to Delete?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Delete",
        acceptClass: "p-button-danger",
        rejectClass: "p-button-primary",
        rejectLabel: "Cancel",
        accept: () => {
          this.petitions.splice(petitionIndex, 1);
          var headers = {
            Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
          };

          axios
            .delete(this.base_url + "/api/petitions/" + petitionId, {
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
    printOrderSheets(petition_id) {
      let routeData = this.$router.resolve({
        name: "print-order-sheets",
        params: { petition_id: petition_id },
      });
      window.open(routeData.href, "_blank");
    },
  },
  mounted() {
    console.log("Case File Component Mounted");
    document.title = "Case Files";
  },
  // watch: {
  //   filters: {
  //     deep: true,
  //     handler() {
  //       if (!this.awaitingSearch) {
  //         setTimeout(
  //           () => {
  //             this.getCaseFiles();
  //             this.awaitingSearch = false;
  //           },
  //           this.filters.court_id ||
  //             this.filters.archived ||
  //             !this.filters.archived ||
  //             this.resetDuration ||
  //             this.filters.pending_tag
  //             ? 500
  //             : 4000
  //         );
  //       }
  //       this.awaitingSearch = true;
  //     },
  //   },
  // },
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  label {
    font-size: 11px !important;
  }
  .mobile-margin-top {
    margin-top: 2px;
  }
  i {
    font-size: 20px;
    margin-right: 12px;
  }
}
@media only screen and (min-width: 600px) {
  .tablet-margin-top {
    margin-top: 2px;
  }
}
.margin_left {
  margin-left: 1px;
}
label {
  font-size: 14px;
}
.icon_margin_left {
  margin-left: 5px;
}
</style>
