<template>
  <ConfirmPopup />
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main">
      <page-header
        :title="'Sample Contracts'"
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

                    <!-- <div class="col-lg-3 col-md-3 col-sm-6">
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
                    </div> -->
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
                <div class="row">
                  <div
                    class="col-sm-12 col-md-6 col-lg-6 col-12 d-flex align-self-stretch"
                    v-for="(
                      contractAndAgreemnet, contract_and_agreemnet_index
                    ) in contractsAndAgreemnets"
                    :key="contract_and_agreemnet_index"
                  >
                    <div
                      class="card listing-cards shadow-sm mb-4"
                      style="width: 100%"
                    >
                      <div
                        class="card-body"
                        @click="goToDetails(contractAndAgreemnet.id)"
                      >
                        <div class="row">
                          <p class="card-title" style="margin-bottom: 0px">
                            <strong>{{ contractAndAgreemnet.title }}</strong>
                          </p>

                          <div class="col-md-12">
                            <p
                              class="card-text"
                              v-html="
                                contractAndAgreemnet.content > 20
                                  ? contractAndAgreemnet.content.substring(
                                      0,
                                      19
                                    ) + '...'
                                  : contractAndAgreemnet.content
                              "
                            ></p>
                          </div>
                        </div>
                      </div>
                      <div class="card-footer">
                        <div class="mt-auto">
                          <div class="pull-right">
                            <router-link
                              style="margin-right: 2px"
                              :to="{
                                name: 'edit-contract-and-agreement',
                                params: {
                                  contract_agreement_id:
                                    contractAndAgreemnet.id,
                                },
                              }"
                              class="btn btn-success btn-sm action-btn"
                              role="button"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="View"
                              >Read More
                            </router-link>
                            <router-link
                              v-if="this.user.is_admin"
                              style="margin-right: 2px"
                              :to="{
                                name: 'edit-contract-and-agreement',
                                params: {
                                  contract_agreement_id:
                                    contractAndAgreemnet.id,
                                },
                              }"
                              class="btn btn-primary btn-sm action-btn"
                              role="button"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Edit"
                              v-on:click.stop
                              >Edit
                            </router-link>
                            <a
                              v-if="this.user.is_admin"
                              style="margin-right: 2px"
                              @click="
                                deleteContactAndAgreement(
                                  $event,
                                  contractAndAgreemnet.id,
                                  contract_and_agreemnet_index
                                )
                              "
                              class="btn btn-danger btn-sm action-btn"
                              href="javascript:void(0);"
                              v-tooltip.top="Delete"
                              >Delete</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="contractsAndAgreemnets.length == 0 && isLoaded"
                    class="col-md-12"
                  >
                    <p class="alert alert-warning">No Records found.</p>
                  </div>
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
import { mapState } from "vuex";

export default {
  computed: mapState(["user"]),
  components: {
    PageHeader,
    InvoiceThumb,
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
        name: "create-contract-and-agreement",
      },
      header_button: true,
      header_button_text: "Create Sample Contract",
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
  mounted() {
    document.getElementById("header");
    document.title = "Sample Contracts";
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
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
          console.log(error);
        });
    },
    deleteContactAndAgreement(
      event,
      contract_agreeent_id,
      contract_and_agreemnet_index
    ) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Do you want to Delete?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Delete",
        acceptClass: "p-button-danger",
        rejectClass: "p-button-primary",
        rejectLabel: "Cancel",
        accept: () => {
          var headers = {
            Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
          };

          axios
            .delete(
              this.base_url +
                "/api/contracts_and_agreements/" +
                contract_agreeent_id,
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
                  text: error.response.data.message,
                });
              }
            );
        },
        reject: () => {
          this.$confirm.close();
        },
      });
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
          }, 4000); // 1 sec delay
        }
        this.awaitingSearch = true;
      },
    },
  },
};
</script>

<style></style>
