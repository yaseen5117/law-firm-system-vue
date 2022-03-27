<template>
  <div class="case_file">
    <main id="main">
      <page-header title="Case Files" />
      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <!-- search filters -->
            <div class="col-md-12 col-12">
               
              <Transition name="fade">
              <form v-if="showSearchForm"  class="row mb-2">
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
                  <!-- <input
                    type="date"
                    v-model="filters.institution_date"
                    id="date"
                    class="form-control form-control-sm"
                    placeholder="Date of Institution"
                  />  -->
                </div>
                <div class="col-lg-2 col-md-2 col-sm-12">
                  <label for="">Case #</label>
                  <input
                    type="text"
                    id="Case"
                    v-model="filters.case_no"
                    class="form-control form-control-sm"
                    
                    aria-describedby="Case"
                  />
                </div>
                 <div class="col-lg-2 col-md-2 col-sm-12">
                  <label for="">Year</label>
                  <input
                    type="text"
                    id="year"
                    v-model="filters.year"
                    class="form-control form-control-sm"
                    
                    aria-describedby="year"
                  />
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label for="">Court</label>
                  <select
                    class="form-control form-control-sm"
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
                    class="btn btn-danger btn-sm mt-lg-4 mt-md-4"
                    @click="reset()"
                  >
                    Reset
                  </button>
                </div>
              </form>
              </Transition>
            </div>
            <!-- search filters -->
            <div class="col-lg-12 col-md-12 col-sm-12">
              <router-link
                style="margin-right:2px"
                class="btn btn-success btn-sm"
                :to="'/petitions/create'"
                >New Case</router-link
              >
              
              
                <button class="btn btn-secondary btn-sm " v-if="showSearchForm" @click="showSearchForm=!showSearchForm" >Hide Filters</button>
                <button class="btn btn-warning btn-sm" v-else-if="!showSearchForm" @click="showSearchForm=!showSearchForm;">Show Filters</button>
              
          
            </div>
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
                    @click="goToDetails(petition.id)"
                  >
                    <div class="card-body">
                      <div class="row">
                        <h6 class="card-title">{{ petition.case_no }}-{{petition.year}}</h6>
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
                                class="btn btn-warning btn-sm action-btn"
                                role="button"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Alert"
                                >Alert</router-link>
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
              <div v-if="!isLoaded" class="col-md-12">
                  <p class="alert alert-warning">Loading....</p>
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


export default {
  components: {
    PageHeader,    
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
      showSearchForm: true,    
      isLoaded:false     
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
      this.isLoaded =false;
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
          console.log(this.petitions); 
          this.isLoaded=true;          
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