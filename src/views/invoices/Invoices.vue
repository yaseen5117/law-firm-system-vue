<template>
  <main id="main">
    <page-header :title="'Invoices'" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-md-12">
            <table class="table table-striped">
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
                      <span class="badge rounded-pill bg-primary"
                        >Pending</span
                      ></small
                    >
                    <small>Created at:{{ invoice.created_at }}</small>
                  </td>

                  <td>{{ invoice.due_date }}</td>
                  <td>
                    <button
                      class="btn btn-success action-btn"
                      @click="downloadPdf()"
                      style="margin-right: 2px"
                    >
                      Download PDF
                    </button>
                    <router-link
                        class="btn btn-sm btn-success action-btn"                        
                        :to="{
                          name: 'edit-invoice',
                          params: { id: invoice.id },
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
      base_url: process.env.VUE_APP_SERVICE_URL,
      invoices: [],
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
    getInvoices() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/invoices";
      axios
        .get(url, { headers })
        .then((response) => {
          this.invoices = response.data.invoices;
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
    downloadPdf() {
      let url = "https://api.elawfirmpk.com/download_pdf";
      //  let url = "http://localhost:8000/download_pdf";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(url, { headers })
        .then((response) => {
          this.$notify({
            type: "success",
            title: "Success",
            text: "Downloaded Successfully!",
          });
        })
        .catch((error) => {
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
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
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
};
</script>

<style>
</style>