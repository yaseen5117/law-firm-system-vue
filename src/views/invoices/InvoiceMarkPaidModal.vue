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
      <form @submit.prevent="submitForm($event)" enctype="multipart/form-data">
        <div class="row">
          
            <div class="col-lg-6 col-md-6 col-sm-6">              
              <label>
                Paid Date
                <InputMask
                  mask="99/99/9999"
                  placeholder="dd/mm/yyyy"
                  v-model="invoice.paid_date"
                  type="text"
                  class="p-inputtext-sm form-control"
                   
                />
              </label>
            </div>
             <div class="col-lg-6 col-md-6 col-sm-6">
              <label>
                Paid Amount
                <InputNumber                 
                v-model="invoice.paid_amount" 
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
                  v-model="invoice.notes"
                  class="form-control"
                />
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-12 col-md-12 col-sm-12">
             
                <file-upload
                  type="App\Models\Invoice"
                  :attachmentable_id="invoice.id"
                  receipt="true"
                />
             
            </div>

            <div class="form-group mt-3" style="float: right">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <button class="btn btn-success btn-sm" :disabled="saving">
                  Mark as Paid
                </button>
                <button type="button" class="btn btn-primary btn-sm" style="margin-left: 5px" @click="closeModal()">Close</button>
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
  emits: ["afterSubmit","closeModal"],
  props: ["title","invoice","excute"],
  components: {
    FileUpload,
  },
  data() {
    return {      
      title: this.title,
      base_url: process.env.VUE_APP_SERVICE_URL,       
      saving: false,       
    };
  },    
    
  methods: {
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
  },
};
</script>

<style>
label {
  display: inline !important;
}
</style>