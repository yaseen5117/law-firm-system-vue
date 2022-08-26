<template>
  <main id="main">
    <page-header :title="page_title" :petition="null" :hideBreadCrumbs="true" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <form @submit.prevent="submitForm($event)">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label>Proposition</label>
                    <input
                      class="form-control"
                      v-model="new_general_case_law.case_title"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label>Legal Provisions &#38; Citations</label>
                    <textarea
                      rows="4"
                      class="form-control"
                      v-model="new_general_case_law.legal_provisions"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label>Keywords</label>
                    <input
                      class="form-control"
                      v-model="new_general_case_law.keywords"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-8 col-md-8 col-sm-12">
                    <file-upload
                      :multiple_or_single="true"
                      @afterUpload="getGeneralCaseLaw"
                      type="App\Models\GeneralCaseLaw"
                      :attachmentable_id="new_general_case_law.id"
                      class="mt-1"
                    />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <InvoiceThumb
                      :base_url="base_url"
                      folder_name="Frequently-Asked-Legal-Propositions"
                      :invoice="new_general_case_law"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <button :disabled="saving" class="btn btn-success btn-sm">
                {{ btnTitle }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import FileUpload from "../petition-index/FileUpload.vue";
import InvoiceThumb from "../invoices/InvoiceThumb.vue";

export default {
  components: {
    PageHeader,
    FileUpload,
    InvoiceThumb,
  },
  data() {
    return {
      saving: false,
      page_title: this.$route.params.general_case_law_id
        ? "Edit Frequently Asked Legal Propositions"
        : "Add New Frequently Asked Legal Propositions",
      btnTitle: this.$route.params.general_case_law_id ? "Update" : "Save",
      base_url: process.env.VUE_APP_SERVICE_URL,
      new_general_case_law: {},
    };
  },

  created() {
    this.getGeneralCaseLaw();
  },
  updated() {
    document.title = this.new_general_case_law
      ? this.new_general_case_law.case_title.slice(0, 15) +
        " | " +
        this.new_general_case_law.legal_provisions.slice(0, 15)
      : "Edit Frequently Asked Legal Propositions";
  },
  methods: {
    submitForm: function (event) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;
        axios
          .post(
            this.base_url + "/api/general_case_laws",
            this.new_general_case_law,
            {
              headers,
            }
          )
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                this.$router.push({ path: "/petition-general-case-law" });
              }
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

    getGeneralCaseLaw() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(
          this.base_url +
            "/api/general_case_laws/" +
            this.$route.params.general_case_law_id,
          {
            headers,
          }
        )
        .then((response) => {
          this.new_general_case_law = response.data.case_laws;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
