<template>
  <main id="main">
    <page-header :title="page_title" :hideCaseFiles="true" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-12">
            <form @submit.prevent="submitForm($event)">
              <div class="form-group row">
                <div class="col-sm-12">
                  <label for="">
                    Site Name
                    <input
                      v-model="setting.site_name"
                      type="text"
                      class="form-control"
                      id=""                     
                    />
                  </label>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12">
                  <label for="">
                    Site Email 
                    <input
                      v-model="setting.site_email"
                      type="text"
                      class="form-control"
                      id=""
                     />
                  </label>
                </div>
              </div>          
               <div class="form-group row">
                <div class="col-sm-12">
                  <label for="">
                    Site Phone 
                    <input
                      v-model="setting.site_phone"
                      type="text"
                      class="form-control"
                      id=""
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
      page_title: "General Settings",
      button_title: "Save",
      base_url: process.env.VUE_APP_SERVICE_URL,
      setting: {},
    };
  },
 
  created() {
    this.getGeneralSettings();
  },
 
  methods: {
    getGeneralSettings() {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        let url = this.base_url + "/api/settings";
        axios
          .get(url, { headers })
          .then((response) => {
            this.setting = response.data.setting;
          })
          .catch((error) => {
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.error,
            });
          });
      }
    },
    submitForm: function (event) {
       
      if (true) {
        event.preventDefault();

        this.saving = true;
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/settings", this.setting, {
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
                this.$router.push({ path: "/settings" });
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
                text: error.response.data.error,
              });
            }
          );
      }
    },
  },
};
</script>

<style>
</style>