<template>
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main" class="margintop85">
      <page-header
        :title="page_title"
        :hideBreadCrumbs="true"
        :showInvoices="false"
        :route_object="route_obj"
        :header_button="header_button"
        :header_button_text="header_button_text"
      />
      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg mt-3">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <Transition name="fade">
                <form
                  v-if="showSearchForm"
                  class="row gy-2 gx-3 align-items-center mb-2"
                >
                  <div class="col-lg-3 col-md-3 col-sm-6">
                    <input
                      type="text"
                      id="title"
                      v-model="filters.title"
                      class="form-control"
                      placeholder="Title"
                      aria-describedby="Title"
                    />
                  </div>

                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <Dropdown
                      class="p-inputtext-sm"
                      v-model="filters.court_id"
                      :options="courts"
                      optionLabel="title"
                      optionValue="id"
                      placeholder="Select a Court"
                      :filter="true"
                      appendTo="self"
                      filterPlaceholder="Find by Title"
                    />

                    <!-- <select
                      class="form-select form-select-sm"
                      aria-describedby="Court"
                      v-model="filters.court_id"
                    >
                      <option value="">--Court--</option>
                      <option
                        class="text-capitalize"
                        v-for="court in courts"
                        :key="court.id"
                        :value="court.id"
                      >
                        {{ court.title }}
                      </option>
                    </select> -->
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
            <div class="table-responsive">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <table class="table table-hover" v-if="isLoaded">
                  <thead>
                    <th>Title</th>
                    <th>Court</th>
                    <th width="10%">Actions</th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(petition_type, row_index) in petition_types"
                      :key="petition_type.id"
                    >
                      <td>
                        <input
                          v-show="petition_type.editMode"
                          class="form-control"
                          v-model="petition_type.title"
                          v-on:keyup.enter="editPetitionType(petition_type)"
                        />
                        <span v-show="!petition_type.editMode">{{
                          petition_type.title
                        }}</span>
                      </td>

                      <td>
                        <span
                          class="text-capitalize"
                          v-for="(
                            petition_type_court, court_index
                          ) in petition_type.petition_type_courts"
                          :key="petition_type_court.id"
                        >
                          <span v-if="court_index != 0">,</span>
                          {{ petition_type_court.court.title }}
                        </span>
                      </td>

                      <td width="15%">
                        <router-link
                          class="btn btn-sm btn-success action-btn"
                          :to="{
                            name: 'petition-types-edit',
                            params: { petition_type_id: petition_type.id },
                          }"
                          href="javascript:void"
                          style="margin-left: 2px"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit"
                        >
                          Edit
                        </router-link>

                        <a
                          v-show="petition_type.editMode"
                          class="btn btn-sm btn-warning action-btn"
                          @click="editPetitionType(petition_type)"
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
                          v-show="petition_type.editMode"
                          @click="petition_type.editMode = false"
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
                          v-show="!petition_type.editMode"
                          @click="
                            deletePetitionType(petition_type.id, row_index)
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
                  </tbody>
                </table>
                <div
                  v-if="petition_types.length == 0 && isLoaded"
                  class="col-md-12"
                >
                  <p class="alert alert-warning">No Records found.</p>
                </div>
                <div v-if="!isLoaded" class="col-md-12">
                  <p class="alert alert-warning">Loading....</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End Services Section -->
    </main>
    <!-- End #main -->
  </BlockUI>
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
      new_petition_type: {},
      petition_types: [],
      saving: false,
      route_obj: {
        name: "petition-types-create",
      },
      header_button: true,
      header_button_text: "New Case Category",
      isLoaded: false,
      filters: {
        court_id: "",
      },
      showSearchForm: true,
      courts: [],
    };
  },
  validations() {
    return {
      new_petition_type: {
        title: { required },
      },
    };
  },
  created() {
    this.getPetitionTypes();
    this.getCourts();
  },
  methods: {
    getPetitionTypes() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/petition_types", {
          headers,
          params: this.filters,
        })
        .then((response) => {
          this.petition_types = response.data.petition_types;
          this.page_title = response.data.page_title;
          console.log(response.data.page_title);
          this.isLoaded = true;
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
    getCourts() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/courts", {
          headers,
        })
        .then((response) => {
          this.courts = response.data.courts;
          console.log(response.data.courts);
          this.isLoaded = true;
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

    submitPetitionType() {
      this.v$.$validate();
      if (!this.v$.$error) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;
        axios
          .post(this.base_url + "/api/petition_types", this.new_petition_type, {
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
                this.new_petition_type = {};
                setTimeout(() => {
                  this.v$.$reset();
                }, 0);
                this.getPetitionTypes();
              }
            },
            (error) => {
              this.saving = false;
              console.log(error.response.data);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.message,
              });
            }
          );
      }
    },
    editPetitionType(standardIndexToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/petition_types", standardIndexToUpdate, {
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
              console.log(error.response.data);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.message,
              });
            }
          );
      }
    },
    deletePetitionType(caseId, row_index) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .delete(this.base_url + "/api/petition_types/" + caseId, {
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
                this.petition_types.splice(row_index, 1); //removing record from list/index after deleting record from DB
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
      }
    },
    reset() {
      this.isLoaded = false;
      this.filters = {
        court_id: "",
      };
      this.isLoaded = true;
    },
  },
  mounted() {
    console.log("Case Types List Component Mounted");
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.getPetitionTypes();
            this.awaitingSearch = false;
          }, 1500); // 1 sec delay
        }
        this.awaitingSearch = true;
      },
    },
  },
};
</script>

<style></style>
