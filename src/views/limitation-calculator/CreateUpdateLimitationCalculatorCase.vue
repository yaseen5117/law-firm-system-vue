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
                  <label for=""> Title<span style="color: red">*</span> </label>
                  <input
                    autofocus
                    v-model="limitationCalculatorCase.title"
                    type="text"
                    class="form-control"
                    id=""
                    @blur="v$.limitationCalculatorCase.title.$touch"
                    v-bind:class="{
                      'error-boarder': v$.limitationCalculatorCase.title.$error,
                    }"
                  />
                  <span
                    v-if="v$.limitationCalculatorCase.title.$error"
                    class="errorMessage"
                    >Title field is required.</span
                  >
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
      saving: false,
      page_title: this.$route.params.id
        ? "Edit Limitation Calculator Case"
        : "Add Limitation Calculator Case",
      button_title: this.$route.params.id ? "Update" : "Save",
      base_url: process.env.VUE_APP_SERVICE_URL,
      limitationCalculatorCase: {},
    };
  },
  validations() {
    return {
      limitationCalculatorCase: {
        title: { required },
      },
    };
  },
  created() {
    //this.getLink();
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
            this.limitationCalculatorCase = response.data.link;
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
          .post(this.base_url + "/api/links", this.limitationCalculatorCase, {
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
