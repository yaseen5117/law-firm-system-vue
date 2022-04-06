<template>
  <main id="main" class="margintop85">  
      <page-header :title="page_title" :hideBreadCrumbs="true" />       
    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg mt-3">
      <div class="container" data-aos="fade-up">
        <div class="row">   
          <!-- search filters -->
            <div class="col-md-12 col-12">
               
              <Transition name="fade">
              <form v-if="showSearchForm"  class="row mb-2">                               
                 <div class="col-lg-2 col-md-2 col-sm-12">
                  <label for="">Case Title</label>
                  <input
                    type="text"
                    id="year"
                    v-model="filters.case_title"
                    class="form-control form-control-sm" 
                  />
                </div>                   
                <div class="col-lg-2 col-md-2 col-sm-12">
                  <label for="">Keywords</label>
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
                    class="btn btn-danger btn-sm mt-lg-4 mt-md-4 mt-sm-2"
                    @click="reset()"
                  >
                    Reset
                  </button>
                </div>
              </form>
              </Transition>
            </div>
            <!-- search filters -->
            <div class="col-lg-12 col-md-12 col-sm-12 mb-3">
              
                <button class="btn btn-secondary btn-sm " v-if="showSearchForm" @click="showSearchForm=!showSearchForm" >Hide Filters</button>
                <button class="btn btn-warning btn-sm" v-else-if="!showSearchForm" @click="showSearchForm=!showSearchForm;">Show Filters</button>
              
          
            </div>             
          <div class="table-responsive">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <table class="table table-striped">
                <thead>
                  <th>Case Title</th>
                  <th>Citation</th>
                  <th>Keywords</th>                   
                   <th>Legal Provisions</th>     
                  <th width="10%">Actions</th>                   
                </thead>
                <tbody>
                  <tr
                    @dblclick="general_case_law.editMode = false"
                    v-for="(general_case_law, row_index) in general_case_laws"
                    :key="general_case_law.id"
                  >
                    <td>
                      <input
                        v-show="general_case_law.editMode"
                        class="form-control"
                        v-model="general_case_law.case_title"
                        v-on:keyup.enter="editGeneralLawIndex(general_case_law)"
                      />
                      <router-link to="#">
                        {{ general_case_law.case_title }}
                      </router-link>
                      <!-- <router-link
                        v-show="!general_case_law.editMode"
                        :to="{
                          name: 'standard-index-details',
                          params: { 
                              module_id: general_case_law.id,                               
                            },
                        }"
                        >
                        {{ general_case_law.case_title }}
                      </router-link> -->
                    </td>
                   
                    <td>
                      <input
                        v-show="general_case_law.editMode"
                        class="form-control"
                        v-model="general_case_law.citation"
                        v-on:keyup.enter="editGeneralLawIndex(general_case_law)"
                      />
                      <span v-show="!general_case_law.editMode">{{
                        general_case_law.citation
                      }}</span>
                    </td>
                    <td>
                      <input
                        v-show="general_case_law.editMode"
                        class="form-control"
                        v-model="general_case_law.keywords"
                        v-on:keyup.enter="editGeneralLawIndex(general_case_law)"
                      />
                      <span v-show="!general_case_law.editMode">{{
                        general_case_law.keywords
                      }}</span>
                    </td>
                    <td>
                      <input
                        v-show="general_case_law.editMode"
                        class="form-control"
                        v-model="general_case_law.legal_provisions"
                        v-on:keyup.enter="editGeneralLawIndex(general_case_law)"
                      />
                      <span v-show="!general_case_law.editMode">{{
                        general_case_law.legal_provisions
                      }}</span>
                    </td>

                    <td width="15%">
                      <button
                        class="btn btn-sm btn-primary action-btn"
                        v-show="!general_case_law.editMode"
                        @click="general_case_law.editMode = true"
                        href="javascript:void"
                        style="margin-left: 2px"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Edit"
                      >
                        Edit
                        <!-- <i class="fa fa-edit"></i> -->
                      </button>
                      <button
                        v-show="general_case_law.editMode"
                        class="btn btn-sm btn-warning action-btn"
                        @click="editGeneralLawIndex(general_case_law)"
                        :disabled="saving"
                        style="margin-left: 2px"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Update"
                      >
                        Update
                        <!-- <i class="fa fa-save"></i> -->
                      </button>

                      <button
                        v-show="general_case_law.editMode"
                        @click="general_case_law.editMode = false"
                        class="btn btn-sm btn-info action-btn"
                        href="javascript:void"
                        style="margin-left: 2px"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Cancel"
                      >
                        Cancel
                        <!-- <i class="fa fa-remove"></i> -->
                      </button>

                      <button
                        class="btn btn-sm btn-danger action-btn"
                        v-show="!general_case_law.editMode"
                        @click="
                          deleteGeneralLawIndex(general_case_law.id, row_index)
                        "
                        :disabled="saving"
                        style="margin-left: 2px"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Delete"
                      >
                        Delete
                        <!-- <i class="fa fa-trash-o"></i> -->
                      </button>                       
                    </td>                                                    
                    
                  </tr>
                  <tr>
                    <td>
                      <input
                        class="form-control"
                        v-model="new_general_case_law.case_title"
                        v-on:keyup.enter="submitGeneralCaseLaw()"
                        v-bind:class="{
                          'error-boarder': v$.new_general_case_law.case_title.$error,
                        }"
                        @blur="v$.new_general_case_law.case_title.$touch"
                      />
                      <span
                        v-if="v$.new_general_case_law.case_title.$error"
                        class="errorMessage"
                        >Case Title field is required.</span
                      >
                    </td>
                    
                    <td>
                      <input
                        class="form-control"
                        v-model="new_general_case_law.citation"
                        v-on:keyup.enter="submitGeneralCaseLaw()"
                        v-bind:class="{
                          'error-boarder': v$.new_general_case_law.citation.$error,
                        }"
                        @blur="v$.new_general_case_law.citation.$touch"
                      />
                      <span
                        v-if="v$.new_general_case_law.citation.$error"
                        class="errorMessage"
                        >Citation field is required.</span
                      >
                    </td>
                    <td>
                      <input
                        class="form-control"
                        v-model="new_general_case_law.keywords"
                        v-on:keyup.enter="submitGeneralCaseLaw()"
                      />
                    </td>
                    <td>
                      <input
                        class="form-control"
                        v-model="new_general_case_law.legal_provisions"
                        v-on:keyup.enter="submitGeneralCaseLaw()"                        
                      />                      
                    </td>
                    <td>
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
import PageHeader from "../shared/PageHeader";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: {
     PageHeader
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      page_title: "...",
      petition: {},       
      new_general_case_law: {},
      general_case_laws: [],       
      saving: false,   
      showSearchForm: true,    
      filters: {}, 
    };
  },
  validations() {
    return {     
      new_general_case_law: {
        case_title: { required },
        citation: { required },
      }     
    };
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        setTimeout(() => {
          this.getGeneralCaseLaws();
        }, 300); // 1 sec delay
      },
    },
  },
  created() { 
    this.getGeneralCaseLaws();
  },
  methods: {    
    reset() {
      this.filters = {};
      this.getGeneralCaseLaws();
    },
    getGeneralCaseLaws() {
       var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
      axios
        .get(
          this.base_url + "/api/general_case_laws",
          {
            headers,
            params: this.filters,
          }
        )
        .then((response) => {
          this.general_case_laws = response.data.general_case_Laws;
          this.page_title = response.data.page_title;
          console.log(response.data.page_title);
          console.log(response.data.general_case_Laws);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submitGeneralCaseLaw() {
      this.v$.$validate();
      if (!this.v$.$error) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
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
                setTimeout(() => { this.v$.$reset() }, 0)
                this.getGeneralCaseLaws();
              }
            },
            (error) => {
              this.saving = false;
              console.log(error.response.data.error);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.error,
              });
            }
          );
      }
    },
    editGeneralLawIndex(standardIndexToUpdate) {
      if (true) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
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
              console.log(error.response.data.error);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.error,
              });
            }
          );
      }
    },
    deleteGeneralLawIndex(caseId, row_index) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
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
              console.log(error.response.data.error);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.error,
              });
            }
          );
      }
    },
  },
  mounted() {
    console.log("Case Details Component Mounted");
  },
};
</script>

<style>
</style>
