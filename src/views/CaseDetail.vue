<template>
  <main id="main">
    <page-header title="Petition" />
    <nav-components activeNavPill = 'petition' :petition_id="petition.id"  />
    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="card-body align-center case_heading">
             
                <h6>
                  <u>BEFORE THE {{ petition.court.title }} <router-link style="    margin-right: 2px;" :to="{ name: 'edit-petition', params: {id: petition.id}}" class="" role="button" data-bs-toggle="tooltip" data-bs-placement="top" title="View"><i class="fa fa-edit"></i></router-link></u>
                </h6>
                <p>Writ Petition No. {{ petition.case_no }}</p>
                <p>{{ petition.petitioner_names }}</p>
                <p>VERSUS</p>
                <p>{{ petition.opponent_names }}</p>
                <p class="line-hight">
                  {{ petition.title }}
                </p>
                <p>
                  <u><strong>INDEX</strong></u>
                </p>
             
            </div>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive">
          <div class="col-lg-12 col-md-12 col-sm-12">
            
            <table  class="table table-striped">
              <thead>
                
                <th>Description of Documents</th>
                <th>Date</th>
                <th>Annexure</th>
                <th>Page</th>
                <th  v-if="this.user.is_admin"  width=10%>Actions</th>
              </thead>
              <tbody>
                <tr
                  @dblclick="petition_detail.editMode = false"
                  v-for="(petition_detail , petitionIndex) in petition_details"
                  :key="petition_detail.id"
                >
                   
                  <td>
                    <input
                      v-show="petition_detail.editMode"
                      class="form-control"
                      v-model="petition_detail.document_description"
                      v-on:keyup.enter="editPetitionIndex(petition_detail)"
                    />
                    <router-link
                      v-show="!petition_detail.editMode"
                      :to="{
                        name: 'petition-index-details',
                        params: { id: petition_detail.id },
                      }"
                      >{{ petition_detail.document_description }}
                    </router-link>
                  </td>
                  <td>
                    
                   
                    <!-- <datepicker
                    :enableTimePicker="false"                    
                    autoApply   
                    format="dd/MM/yyyy"  
                    placeholder="dd/mm/yyyy"   
                    v-model="petition_detail.date"
                    v-on:keyup.enter="editPetitionIndex(petition_detail)"
                    v-show="petition_detail.editMode"
                    ></datepicker> -->
                    <input
                      v-show="petition_detail.editMode"
                      class="form-control"
                      type="text"
                      placeholder="yyyy/mm/dd"
                      v-model="petition_detail.date"
                      v-on:keyup.enter="editPetitionIndex(petition_detail)"
                    />
                    <span v-show="!petition_detail.editMode">{{
                      petition_detail.date
                    }}</span>
                  </td>
                  <td>
                    <input
                      v-show="petition_detail.editMode"
                      class="form-control"
                      v-model="petition_detail.annexure"
                      v-on:keyup.enter="editPetitionIndex(petition_detail)"
                    />
                    <span v-show="!petition_detail.editMode">{{
                      petition_detail.annexure
                    }}</span>
                  </td>
                  <td>
                    <input
                      v-show="petition_detail.editMode"
                      class="form-control"
                      v-model="petition_detail.page_info"
                      v-on:keyup.enter="editPetitionIndex(petition_detail)"
                    />
                    <span v-show="!petition_detail.editMode">{{
                      petition_detail.page_info
                    }}</span>
                  </td>
                  <td width="15%"  v-if="this.user.is_admin" >
                    <a
                      class="btn btn-sm btn-primary action-btn"
                      v-show="!petition_detail.editMode"
                      @click="petition_detail.editMode = true; "
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                    >
                      Edit
                      <!-- <i class="fa fa-edit"></i> -->
                    </a>
                    <a
                      v-show="petition_detail.editMode"
                      class="btn btn-sm btn-warning action-btn"
                      @click="editPetitionIndex(petition_detail)"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Update"
                    >
                      Update
                      <!-- <i class="fa fa-save"></i> -->
                    </a>

                    <a
                      v-show="petition_detail.editMode"
                      @click="petition_detail.editMode=false"
                      class="btn btn-sm btn-info action-btn"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Cancel"
                    >
                      Cancel
                      <!-- <i class="fa fa-remove"></i> -->
                    </a>

                    <a
                    class="btn btn-sm btn-danger action-btn"

                      v-show="!petition_detail.editMode"
                      @click="deletePetitionIndex(petition_detail.id,petitionIndex)"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"
                    >
                     Delete
                     <!-- <i class="fa fa-trash-o"></i> -->
                    </a>
                  </td>
                </tr>
                <tr  v-if="this.user.is_admin" >                   
                  <td>
                    <input
                      class="form-control"
                      v-model="new_petition_index.document_description"
                      v-on:keyup.enter="submitPetitionIndex()"
                      v-bind:class="{
                        'error-boarder': v$.new_petition_index.document_description.$error,
                      }"
                      @blur="v$.new_petition_index.document_description.$touch"
                    />
                     <span
                      v-if="v$.new_petition_index.document_description.$error"
                      class="errorMessage"
                      >Description field is required.</span
                    >
                  </td>
                  <td>
                    <!-- <datepicker
                    :enableTimePicker="false"                    
                    autoApply   
                    format="dd/MM/yyyy"  
                    placeholder="dd/mm/yyyy"  
                    type="date" 
                    v-model="new_petition_index.date"
                    ></datepicker> -->
                    <input
                      class="form-control"
                      type="text"
                      placeholder="yyyy/mm/dd"
                      v-model="new_petition_index.date"
                    />
                  </td>
                  <td>
                    <input
                      class="form-control"
                      v-model="new_petition_index.annexure"
                      v-on:keyup.enter="submitPetitionIndex()"
                    />
                  </td>
                  <td>
                    <input
                      class="form-control"
                      v-model="new_petition_index.page_info"
                      v-on:keyup.enter="submitPetitionIndex()"
                    />
                  </td>
                  <td>
                    <button
                      :disabled="saving"                       
                      @click="submitPetitionIndex()"
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
import NavComponents from "./Cases/NavComponents.vue";
import PageHeader from "../views/shared/PageHeader";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { mapState } from "vuex";

export default {
  components: {
    NavComponents,
    PageHeader,
  },
    computed: mapState(["user"]),
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      petition: {},
      petition_details: [],
      id: this.$route.params.id, //this is the id from the browser
      new_petition_index: {
        document_description:"",
      },
      saving: false,
      
    };
  },
  validations() {
    return {      
        new_petition_index: {
          document_description: { required },  
        }       
    };
  },
  created() {
    this.getCaseDetails();
  },
  methods: {
    getCaseDetails() {
      
      var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
      axios
        .get(this.base_url + "/api/petitions/" + this.id , {headers})
        .then((response) => {
          this.petition = response.data.petition;
          this.petition_details = response.data.petition_details;
          console.log(this.petition);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submitPetitionIndex() {
      this.v$.$validate();
      if (!this.v$.$error) {       
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.new_petition_index.petition_id = this.id;
        this.saving = true;
        axios
          .post(
            this.base_url + "/api/petitions_index",
            this.new_petition_index,
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
                this.new_petition_index = {};
                setTimeout(() => { this.v$.$reset() }, 0)
                this.getCaseDetails();
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
    editPetitionIndex(petitionToUpdate) {
      if (true) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/petitions_index", petitionToUpdate, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                petitionToUpdate.editMode = false;
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
    deletePetitionIndex(petitionId,petitionIndex) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),           
        };
       
        axios
          .delete(this.base_url + "/api/petitions_index/"+petitionId, {
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
                this.petition_details.splice(petitionIndex,1);//removing record from list/index after deleting record from DB              
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
