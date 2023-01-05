<template>
  <main id="main">
    <page-header :title="page_title" :hideCaseFiles="true" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-sm-3">
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
                @click="siteSetting()"
              >
                Site Setting
              </button>

              <button
                v-if="this.user.is_admin"
                class="nav-link"
                id="v-pills-settings-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-settings"
                type="button"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false"
                @click="FirSections()"
              >
                Fir Sections
              </button>
            </div>
          </div>
          <div class="col-sm-9">
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
                              autofocus
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
                            <InputMask
                              v-model="setting.site_phone"
                              type="text"
                              class="form-control"
                              id=""
                              mask="9999-9999999"
                            />
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="">
                            Site URL
                            <input
                              v-model="setting.site_url"
                              type="text"
                              class="form-control"
                            />
                          </label>
                        </div>
                      </div>

                      <div class="col-md-6 col-lg-6">
                        <div class="form-group">
                          <label for="">
                            Host Whereby iFrame
                            <textarea
                              class="form-control"
                              style="width: 100%"
                              v-model="setting.host_whereby_iframe"
                            ></textarea>
                          </label>
                        </div>
                      </div>

                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="">
                            Whereby Meeting Link
                            <input
                              v-model="setting.public_whereby_iframe"
                              type="text"
                              class="form-control"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <label for="">Additional Email</label>
                    <div
                      v-for="(additionalEmail, i) in setting.additionalemails"
                      :key="additionalEmail"
                    >
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="input-group mb-3">
                            <input
                              v-model.lazy="setting.additionalemails[i]"
                              type="email"
                              class="form-control"
                              placeholder="Additional Email"
                            />
                            <div class="input-group-append">
                              <button
                                class="btn btn-outline-secondary"
                                type="button"
                                for="edit_client"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Remove"
                                @click="deleteAdditionalEmail(i)"
                              >
                                <i class="fa fa-minus"></i>
                              </button>
                            </div>
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
                        Invoice Heading Left
                        <Editor
                          v-model="setting.invoice_heading_left"
                          editorStyle="height: 120px"
                        />
                      </label>
                    </div>
                    <div class="col-sm-6">
                      <div class="row">
                        <div class="col-sm-12 form-group">
                          <label for="">
                            Invoice Heading Right
                            <Editor
                              v-model="setting.invoice_heading_right"
                              editorStyle="height: 120px"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="site_setting">
                  <div class="row form-group">
                    <div class="col-sm-8">
                      <label for="">
                        Content
                        <Editor
                          v-model="setting.login_page_content"
                          editorStyle="height: 220px"
                        />
                      </label>
                    </div>
                    <div class="col-sm-4">
                      <button
                        type="button"
                        class="btn btn-primary mb-2 btn-sm"
                        style="margin-right: 2px"
                        @click="uploadImage()"
                      >
                        Upload Image
                      </button>
                      <div v-if="uploadDialog">
                        <file-upload
                          @afterUpload="previewMod"
                          type="App\Models\Setting"
                          :attachmentable_id="1"
                          upload_site_image="true"
                          image_type="image/png, image/jpeg, image/jpg"
                        />
                      </div>
                      <div v-if="imagePreview">
                        <Image
                          v-if="setting.site_file_name"
                          :src="
                            this.base_url +
                            '/storage/attachments/settings' +
                            '/' +
                            setting_id +
                            '/' +
                            setting.site_file_name
                          "
                          alt="Site Image"
                          width="250"
                          preview
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
import FileUpload from "../petition-index/FileUpload.vue";
import Image from "primevue/image";
import { mapState } from "vuex";

export default {
  components: {
    PageHeader,
    Editor,
    FileUpload,
    Image,
  },
  computed: mapState(["user"]),
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
        additionalemails: [],
      },
      general_setting: true,
      invoice_setting: false,
      site_setting: false,
      other_setting: false,
      uploadDialog: false,
      imagePreview: true,
      setting_id: 1, //Indicate general settings ID
    };
  },

  created() {
    this.getGeneralSettings();
  },
  mounted() {
    document.getElementById("header");
    document.title = this.page_title;
  },
  updated() {
    if (this.setting.site_url == null) {
      this.setting.site_url = "https://elawfirmpk.com";
    }
  },

  methods: {
    uploadImage() {
      this.uploadDialog = true;
      this.imagePreview = false;
    },
    previewMod() {
      this.getGeneralSettings();
      this.uploadDialog = false;
      this.imagePreview = true;
    },
    addMoreAdditionalEmail() {
      var single_new_email = "";
      this.setting.additionalemails.push(single_new_email);
      console.log(this.setting.additionalemails);
    },
    generelSetting() {
      this.page_title = "General Settings";
      this.invoice_setting = false;
      this.site_setting = false;
      this.other_setting = false;
      this.general_setting = true;
      document.getElementById("header");
      document.title = this.page_title;
    },
    invoiceSetting() {
      this.page_title = "Invoice Settings";
      this.general_setting = false;
      this.site_setting = false;
      this.other_setting = false;
      this.invoice_setting = true;
      document.getElementById("header");
      document.title = this.page_title;
    },
    siteSetting() {
      this.page_title = "Site Settings";
      this.invoice_setting = false;
      this.site_setting = true;
      this.other_setting = false;
      this.general_setting = false;
      document.getElementById("header");
      document.title = this.page_title;
    },
    FirSections() {
      this.$router.push({ path: "/fir-sections" });
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
              text: error.response.data.message,
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
    deleteAdditionalEmail(index) {
      this.setting.additionalemails.splice(index, 1);
    },
  },
};
</script>

<style lang="css" scoped>
.nav .nav-link {
  border: 1px solid rgb(143 58 48);
}
</style>
