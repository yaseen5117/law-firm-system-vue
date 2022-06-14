<template>
  <main id="main">
    <page-header :title="page_title" :talbana="null" :petition="petition" />
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
                      v-model="talbana.title"
                      v-bind:class="{
                        'error-boarder': v$.talbana.title.$error,
                      }"
                      @blur="v$.talbana.title.$touch"
                    />
                    <span v-if="v$.talbana.title.$error" class="errorMessage"
                      >Title field is required.</span
                    >
                  </div>

                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Talbana Date<span style="color: red">*</span></label>
                    <InputMask
                      mask="99/99/9999"
                      class="form-control"
                      type="text"
                      placeholder="dd/mm/yyyy"
                      v-model="talbana.talbana_date"
                      v-bind:class="{
                        'error-boarder': v$.talbana.talbana_date.$error,
                      }"
                      @blur="v$.talbana.talbana_date.$touch"
                    />
                    <span
                      v-if="v$.talbana.talbana_date.$error"
                      class="errorMessage"
                      >Date field is required.</span
                    >
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Type</label>
                    <select
                      class="form-control"
                      v-model="talbana.talbana_type_id"
                    >
                      <option value="">--Select--</option>
                      <option
                        v-for="talbana_type in this.talbana_types"
                        :key="talbana_type.id"
                        :value="talbana_type.id"
                      >
                        {{ talbana_type.title }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label>Description </label>
                    <input class="form-control" v-model="talbana.description" />
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
      page_title: this.$route.params.editable_talbana_id
        ? "Edit Talbana"
        : "Add New Talbana",
      base_url: process.env.VUE_APP_SERVICE_URL,
      talbana: {
        petition_id: this.$route.params.petition_id,
        talbana_type_id: "",
        id: this.$route.params.editable_talbana_id, //this is the id from the browser
        title: "",
        description: "",
      },
      petition: {},
      petition_types: [],
      talbana_types: [],
      saving: false,
    };
  },
  validations() {
    return {
      talbana: {
        talbana_date: { required },
        title: { required },
      },
    };
  },
  created() {
    this.getPetitionTypes();
    this.getPetition();
    this.getEditableTalbana();
    this.getTalbanaTypes();
  },
  activated() {},
  methods: {
    getEditableTalbana: function () {
      if (this.$route.params.editable_talbana_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .get(
            this.base_url +
              "/api/petition_talbana/" +
              this.$route.params.editable_talbana_id,

            {
              headers,
            }
          )
          .then(
            (response) => {
              if (response.status === 200) {
                console.log("editable talbana object: ", response.data.record);
                this.talbana = response.data.record;
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
    submitForm: function (event) {
      this.v$.$validate();
      if (!this.v$.$error) {
        event.preventDefault();

        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;
        axios
          .post(this.base_url + "/api/petition_talbana", this.talbana, {
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
                    "/petition-talbana-index/" +
                    this.talbana.petition_id +
                    "/" +
                    response.data.petitionTalbana.id,
                });
              }
              console.log(response);
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
    getTalbanaTypes() {
      let url = this.base_url + "/api/get_talbana_types";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let module = {
        'module_id': 3
      };
      
      axios
        .get(url, { headers, params: module })
        .then((response) => {
          this.talbana_types = response.data.talbanaTypes;  
        })
        .catch((error) => {
          console.log(error);
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
          });
      }
    },
  },
};
</script>

<style>
</style>