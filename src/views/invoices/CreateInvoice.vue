<template>
  <main id="main">
    <page-header :title="'Create New Invoice'" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <form @submit.prevent="submitForm($event)">
            <div class="col-12">
              <div class="row">
                <div class="col-md-12 text-center">
                  <h1>The Law and Policy Chambers</h1>
                </div>
                <div class="col-md-6">
                  <p class="text-left">
                    <strong
                      >Office No. 5, Saeed Plaza, Plot 71,<br />
                      I & T Center, opposite<br />
                      Islamabad High Court, Sector G-10/1<br />
                      Islamabad 44000, Pakistan<br
                    /></strong>
                  </p>
                </div>
                <div class="col-md-6">
                  <p class="text-right">
                    <strong>
                      Phone: (+92301) 5011568 <br />
                      (+9251) 8431759 <br />
                      Email: umer.gilani@lawandpolicychambers.com <br />
                    </strong>
                  </p>
                </div>
              </div>
              <hr />

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <div class="row">
                      <div class="col-md-3">
                        <label for="">Select Client</label>
                        <Dropdown
                          v-model="client.id"
                          :options="clients"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Select a Client"
                          :filter="true"
                          appendTo="self"
                          @change="onChange"
                          filterPlaceholder="Find by Client Name"
                          @blur="v$.client.id.$touch"
                          v-bind:class="{
                            'error-boarder': v$.client.id.$error,
                          }"
                        /> 
                        <span
                          v-if="v$.client.id.$error"
                          class="errorMessage"
                          >Client field is required.</span
                        >
                      </div>
                      <div class="col-md-3">
                        <label for="">Invoice No</label>
                        <input 
                          v-model="client.invoice_no"
                          type="text" 
                          class="form-control" />
                      </div>
                      <div class="col-md-3">
                        <label for="">Due Date</label>
                        <InputMask
                          v-model="client.due_date"
                          mask="99/99/9999"
                          placeholder="dd/mm/yyyy"
                          type="text"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-md-3">
                        <label for="">Company Name</label>
                        <input
                          type="text"
                          readonly
                          v-model="client.company_name"
                          class="form-control"
                        />
                      </div>

                      <div class="col-md-3">
                        <label for="">Phone</label>
                        <input
                          type="text"
                          readonly
                          v-model="client.phone"
                          class="form-control"
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="">Email</label>
                        <input
                          type="text"
                          readonly
                          v-model="client.email"
                          class="form-control"
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="">Address</label>
                        <input
                          type="text"
                          readonly
                          v-model="client.address"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="row">
                      <div class="col-md-3">
                        <label for="">Attention</label>
                        <input type="text" class="form-control" />
                      </div>
                      <div class="col-md-9">
                        <label for="">CC</label>
                        <textarea
                          name=""
                          id=""
                          class="form-control"
                          rows="2"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 text center">
                  <p>
                    <strong
                      >Subject: <input type="text" class="form-control" v-model="client.subject">
                      </strong
                    >
                  </p>
                  <Editor v-model="client.content" editorStyle="height: 320px" />
                  <br />
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <table class="table table-striped">
                    <tr>
                      <th colspan="2" width="65%">Professional Services</th>                                 
                      <th>Amount</th>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <textarea
                            v-model="client.services"
                            type="text"
                            class="form-control"    
                            rows="2"                         
                          ></textarea>                        
                      </td> 
                                  
                      <td>
                        <div class="input-group">
                          <span class="input-group-text">RS</span>
                          <input
                            v-model="client.amount"
                            type="text"
                            class="form-control"
                            placeholder="25000"
                          />
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="row">
                <div class="col-12">                  
                    <button :disabled="saving" style="float: right;" class="btn btn-success btn-sm">
                      Create Invoice
                    </button>                   
                </div>
              </div>
            </div>
          </form>
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
      value: "any",
      client: {
        due_date: "",
        invoice_no: "",
        amount: "",
        subject: "Professional Fee for Providing Legal Opinion",
        content: "",
        services: "Legal Opinion on the matter of State Bank Circular related to Closure of Govt. Accounts in commercial banksRs",
      },
      clients: [],
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
    this.getClients();
  },
  methods: {
    getClients() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/clients";
      axios
        .get(url, { headers })
        .then((response) => {
          this.clients = response.data.clients;
          console.log(this.clients);
        })
        .catch((error) => {
          console.log(error);
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
          this.client.services = "Legal Opinion on the matter of State Bank Circular related to Closure of Govt. Accounts in commercial banksRs";
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
                // this.$router.push({ path: "/petitions" });
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