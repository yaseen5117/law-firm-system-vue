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
                          <th>Invoice ID</th>
                          <th>Client</th>
                          <th>Due Date</th>
                          <th>Created At</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(invoice , invoice_index) in invoices" :key="invoice_index">
                          <td>{{invoice.invoice_id}}</td>
                          <td>{{invoice.client?invoice.client.name:""}}</td>
                          <td>{{invoice.due_date}}</td>
                          <td>{{invoice.created_at}}</td>
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
  },
};
</script>

<style>
</style>