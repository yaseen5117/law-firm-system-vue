<template>
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main">
      <page-header
        :title="'Invoices'"
        :petition="null"
        :hideCaseFiles="true"
        :showInvoices="true"
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
                  <form>
                    <div class="gy-2 gx-3 align-items-center expense">
                      <div class="form-group">
                        <div class="row">
                          <div class="col-lg-3 col-md-3 col-sm-6 padding">
                            <Calendar
                              class="p-calendar p-inputtext-sm"
                              style="width: 100%"
                              v-model="filters.start_to_end_date"
                              selectionMode="range"
                              dateFormat="dd/mm/yy"
                              @date-select="Test"
                              :manualInput="false"
                              placeholder ="Select dates to filter"
                            />
                          </div>
                          <div
                            class="col-lg-2 col-md-2 col-sm-6 padding"
                            v-if="showDateType"
                          >
                            <select
                              class="form-select"
                              v-model="filters.date_type"
                            >
                              <option
                                class="text-capitalize"
                                v-for="date_type in date_types"
                                :key="date_type.label"
                                :value="date_type.label"
                              >
                                {{ date_type.title }}
                              </option>
                            </select>
                          </div>
                          <div class="col-lg-2 col-md-2 col-sm-6 padding">
                            <input
                              type="text"
                              id="invoice_no"
                              v-model="filters.invoice_no"
                              class="form-control input-sm"
                              placeholder="Invoice Number"
                              aria-describedby="invoice_no"
                            />
                          </div>

                          <div class="col-lg-3 col-md-3 col-sm-6 padding">
                            <input
                              placeholder="Client Name"
                              v-model="filters.client_name"
                              type="text"
                              id="client_name"
                              class="form-control input-sm"
                              aria-describedby="client_name"
                            />
                          </div>
                          <div class="col-lg-2 col-md-2 col-sm-6 padding">
                            <select
                              class="form-select"
                              v-model="filters.invoice_status_id"
                            >
                              <option
                                class="text-capitalize"
                                v-for="invoice_status in invoice_statuses"
                                :key="invoice_status.id"
                                :value="invoice_status.id"
                              >
                                {{ invoice_status.title }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="row">
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
                              style="margin-left: 2px"
                              type="button"
                              class="btn btn-warning btn-sm"
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
                        </div>
                      </div>
                    </div>
                  </form>
                </Transition>
              </div>
              <div class="col-md-12">
                <div class="table-responsive">
                  <table class="table table-striped" v-if="isLoaded">
                    <thead>
                      <tr>
                        <th>Invoice</th>
                        <th>Due Date</th>
                        <th></th>
                        <th class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(invoice, invoice_index) in invoices"
                        :key="invoice_index"
                      >
                        <td>
                          <router-link
                            style="color: black"
                            :to="{
                              name: 'edit-invoice',
                              params: { invoice_id: invoice.id },
                            }"
                            href="javascript:void"
                            >{{ invoice.invoice_no }}

                            <small style="display: block" class="text-muted"
                              >{{ invoice.client ? invoice.client.name : "" }}
                              <span class="badge rounded-pill bg-primary">{{
                                invoice.status ? invoice.status.title : "Draft"
                              }}</span></small
                            >
                            <small>Created at:{{ invoice.created_at }}</small>
                          </router-link>
                        </td>

                        <td>{{ invoice.due_date }}</td>
                        <td>
                          <button
                            v-show="invoice.invoice_status_id != 3"
                            @click="setupMarkPaid(invoice)"
                            type="button"
                            class="btn btn-sm btn-primary action-btn"
                          >
                            Mark as Paid
                          </button>
                          <button
                            v-show="invoice.invoice_status_id == 3"
                            type="button"
                            @click="openModal(invoice)"
                            class="btn btn-sm btn-success action-btn"
                          >
                            Show Payment Details
                          </button>

                          <InvoiceThumb
                            v-show="invoice.attachment"
                            folder_name="invoices"
                            :base_url="base_url"
                            :invoice="invoice"
                          />
                        </td>
                        <td class="text-end">
                          <router-link
                            class="btn btn-sm btn-success action-btn"
                            :to="{
                              name: 'edit-invoice',
                              params: { invoice_id: invoice.id },
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
                            style="margin-left: 2px"
                            class="btn btn-warning action-btn"
                            :href="
                              'https://api.elawfirmpk.com/download_pdf/' +
                              invoice.id
                            "
                            download=""
                            >Download</a
                          >

                          <a
                            class="btn btn-sm btn-danger action-btn"
                            @click="deleteInvoice(invoice.id, invoice_index)"
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
                  <Paginator v-show="pagination_info.total>0" v-model:first="pagination_info.from" v-model:rows="pagination_info.per_page" :totalRecords="pagination_info.total" @page="onPage($event)"></Paginator>

              <p v-show="pagination_info.total>0"><small>Showing from {{pagination_info.from}} to {{pagination_info.to}} of {{pagination_info.total}}</small></p>
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
    <invoice-mark-paid-modal
      v-model:visible="displayModal"
      @close-modal-event="closeModal"
      @afterSubmit="getInvoices()"
      @closeModal="closeModal()"
      :invoice="invoice"
      :excute="excute"
      title="Paid Invoice Dialog"
    />
    <!-- End #main -->
  </BlockUI>
</template>
    
<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import Editor from "primevue/editor";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import InvoiceMarkPaidModal from "./InvoiceMarkPaidModal.vue";
import InvoiceThumb from "../invoices/InvoiceThumb.vue";

export default {
  components: {
    InvoiceThumb,
    PageHeader,
    Editor,
    InvoiceMarkPaidModal,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      showDateType: false,
      excute: false,
      invoice_id: "",
      invoice_statuses: [
        {
          id: "",
          title: "All",
        },
        {
          id: 1,
          title: "Draft",
        },
        {
          id: 2,
          title: "Sent",
        },
        {
          id: 3,
          title: "Paid",
        },
      ],
      date_types: [
        {
          label: "created_at",
          title: "Created Date",
        },
        {
          label: "due_date",
          title: "Due Date",
        },
        {
          label: "paid_date",
          title: "Paid Date",
        },
      ],
      pagination_info: [],
      invoice: {},
      displayModal: false,
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
        start_to_end_date: "",
        date_type: "created_at",
        invoice_status_id: "",
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

    onPage(event) {
      this.isLoaded = false;
      var new_page_no = event.page+1; //adding 1 because event.page returns index of page # clicked.
      this.filters.page=new_page_no;
    },
    Test(event) {
      if (this.filters.start_to_end_date[1]) {
        this.showDateType = true;
      }
    },
    setupMarkPaid(invoice) {
      if (!invoice.paid_amount) {
        invoice.paid_amount = invoice.amount;
      }
      if (!invoice.paid_date) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + "/" + mm + "/" + yyyy;
        invoice.paid_date = today;
      }
      this.openModal(invoice);
    },
    openModal(invoice) {
      this.invoice = invoice;
      this.excute = true;
      this.displayModal = true;
    },
    closeModal() {
      this.displayModal = false;
    },
    reset() {
      this.saving = true;
      this.filters = {
        invoice_no: "",
        client_name: "",
        is_archive: "",
        start_to_end_date: "",
      };
      this.showDateType = false;
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
          this.invoices = response.data.invoices.data;
          this.pagination_info = response.data.invoices;
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
      // https://api.elawfirmpk.com/
      // let url = this.base_url + "/api/download_pdf/" + invoiceId;
      let url = "https://api.elawfirmpk.com/download_pdf/" + invoiceId;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      this.saving = true;
      axios
        .get(url, { headers })
        .then((response) => {
          console.log(response);
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