<template>
  <main id="main">
    <page-header :title="page_title" :hideCaseFiles="true" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <form @submit.prevent="submitForm($event)">
              <div class="form-group row">
                <div class="col-lg-4 col-md-4 col-sm-12">
                  <label for=""> Title<span style="color: red">*</span></label>
                  <input
                    autofocus
                    v-model="petitionTypeData.title"
                    type="text"
                    class="form-control"
                    id=""
                    @blur="v$.petitionTypeData.title.$touch"
                    v-bind:class="{
                      'error-boarder': v$.petitionTypeData.title.$error,
                    }"
                  />
                  <span
                    v-if="v$.petitionTypeData.title.$error"
                    class="errorMessage"
                    >Title field is required.</span
                  >
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-4 col-md-4 col-sm-12">
                  <label for="">Abbreviation</label>
                  <input
                    autofocus
                    v-model="petitionTypeData.abbreviation"
                    type="text"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-4 col-md-4 col-sm-12">
                  <label>Court</label>
                  <Multiselect
                    placeholder="--Select--"
                    class="text-capitalize"
                    mode="tags"
                    :close-on-select="false"
                    :searchable="true"
                    v-model="petitionTypeData.court_ids"
                    :options="courts"
                    :value="petitionTypeData.court_ids"
                  />
                </div>
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
import { required } from "@vuelidate/validators";
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    PageHeader,
    Multiselect,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      saving: false,
      page_title: this.$route.params.petition_type_id
        ? "Edit Case Category"
        : "Add New Case Category",
      button_title: this.$route.params.petition_type_id ? "Update" : "Save",
      base_url: process.env.VUE_APP_SERVICE_URL,
      petitionTypeData: {
        court_ids: [],
      },
      courts: [],
    };
  },
  validations() {
    return {
      petitionTypeData: {
        title: { required },
      },
    };
  },
  created() {
    this.getPetitionTypesData();
    this.getCourts();
  },
  updated() {
    document.title =
      this.petitionTypeData && this.petitionTypeData.title
        ? this.petitionTypeData.title + " | " + this.page_title
        : this.page_title;
  },
  mounted() {
    document.getElementById("header");
  },
  methods: {
    getCourts() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/get_court_names";
      axios
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
    getPetitionTypesData() {
      if (this.$route.params.petition_type_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        let url =
          this.base_url +
          "/api/petition_types/" +
          this.$route.params.petition_type_id;
        axios
          .get(url, { headers })
          .then((response) => {
            this.petitionTypeData = response.data.petition_type;
            this.petitionTypeData.court_ids =
              response.data.petition_type.court_ids_array;
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
          .post(this.base_url + "/api/petition_types", this.petitionTypeData, {
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
                this.$router.push({ path: "/petition-types" });
              }
              console.log(response);
              this.saving = false;
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
  },
};
</script>

<style></style>
