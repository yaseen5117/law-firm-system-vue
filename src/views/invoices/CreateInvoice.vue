<template>
  <main id="main">
    <page-header
      :title="page_title"
      :petition="null"
      :hideCaseFiles="true"
      :showInvoices="true"
    />
    <section id="services" class="services section-bg">
      <BlockUI
        :blocked="invoice"
        :fullScreen="true"
        v-if="this.$route.params.invoice_id"
      ></BlockUI>
      <div class="container" data-aos="fade-up">
        <div class="row">
          <form @submit.prevent="submitForm($event)">
            <div class="col-12">
              <div class="row">
                <div class="col-md-12 text-center">
                  <h1>{{ this.globalGeneralSetting.invoice_heading }}</h1>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-sm-6">
                  <div class="text-start">
                    <span
                      v-html="this.globalGeneralSetting.invoice_address"
                    ></span>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6">
                  <div class="text-end">
                    <span
                      v-html="this.globalGeneralSetting.invoice_phone"
                    ></span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 text-end">
                  <a
                    style="margin-right: 3px"
                    v-if="this.$route.params.invoice_id"
                    class="btn btn-sm btn-warning action-btn"
                    :href="invoice.pdf_download_url"
                    download=""
                    >Download PDF</a
                  >
                  <!-- <ConfirmPopup></ConfirmPopup> -->
                  <button
                    v-if="this.$route.params.invoice_id"
                    v-show="invoice.invoice_status_id != 3"
                    @click="openModal(invoice)"
                    type="button"
                    class="btn btn-sm btn-primary action-btn"
                  >
                    Mark as Paid
                  </button>

                  <button
                    v-if="this.$route.params.invoice_id"
                    @click="openModal(invoice)"
                    v-show="invoice.invoice_status_id == 3"
                    type="button"
                    class="btn btn-sm btn-success action-btn"
                  >
                    Show Payment Details
                  </button>
                </div>
              </div>
              <hr />

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <div class="row">
                      <div class="col-md-3">
                        <label for="">
                          Select Client
                          <span style="color: red"> *</span></label
                        >

                        <label
                          class=""
                          v-show="invoice.invoiceable_id"
                          style="margin-left: 5px"
                          for="edit_client"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Make changes to user's profile"
                          ><input
                            autofocus
                            :disabled="invoice.invoice_status_id == 3"
                            id="edit_client"
                            type="checkbox"
                            @change="
                              this.isDisabled = !this.isDisabled;
                              invoice.edit_client = !invoice.edit_client;
                            "
                          />
                          <small>Edit client</small></label
                        >

                        <AutoComplete
                          v-model="invoice.selectedClient.name"
                          :suggestions="filteredClients"
                          emptyMessage="No Record Found!"
                          @complete="searchClient($event)"
                          modelValue="id"
                          field="name"
                          @item-select="onClientSelect($event)"
                          placeholder="Find By Client Name"
                          appendTo="self"
                          minLength="3"
                          autoHighlight="true"
                          forceSelection="true"
                          class="p-autocomplete"
                          delay="1"
                          autofocus
                          :style="'width:100%'"
                          :inputStyle="'width:100%'"
                          @blur="v$.invoice.selectedClient.name.$touch"
                          v-bind:class="{
                            'error-boarder':
                              v$.invoice.selectedClient.name.$error,
                          }"
                        />
                        <span
                          v-if="v$.invoice.selectedClient.name.$error"
                          class="errorMessage"
                          >Client field is required.</span
                        >

                        <!-- <Dropdown
                          id="client"
                          v-model="invoice.invoiceable_id"
                          :options="clients"
                          :disabled="invoice.invoice_status_id == 3"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Select a Client"
                          :filter="true"
                          appendTo="self"
                          @change="onChange"
                          filterPlaceholder="Find by Client Name"
                          @blur="v$.invoice.invoiceable_id.$touch"
                          v-bind:class="{
                            'error-boarder': v$.invoice.invoiceable_id.$error,
                          }"
                        />
                        <span
                          v-if="v$.invoice.invoiceable_id.$error"
                          class="errorMessage"
                          >Client field is required.</span
                        > -->
                      </div>
                      <div class="col-md-3">
                        <label for="">Invoice No</label>
                        <input
                          v-model="invoice.invoice_no"
                          type="text"
                          readonly
                          class="form-control"
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="">Due Date</label>
                        <InputMask
                          v-model="invoice.due_date"
                          mask="99/99/9999"
                          placeholder="dd/mm/yyyy"
                          type="text"
                          :disabled="invoice.invoice_status_id == 3"
                          class="form-control"
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="">Status</label>
                        <Dropdown
                          v-model="invoice.invoice_status_id"
                          :options="invoice_statuses"
                          :disabled="invoice.invoice_status_id == 3"
                          optionLabel="title"
                          optionValue="id"
                          placeholder="Invoice Status"
                          appendTo="self"
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
                          :disabled="isDisabled"
                          v-model="invoice.selectedClient.company_name"
                          class="form-control"
                        />
                      </div>

                      <div class="col-md-3">
                        <label for="">Phone</label>
                        <input
                          type="text"
                          id="phone"
                          :disabled="isDisabled"
                          v-model="invoice.selectedClient.phone"
                          class="form-control"
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="">Email</label>
                        <input
                          type="text"
                          readonly
                          v-model="invoice.selectedClient.email"
                          class="form-control"
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="">Address</label>
                        <input
                          type="text"
                          :disabled="isDisabled"
                          v-model="invoice.selectedClient.address"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="row">
                      <div class="col-md-3">
                        <label for="">Attention</label>
                        <input
                          :disabled="invoice.invoice_status_id == 3"
                          v-model="invoice.attention"
                          type="text"
                          class="form-control"
                        />
                      </div>
                      <div class="col-md-9">
                        <label for="">CC</label>
                        <textarea
                          name=""
                          id=""
                          class="form-control"
                          rows="2"
                          v-model="invoice.contact_person_emails"
                        >
                        </textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <p><strong>Professional Services</strong></p>
                </div>
                <div class="col-md-8">
                  <div class="form-group">
                    <input
                      v-model="invoice.invoice_meta.services"
                      :disabled="invoice.invoice_status_id == 3"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-text">RS</span>
                      <InputNumber
                        class="p-inputnumber-input"
                        inputId="withoutgrouping"
                        v-model="invoice.amount"
                        mode="decimal"
                        :useGrouping="false"
                        :disabled="invoice.invoice_status_id == 3"
                      />
                      <!-- <input
                        v-model="invoice.amount"
                        :disabled="invoice.invoice_status_id == 3"
                        type="number"
                        class="form-control"
                        placeholder="25000"
                      /> -->
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-2">
                  <label for="apply_tax"
                    ><input
                      type="checkbox"
                      id="apply_tax"
                      :disabled="invoice.invoice_status_id == 3"
                      v-model="invoice.apply_tax"
                    />
                    Apply Tax</label
                  >
                </div>

                <div class="col-md-2">
                  <div class="input-group" v-show="invoice.apply_tax">
                    <input
                      v-model="invoice.tax_percentage"
                      type="number"
                      min="0"
                      max="100"
                      class="form-control"
                      placeholder="10"
                    />
                    <span class="input-group-text">%</span>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-12">
                  <div
                    v-for="(
                      invoice_expense, invoice_expense_index
                    ) in invoice.invoice_expenses"
                    :key="invoice_expense"
                    class="form-group"
                  >
                    <div class="row">
                      <div class="col-md-8">
                        <label for="">Expense</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="invoice_expense.expense"
                          :disabled="invoice.invoice_status_id == 3"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="">Amount</label>
                        <div class="input-group">
                          <span class="input-group-text">RS</span>
                          <InputNumber
                            class="p-inputnumber-input"
                            inputId="withoutgrouping"
                            v-model="invoice_expense.amount"
                            mode="decimal"
                            :useGrouping="false"
                            :disabled="invoice.invoice_status_id == 3"
                          />

                          <!-- <input
                            v-model="invoice_expense.amount"
                            :disabled="invoice.invoice_status_id == 3"
                            type="number"
                            class="form-control"
                            placeholder="300"
                          /> -->
                          <button
                            type="button"
                            :disabled="invoice.invoice_status_id == 3"
                            @click="
                              removeInvoiceExpenses(
                                invoice.invoice_expenses,
                                invoice_expense_index,
                                invoice_expense.id
                              )
                            "
                          >
                            <span class="fa fa-minus"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    :disabled="invoice.invoice_status_id == 3"
                    @click="addInvoiceExpenses()"
                  >
                    <span class="fa fa-plus"></span> Add Expenses
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="text-end">
                    <strong>Total: </strong>{{ total_amount }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label
                    ><input
                      type="checkbox"
                      :disabled="invoice.invoice_status_id == 3"
                      @click="isShowEmailContent = !isShowEmailContent"
                      v-model="invoice.sendEmail"
                    />
                    Send Email to Client</label
                  >
                </div>
              </div>
              <div class="row" v-if="isShowEmailContent">
                <div class="col-md-8 text center">
                  <p>
                    <strong
                      >Subject:
                      <input
                        type="text"
                        class="form-control"
                        v-model="invoice.invoice_meta.subject"
                      />
                    </strong>
                  </p>

                  <Editor
                    v-model="invoice.invoice_meta.content"
                    editorStyle="height: 320px"
                  />
                  <br />
                </div>

                <div class="col-md-4">
                  <p class="alert alert-warning">
                    Fill all fields before selecting pre-defined templates.
                  </p>
                  <Button type="button" label="Toggle" @click="showTemplates"
                    >Select Template</Button
                  >

                  <OverlayPanel ref="op">
                    <p
                      v-for="invoice_template in invoice_templates"
                      :key="invoice_template"
                    >
                      <a
                        @click="selectTemplate(invoice_template)"
                        href="javascript:void"
                        >{{ invoice_template.subject }}</a
                      >
                    </p>
                  </OverlayPanel>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="text-end" v-if="isShowEmailContent">
                    <strong>Total: </strong>{{ total_amount }}
                  </p>
                  <button
                    :disabled="invoice.invoice_status_id == 3 || saving"
                    style="float: right"
                    class="btn btn-success btn-sm"
                  >
                    {{ page_title }}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
  <invoice-mark-paid-modal
    v-model:visible="displayModal"
    @close-modal-event="closeModal"
    @afterSubmit="getInvoice()"
    @closeModal="closeModal()"
    :invoice="invoice"
    :invoice_id="invoice.id"
    title="Paid Invoice Dialog"
  />
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import Editor from "primevue/editor";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import OverlayPanel from "primevue/overlaypanel";
import ConfirmPopup from "primevue/confirmpopup";
import ConfirmDialog from "primevue/confirmdialog";
import InvoiceMarkPaidModal from "./InvoiceMarkPaidModal.vue";
import { mapState } from "vuex";

export default {
  computed: mapState(["globalGeneralSetting"]),
  components: {
    ConfirmPopup,
    InvoiceMarkPaidModal,
    PageHeader,
    OverlayPanel,
    Editor,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      filteredClients: null,
      invoice_id: "",
      page_title: this.$route.params.invoice_id
        ? "Edit Invoice"
        : "Create New Invoice",
      saving: false,
      base_url: process.env.VUE_APP_SERVICE_URL,
      value: "any",
      total_amount: 0.0,
      invoice: {
        invoiceable_id: "",
        invoice_status_id: 1,
        due_date: "",
        tax_percentage: "10",
        invoice_no: "",
        amount: "",
        selectedClient: {},
        invoice_expenses: [],
        invoice_meta: {
          subject: "",
          content: "",
          services: "",
        },
        sendEmail: "",
        contact_person_emails: [],
      },
      // clients: [],
      invoice_statuses: [],
      invoice_templates: [],
      isDisabled: true,
      isShowEmailContent: false,
      displayModal: false,
    };
  },
  mounted() {
    document.getElementById("header");
    document.title = this.page_title;
  },
  watch: {
    invoice: {
      deep: true,
      handler() {
        var sum_invoice_expenses = 0.0;
        var tax_amount = 0.0;
        this.invoice.amount =
          parseFloat(this.invoice.amount) > 0
            ? parseFloat(this.invoice.amount)
            : 0.0;
        this.invoice.invoice_expenses.forEach((invoice_expense, index) => {
          sum_invoice_expenses =
            sum_invoice_expenses + parseFloat(invoice_expense.amount);
        });
        if (
          this.invoice.apply_tax &&
          parseFloat(this.invoice.tax_percentage) > 0
        ) {
          tax_amount =
            (this.invoice.tax_percentage * parseFloat(this.invoice.amount)) /
            100;
        }
        this.total_amount =
          parseFloat(this.invoice.amount) +
          parseFloat(sum_invoice_expenses) -
          tax_amount;
        this.total_amount = this.total_amount.toFixed(2);
      },
    },
  },
  validations() {
    return {
      invoice: {
        selectedClient: {
          name: { required },
        },
      },
    };
  },

  created() {
    // this.getClients();
    this.getInvoiceStatuses();
    this.getInvoiceTemplates();
    this.getInvoice();
  },
  methods: {
    searchClient(event) {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };

      let url = this.base_url + "/api/clients";
      var query = {
        serach_param: event.query,
      };

      axios
        .get(url, { headers, params: query })
        .then((response) => {
          this.filteredClients = response.data.clients;
          console.log("Filtered Clients");
          console.log(response.data.clients);
        })
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    openModal(invoice) {
      if (invoice.invoice_payments.length === 0) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + "/" + mm + "/" + yyyy;
        invoice.invoice_payments.push({
          id: null,
          paid_date: today,
          paid_amount: invoice.amount,
          notes: null,
        });
      }
      this.invoice_id = invoice.id;
      this.displayModal = true;
    },
    closeModal() {
      this.displayModal = false;
    },
    markInvoicePaid() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };

      axios
        .post(this.base_url + "/api/invoices/mark_paid", this.invoice, {
          headers,
        })
        .then(
          (response) => {
            if (response.status === 200) {
              this.$notify({
                type: "success",
                title: "Success",
                text: "Paid Successfully!",
              });
              //this.$router.push({ path: "/invoices" });
            }
            console.log(response);
            this.saving = false;
            this.invoice.invoice_status_id = 3;
            this.invoice.paid_date = response.data.paid_at;
          },
          (error) => {
            this.saving = false;
            console.log(error);
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.message,
            });
          }
        );
    },
    showTemplates(event) {
      this.$refs.op.toggle(event);
    },
    selectTemplate(invoice_template) {
      var content = invoice_template.content
        .split("[total_amount]")
        .join(this.total_amount);
      content = content.split("[due_date]").join(this.invoice.due_date);
      this.invoice.invoice_meta.content = content
        .split("[client_name]")
        .join(this.invoice.selectedClient.name);
      //this.invoice.invoice_meta.content = invoice_template.content;
      this.invoice.invoice_meta.subject = invoice_template.subject;
    },
    removeInvoiceExpenses: function (obj, index, invoiceExpenseId) {
      if (invoiceExpenseId) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        let url =
          this.base_url + "/api/delete_invoice_expense/" + invoiceExpenseId;
        axios
          .delete(url, { headers })
          .then((response) => {
            obj.splice(index, 1);
            console.log(response);
            this.$notify({
              type: "success",
              title: "Success",
              text: "Expense Deleted Successfully!",
            });
          })
          .catch((error) => {
            console.log(error);
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.message,
            });
          });
      } else {
        obj.splice(index, 1);
      }
    },
    addInvoiceExpenses() {
      var invoice_expense_single = {
        expense: "",
        amount: 0.0,
      };
      this.invoice.invoice_expenses.push(invoice_expense_single);
    },
    editClientIfo() {
      this.isDisabled = false;
    },
    // getClients() {
    //   var headers = {
    //     Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
    //   };

    //   let url = this.base_url + "/api/clients";
    //   axios
    //     .get(url, { headers })
    //     .then((response) => {
    //       this.clients = response.data.clients;
    //       console.log(this.clients);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       this.$notify({
    //         type: "error",
    //         title: "Something went wrong!",
    //         text: error,
    //       });
    //     });
    // },
    getInvoiceStatuses() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/invoice_statuses";
      axios
        .get(url, { headers })
        .then((response) => {
          this.invoice_statuses = response.data.invoice_statuses;
          console.log("statuses", this.invoice_statuses);
        })
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    getInvoiceTemplates() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/invoice_templates";
      axios
        .get(url, { headers })
        .then((response) => {
          this.invoice_templates = response.data.invoice_templates;
          console.log("invoice_templates", this.invoice_templates);
        })
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    onClientSelect(event) {
      console.log("printing an event");
      console.log(event);
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };

      let url = this.base_url + "/api/users/" + event.value.id;
      axios
        .get(url, { headers })
        .then((response) => {
          console.log(response.data.user);
          this.invoice.selectedClient = response.data.user;
          this.invoice.due_date = response.data.invoice_date;
          this.invoice.invoice_no = response.data.user.next_invoice_num;
          this.invoice.contact_person_emails = [];
          response.data.user.contact_persons.forEach((element) => {
            this.invoice.contact_person_emails.push(element.email);
          });
        })
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
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
          .post(this.base_url + "/api/invoices", this.invoice, {
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
                this.$router.push({ path: "/invoices" });
              }
              console.log(response);
              this.saving = false;
            },
            (error) => {
              this.saving = false;
              console.log(error);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.message,
              });
            }
          );
      }
    },
    getInvoice() {
      if (this.$route.params.invoice_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        var url =
          this.base_url + "/api/invoices/" + this.$route.params.invoice_id;
        axios
          .get(url, { headers })
          .then((response) => {
            // console.log('success');
            // console.log(response.data.invoice.client);
            this.invoice = response.data.invoice;
            this.invoice.selectedClient = response.data.invoice.client;
            this.invoice.invoice_meta = response.data.invoice.invoice_meta;
            if (!this.invoice.paid_amount) {
              this.invoice.paid_amount = this.invoice.amount;
            }
            this.invoice.contact_person_emails = [];
            response.data.invoice.client.contact_persons.forEach((user) => {
              this.invoice.contact_person_emails.push(user.email);
            });
            this.filteredClients = response.data.invoice.client;
            // if (response.data.invoice.invoice_status_id == 2) {
            //   this.isShowEmailContent = true;
            // }
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

<style></style>
