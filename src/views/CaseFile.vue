<template>
<BlockUI :blocked="!isLoaded" :fullScreen="true">
  <div class="case_file">
    <main id="main">
      <page-header title="Case Files" :route_object="route_obj"
        :header_button="header_button"
        :header_button_text="header_button_text"/>
      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <!-- search filters -->
            <div class="col-md-12 col-12">
              <Transition name="fade">
                <form v-if="showSearchForm" class="row mb-2">
                  <div hidden class="col-lg-2 col-md-2 col-sm-12">
                    <label for="">Date</label>
                    <datepicker
                      :enableTimePicker="false"
                      autoApply
                      format="dd/MM/yyyy"
                      id="date"
                      type="date"
                      v-model="filters.institution_date"
                      class=""
                    >
                    </datepicker>
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-6 col-6">
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
                  <div class="col-lg-2 col-md-2 col-sm-12 ">
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
                  <div class="col-lg-2 col-md-2 col-sm-12">
                    <label for="">Client Name</label>
                    <input
                      v-model="filters.petitioner_name"
                      type="text"
                      id="ClientName"
                      class="form-control form-control-sm"
                      aria-describedby="ClientName"
                    />
                  </div>

                  <div class="col-lg-3 col-md-3 col-sm-12 mt-lg-4 mt-md-4 mt">
                    <button
                      type="button"
                      class="btn btn-danger btn-sm  mr-md-2"
                      @click="reset()"
                    >
                      Reset
                    </button>

                    <!-- <router-link
                      v-if="this.user.is_admin"
                      style="margin-left: 2px"
                      class="btn btn-success btn-sm mr-md-2"
                      :to="'/petitions/create'"
                      >New Case</router-link
                    > -->

                    <!-- <button
                      class="btn btn-secondary btn-sm mr-md-2"
                      style="margin-right: 2px"
                      v-if="showSearchForm"
                      @click="showSearchForm = !showSearchForm"
                    >
                      Hide Filters
                    </button> -->
                    <!-- <button
                      class="btn btn-warning btn-sm mr-md-2"
                      style="margin-right: 2px"
                      v-else-if="!showSearchForm"
                      @click="showSearchForm = !showSearchForm"
                    >
                      Show Filters
                    </button> -->
                    
                    <button
                    type="button"
                      class="btn btn-warning btn-sm mr-md-2"
                      style="margin-left: 2px"
                      @click="filters.archived = !filters.archived;"
                      
                    >
                    {{filters.archived?'Active Cases':'Archived'}}
                      
                    </button>
                  </div>
                </form>
              </Transition>
            </div>
            <!-- search filters -->
            <div class="col-lg-12 col-md-12 col-sm-12 mt-2">
              <div v-if="isLoaded" class="row">
                <div
                  class="
                    col-sm-12 col-md-3 col-lg-3 col-12
                    d-flex
                    align-self-stretch
                  "
                  v-for="petition in petitions"
                  :key="petition.id"
                >
                  <div
                    class="card listing-cards shadow-sm mb-4"
                    style="width: 100%"
                    
                  >
                    <div class="card-body" @click="goToDetails(petition.id)">
                      <div class="row">
                        <p class="card-title" style="margin-bottom: 0px;">
                          <strong><span v-tooltip.top="petition.type?''+ petition.type.title:''">{{petition.type_abrivation!=""?""+petition.type_abrivation+"":""}}</span> {{ petition.case_no }}/{{ petition.year }}</strong>  
                        </p>
                        <div class="col-md-5 col-5 col-sm-5">
                          <p class="card-text">
                            {{ petition.institution_date }}
                          </p>
                        </div>

                        <div class="col-md-7 col-7 col-sm-7">
                          <p class="card-text pull-right">
                            {{ petition.petitioner_names }}
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
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="View"
                                >View
                              </router-link>
                              <router-link
                                style="margin-right: 2px"
                                :to="{
                                  name: 'edit-petition',
                                  params: { id: petition.id },
                                }"
                                class="btn btn-primary btn-sm action-btn"
                                role="button"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                                v-on:click.stop
                                >Edit
                              </router-link>
                              <router-link
                                style="margin-right: 2px"
                                to="#"
                                class="btn btn-info btn-sm action-btn"
                                role="button"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Alert"
                                >Alert</router-link
                              >
                              <button
                                @click="toggleArchiveStatus(petition)"
                                style="margin-right: 2px"
                                class="btn btn-warning btn-sm action-btn"
                                title="Archive Case"
                                >{{!petition.archived?"Archive":"Unarchive"}}</button
                              >
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

              <Paginator v-show="isLoaded && petitions_pagination_info.total>0" v-model:first="petitions_pagination_info.from" v-model:rows="petitions_pagination_info.per_page" :totalRecords="petitions_pagination_info.total" @page="onPage($event)"></Paginator>

              <p v-show="isLoaded && petitions_pagination_info.total>0"><small>Showing from {{petitions_pagination_info.from}} to {{petitions_pagination_info.to}} of {{petitions_pagination_info.total}}</small></p>

            </div>
          </div>
        </div>
      </section>
      <!-- End Services Section -->
    </main>
    <!-- End #main -->
  </div>
</BlockUI>
</template>

<script>
import axios from "axios";
import PageHeader from "../views/shared/PageHeader";
import { mapState } from "vuex";

export default {
  components: {
    PageHeader,
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
    };
  },
  created() {
    this.getCourts();
    this.getCaseFiles();
  },
  computed: mapState(["user"]),
  methods: {

    onPage(event) {
      this.isLoaded = false;
      var new_page_no = event.page+1; //adding 1 because event.page returns index of page # clicked.
      

      this.filters.page=new_page_no;

      //event.page: New page number
        //event.first: Index of first record
        //event.rows: Number of rows to display in new page
        //event.pageCount: Total number of pages
    },
    getCourts() {
      let url = this.base_url + "/api/courts";
      axios
        .get(url)
        .then((response) => {
          this.courts = response.data.courts;
          console.log(this.courts);
        })
        .catch((error) => {
          console.log(error);
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
          console.log(error);
        });
    },

    toggleArchiveStatus(petition) {
      let url = this.base_url + "/api/petitions/toggle_archived";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };

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
          this.getCaseFiles();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    reset() {
      this.filters = {
        court_id:""
      };
      this.getCaseFiles();
    },
  },
  mounted() {
    console.log("Case File Component Mounted");
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

<style>
</style>