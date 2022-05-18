<template>
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main">
      <page-header
        :title="'Invoices'"
        :petition="null"
        :route_object="route_obj"
        :header_button="header_button"
        :header_button_text="header_button_text"
      />
      <section id="services" class="services section-bg">
        <BlockUI :blocked="invoices" :fullScreen="true">
          <div class="container" data-aos="fade-up">
            <div class="row">
              <div class="col-12 mb-2">
                <Transition name="fade">
                  <form class="row gy-2 gx-3 align-items-center expense">
                    <div class="col-lg-3 col-md-3 col-sm-6">
                      <input
                        type="text"
                        id="invoice_no"
                        v-model="filters.invoice_no"
                        class="form-control form-control-sm"
                        placeholder="Invoice Number"
                        aria-describedby="invoice_no"
                      />
                    </div>

                    <div class="col-lg-3 col-md-3 col-sm-6">
                      <input
                        placeholder="Client Name"
                        v-model="filters.client_name"
                        type="text"
                        id="client_name"
                        class="form-control form-control-sm"
                        aria-describedby="client_name"
                      />
                    </div>
                    <div class="col-lg-1 col-md-1 col-sm-12">
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="reset()"
                        :disabled="saving"
                      >
                        Reset
                      </button>
                    </div>
                    <div class="col-lg-1 col-md-12 col-sm-12">
                      <button
                        type="button"
                        class="btn btn-info btn-sm"
                        @click="archiveInvoices()"
                        :disabled="saving"
                      >
                        Achive
                      </button>
                    </div>
                  </form>
                </Transition>
              </div>
              <div class="col-md-12">
                <table class="table table-striped" v-if="isLoaded">
                  <thead>
                    <tr>
                      <th>Invoice</th>
                      <th>Due Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(invoice, invoice_index) in invoices"
                      :key="invoice_index"
                    >
                      <td>
                        {{ invoice.invoice_no }}
                        <small style="display: block" class="text-muted"
                          >{{ invoice.client ? invoice.client.name : "" }}
                          <span class="badge rounded-pill bg-primary">{{
                            invoice.status ? invoice.status.title : "Draft"
                          }}</span></small
                        >
                        <small>Created at:{{ invoice.created_at }}</small>
                      </td>

                      <td>{{ invoice.due_date }}</td>
                      <td>
                        <button
                          class="btn btn-warning action-btn"
                          @click="downloadPdf(invoice.id)"
                          style="margin-right: 2px"
                          :disabled="saving"
                        >
                          Download PDF
                        </button>
                        <router-link
                          class="btn btn-sm btn-success action-btn"
                          :to="{
                            name: 'edit-invoice',
                            params: { invoice_id: invoice.id },
                          }"
                          href="javascript:void"
                          style="margin-right: 2px"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit"
                        >
                          Edit
                        </router-link>
                        <a
                          class="btn btn-sm btn-danger action-btn"
                          @click="deleteInvoice(invoice.id, invoice_index)"
                          href="javascript:void"
                          style="margin-right: 2px"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Delete"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="!isLoaded" class="col-md-12">
                  <p class="alert alert-warning">Loading....</p>
                </div>
              </div>
            </div>
          </div>
        </BlockUI>
      </section>
    </main>
    <!-- End #main -->
  </BlockUI>
</template>
    
<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import Editor from "primevue/editor";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

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
      route_obj: {
        name: "create-invoice",
      },
      header_button: true,
      header_button_text: "Create Invoice",
      base_url: process.env.VUE_APP_SERVICE_URL,
      invoices: [],
      filters: {
        invoice_no: "",
        client_name: "",
        is_archive: "",
      },
      isLoaded: false,
    };
  },
  validations() {
    return {
      client: {
        id: { required },
      },
    };
  },
  created() {
    this.getInvoices();
  },
  methods: {
    archiveInvoices() {
      this.saving = true;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      this.filters.is_archive = true;
      let url = this.base_url + "/api/invoices";
      axios
        .get(url, { headers, params: this.filters })
        .then((response) => {
          this.saving = false;
          this.invoices = response.data.invoices;
        })
        .catch((error) => {
          this.saving = false;
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.error,
          });
        });
    },
    reset() {
      this.saving = true;
      this.filters = {
        invoice_no: "",
        client_name: "",
        is_archive: "",
      };
      this.getInvoices();
      this.saving = false;
    },
    getInvoices() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/invoices";
      axios
        .get(url, { headers, params: this.filters })
        .then((response) => {
          this.invoices = response.data.invoices;
          this.isLoaded = true;
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.error,
          });
        });
    },
    onChange(event) {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/users/" + event.value;
      axios
        .get(url, { headers })
        .then((response) => {
          this.client = response.data.user;
          this.client.subject = "Professional Fee for Providing Legal Opinion";
          this.client.services =
            "Legal Opinion on the matter of State Bank Circular related to Closure of Govt. Accounts in commercial banksRs";
        })
        .catch((error) => {
          console.log(error);
        });
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
          .post(this.base_url + "/api/invoices", this.client, {
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
    downloadPdf(invoiceId) {
      let url = this.base_url + "/api/download_pdf/" + invoiceId;
      //  let url = "http://localhost:8000/download_pdf";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      this.saving = true;
      axios
        .get(url, { headers })
        .then((response) => {
          this.$notify({
            type: "success",
            title: "Success",
            text: "Downloaded Successfully!",
          });
          this.saving = false;
        })
        .catch((error) => {
          this.saving = false;
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error,
          });
        });
    },
    deleteInvoice(invoiceId, invoice_index) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .delete(this.base_url + "/api/invoices/" + invoiceId, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Deleted Successfully!",
                });
                this.invoices.splice(invoice_index, 1); //removing record from list/index after deleting record from DB
              }
            },
            (error) => {
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
  watch: {
    filters: {
      deep: true,
      handler() {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.getInvoices();
            this.awaitingSearch = false;
          }, 1500); // 1 sec delay
        }
        this.awaitingSearch = true;
      },
    },
  },
};
</script>

<style>
</style>