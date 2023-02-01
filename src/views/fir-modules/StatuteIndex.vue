<template>
  <ConfirmPopup />
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
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
                    <th>Display Order</th>
                    <th width="10%">Actions</th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(statute, row_index) in statutes"
                      :key="statute.id"
                    >
                      <td>
                        <input
                          v-show="statute.editMode"
                          class="form-control"
                          v-model="statute.title"
                          v-on:keyup.enter="editStatute(statute)"
                        />
                        <span v-show="!statute.editMode">{{
                          statute.title
                        }}</span>
                      </td>
                      <td>
                        <input
                          v-show="statute.editMode"
                          class="form-control"
                          v-model="statute.display_order"
                          v-on:keyup.enter="editStatute(statute)"
                        />
                        <span v-show="!statute.editMode">{{
                          statute.display_order
                        }}</span>
                      </td>

                      <td width="15%">
                        <a
                          class="btn btn-sm btn-primary action-btn"
                          v-show="!statute.editMode"
                          @click="statute.editMode = true"
                          href="javascript:void"
                          style="margin-left: 2px"
                          v-tooltip.top="'Edit'"
                        >
                          Edit
                          <!-- <i class="fa fa-edit"></i> -->
                        </a>
                        <a
                          v-show="statute.editMode"
                          class="btn btn-sm btn-warning action-btn"
                          @click="editStatute(statute)"
                          href="javascript:void"
                          style="margin-left: 2px"
                          v-tooltip.top="'Update'"
                        >
                          Update
                          <!-- <i class="fa fa-save"></i> -->
                        </a>

                        <a
                          v-show="statute.editMode"
                          @click="statute.editMode = false"
                          class="btn btn-sm btn-info action-btn"
                          href="javascript:void"
                          style="margin-left: 2px"
                          v-tooltip.top="'Cancel'"
                        >
                          Cancel
                          <!-- <i class="fa fa-remove"></i> -->
                        </a>

                        <a
                          class="btn btn-sm btn-danger action-btn"
                          v-show="!statute.editMode"
                          @click="deleteStatute($event, statute.id, row_index)"
                          href="javascript:void"
                          style="margin-left: 2px"
                          v-tooltip.top="'Delete'"
                        >
                          Delete
                          <!-- <i class="fa fa-trash-o"></i> -->
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          placeholder="Title"
                          class="form-control"
                          v-model="new_statute.title"
                          v-on:keyup.enter="submitStatute()"
                          v-bind:class="{
                            'error-boarder': v$.new_statute.title.$error,
                          }"
                          @blur="v$.new_statute.title.$touch"
                        />
                        <span
                          v-if="v$.new_statute.title.$error"
                          class="errorMessage"
                          >Title field is required.</span
                        >
                      </td>
                      <td>
                        <input
                          placeholder="Display order"
                          class="form-control"
                          v-model="new_statute.display_order"
                          v-on:keyup.enter="submitStatute()"
                        />
                      </td>
                      <td>
                        <button
                          :disabled="saving"
                          @click="submitStatute()"
                          class="btn btn-sm btn-success action-btn"
                          v-tooltip.top="'Save'"
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
  </BlockUI>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import { mapState } from "vuex";

export default {
  computed: mapState(["user"]),
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
      filters: {},
      base_url: process.env.VUE_APP_SERVICE_URL,
      page_title: "Statutes",
      isLoaded: false,
      statutes: [],
      saving: false,
      new_statute: {},
    };
  },

  validations() {
    return {
      new_statute: {
        title: { required },
      },
    };
  },

  created() {
    this.getStatutes();
  },
  methods: {
    getStatutes() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/statutes";
      axios
        .get(url, { headers })
        .then((response) => {
          this.isLoaded = true;
          this.statutes = response.data.statutes;
          console.log("Statutes: ", this.statutes);
        })
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    submitStatute() {
      this.v$.$validate();
      if (!this.v$.$error) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;
        axios
          .post(this.base_url + "/api/statutes", this.new_statute, {
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
                this.statutes.push(this.new_statute);
                this.saving = false;
                this.new_statute = {};
                setTimeout(() => {
                  this.v$.$reset();
                }, 0);
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
    editStatute(statuteToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/statutes", statuteToUpdate, {
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
                statuteToUpdate.editMode = false;
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
    deleteStatute(event, statuteId, row_index) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Do you want to Delete?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Delete",
        acceptClass: "p-button-danger",
        rejectClass: "p-button-primary",
        rejectLabel: "Cancel",
        accept: () => {
          var headers = {
            Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
          };

          axios
            .delete(this.base_url + "/api/statutes/" + statuteId, {
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
                  this.statutes.splice(row_index, 1); //removing record from list/index after deleting record from DB
                }
              },
              (error) => {
                console.log(error.response.data);
                this.$notify({
                  type: "error",
                  title: "Something went wrong!",
                  text: error.response.data.message,
                });
              }
            );
        },
        reject: () => {
          this.$confirm.close();
        },
      });
    },
    reset() {
      this.filters = {};
    },
  },
  mounted() {
    document.getElementById("header");
    document.title = "Statutes";
    console.log("Statutes List Component Mounted");
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.getStatutes();
            this.awaitingSearch = false;
          }, 3500); // 1 sec delay
        }
        this.awaitingSearch = true;
      },
    },
  },
};
</script>

<style></style>
