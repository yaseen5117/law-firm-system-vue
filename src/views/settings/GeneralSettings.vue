<template>
  <main id="main">
    <page-header :title="page_title" :hideCaseFiles="true" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-sm-2">
            <div
              class="nav flex-column nav-pills me-3 nav-stacked mb-2"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                class="nav-link active"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
                @click="generelSetting()"
              >
                General Settings
              </button>
              <button
                class="nav-link"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-profile"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
                @click="invoiceSetting()"
              >
                Invoice Settings
              </button>
              <button
                class="nav-link"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-messages"
                type="button"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
                @click="exampleSetting()"
                style="display: none"
              >
                Example Settings
              </button>
              <button
                class="nav-link"
                id="v-pills-settings-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-settings"
                type="button"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false"
                @click="otherSetting()"
                style="display: none"
              >
                Other Settings
              </button>
            </div>
          </div>
          <div class="col-sm-10">
            <div class="tab-content" id="v-pills-tabContent">
              <form @submit.prevent="submitForm($event)">
                <div class="row" v-if="general_setting">
                  <div class="col-sm-8">                     
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
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
                        <div class="col-sm-6">
                          <div class="form-group">
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
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
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
                      </div>
                     
                  </div>
                  <div class="col-sm-4">     
                    <label for="">Additional Email</label>                            
                    <div v-for="(additionalEmail) in setting.additionalemails"
                          :key="additionalEmail">            
                     <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="">                                               
                              <input v-model="additionalEmail.additional_email" type="email" class="form-control">                              
                            </label>
                          </div>
                        </div>
                      </div>
                      </div> 
                      <div class="row">
                      <div class="col-sm-12">                         
                        <button
                    type="button"                     
                    @click="addMoreAdditionalEmail()"
                    class="mb-2"
                  >
                    <span class="fa fa-plus"></span> Add additional Email
                  </button>
                      </div>
                    </div>       
                  </div>
                </div>
                <div v-if="invoice_setting">
                  <div class="row form-group">
                    <div class="col-sm-12">
                      <label for="">
                        Invoice Heading
                        <textarea
                          v-model="setting.invoice_heading"
                          name=""
                          id=""
                          style="width: 100%"
                          rows="4"
                        ></textarea>
                      </label>
                    </div>
                  </div>
                  <div class="row form-group">
                    <div class="col-sm-6">
                      <label for="">
                        Invoice Address
                        <Editor
                          v-model="setting.invoice_address"
                          editorStyle="height: 120px"
                        />
                      </label>
                    </div>
                    <div class="col-sm-6">
                      <div class="row">
                        <div class="col-sm-12 form-group">
                          <label for="">
                            Invoice Contacts
                            <Editor
                              v-model="setting.invoice_phone"
                              editorStyle="height: 120px"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="example_setting">...</div>
                <div v-if="other_setting">...</div>
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
import Editor from "primevue/editor";

export default {
  components: {
    PageHeader,
    Editor,
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
      setting: {
        additionalemails:[],
      },
      general_setting: true,
      invoice_setting: false,
      example_setting: false,
      other_setting: false,
    };
  },

  created() {
    this.getGeneralSettings();
  },

  methods: {    
    addMoreAdditionalEmail() {
      var single_new_email = {
        additional_email: "",
      };      
      this.setting.additionalemails.push(single_new_email);
    },
    generelSetting() {
      this.page_title = "General Settings";
      this.invoice_setting = false;
      this.example_setting = false;
      this.other_setting = false;
      this.general_setting = true;
    },
    invoiceSetting() {
      this.page_title = "Invoice Settings";
      this.general_setting = false;
      this.example_setting = false;
      this.other_setting = false;
      this.invoice_setting = true;
    },
    exampleSetting() {
      this.page_title = "Example Settings";
      this.invoice_setting = false;
      this.example_setting = true;
      this.other_setting = false;
      this.general_setting = false;
    },
    otherSetting() {
      this.page_title = "Other Settings";
      this.general_setting = false;
      this.example_setting = false;
      this.other_setting = true;
      this.invoice_setting = false;
    },
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
                this.$store.dispatch("loadGeneralSettings");
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

<style lang="css" scoped>
.nav .nav-link{  
  border: 1px solid rgb(143 58 48);
}
</style>