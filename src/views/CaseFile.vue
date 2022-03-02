<template>
  <div class="case_file">
    <main id="main">
      <page-header title="Case Files" />
      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg">
        <div class="container" data-aos="fade-up">
          <div class="row gy-4">
            <div class="col-12">
              <form class="row gy-2 gx-3 align-items-center">
                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <input
                    type="date"
                    v-model="filters.institution_date"
                    id="date"
                    class="form-control form-control-sm"
                    placeholder="Date of Institution"
                  />
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <input
                    type="text"
                    id="Case"
                    v-model="filters.case_no"
                    class="form-control form-control-sm"
                    placeholder="Case #"
                    aria-describedby="Case"
                  />
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
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
                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <input
                    placeholder="Client Name"
                    v-model="filters.petitioner_id"
                    type="text"
                    id="ClientName"
                    class="form-control form-control-sm"
                    aria-describedby="ClientName"
                  />
                </div>

                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="reset()"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <router-link
                class="btn btn-success btn-sm mb-2"
                :to="'/petitions/create'"
                >New Case</router-link
              >
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div class="row">
                <div
                  v-for="petition in petitions"
                  :key="petition.id"
                  class="col-lg-3 col-md-3 col-sm-6 col-xs-6  "
                >
                  <div class="card listing-cards bg-default d-flex align-items-stretch">
                    <img
                      class="card-img-top"
                      src="holder.js/100px180/"
                      alt=""
                    />
                    <div class="card-body">
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
                          title="View"
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
                      <h6 class="card-title">{{ petition.case_no }}</h6>
                      <!-- <p class="card-text">{{
                            petition.title && petition.title.length > 15
                              ? petition.title.substring(0, 47) + "..."
                              : petition.title
                          }}</p> -->

                      <p class="card-text">
                        {{
                          petition && petition.court ? petition.court.title : ""
                        }}
                      </p>

                      <p class="card-text">{{ petition.petitioner_names }}</p>

                      <p class="card-text">{{ petition.institution_date }}</p>
                    </div>
                  </div>
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
          console.log(this.petitions);
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