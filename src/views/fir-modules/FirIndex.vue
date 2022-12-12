<template>
  <ConfirmPopup />
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main">
      <page-header
        :title="'Firs'"
        :petition="null"
        :hideCaseFiles="true"
        :showInvoices="false"
        :route_object="route_obj"
        :header_button="header_button"
        :header_button_text="header_button_text"
      />
      <section id="services" class="services section-bg">
        <BlockUI :blocked="firs" :fullScreen="true">
          <div class="container" data-aos="fade-up">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <h4 style="text-align: center" class="mt-1 mb-3">
                  OFFENCES ATTRACTED
                </h4>

                <Transition name="fade">
                  <form class="row mb-2">
                    <div class="form-group row">
                      <label for="" class="col-sm-2 col-form-label"
                        >Police Station</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          id="police_station"
                          class="form-control form-control-sm"
                          placeholder="Police Station"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="" class="col-sm-2 col-form-label"
                        >FIR No.</label
                      >
                      <div class="col-sm-4">
                        <input
                          type="text"
                          id="fir_no"
                          class="form-control form-control-sm"
                          placeholder="636"
                        />
                      </div>
                      <label for="" class="col-sm-1 col-form-label">of</label>
                      <label for="" class="col-sm-1 col-form-label">YEAR</label>
                      <div class="col-sm-4">
                        <input
                          id="year"
                          type="text"
                          class="form-control form-control-sm"
                          placeholder="22"
                        />
                      </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-12">
                      <label for="">Section</label>

                      <input
                        v-on:keyup.enter="searchFir()"
                        class="form-control form-control-sm"
                        type="text"
                        v-model="filters.section"
                      />
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-12">
                      <label for="">Statute</label>
                      <select
                        class="form-control form-control-sm"
                        v-model="filters.statute_id"
                      >
                        <option value="">--All--</option>
                        <option
                          v-for="statute in statutes"
                          :key="statute.id"
                          :value="statute.id"
                        >
                          {{ statute.title }}
                        </option>
                      </select>
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12">
                      <button
                        style="width: 100%"
                        type="button"
                        class="btn btn-success btn-sm mr-md-2 mt-3"
                        @click="searchFir()"
                        v-tooltip.top="'Click to Search'"
                      >
                        <i class="fa fa-search" aria-hidden="true"></i> Go
                      </button>
                    </div>
                  </form>
                </Transition>
              </div>
              <div
                v-if="firs.length > 0"
                class="col-lg-12 col-md-12 col-sm-12"
                style="text-align: right"
              >
                <a
                  class="btn btn-sm btn-warning action-btn"
                  :href="fir_pdf_download_url"
                  style="margin-left: 2px"
                  v-tooltip.top="'Export to PDF'"
                >
                  <i class="fa fa-download"></i> Download PDF
                </a>
              </div>
              <div class="col-md-12">
                <div class="table-responsive">
                  <table class="table table-striped" v-if="isLoaded">
                    <thead>
                      <tr>
                        <th>Court</th>
                        <th>Statute</th>
                        <th>Section</th>
                        <th>Arrest Info</th>
                        <!-- <th>Warrent Info</th>
                        <th>Bailable Info</th>
                        <th>Compoundable Info</th>
                        <th>Punishment Info</th> -->
                        <th class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(fir, fir_index) in firs" :key="fir_index">
                        <td>
                          {{ fir.court.title }}
                        </td>
                        <td>
                          {{ fir.statute.title }}
                        </td>
                        <td>
                          {{ fir.section }}
                        </td>
                        <td>
                          {{ fir.arrest_info }}
                        </td>
                        <!-- <td>
                          {{ fir.warrent_info }}
                        </td>
                        <td>{{ fir.bailable_info }}</td>
                        <td>{{ fir.compoundable_info }}</td>
                        <td>{{ fir.punishment_info }}</td> -->
                        <td class="text-end">
                          <router-link
                            class="btn btn-sm btn-success action-btn"
                            :to="{
                              name: 'edit-fir',
                              params: { fir_id: fir.id },
                            }"
                            href="javascript:void"
                            style="margin-left: 2px"
                            v-tooltip.top="'Edit'"
                          >
                            Edit
                          </router-link>

                          <a
                            class="btn btn-sm btn-danger action-btn"
                            @click="deleteFir($event, fir.id, fir_index)"
                            href="javascript:void"
                            style="margin-left: 2px"
                            v-tooltip.top="'Delete'"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                      <tr v-if="firs.length == 0" class="text-center">
                        <td colspan="5" class="text-danger">
                          Records Not Found!
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- <Paginator v-show="pagination_info.total>0" v-model:first="pagination_info.from" v-model:rows="pagination_info.per_page" :totalRecords="pagination_info.total" @page="onPage($event)"></Paginator>

              <p v-show="pagination_info.total>0"><small>Showing from {{pagination_info.from}} to {{pagination_info.to}} of {{pagination_info.total}}</small></p> -->
                </div>
                <div
                  v-if="showExtraDetails"
                  class="col-lg-12 col-md-12 col-sm-12 mb-2"
                >
                  <div class="row">
                    <div
                      v-if="policeStation"
                      id="show_police_station"
                      class="col-lg-6 col-md-6 col-sm-6"
                    >
                      Police Station <b>{{ policeStation }}</b>
                    </div>
                    <div id="show_fir_year" class="col-lg-6 col-md-6 col-sm-6">
                      <span v-if="firNo">
                        FIR No <b>{{ firNo }}</b></span
                      >
                      <span v-if="year">
                        of YEAR <b>{{ year }}</b></span
                      >
                    </div>
                  </div>
                </div>
                <div v-if="!isLoaded" class="col-md-12">
                  <p class="alert alert-warning">Loading....</p>
                </div>
              </div>
            </div>
          </div>
        </BlockUI>
      </section>
    </main>
    <!-- End #main -->
  </BlockUI>
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import Editor from "primevue/editor";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: {
    PageHeader,
    Editor,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      firs: [],
      showDateType: false,
      excute: false,
      saving: false,
      route_obj: {
        name: "create-fir",
      },
      header_button: true,
      header_button_text: "Create New Fir",
      base_url: process.env.VUE_APP_SERVICE_URL,
      isLoaded: false,
      filters: {
        statute_id: "",
        court_id: "",
      },
      courts: [],
      statutes: [],
      fir_pdf_download_url: null,
      showExtraDetails: false,
      policeStation: null,
      firNo: null,
      year: null,
    };
  },
  created() {
    this.getFirs();
    this.getCourts();
    this.getStatuses();
  },
  mounted() {
    document.title = "Fir";
  },
  // watch: {
  //   filters: {
  //     deep: true,
  //     handler() {
  //       if (!this.awaitingSearch) {
  //         setTimeout(() => {
  //           this.getFirs();
  //           this.awaitingSearch = false;
  //         }, 4000); // 1 sec delay
  //       }
  //       this.awaitingSearch = true;
  //     },
  //   },
  // },
  reset() {
    this.filters = {};
    this.getFirs();
  },
  methods: {
    searchFir() {
      this.getFirs();
      this.showExtraDetails = true;
      var policeStation = document.getElementById("police_station").value;
      this.policeStation = policeStation;
      var firNo = document.getElementById("fir_no").value;
      this.firNo = firNo;
      var year = document.getElementById("year").value;
      this.year = year;
    },
    getFirs() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/fir";
      axios
        .get(url, { headers, params: this.filters })
        .then((response) => {
          this.firs = response.data.firs;
          this.fir_pdf_download_url = response.data.fir_pdf_download_url;
          this.isLoaded = true;
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    getCourts() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/courts";
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
    getStatuses() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/get_statutes";
      axios
        .get(url, { headers })
        .then((response) => {
          this.statutes = response.data.statutes;
          console.log(this.statutes);
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
    deleteFir(event, fir_id, fir_index) {
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
            .delete(this.base_url + "/api/fir/" + fir_id, {
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
                  this.firs.splice(fir_index, 1); //removing record from list/index after deleting record from DB
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
