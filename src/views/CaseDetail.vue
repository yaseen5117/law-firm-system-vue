<template>
  <main id="main">
    <page-header title="Petition" />
    <nav-components activeNavPill = 'petition' />
    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="card-body align-center case_heading">
             
                <h6>
                  <u>BEFORE THE {{ petition.court.title }} <router-link style="    margin-right: 2px;" :to="{ name: 'edit-petition', params: {id: petition.id}}" class="" role="button" data-bs-toggle="tooltip" data-bs-placement="top" title="View"><i class="fa fa-edit"></i></router-link></u>
                </h6>
                <p>Writ Petition No. {{ petition.writ_number }}</p>
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
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            
            <table  class="table table-striped">
              <thead>
                <th>Sr. #</th>
                <th>Description of Documents</th>
                <th>Date</th>
                <th>Annexure</th>
                <th>Page</th>
                <th width=10%>Actions</th>
              </thead>
              <tbody>
                <tr
                  @dblclick="petition_detail.editMode = true"
                  v-for="(petition_detail , petitionIndex) in petition_details"
                  :key="petition_detail.id"
                >
                  <td>{{ petitionIndex+1 }}</td>
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
                    <datepicker
                    :enableTimePicker="false"                    
                    autoApply   
                    format="dd/MM/yyyy"  
                    placeholder="dd/mm/yyyy"   
                    v-model="petition_detail.date"
                    v-on:keyup.enter="editPetitionIndex(petition_detail)"
                    v-show="petition_detail.editMode"
                    ></datepicker>
                    <!-- <input
                      v-show="petition_detail.editMode"
                      class="form-control"
                      type="date"
                      v-model="petition_detail.date"
                      v-on:keyup.enter="editPetitionIndex(petition_detail)"
                    /> -->
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
                  <td width="15%">
                    <a
                      class="btn btn-sm btn-primary"
                      v-show="!petition_detail.editMode"
                      @click="petition_detail.editMode = true"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                    >
                      <i class="fa fa-edit"></i>
                    </a>
                    <a
                      v-show="petition_detail.editMode"
                      class="btn btn-sm btn-warning"
                      @click="editPetitionIndex(petition_detail)"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Update"
                    >
                      <i class="fa fa-save"></i>
                    </a>

                    <a
                      v-show="petition_detail.editMode"
                      @click="petition_detail.editMode=false"
                      class="btn btn-sm btn-info"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Cacncel"
                    >
                      <i class="fa fa-remove"></i>
                    </a>

                    <a
                    class="btn btn-sm btn-danger"

                      v-show="!petition_detail.editMode"
                      @click="deletePetitionIndex(petition_detail.id,petitionIndex)"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"
                    >
                     <i class="fa fa-trash-o"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <input
                      class="form-control"
                      v-model="new_petition_index.document_description"
                      v-on:keyup.enter="submitPetitionIndex()"
                    />
                  </td>
                  <td>
                    <datepicker
                    :enableTimePicker="false"                    
                    autoApply   
                    format="dd/MM/yyyy"  
                    placeholder="dd/mm/yyyy"  
                    type="date" 
                    v-model="new_petition_index.date"
                    ></datepicker>
                    <!-- <input
                      class="form-control"
                      type="date"
                      v-model="new_petition_index.date"
                    /> -->
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
                    <a
                      href="javascript:void"
                      @click="submitPetitionIndex()"
                      class="btn btn-sm btn-success"
                    >
                      <i class="fa fa-save"></i>
                    </a>
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
export default {
  components: {
    NavComponents,
    PageHeader,
  },
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      petition: {},
      petition_details: [],
      id: this.$route.params.id, //this is the id from the browser
      new_petition_index: {},
    };
  },
  created() {
    this.getCaseDetails();
  },
  methods: {
    getCaseDetails() {
      axios
        .get(this.base_url + "/api/petitions/" + this.id)
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
      if (true) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        };
        this.new_petition_index.petition_id = this.id;
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
                this.new_petition_index = {};
                this.getCaseDetails();
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
    editPetitionIndex(petitionToUpdate) {
      if (true) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
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
            `Bearer ` + localStorage.getItem("rezo_customers_user"),           
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
.red{
  color:red;
} 
@media screen and (max-width: 768px) {
  .case_heading .line-hight {
    font-size: 12px !important;
    line-height: normal !important;
  }
}
</style>
