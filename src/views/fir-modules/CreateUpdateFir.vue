<template>
  <main id="main">
    <page-header :title="page_title" :hideCaseFiles="true" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <form @submit.prevent="submitForm($event)">
          <div class="form-group row">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for=""> Court </label>
              <Dropdown
                v-model="firData.court_id"
                :options="courts"
                optionLabel="title"
                optionValue="id"
                placeholder="Select a Court"
                :filter="true"
                appendTo="self"
                filterPlaceholder="Find by Title"
              />
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Statute </label>
              <Dropdown
                v-model="firData.statute_id"
                :options="statutes"
                optionLabel="title"
                optionValue="id"
                placeholder="Select a Statute"
                :filter="true"
                appendTo="self"
                filterPlaceholder="Find by Title"
              />
            </div>
          </div>

          <div class="form-group row">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for=""> Section<span style="color: red">*</span> </label>
              <input
                v-model="firData.section"
                type="text"
                class="form-control"
                id=""
                @blur="v$.firData.section.$touch"
                v-bind:class="{
                  'error-boarder': v$.firData.section.$error,
                }"
              />
              <span
                id="section"
                v-if="v$.firData.section.$error"
                class="errorMessage"
                >{{
                  v$.firData.section.required.$message +
                  " & " +
                  v$.firData.section.maxLength.$message
                }}</span
              >
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Arrest Info </label>
              <input
                v-model="firData.arrest_info"
                type="text"
                class="form-control"
                id=""
                @blur="v$.firData.arrest_info.$touch"
                v-bind:class="{
                  'error-boarder': v$.firData.arrest_info.$error,
                }"
              />
              <span
                id="arrest_info"
                v-if="v$.firData.arrest_info.$error"
                class="errorMessage"
                >{{ v$.firData.arrest_info.maxLength.$message }}</span
              >
            </div>
          </div>
          <div class="form-group row">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Warrent Info </label>
              <input
                v-model="firData.warrent_info"
                type="text"
                class="form-control"
                id=""
                @blur="v$.firData.warrent_info.$touch"
                v-bind:class="{
                  'error-boarder': v$.firData.warrent_info.$error,
                }"
              />
              <span
                id="warrent_info"
                v-if="v$.firData.warrent_info.$error"
                class="errorMessage"
                >{{ v$.firData.warrent_info.maxLength.$message }}</span
              >
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Bailable Info </label>
              <input
                v-model="firData.bailable_info"
                type="text"
                class="form-control"
                id=""
                @blur="v$.firData.bailable_info.$touch"
                v-bind:class="{
                  'error-boarder': v$.firData.bailable_info.$error,
                }"
              />
              <span
                id="bailable_info"
                v-if="v$.firData.bailable_info.$error"
                class="errorMessage"
                >{{ v$.firData.bailable_info.maxLength.$message }}</span
              >
            </div>
          </div>
          <div class="form-group row">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Compoundable Info </label>
              <input
                v-model="firData.compoundable_info"
                type="text"
                class="form-control"
                id=""
                @blur="v$.firData.compoundable_info.$touch"
                v-bind:class="{
                  'error-boarder': v$.firData.compoundable_info.$error,
                }"
              />
              <span
                id="compoundable_info"
                v-if="v$.firData.compoundable_info.$error"
                class="errorMessage"
                >{{ v$.firData.compoundable_info.maxLength.$message }}</span
              >
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <label for="">Punishment Info </label>
              <input
                v-model="firData.punishment_info"
                type="text"
                class="form-control"
                id=""
                @blur="v$.firData.punishment_info.$touch"
                v-bind:class="{
                  'error-boarder': v$.firData.punishment_info.$error,
                }"
              />
              <span
                id="punishment_info"
                v-if="v$.firData.punishment_info.$error"
                class="errorMessage"
                >{{ v$.firData.punishment_info.maxLength.$message }}</span
              >
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
      page_title: this.$route.params.fir_id ? "Edit Fir" : "Add New Fir",
      button_title: this.$route.params.fir_id ? "Update" : "Save",
      base_url: process.env.VUE_APP_SERVICE_URL,
      firData: {},
      courts: [],
      statutes: [],
      validation_errors: [],
    };
  },
  validations() {
    return {
      firData: {
        section: {
          required,
          maxLength: helpers.withMessage(
            "must not be greater than 190 characters.",
            maxLength(190)
          ),
        },
        arrest_info: {
          maxLength: helpers.withMessage(
            "The arrest info must not be greater than 190 characters.",
            maxLength(190)
          ),
        },
        warrent_info: {
          maxLength: helpers.withMessage(
            "The warrent info must not be greater than 190 characters.",
            maxLength(190)
          ),
        },
        bailable_info: {
          maxLength: helpers.withMessage(
            "The bailable info must not be greater than 190 characters.",
            maxLength(190)
          ),
        },
        compoundable_info: {
          maxLength: helpers.withMessage(
            "The compoundable info must not be greater than 190 characters.",
            maxLength(190)
          ),
        },
        punishment_info: {
          maxLength: helpers.withMessage(
            "The punishment info must not be greater than 190 characters.",
            maxLength(190)
          ),
        },
      },
    };
  },
  created() {
    this.getCourts();
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
      let url = this.base_url + "/api/get_statutes";
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
    async getCourts() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/courts";
      await axios
        .get(url, { headers })
        .then((response) => {
          this.courts = response.data.courts;
          console.log(this.courts);
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
      if (this.$route.params.fir_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        let url = this.base_url + "/api/fir/" + this.$route.params.fir_id;
        axios
          .get(url, { headers })
          .then((response) => {
            this.firData = response.data.firData;
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
          .post(this.base_url + "/api/fir", this.firData, {
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
                this.$router.push({ path: "/fir" });
              }

              console.log(response);
              this.saving = false;
            },
            (error) => {
              this.validation_errors = [];
              if (error.response.status === 422) {
                //showing backend validation errors
                if (error.response.data.validation_error.section) {
                  $("#section").append(
                    error.response.data.validation_error.section[0]
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
                  "Validation error: ",
                  error.response.data.validation_error.arrest_info[0]
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
