<template>
  <Dialog
    :header="title"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '45vw' }"
    :modal="true"
    :showHeader="false"
    :closeOnEscape="true"
    :dismissableMask="true"
  >
    <div class="container mt-5">
      <form
        @submit.prevent="submitForm($event)"
        v-for="(invoice_payment, index) in invoice.invoice_payments"
        :key="invoice_payment"
        enctype="multipart/form-data"
      >
        <div class="row">
          <input type="hidden" v-model="invoice_payment.id" />
          <div class="col-lg-12 col-md-12 col-lg-12">
            <div class="form-group mt-3 text-end">
              <div class="col-lg-12 col-md-12 col-sm-12 add_remove_btn">
                <button
                  type="button"
                  class="btn action-btn text-success"
                  @click="add(index)"
                  v-show="index == invoice.invoice_payments.length - 1"
                  v-tooltip.top="'Add Another Payment'"
                >
                  <i
                    style="font-size: 24px"
                    class="fa fa-plus-circle"
                    aria-hidden="true"
                  ></i>
                </button>
                <button
                  type="button"
                  class="btn action-btn text-danger"
                  @click="remove(index, invoice_payment.id)"
                  v-show="
                    index || (!index && invoice.invoice_payments.length > 1)
                  "
                  v-tooltip.top="'Remove Payment'"
                >
                  <i class="fa fa-minus-circle" style="font-size: 24px"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <label>
              Paid Date
              <InputMask
                mask="99/99/9999"
                placeholder="dd/mm/yyyy"
                v-model="invoice_payment.paid_date"
                type="text"
                class="p-inputtext-sm form-control"
              />
            </label>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <label>
              Paid Amount
              <InputNumber
                v-model="invoice_payment.paid_amount"
                mode="decimal"
                :minFractionDigits="2"
                :maxFractionDigits="5"
                :useGrouping="false"
                class="p-inputtext-sm"
                style="width: 100%"
              />
              <!-- <input
                  type="number"
                  v-model="invoice.amount"
                  class="form-control"
                /> -->
            </label>
          </div>

          <div class="form-group">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <label>
                Payment Notes
                <textarea
                  type="text"
                  v-model="invoice_payment.notes"
                  class="form-control"
                />
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <file-upload
                v-if="invoice_payment.id"
                type="App\Models\Payment"
                :attachmentable_id="invoice_payment.id"
                receipt="true"
              />
            </div>

            <div class="form-group mt-3 text-end">
              <div class="col-lg-6 col-md-6 col-sm-12 mb-2">
                <InvoiceThumb
                  :base_url="base_url"
                  folder_name="Invoice/Payment"
                  :invoice="invoice_payment"
                />
              </div>
              <div class="col-lg-12 col-md-12 col-sm-12" style="float: right">
                <button
                  style="margin-left: 5px"
                  class="btn btn-success btn-sm"
                  :disabled="saving"
                  v-show="index == invoice.invoice_payments.length - 1"
                >
                  Save Payment
                </button>
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  style="margin-left: 5px"
                  @click="closeModal()"
                  v-show="index == invoice.invoice_payments.length - 1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- <template #footer>
      <div class="container">
        
      </div>
    </template> -->
  </Dialog>
</template>

<script>
import axios from "axios";
import FileUpload from "../petition-index/FileUpload.vue";
import InvoiceThumb from "../invoices/InvoiceThumb.vue";
import moment from "moment";

export default {
  emits: ["afterSubmit", "closeModal"],
  props: ["title", "invoice", "excute", "invoiceable_id", "invoiceable_type"],
  components: {
    FileUpload,
    InvoiceThumb,
  },
  data() {
    return {
      title: this.title,
      base_url: process.env.VUE_APP_SERVICE_URL,
      saving: false,
      showAnotherAmountForm: true,
    };
  },

  methods: {
    add(index) {
      this.invoice.invoice_payments.push({
        id: "",
        paid_date: "",
        paid_amount: null,
        notes: null,
      });
    },
    remove(index, payment_id) {
      if (confirm("Do you really want to delete?") && payment_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        if (true) {
          axios
            .delete(
              this.base_url + "/api/invoice/delete_payment/" + payment_id,
              {
                headers,
              }
            )
            .then(
              (response) => {
                if (response.status === 200) {
                  this.invoice.invoice_payments.splice(index, 1);
                  this.$notify({
                    type: "success",
                    title: "Success",
                    text: "Payment Deleted Successfully!",
                  });
                }
              },
              (error) => {
                console.log(error.response.data);
                this.$notify({
                  type: "error",
                  title: "Something went wrong!",
                  text: error.response.data.message,
                });
              }
            );
        }
      } else {
        if (!payment_id) {
          this.invoice.invoice_payments.splice(index, 1);
        }
      }
    },
    closeModal() {
      this.$emit("closeModal", "Hide Dialog/Modal");
    },
    submitForm: function (event) {
      this.saving = true;
      const config = {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        },
      };
      if (true) {
        axios
          .post(
            this.base_url + "/api/invoice/mark_as_paid",
            {
              payments: this.invoice.invoice_payments,
              invoiceable_id: this.invoiceable_id,
              invoiceable_type: this.invoiceable_type,
            },
            config
          )
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Successfully Mark as Paid Invoice!",
                });
                this.saving = false;
                console.log(response.data);
                this.$emit("close-modal-event");
                this.$emit("afterSubmit", "Reloading the Data of Invoice");
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
  },
};
</script>

<style scoped>
.action-btn {
  padding: 1px 2px;
  font-size: 0.875rem;
  border-radius: 0.2rem;
  font-size: 13px;
  font-weight: 700;
}
label {
  display: inline !important;
}
.add_remove_btn {
  float: right;
}
</style>
