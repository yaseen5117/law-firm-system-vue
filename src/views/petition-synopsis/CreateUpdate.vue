<template>
  <main id="main">
    <page-header :title="page_title" :synopsis="null" :petition="petition" />
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
                      v-model="synopsis.title"
                      v-bind:class="{
                        'error-boarder': v$.synopsis.title.$error,
                      }"
                      @blur="v$.synopsis.title.$touch"
                    />
                    <span v-if="v$.synopsis.title.$error" class="errorMessage"
                      >Title field is required.</span
                    >
                  </div>

                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label
                      >Synopsis Date<span style="color: red">*</span></label
                    >

                    <InputMask
                      mask="99/99/9999"
                      class="form-control"
                      type="text"
                      placeholder="dd/mm/yyyy"
                      v-model="synopsis.synopsis_date"
                      v-bind:class="{
                        'error-boarder': v$.synopsis.synopsis_date.$error,
                      }"
                      @blur="v$.synopsis.synopsis_date.$touch"
                    />
                    <span
                      v-if="v$.synopsis.synopsis_date.$error"
                      class="errorMessage"
                      >Date field is required.</span
                    >
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Type</label>
                    <select
                      class="form-control"
                      v-model="synopsis.synopsis_type_id"
                    >
                      <option value="">--Select--</option>
                      <option
                        v-for="synopsis_type in this.synopsis_types"
                        :key="synopsis_type.id"
                        :value="synopsis_type.id"
                      >
                        {{ synopsis_type.title }}
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
                      v-model="synopsis.description"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <button
                  :disabled="saving"
                  class="btn btn-success btn-sm mt-2"
                  style="margin-right: 3px"
                >
                  Save
                </button>
                <router-link
                  :disabled="saving"
                  class="btn btn-secondary btn-sm mt-2"
                  :to="{
                    name: 'petition-synopsis-index',
                    params: {
                      petition_id: this.$route.params.petition_id,
                      synopsis_id: this.$route.params.editable_synopsis_id,
                    },
                  }"
                >
                  Back
                </router-link>
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
      page_title: this.$route.params.editable_synopsis_id
        ? "Edit Synopsis"
        : "Add New Synopsis",
      base_url: process.env.VUE_APP_SERVICE_URL,
      synopsis: {
        petition_id: this.$route.params.petition_id,
        synopsis_type_id: "",
        id: this.$route.params.editable_synopsis_id, //this is the id from the browser
        title: "",
        description: "",
      },
      petition: {},
      petition_types: [],
      synopsis_types: [],
      saving: false,
    };
  },
  validations() {
    return {
      synopsis: {
        synopsis_date: { required },
        title: { required },
      },
    };
  },
  created() {
    this.getPetitionTypes();
    this.getPetition();
    this.getEditableSynopsis();
    this.getSynopsisTypes();
  },
  activated() {},
  methods: {
    getEditableSynopsis: function () {
      if (this.$route.params.editable_synopsis_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .get(
            this.base_url +
              "/api/petition_synopsis/" +
              this.$route.params.editable_synopsis_id,

            {
              headers,
            }
          )
          .then(
            (response) => {
              if (response.status === 200) {
                console.log("editable synopsis object: ", response.data.record);
                this.synopsis = response.data.record;
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
          .post(this.base_url + "/api/petition_synopsis", this.synopsis, {
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
                    "/petition-synopsis-index/" +
                    this.synopsis.petition_id +
                    "/" +
                    response.data.petitionSynopsis.id,
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
    getSynopsisTypes() {
      let url = this.base_url + "/api/get_synopsis_types";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let module = {
        module_id: 4,
      };

      axios
        .get(url, { headers, params: module })
        .then((response) => {
          this.synopsis_types = response.data.synopsisTypes;
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
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/petition_types";
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
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      if (this.$route.params.petition_id) {
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

<style></style>
