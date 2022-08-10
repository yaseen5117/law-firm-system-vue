<template>
  <main id="main" class="margintop85">
    <page-header :title="page_title" :hideBreadCrumbs="true" />
    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg mt-3">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="table-responsive">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <table class="table table-hover">
                <thead>
                  <th>Title</th>
                  <th width="10%">Actions</th>
                </thead>
                <tbody>
                  <tr v-for="(court, row_index) in courts" :key="court.id">
                    <td>
                      <input
                        v-show="court.editMode"
                        class="form-control"
                        v-model="court.title"
                        v-on:keyup.enter="editGeneralLawIndex(court)"
                      />
                      <span v-show="!court.editMode">{{ court.title }}</span>
                    </td>

                    <td width="15%">
                      <a
                        class="btn btn-sm btn-primary action-btn"
                        v-show="!court.editMode"
                        @click="court.editMode = true"
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
                        v-show="court.editMode"
                        class="btn btn-sm btn-warning action-btn"
                        @click="editGeneralLawIndex(court)"
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
                        v-show="court.editMode"
                        @click="court.editMode = false"
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
                        v-show="!court.editMode"
                        @click="deleteGeneralLawIndex(court.id, row_index)"
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
                        v-model="new_court.title"
                        v-on:keyup.enter="submitGeneralCaseLaw()"
                        v-bind:class="{
                          'error-boarder': v$.new_court.title.$error,
                        }"
                        @blur="v$.new_court.title.$touch"
                      />
                      <span
                        v-if="v$.new_court.title.$error"
                        class="errorMessage"
                        >Title field is required.</span
                      >
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
    PageHeader,
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
      new_court: {},
      courts: [],
      saving: false,
    };
  },
  validations() {
    return {
      new_court: {
        title: { required },
      },
    };
  },
  created() {
    this.getModuleIndex();
  },
  methods: {
    getModuleIndex() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/courts", { headers })
        .then((response) => {
          this.courts = response.data.courts;
          this.page_title = response.data.page_title;
          console.log(response.data.page_title);
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
          console.log(error);
        });
    },

    submitGeneralCaseLaw() {
      this.v$.$validate();
      if (!this.v$.$error) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;
        axios
          .post(this.base_url + "/api/courts", this.new_court, {
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
                this.saving = false;
                this.new_court = {};
                setTimeout(() => {
                  this.v$.$reset();
                }, 0);
                this.getModuleIndex();
              }
            },
            (error) => {
              this.saving = false;
              console.log(error.response.data.error);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.message,
              });
            }
          );
      }
    },
    editGeneralLawIndex(standardIndexToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/courts", standardIndexToUpdate, {
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
                standardIndexToUpdate.editMode = false;
              }
            },
            (error) => {
              console.log(error.response.data.error);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.message,
              });
            }
          );
      }
    },
    deleteGeneralLawIndex(caseId, row_index) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .delete(this.base_url + "/api/courts/" + caseId, {
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
                this.courts.splice(row_index, 1); //removing record from list/index after deleting record from DB
              }
            },
            (error) => {
              console.log(error.response.data.error);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.message,
              });
            }
          );
      }
    },
  },
  mounted() {
    document.getElementById("header");
    document.title = "Courts";

    console.log("Court List Component Mounted");
  },
};
</script>

<style></style>
