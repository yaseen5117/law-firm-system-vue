<template>
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main">
      <page-header
        :title="'Contracts/My Agreements'"      
      />
      <section id="services" class="services section-bg">
        <BlockUI :blocked="invoices" :fullScreen="true">
          <div class="container" data-aos="fade-up">
            <div class="row">
              <!-- <div class="col-12 mb-2">
                <Transition name="fade">
                  <form class="row gy-2 gx-3 align-items-center expense">
                    <div class="col-lg-3 col-md-3 col-sm-6">
                      <input
                        type="text"
                        id="invoice_no"                      
                        class="form-control form-control-sm"
                        placeholder="Invoice Number"
                        aria-describedby="invoice_no"
                      />
                    </div>

                    <div class="col-lg-3 col-md-3 col-sm-6">
                      <input
                        placeholder="Client Name"                        
                        type="text"
                        id="client_name"
                        class="form-control form-control-sm"
                        aria-describedby="client_name"
                      />
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12">
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="reset()"
                        :disabled="saving"
                      >
                        Reset
                      </button>
                      <button
                        style="margin-left:2px"
                        type="button"
                        class="btn btn-warning btn-sm "
                        @click="filters.is_archive = !filters.is_archive"
                        :disabled="saving"
                      >
                        {{
                          filters.is_archive
                            ? "Active Invoices"
                            : "Archived Invoices"
                        }}
                      </button>
                    </div>
                  </form>
                </Transition>
              </div> -->
              <div class="col-md-12">
                <div class="table-responsive">
                  <table class="table table-striped" v-if="isLoaded">
                  <thead>
                    <tr>
                      <th>Invoice</th>
                      <th>Due Date</th>
                      <th></th>
                      <th  class="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(contractAndAgreemnet, contract_and_agreemnet_index) in contractsAndAgreemnets"
                      :key="contract_and_agreemnet_index"
                    >
                      <td>
                         {{contractAndAgreemnet.title}}
                      </td>

                      <td> </td>
                      <td>
                      
                      </td>
                      <td class="text-end">
                        
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
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
    //   route_obj: {
    //     name: "create-invoice",
    //   },
      header_button: true,
      header_button_text: "Create Invoice",
      base_url: process.env.VUE_APP_SERVICE_URL,      
      filters: {
        invoice_no: "",
        client_name: "",
        is_archive: "",
      },
      isLoaded: false,
      contractsAndAgreemnets: [],
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
   this.getContractAndAgreement();
  },
  methods: {
     getContractAndAgreement() {
      this.isLoaded = false;
      let url = this.base_url + "/api/contracts_and_agreements";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(url, {
          headers,
        //   params: this.filters,
        })
        .then((response) => {    
            this.contractsAndAgreemnets = response.data.contracts_and_agreemnets;    
          console.log(response);
          this.isLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reset() {
      this.saving = true;
      this.filters = {
        invoice_no: "",
        client_name: "",
        is_archive: "",
      };
    //   this.getInvoices();
      this.saving = false;
    },    
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            // this.getInvoices();
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