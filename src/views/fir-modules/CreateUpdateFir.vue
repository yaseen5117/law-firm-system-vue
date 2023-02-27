<template>
  <main id="main">
    <page-header :title="page_title" :hideCaseFiles="true" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <form @submit.prevent="submitForm($event)">
          <div class="form-group row">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for=""> Statute <span class="text-danger">*</span></label>
              <Dropdown
                v-model="sectionData.statute_id"
                :options="statutes"
                optionLabel="title"
                optionValue="id"
                placeholder="Select a Statute"
                :filter="true"
                appendTo="self"
                filterPlaceholder="Find by Title"
                @blur="v$.sectionData.statute_id.$touch"
                v-bind:class="{
                  'error-boarder': v$.sectionData.statute_id.$error,
                }"
              />
              <span v-if="v$.sectionData.statute_id.$error" class="errorMessage"
                >Statute field is required</span
              >
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Title <span class="text-danger">*</span></label>
              <input
                v-model="sectionData.title"
                type="text"
                class="form-control"
                id=""
                @blur="v$.sectionData.title.$touch"
                v-bind:class="{
                  'error-boarder': v$.sectionData.title.$error,
                }"
              />
              <span
                id="title"
                v-if="v$.sectionData.title.$error"
                class="errorMessage"
                >Title field is required</span
              >
            </div>
          </div>

          <div class="form-group row">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Section <span class="text-danger">*</span></label>
              <input
                v-model="sectionData.fir_no"
                type="text"
                class="form-control"
                @blur="v$.sectionData.fir_no.$touch"
                v-bind:class="{
                  'error-boarder': v$.sectionData.fir_no.$error,
                }"
              />
              <span
                id="fir_no"
                v-if="v$.sectionData.fir_no.$error"
                class="errorMessage"
                >Section field is required</span
              >
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Defination</label>
              <textarea
                rows="2"
                v-model="sectionData.defination"
                type="text"
                class="form-control"
                id=""
              />
              <!-- @blur="v$.sectionData.defination.$touch"
                v-bind:class="{
                  'error-boarder': v$.sectionData.defination.$error,
                }"
              />
              <span
                id="defination"
                v-if="v$.sectionData.defination.$error"
                class="errorMessage"
                >{{ v$.sectionData.defination.maxLength.$message }}</span
              > -->
            </div>
          </div>

          <div class="form-group row">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Link</label>
              <textarea
                rows="2"
                v-model="sectionData.link"
                type="text"
                class="form-control"
                id=""
              />
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Arrest Info </label>
              <textarea
                rows="2"
                v-model="sectionData.arrest_info"
                type="text"
                class="form-control"
                id=""
              />
              <!-- @blur="v$.sectionData.arrest_info.$touch"
                v-bind:class="{
                  'error-boarder': v$.sectionData.arrest_info.$error,
                }"
              />
              <span
                id="arrest_info"
                v-if="v$.sectionData.arrest_info.$error"
                class="errorMessage"
                >{{ v$.sectionData.arrest_info.maxLength.$message }}</span
              > -->
            </div>
          </div>
          <div class="form-group row">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Warrent Info </label>
              <textarea
                rows="2"
                v-model="sectionData.warrent_info"
                type="text"
                class="form-control"
                id=""
              />
              <!-- @blur="v$.sectionData.warrent_info.$touch"
                v-bind:class="{
                  'error-boarder': v$.sectionData.warrent_info.$error,
                }"
              />
              <span
                id="warrent_info"
                v-if="v$.sectionData.warrent_info.$error"
                class="errorMessage"
                >{{ v$.sectionData.warrent_info.maxLength.$message }}</span
              > -->
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Bailable Info </label>
              <textarea
                rows="2"
                v-model="sectionData.bailable_info"
                type="text"
                class="form-control"
                id=""
              />
              <!-- @blur="v$.sectionData.bailable_info.$touch"
                v-bind:class="{
                  'error-boarder': v$.sectionData.bailable_info.$error,
                }"
              />
              <span
                id="bailable_info"
                v-if="v$.sectionData.bailable_info.$error"
                class="errorMessage"
                >{{ v$.sectionData.bailable_info.maxLength.$message }}</span
              > -->
            </div>
          </div>
          <div class="form-group row">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Compoundable Info </label>
              <textarea
                rows="2"
                v-model="sectionData.compoundable_info"
                type="text"
                class="form-control"
                id=""
              />
              <!-- @blur="v$.sectionData.compoundable_info.$touch"
                v-bind:class="{
                  'error-boarder': v$.sectionData.compoundable_info.$error,
                }"
              />
              <span
                id="compoundable_info"
                v-if="v$.sectionData.compoundable_info.$error"
                class="errorMessage"
                >{{ v$.sectionData.compoundable_info.maxLength.$message }}</span
              > -->
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Punishment Info </label>
              <textarea
                rows="2"
                v-model="sectionData.punishment_info"
                type="text"
                class="form-control"
                id=""
              />
              <!-- @blur="v$.sectionData.punishment_info.$touch"
                v-bind:class="{
                  'error-boarder': v$.sectionData.punishment_info.$error,
                }"
              />
              <span
                id="punishment_info"
                v-if="v$.sectionData.punishment_info.$error"
                class="errorMessage"
                >{{ v$.sectionData.punishment_info.maxLength.$message }}</span
              > -->
            </div>
          </div>
          <div class="form-group row">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Court Triable</label>
              <textarea
                rows="2"
                v-model="sectionData.court_triable"
                type="text"
                class="form-control"
                id=""
              />
              <!-- @blur="v$.sectionData.court_triable.$touch"
                v-bind:class="{
                  'error-boarder': v$.sectionData.court_triable.$error,
                }"
              />
              <span
                id="court_triable"
                v-if="v$.sectionData.court_triable.$error"
                class="errorMessage"
                >{{ v$.sectionData.court_triable.maxLength.$message }}</span
              > -->
            </div>
          </div>
          <div
            v-for="validation_error in validation_errors"
            :key="validation_error.id"
          >
            {{ validation_error }}
          </div>

          <div class="form-group row">
            <div class="col-sm-2">
              <button :disabled="saving" class="btn btn-success btn-sm">
                {{ button_title }}
              </button>

              <router-link
                class="btn btn-sm btn-secondary"
                :to="{
                  name: 'fir-sections',
                }"
                href="javascript:void"
                style="margin-left: 2px"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Edit"
              >
                <i class="fa fa-arrow-left"></i>
                Back
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </section>
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers, maxLength } from "@vuelidate/validators";
import Multiselect from "@vueform/multiselect";
import { formatDate } from "@fullcalendar/common";
import $ from "jquery";

export default {
  components: {
    PageHeader,
    Multiselect,
    $,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      saving: false,
      page_title: this.$route.params.fir_section_id
        ? "Edit FIR Section"
        : "Add New FIR Section",
      button_title: this.$route.params.fir_section_id ? "Update" : "Save",
      base_url: process.env.VUE_APP_SERVICE_URL,
      sectionData: {},
      courts: [],
      statutes: [],
      validation_errors: [],
    };
  },
  validations() {
    return {
      sectionData: {
        title: {
          // maxLength: helpers.withMessage(
          //   "Title is required & must not be greater than 190 characters.",
          //   maxLength(190)
          // ),
          required,
        },
        statute_id: { required },
        fir_no: { required },

        // arrest_info: {
        //   maxLength: helpers.withMessage(
        //     "The arrest info must not be greater than 190 characters.",
        //     maxLength(190)
        //   ),
        // },
        // warrent_info: {
        //   maxLength: helpers.withMessage(
        //     "The warrent info must not be greater than 190 characters.",
        //     maxLength(190)
        //   ),
        // },
        // bailable_info: {
        //   maxLength: helpers.withMessage(
        //     "The bailable info must not be greater than 190 characters.",
        //     maxLength(190)
        //   ),
        // },
        // compoundable_info: {
        //   maxLength: helpers.withMessage(
        //     "The compoundable info must not be greater than 190 characters.",
        //     maxLength(190)
        //   ),
        // },
        // punishment_info: {
        //   maxLength: helpers.withMessage(
        //     "The punishment info must not be greater than 190 characters.",
        //     maxLength(190)
        //   ),
        // },
        // defination: {
        //   maxLength: helpers.withMessage(
        //     "The Defination must not be greater than 190 characters.",
        //     maxLength(190)
        //   ),
        // },
      },
    };
  },
  created() {
    this.getStatuses();
    this.getFir();
  },
  mounted() {
    document.title = this.page_title;
  },
  activated() {},
  methods: {
    getStatuses() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/statutes";
      axios
        .get(url, { headers })
        .then((response) => {
          this.statutes = response.data.statutes;
          console.log(this.statutes);
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

    getFir() {
      if (this.$route.params.fir_section_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        let url =
          this.base_url +
          "/api/fir_sections/" +
          this.$route.params.fir_section_id;
        axios
          .get(url, { headers })
          .then((response) => {
            this.sectionData = response.data.firSectionData;
          })
          .catch((error) => {
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.message,
            });
          });
      }
    },
    submitForm: function (event) {
      this.v$.$validate();

      if (!this.v$.$error) {
        event.preventDefault();

        this.saving = true;
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/fir_sections", this.sectionData, {
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
                this.$router.push({ path: "/fir-sections" });
              }

              console.log(response);
              this.saving = false;
            },
            (error) => {
              this.saving = false;
              this.validation_errors = [];
              if (error.response.status === 422) {
                //showing backend validation errors
                if (error.response.data.validation_error.title) {
                  $("#title").append(
                    error.response.data.validation_error.title[0]
                  );
                }
                if (error.response.data.validation_error.arrest_info) {
                  $("#arrest_info").append(
                    error.response.data.validation_error.arrest_info[0]
                  );
                }
                if (error.response.data.validation_error.warrent_info) {
                  $("#warrent_info").append(
                    error.response.data.validation_error.warrent_info[0]
                  );
                }
                if (error.response.data.validation_error.bailable_info) {
                  $("#bailable_info").append(
                    error.response.data.validation_error.bailable_info[0]
                  );
                }
                if (error.response.data.validation_error.compoundable_info) {
                  $("#compoundable_info").append(
                    error.response.data.validation_error.compoundable_info[0]
                  );
                }
                if (error.response.data.validation_error.punishment_info) {
                  $("#punishment_info").append(
                    error.response.data.validation_error.punishment_info[0]
                  );
                }
                console.log(
                  "Validation errors: ",
                  error.response.data.validation_error
                );
                this.$notify({
                  type: "error",
                  title: "Long Text!",
                  text: error.response.data.message,
                });
              } else {
                this.saving = false;
                console.log(error.response.data);
                this.$notify({
                  type: "error",
                  title: "Something went wrong!",
                  text: error.response.data.message,
                });
              }
            }
          );
      }
    },
  },
};
</script>

<style></style>
