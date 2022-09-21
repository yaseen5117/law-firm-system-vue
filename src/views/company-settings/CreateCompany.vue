<template>
  <main id="main">
    <page-header :title="page_title" :hideCaseFiles="true" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-12">
            <form
              @submit.prevent="submitForm($event)"
              enctype="multipart/form-data"
            >
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Company Name<span style="color: red">*</span></label>
                    <input
                      autofocus
                      class="form-control"
                      v-model="company.name"
                      v-bind:class="{
                        'error-boarder': v$.company.name.$error,
                      }"
                      @blur="v$.company.name.$touch"
                    />
                    <span v-if="v$.company.name.$error" class="errorMessage"
                      >Name field is required.</span
                    >
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-6">
                    <button :disabled="saving" class="btn btn-success btn-sm">
                      {{ button_title }}
                    </button>
                    <router-link
                      style="margin-left: 2px"
                      class="btn btn-secondary btn-sm"
                      :to="{
                        name: 'companies',
                      }"
                    >
                      Back
                    </router-link>
                  </div>
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
      company: {},

      saving: false,
      page_title: this.$route.params.company_id
        ? "Edit Company"
        : "Add New Company",
      button_title: this.$route.params.company_id ? "Update" : "Save",
      base_url: process.env.VUE_APP_SERVICE_URL,
    };
  },
  validations() {
    return {
      company: {
        name: { required },
      },
    };
  },
  created() {
    this.getCompany();
  },
  updated() {},
  mounted() {
    document.title = this.page_title;
  },
  activated() {},
  methods: {
    submitForm: function (event) {
      this.v$.$validate();
      if (!this.v$.$error) {
        event.preventDefault();

        this.saving = true;
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/companies", this.company, {
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
                this.$router.push({ path: "/companies" });
              }
              console.log(response);
              this.saving = false;
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
    getCompany() {
      if (this.$route.params.company_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        var url =
          this.base_url + "/api/companies/" + this.$route.params.company_id;
        axios
          .get(url, { headers })
          .then((response) => {
            this.company = response.data.company;
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
section {
  padding: 100px 0;
  overflow: visible !important;
}
</style>
