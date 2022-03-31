<template>
  <main id="main" class="margintop85">  
      <page-header :title="page_title" :hideBreadCrumbs="true" />       
    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg mt-3">
      <div class="container" data-aos="fade-up">
        <div class="row">                
          <div class="table-responsive">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <table class="table table-striped">
                <thead>
                  <th>Case Title</th>
                  <th>Situation</th>
                  <th>Keyword</th>                   
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
                        v-model="general_case_law.situation"
                        v-on:keyup.enter="editGeneralLawIndex(general_case_law)"
                      />
                      <span v-show="!general_case_law.editMode">{{
                        general_case_law.situation
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
                    <td width="15%">
                      <a
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
                      </a>
                      <a
                        v-show="general_case_law.editMode"
                        class="btn btn-sm btn-warning action-btn"
                        @click="editGeneralLawIndex(general_case_law)"
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
                      </a>

                      <a
                        class="btn btn-sm btn-danger action-btn"
                        v-show="!general_case_law.editMode"
                        @click="
                          deleteGeneralLawIndex(general_case_law.id, row_index)
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
                  <tr>
                    <td>
                      <input
                        class="form-control"
                        v-model="new_standard_index.case_title"
                        v-on:keyup.enter="submitGeneralCaseLaw()"
                      />
                    </td>
                    
                    <td>
                      <input
                        class="form-control"
                        v-model="new_standard_index.situation"
                        v-on:keyup.enter="submitGeneralCaseLaw()"
                      />
                    </td>
                    <td>
                      <input
                        class="form-control"
                        v-model="new_standard_index.keywords"
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

export default {
  components: {
     PageHeader
  },
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      page_title: "...",
      petition: {},       
      new_standard_index: {},
      general_case_laws: [],       
      saving: false,    
    };
  },
  created() {
    this.getCaseDetails();
    this.getModuleIndex();
  },
  methods: {
    getCaseDetails() {
      var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
      axios
        .get(this.base_url + "/api/petitions/" + this.petition_id, {headers})
        .then((response) => {
          this.petition = response.data.petition;

          console.log(this.petition);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getModuleIndex() {
       var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
      axios
        .get(
          this.base_url + "/api/general_case_laws",
          {headers}
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
      if (true) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;        
        axios
          .post(
            this.base_url + "/api/general_case_laws",
            this.new_standard_index,
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
                this.new_standard_index = {};
                this.getModuleIndex();
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
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                standardIndexToUpdate.editMode = false;
              }
            },
            (error) => {
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
                //this.getCaseDetails()
                this.general_case_laws.splice(row_index, 1); //removing record from list/index after deleting record from DB
              }
            },
            (error) => {
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
