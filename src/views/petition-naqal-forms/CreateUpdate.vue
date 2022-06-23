<template>
  <main id="main">
    <page-header :title="page_title" :naqal_form="null" :petition="petition" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="submitForm($event)">
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Title<span style="color: red">*</span></label>
                    <input
                      class="form-control"
                      v-model="naqal_form.title"
                      v-bind:class="{
                        'error-boarder': v$.naqal_form.title.$error,
                      }"
                      @blur="v$.naqal_form.title.$touch"
                    />
                    <span v-if="v$.naqal_form.title.$error" class="errorMessage"
                      >Title field is required.</span
                    >
                  </div>

                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label
                      >Naqal Form Date<span style="color: red">*</span></label
                    >

                    <InputMask
                      mask="99/99/9999"
                      class="form-control"
                      type="text"
                      placeholder="dd/mm/yyyy"
                      v-model="naqal_form.naqal_form_date"
                      v-bind:class="{
                        'error-boarder': v$.naqal_form.naqal_form_date.$error,
                      }"
                      @blur="v$.naqal_form.naqal_form_date.$touch"
                    />
                    <span
                      v-if="v$.naqal_form.naqal_form_date.$error"
                      class="errorMessage"
                      >Date field is required.</span
                    >
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Type</label>
                    <select
                      class="form-control"
                      v-model="naqal_form.naqal_form_type_id"
                    >
                      <option value="">--Select--</option>
                      <option
                        v-for="naqal_form_type in this.naqal_form_types"
                        :key="naqal_form_type.id"
                        :value="naqal_form_type.id"
                      >
                        {{ naqal_form_type.title }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label>Description </label>
                    <input
                      class="form-control"
                      v-model="naqal_form.description"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <button :disabled="saving" class="btn btn-success btn-sm mt-2">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
  components: { PageHeader },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      page_title: this.$route.params.editable_naqal_form_id
        ? "Edit Naqal Form"
        : "Add New Naqal Form",
      base_url: process.env.VUE_APP_SERVICE_URL,
      naqal_form: {
        petition_id: this.$route.params.petition_id,
        naqal_form_type_id: "",
        id: this.$route.params.editable_naqal_form_id, //this is the id from the browser
        title: "",
        description: "",
      },
      petition: {},
      petition_types: [],
      naqal_form_types: [],
      saving: false,
    };
  },
  validations() {
    return {
      naqal_form: {
        naqal_form_date: { required },
        title: { required },
      },
    };
  },
  created() {
    this.getPetitionTypes();
    this.getPetition();
    this.getEditableNaqalForm();
    this.getNaqalFormTypes();
  },
  activated() {},
  methods: {
    getEditableNaqalForm: function () {
      if (this.$route.params.editable_naqal_form_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .get(
            this.base_url +
              "/api/petition_naqal_forms/" +
              this.$route.params.editable_naqal_form_id,

            {
              headers,
            }
          )
          .then(
            (response) => {
              if (response.status === 200) {
                console.log(
                  "editable naqal from object: ",
                  response.data.record
                );
                this.naqal_form = response.data.record;
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
    submitForm: function (event) {
      this.v$.$validate();
      if (!this.v$.$error) {
        event.preventDefault();
        this.saving = true;
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/petition_naqal_forms", this.naqal_form, {
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
                this.$router.push({
                  path:
                    "/petition-naqal-forms-index/" +
                    this.naqal_form.petition_id +
                    "/" +
                    response.data.PetitionNaqalForm.id,
                });
              }
              console.log(response);
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
    getNaqalFormTypes() {
      let url = this.base_url + "/api/get_naqal_form_types";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let module = {
        module_id: 2,
      };

      axios
        .get(url, { headers, params: module })
        .then((response) => {
          this.naqal_form_types = response.data.naqalFormTypes;
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
    async getPetitionTypes() {
      let url = this.base_url + "/api/petition_types";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      await axios
        .get(url, { headers })
        .then((response) => {
          this.petition_types = response.data.petition_types;
          console.log(this.petition_types);
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
    getPetition() {
      if (this.$route.params.petition_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        var url =
          this.base_url + "/api/petitions/" + this.$route.params.petition_id;
        axios
          .get(url, { headers })
          .then((response) => {
            this.petition = response.data.petition;
            this.opponents = [{}];
          })
          .catch((error) => {
            console.log(error);
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.message,
            });
          });
      }
    },
  },
};
</script>

<style>
</style>