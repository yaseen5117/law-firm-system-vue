<template>
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main">
      <page-header
        :title="'Contracts/My Agreements'"    
        :petition="null"
        :hideCaseFiles="true"
        :showInvoices="false"    
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
                        id="title"      
                        v-model="filters.title"                
                        class="form-control"
                        placeholder="Title"
                        aria-describedby="title"
                      />
                    </div>

                    <div class="col-lg-3 col-md-3 col-sm-6">
                      <Dropdown
                      v-model="filters.contract_category_id"
                      :options="categories"
                      optionLabel="title"
                      optionValue="id"
                      placeholder="Select a Category"
                      :filter="true"
                      appendTo="self"
                      class="p-inputtext-sm"
                      filterPlaceholder="Find by Category Name"                      
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
                    </div>
                  </form>
                </Transition>
              </div>
              <div class="col-md-12">
                <div class="table-responsive">
                  <table class="table table-striped" v-if="isLoaded">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Title</th>
                      <th>Attachment</th>                       
                      <th  class="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(contractAndAgreemnet, contract_and_agreemnet_index) in contractsAndAgreemnets"
                      :key="contract_and_agreemnet_index"
                    >
                     
                      <td>
                        <span v-if="contractAndAgreemnet.category">
                          {{contractAndAgreemnet.category.title}}
                        </span>                         
                      </td>
                      <td>{{contractAndAgreemnet.title}}</td>   
                      <td>
                        <InvoiceThumb v-show="contractAndAgreemnet.attachment" folder_name="contracts-and-agreements" :base_url="base_url" :invoice="contractAndAgreemnet" />
                        </td>                   
                      <td class="text-end">

                        <router-link
                          class="btn btn-sm btn-success action-btn"
                          :to="{
                            name: 'edit-contract-and_agreement',
                            params: { contract_agreement_id: contractAndAgreemnet.id },
                          }"
                          href="javascript:void"
                          style="margin-left: 2px"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit"
                        >
                          Edit
                        </router-link>
                        
                        
                        <a
                          class="btn btn-sm btn-danger action-btn"
                          @click="deleteContactAndAgreement(contractAndAgreemnet.id, contract_and_agreemnet_index)"
                          href="javascript:void"
                          style="margin-left: 2px"
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
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import InvoiceThumb from "../invoices/InvoiceThumb.vue";

export default {
  components: {
    PageHeader, 
    InvoiceThumb
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {    
      categories: [],
      saving: false,
      route_obj: {
        name: "create-contract-and_agreement",
      },
      header_button: true,
      header_button_text: "Create Contract and Agreement",
      base_url: process.env.VUE_APP_SERVICE_URL,      
      filters: {},
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
   this.getContractCategories();
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
          params: this.filters,
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
    deleteContactAndAgreement(contract_agreeent_id,contract_and_agreemnet_index) {
      if (confirm("Do you really want to delmete?")) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .delete(this.base_url + "/api/contracts_and_agreements/" + contract_agreeent_id, {
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
                this.contractsAndAgreemnets.splice(
                  contract_and_agreemnet_index,
                  1
                ); //removing record from list/index after deleting record from DB
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
    getContractCategories(){
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        var url =
          this.base_url + "/api/contract_categories"
          
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
              text: error,
            });
          });
      }
    },
    reset() {
      this.saving = true;
      this.filters = {};      
      this.saving = false;
    },    
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.getContractAndAgreement();
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