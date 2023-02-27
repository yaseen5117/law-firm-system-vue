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
                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <label>Title <span style="color: red">*</span></label>
                    <input
                      autofocus
                      class="form-control"
                      v-model="SamplePleading.title"
                      v-bind:class="{
                        'error-boarder': v$.SamplePleading.title.$error,
                      }"
                      @blur="v$.SamplePleading.title.$touch"
                    />
                    <span
                      v-if="v$.SamplePleading.title.$error"
                      class="errorMessage"
                      >Title field is required.</span
                    >
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label
                      >File <small>(Pdf, Word Document, Image)</small></label
                    >
                    <input
                      accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      type="file"
                      id="file"
                      class="form-control"
                      @change="onChange"
                      ref="fileupload"
                    />
                  </div>
                  <div
                    v-if="SamplePleading.attachment"
                    class="col-lg-1 col-md-1 col-sm-12"
                  >
                    <InvoiceThumb
                      v-show="SamplePleading.attachment"
                      folder_name="sample-pleadings"
                      :base_url="base_url"
                      :invoice="SamplePleading"
                    />
                  </div>
                  <div
                    :class="
                      SamplePleading.attachment
                        ? 'col-lg-4 col-md-4 col-sm-12'
                        : 'col-lg-5 col-md-5 col-sm-12'
                    "
                  >
                    <label
                      >Public URL
                      <router-link
                        v-if="SamplePleading.slug"
                        style="margin-right: 2px"
                        target="_blank"
                        :to="{
                          name: 'preview-html',
                          params: {
                            page_slug: SamplePleading.slug,
                            page_type: 'sample-pleading',
                          },
                        }"
                        class="btn btn-success btn-sm action-btn"
                        role="button"
                        v-tooltip.top="'View'"
                        >View
                      </router-link>
                      <button
                        v-if="SamplePleading.id"
                        class="btn btn-success action-btn"
                        type="button"
                        @click="copyToClipboard(html_page_url)"
                      >
                        Copy To Clipboard
                      </button>
                    </label>
                    <input
                      v-model="html_page_url"
                      type="text"
                      class="form-control"
                      readonly
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <label for="">
                    Content
                    <button
                      v-if="SamplePleading.id"
                      class="btn btn-success action-btn"
                      type="button"
                      @click="copyToClipboard(SamplePleading.content)"
                    >
                      Copy To Clipboard
                    </button>
                    <Editor
                      v-model="SamplePleading.content"
                      editorStyle="height: 220px"
                    />
                  </label>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-2 col-md-2 col-sm-3">
                    <button :disabled="saving" class="btn btn-success btn-sm">
                      {{ button_title }}
                    </button>
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
import { required } from "@vuelidate/validators";
import InvoiceThumb from "../invoices/InvoiceThumb.vue";
import Editor from "primevue/editor";

export default {
  components: {
    PageHeader,
    InvoiceThumb,
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
      page_title: this.$route.params.sample_pleading_id
        ? "Edit Sample Pleading"
        : "Add New Sample Pleading",
      button_title: this.$route.params.sample_pleading_id ? "Update" : "Save",
      base_url: process.env.VUE_APP_SERVICE_URL,
      SamplePleading: {},
      files: "",
      html_page_url: "",
    };
  },
  validations() {
    return {
      SamplePleading: {
        title: { required },
      },
    };
  },
  created() {
    this.getSamplePleading();
  },
  mounted() {
    document.getElementById("header");
    document.title = this.page_title;
  },
  updated() {
    this.html_page_url =
      window.location.origin +
      "/preview/sample-pleading/" +
      this.SamplePleading.slug;
  },
  methods: {
    onChange(e) {
      this.files = e.target.files;
    },
    submitForm: function (event) {
      this.v$.$validate();
      if (!this.v$.$error) {
        event.preventDefault();

        this.saving = true;
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        let formData = new FormData();

        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          formData.append("files[" + i + "]", file);
        }

        formData.append("title", this.SamplePleading.title);
        formData.append("content", this.SamplePleading.content);
        // formData.append("display_order", this.SamplePleading.display_order);
        if (this.SamplePleading.id) {
          formData.append("id", this.SamplePleading.id);
        }
        axios
          .post(this.base_url + "/api/sample_pleadings", formData, {
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
                this.$router.push({ path: "/sample-pleading" });
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
    getSamplePleading() {
      if (this.$route.params.sample_pleading_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        var url =
          this.base_url +
          "/api/sample_pleadings/" +
          this.$route.params.sample_pleading_id;
        axios
          .get(url, { headers })
          .then((response) => {
            this.SamplePleading = response.data.sample_pleading;
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
