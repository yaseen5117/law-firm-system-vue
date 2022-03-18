<template>
  <main id="main">
    <page-header :title="page_title" :petition="petition" />
    <nav-components :activeNavPill="module_type" :petition_id="petition.id" />
    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg mt-3">
      <div class="container" data-aos="fade-up">
        <div class="row">          
          <div class="table-responsive">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <table class="table table-striped">
                <thead>
                  <th>Description of Documents</th>
                  <th>Date</th>
                  <th>Annexure</th>
                  <th>Page</th>
                  <th width="10%">Actions</th>
                  <th :class="ShowOnOralArgument ? '' : 'display'">Image Upload</th>
                </thead>
                <tbody>
                  <tr
                    @dblclick="index_data_single.editMode = true"
                    v-for="(index_data_single, row_index) in index_data"
                    :key="index_data_single.id"
                  >
                    <td>
                      <input
                        v-show="index_data_single.editMode"
                        class="form-control"
                        v-model="index_data_single.document_description"
                        v-on:keyup.enter="editStandardIndex(index_data_single)"
                      />
                      
                      <router-link
                        v-show="!index_data_single.editMode"
                        :to="{
                          name: 'standard-index-details',
                          params: { 
                              module_id: index_data_single.id,
                              module_type: module_type 
                            },
                        }"
                        >{{ index_data_single.document_description }}
                      </router-link>
                    </td>
                    <td>
                      <datepicker
                        :enableTimePicker="false"
                        autoApply
                        format="dd/MM/yyyy"
                        placeholder="dd/mm/yyyy"
                        v-model="index_data_single.date"
                        v-on:keyup.enter="editStandardIndex(index_data_single)"
                        v-show="index_data_single.editMode"
                      ></datepicker>
                      <span v-show="!index_data_single.editMode">{{
                        index_data_single.date
                      }}</span>
                    </td>
                    <td>
                      <input
                        v-show="index_data_single.editMode"
                        class="form-control"
                        v-model="index_data_single.annexure"
                        v-on:keyup.enter="editStandardIndex(index_data_single)"
                      />
                      <span v-show="!index_data_single.editMode">{{
                        index_data_single.annexure
                      }}</span>
                    </td>
                    <td>
                      <input
                        v-show="index_data_single.editMode"
                        class="form-control"
                        v-model="index_data_single.page_info"
                        v-on:keyup.enter="editStandardIndex(index_data_single)"
                      />
                      <span v-show="!index_data_single.editMode">{{
                        index_data_single.page_info
                      }}</span>
                    </td>
                    <td width="15%">
                      <a
                        class="btn btn-sm btn-primary action-btn"
                        v-show="!index_data_single.editMode"
                        @click="index_data_single.editMode = true"
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
                        v-show="index_data_single.editMode"
                        class="btn btn-sm btn-warning action-btn"
                        @click="editStandardIndex(index_data_single)"
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
                        v-show="index_data_single.editMode"
                        @click="index_data_single.editMode = false"
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
                        v-show="!index_data_single.editMode"
                        @click="
                          deleteStandardIndex(index_data_single.id, row_index)
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
                    <td :class="ShowOnOralArgument ? '' : 'display'">
                       <file-upload
                          @afterUpload="getModuleIndexDetails"
                          :type="model_type"
                          :attachmentable_id="index_data_single.id"
                          :compactInlineView="compactInlineView"   
                          class="mt-1"                      
                        />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        class="form-control"
                        v-model="new_standard_index.document_description"
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
                        v-model="new_standard_index.date"
                      ></datepicker>
                      <!-- <input
                      class="form-control"
                      type="date"
                      v-model="new_standard_index.date"
                    /> -->
                    </td>
                    <td>
                      <input
                        class="form-control"
                        v-model="new_standard_index.annexure"
                        v-on:keyup.enter="submitPetitionIndex()"
                      />
                    </td>
                    <td>
                      <input
                        class="form-control"
                        v-model="new_standard_index.page_info"
                        v-on:keyup.enter="submitPetitionIndex()"
                      />
                    </td>
                    <td>
                      <a
                        href="javascript:void"
                        @click="submitPetitionIndex()"
                        class="btn btn-sm btn-success action-btn"
                      >
                        Save
                        <!-- <i class="fa fa-save"></i> -->
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
import NavComponents from "../Cases/NavComponents.vue";
import PageHeader from "../shared/PageHeader.vue";
import FileUpload from "../petition-index/FileUpload.vue";

export default {
  components: {
    NavComponents,
    PageHeader,
    FileUpload
  },
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      page_title: "...",
      petition: {},
      module_type: this.$route.params.module_type,
      petition_id: this.$route.params.petition_id,
      new_standard_index: {},
      index_data: [],   
      compactInlineView: "",    
      ShowOnOralArgument: "",
      model_type: "",
    };
  },
  created() {
    this.getCaseDetails();
    this.getModuleIndex();
  },
  methods: {
    getCaseDetails() {
      axios
        .get(this.base_url + "/api/petitions/" + this.petition_id)
        .then((response) => {
          this.petition = response.data.petition;

          console.log(this.petition);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getModuleIndex() {
      axios
        .get(
          this.base_url + "/api/" + this.module_type + "/" + this.petition_id
        )
        .then((response) => {
          this.index_data = response.data.index_data;
          this.page_title = response.data.page_title;
          this.compactInlineView = response.data.compactInlineView;
          this.ShowOnOralArgument = response.data.ShowOnOralArgument;
          this.model_type = response.data.model_type;
          console.log(this.index_data);
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
        this.new_standard_index.petition_id = this.petition_id;
        axios
          .post(
            this.base_url + "/api/" + this.module_type,
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
                this.new_standard_index = {};
                this.getModuleIndex();
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
    editStandardIndex(standardIndexToUpdate) {
      if (true) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        };

        axios
          .post(
            this.base_url + "/api/" + this.module_type,
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
    deleteStandardIndex(moduleId, row_index) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        };

        axios
          .delete(this.base_url + "/api/" + this.module_type + "/" + moduleId, {
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
                this.index_data.splice(row_index, 1); //removing record from list/index after deleting record from DB
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
.red {
  color: red;
}
@media screen and (max-width: 768px) {
  .case_heading .line-hight {
    font-size: 12px !important;
    line-height: normal !important;
  }
}
.display{
  display: none;
}
</style>
