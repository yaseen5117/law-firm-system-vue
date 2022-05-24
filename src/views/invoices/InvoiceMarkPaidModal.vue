<template>
  <Dialog
    :header="title"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '45vw' }"
    :modal="true"
  >
    <div class="container">
      <form @submit.prevent="submitForm($event)" enctype="multipart/form-data">
        <div class="row">
          <div class="form-group">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <label>
                Paid Date
                <InputMask
                  mask="99/99/9999"
                  placeholder="dd/mm/yyyy"
                  v-model="invoice.paid_date"
                  type="text"
                  class="form-control"
                />
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <label>
                Amount Paid
                <input
                  type="text"
                  v-model="invoice.paid_amount"
                  class="form-control"
                />
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <label>
                Payment Notes
                <textarea
                  type="text"
                  v-model="invoice.notes"
                  class="form-control"
                />
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <label>
                Receipt
                <file-upload
                  type="App\Models\Invoice"
                  :attachmentable_id="id"
                />
              </label>
            </div>

            <div class="form-group mt-3" style="float: right">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <button class="btn btn-success btn-sm" :disabled="saving">
                  Mark as Paid
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
import moment from "moment";

export default {
  emits: ["afterSubmit"],
  props: ["title"],
  components: {
    FileUpload,
  },
  data() {
    return {
      title: this.title,
      base_url: process.env.VUE_APP_SERVICE_URL,
      invoice: {
        paid_amount: "",
      },
      id: this.$route.params.invoice_id,
      saving: false,
    };
  },
  created() {
    this.getInvoice();
  },
  methods: {
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
            this.invoice,
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
            this.invoice = response.data.invoice;
            this.invoice.paid_amount = response.data.invoice.amount;
            if (!response.data.invoice.paid_date) {
              this.invoice.paid_date = response.data.today_date;
            }
            console.log(response.data.invoice);
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
  },
};
</script>

<style>
label {
  display: inline !important;
}
</style>