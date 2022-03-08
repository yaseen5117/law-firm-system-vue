<template>
  <div class="case_file">
    <main id="main">
      <page-header title="Case Files" />
      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg">
        <div class="container" data-aos="fade-up">
          <div class="row gy-4">
            <div class="col-12">
               
              <Transition name="fade">
              <form v-if="showSearchForm"  class="row gy-2 gx-3 align-items-center">
                <div class="col-lg-2 col-md-2 col-sm-12">
                  <datepicker                     
                    :enableTimePicker="false"
                    autoApply   
                    format="dd/MM/yyyy"   
                    id="date"            
                    type="date" 
                    placeholder="Date of Institution"                              
                    v-model="filters.institution_date"
                    class="form-control-sm"
                    >
                     </datepicker>
                  <!-- <input
                    type="date"
                    v-model="filters.institution_date"
                    id="date"
                    class="form-control form-control-sm"
                    placeholder="Date of Institution"
                  />  -->
                </div>
                <div class="col-lg-2 col-md-2 col-sm-12">
                  <input
                    type="text"
                    id="Case"
                    v-model="filters.case_no"
                    class="form-control form-control-sm"
                    placeholder="Case #"
                    aria-describedby="Case"
                  />
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12">
                  <select
                    class="form-control form-control-sm"
                    v-model="filters.court_id"
                  >
                    <option value="">--Court--</option>

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
                  <input
                    placeholder="Client Name"
                    v-model="filters.petitioner_id"
                    type="text"
                    id="ClientName"
                    class="form-control form-control-sm"
                    aria-describedby="ClientName"
                  />
                </div>

                <div class="col-lg-1 col-md-1 col-sm-12">
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="reset()"
                  >
                    Reset
                  </button>
                </div>
              </form>
              </Transition>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12">
              <router-link
                style="margin-right:2px"
                class="btn btn-success btn-sm"
                :to="'/petitions/create'"
                >New Case</router-link
              >
              
              
                <button class="btn btn-secondary btn-sm " v-if="showSearchForm" @click="showSearchForm=!showSearchForm" >Hide Filters</button>
                <button class="btn btn-warning btn-sm" v-else-if="!showSearchForm" @click="showSearchForm=!showSearchForm">Show Filters</button>
              
              <button           
                style="float: right"      
                class="btn btn-success btn-sm"      
                @click="ShowCalendar=!ShowCalendar"           
                >Calendar</button
              >
            
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="row">
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
                    @click="goToDetails(petition.id)"
                  >
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-5 col-5 col-sm-5">
                          <h6 class="card-title">{{ petition.case_no }}</h6>
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
                          <div class="mt-auto">
                            <div class="pull-right">
                              <router-link
                                style="margin-right: 2px"
                                :to="{
                                  name: 'case-detail',
                                  params: { id: petition.id },
                                }"
                                class="btn btn-success btn-sm"
                                role="button"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="View"
                                ><i class="fa fa-eye"></i
                              ></router-link>
                              <router-link
                                style="margin-right: 2px"
                                :to="{
                                  name: 'edit-petition',
                                  params: { id: petition.id },
                                }"
                                class="btn btn-primary btn-sm"
                                role="button"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                                ><i class="fa fa-edit"></i
                              ></router-link>
                              <router-link
                                style="margin-right: 2px"
                                to="#"
                                class="btn btn-warning btn-sm"
                                role="button"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Alert"
                                ><i class="fa fa-bell"></i
                              ></router-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="petitions.length == 0" class="col-md-12">
                  <p class="alert alert-warning">No Records found.</p>
                </div>
              </div>

              <div class="table-responsive">
                <!-- <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Case #</th>
                      <th>Case Title</th>
                      <th>Court</th>
                      <th>Client Name</th>
                      <th>Date of Institution</th>
                      <th width="10%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ petition.id }}</td>
                      <td></td>
                      <td>
                        
                      </td>
                      <td>
                        {{
                          petition && petition.court ? petition.court.title : ""
                        }}
                      </td>
                      <td></td>
                      <td>{{ petition.institution_date }}</td>
                      <td width="15%">
                        
                      </td>
                    </tr>
                    <tr class="text-center" v-if="petitions.length == 0">
                      <td colspan="7">No Record found.</td>
                    </tr>
                  </tbody>
                </table> -->
              </div>
            </div>               
            <pre>{{events}}</pre>
            <div class="col-12">              
              <FullCalendar v-if="ShowCalendar" :options="calendarOptions" />
            </div>         
          </div>
        </div>
      </section>
      <!-- End Services Section -->
    </main>
    <!-- End #main -->
  </div>
</template>

<script>
import axios from "axios";
import PageHeader from "../views/shared/PageHeader";
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    PageHeader,
    FullCalendar,
  },
  name: "CaseFile",
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      petitions: Array,
      filters: {
        court_id: "",
      },
      courts: [],
      showSearchForm: false,     
      calendarOptions: {
        
        plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',      
        //Dynamic Event Source
         events: [],
      },
      ShowCalendar: false,
    };
  },
  created() {
    this.getCourts();
    this.getCaseFiles();
  },
  methods: {
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
          this.petitions = response.data.petitions;
          this.calendarOptions.events = response.data.events;          
          console.log(this.petitions);
          console.log(this.calendarOptions.events);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reset() {
      this.filters = {};
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
        setTimeout(() => {
          this.getCaseFiles();
        }, 300); // 1 sec delay
      },
    },
  },
};
</script>

<style>
</style>