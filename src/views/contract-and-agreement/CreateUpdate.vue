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
                  <div
                    class="col-lg-3 col-md-3 col-sm-12"
                    style="display: none"
                  >
                    <label>Category</label>
                    <Dropdown
                      v-model="contract_and_agreement.contract_category_id"
                      :options="categories"
                      optionLabel="title"
                      optionValue="id"
                      placeholder="Select a Category"
                      :filter="true"
                      appendTo="self"
                      class="p-inputtext-sm p-dropdown"
                      filterPlaceholder="Find by Category Name"
                    />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <label>Title <span style="color: red">*</span></label>
                    <input
                      autofocus
                      class="form-control"
                      v-model="contract_and_agreement.title"
                      v-bind:class="{
                        'error-boarder': v$.contract_and_agreement.title.$error,
                      }"
                      @blur="v$.contract_and_agreement.title.$touch"
                    />
                    <span
                      v-if="v$.contract_and_agreement.title.$error"
                      class="errorMessage"
                      >Title field is required.</span
                    >
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>File</label>
                    <input
                      accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      type="file"
                      id="file"
                      class="form-control"
                      @change="onChange"
                      ref="fileupload"
                    />
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-12">
                    <label
                      >Public URL

                      <router-link
                        v-if="
                          contract_and_agreement && contract_and_agreement.slug
                        "
                        style="margin-right: 2px"
                        target="_blank"
                        :to="{
                          name: 'preview-html',
                          params: {
                            page_slug: contract_and_agreement.slug,
                            page_type: 'contract-and-agreement',
                          },
                        }"
                        class="btn btn-success action-btn"
                        role="button"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="View"
                        >View
                      </router-link>
                      <button
                        v-if="contract_and_agreement.id"
                        class="btn btn-success action-btn"
                        type="button"
                        @click="copyToClipboard(html_page_url)"
                      >
                        Copy To Clipboard
                      </button>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="html_page_url"
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
                      v-if="contract_and_agreement.id"
                      class="btn btn-success action-btn"
                      type="button"
                      @click="copyToClipboard(contract_and_agreement.content)"
                    >
                      Copy To Clipboard
                    </button>
                    <Editor
                      v-model="contract_and_agreement.content"
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
import { required, email, helpers } from "@vuelidate/validators";
import Multiselect from "@vueform/multiselect";
import { formatDate } from "@fullcalendar/common";
import Editor from "primevue/editor";

export default {
  components: {
    PageHeader,
    Multiselect,
    Editor,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      contract_and_agreement: {},
      categories: [],
      saving: false,
      page_title: this.$route.params.contract_agreement_id
        ? "Edit Sample Contract"
        : "Add New Sample Contract",
      button_title: this.$route.params.contract_agreement_id
        ? "Update"
        : "Save",
      base_url: process.env.VUE_APP_SERVICE_URL,
      html_page_url: null,
      files: "",
    };
  },
  validations() {
    return {
      contract_and_agreement: {
        title: { required },
      },
    };
  },
  created() {
    this.getContractAndAgreement();
    this.getContractCategories();
  },
  updated() {
    this.html_page_url =
      window.location.origin +
      "/preview/contract-and-agreement/" +
      this.contract_and_agreement.slug;
  },
  mounted() {
    document.getElementById("header");
    document.title = this.page_title;
  },
  activated() {},
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

        formData.append(
          "contract_category_id",
          this.contract_and_agreement.contract_category_id
        );
        formData.append("title", this.contract_and_agreement.title);
        formData.append("content", this.contract_and_agreement.content);
        if (this.contract_and_agreement.id) {
          formData.append("id", this.contract_and_agreement.id);
        }
        axios
          .post(this.base_url + "/api/contracts_and_agreements", formData, {
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
                this.$router.push({ path: "/contract-and-agreement" });
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
    getContractAndAgreement() {
      if (this.$route.params.contract_agreement_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        var url =
          this.base_url +
          "/api/contracts_and_agreements/" +
          this.$route.params.contract_agreement_id;
        axios
          .get(url, { headers })
          .then((response) => {
            this.contract_and_agreement = response.data.contract_and_agreement;
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
    getContractCategories() {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        var url = this.base_url + "/api/contract_categories";

        axios
          .get(url, { headers })
          .then((response) => {
            this.categories = response.data.categories;
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
