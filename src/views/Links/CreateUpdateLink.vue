<template>
  <main id="main">
    <page-header :title="page_title" :hideCaseFiles="true" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <form @submit.prevent="submitForm($event)">
              <div class="form-group row">
                <div class="col-sm-12">
                  <label for="">
                    Title<span style="color: red">*</span>
                    <input
                      v-model="linkData.title"
                      type="text"
                      class="form-control"
                      id=""
                      @blur="v$.linkData.title.$touch"
                      v-bind:class="{
                        'error-boarder': v$.linkData.title.$error,
                      }"
                    />
                    <span v-if="v$.linkData.title.$error" class="errorMessage"
                      >Title field is required.</span
                    >
                  </label>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12">
                  <label for="">
                    URL<span style="color: red">*</span>
                    <span style="font-size: 12px; color: red"
                      >(Note: Sample URL:
                      https://en.wikipedia.org/wiki/Main_Page)</span
                    >
                    <input
                      v-model="linkData.url"
                      type="text"
                      class="form-control"
                      id=""
                      @blur="v$.linkData.url.$touch"
                      v-bind:class="{
                        'error-boarder': v$.linkData.url.$error,
                      }"
                    />
                    <span v-if="v$.linkData.url.$error" class="errorMessage"
                      >URL field is required.</span
                    >
                  </label>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12">
                  <label for="">
                    Description
                    <textarea
                      v-model="linkData.description"
                      type="text"
                      class="form-control"
                      rows="4"
                    />
                  </label>
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
import { required, email, helpers } from "@vuelidate/validators";
import Multiselect from "@vueform/multiselect";
import { formatDate } from "@fullcalendar/common";

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
      page_title: this.$route.params.link_id ? "Edit Link" : "Add New Link",
      button_title: this.$route.params.link_id ? "Update" : "Save",
      base_url: process.env.VUE_APP_SERVICE_URL,
      linkData: {},
    };
  },
  validations() {
    return {
      linkData: {
        title: { required },
        url: { required },
      },
    };
  },
  created() {
    this.getLink();
  },
  mounted() {
    document.getElementById("header");
    document.title = this.page_title;
  },
  activated() {},
  methods: {
    getLink() {
      if (this.$route.params.link_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        let url = this.base_url + "/api/links/" + this.$route.params.link_id;
        axios
          .get(url, { headers })
          .then((response) => {
            this.linkData = response.data.link;
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
          .post(this.base_url + "/api/links", this.linkData, {
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
                this.$router.push({ path: "/links" });
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
