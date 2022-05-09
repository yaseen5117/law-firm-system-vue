<template>
  <main id="main">
    <page-header :title="page_title" :order_sheet="null" :petition="petition" />
    <section id="services" class="services section-bg">
      <div class="container" >
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="submitForm($event)">
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Title<span style="color: red">*</span></label>
                    <input
                      class="form-control"
                      v-model="order_sheet.title"
                      v-bind:class="{
                        'error-boarder': v$.order_sheet.title.$error,
                      }"
                      @blur="v$.order_sheet.title.$touch"
                    />
                    <span
                      v-if="v$.order_sheet.title.$error"
                      class="errorMessage"
                      >Title field is required.</span
                    >
                  </div>

                   <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Order Sheet Date<span style="color: red">*</span></label>
                   
                     <InputMask
                      mask="99/99/9999"
                      class="form-control"
                      type="text"
                      placeholder="dd/mm/yyyy"
                      v-model="order_sheet.order_sheet_date"
                      v-bind:class="{
                        'error-boarder': v$.order_sheet.order_sheet_date.$error,
                      }"
                      @blur="v$.order_sheet.order_sheet_date.$touch"
                    />
                     <span
                      v-if="v$.order_sheet.order_sheet_date.$error"
                      class="errorMessage"
                      >Date field is required.</span
                    >
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Type</label>
                    <select                     
                      class="form-control"
                      v-model="order_sheet.order_sheet_type_id"
                      v-bind:class="{
                        'error-boarder': v$.order_sheet.order_sheet_type_id.$error,
                      }"
                      @blur="v$.order_sheet.order_sheet_type_id.$touch"
                    >
                      <option value="">--Select--</option>
                      <option
                        v-for="order_sheet_type in this.order_sheet_types"
                        :key="order_sheet_type.id"
                        :value="order_sheet_type.id"
                      >
                        {{ order_sheet_type.title }}
                      </option>
                    </select>  
                    <span
                      v-if="v$.order_sheet.order_sheet_type_id.$error"
                      class="errorMessage"
                      >Type field is required.</span
                    >                  
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label>Description </label>
                    <input
                      class="form-control"
                      v-model="order_sheet.description"
                    />
                  </div>
                </div>
              </div>
            
              <div class="form-group">
                <button :disabled="saving" class="btn btn-success btn-sm mt-2">Save</button>
              </div>
              
            </form>
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
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
  components: { PageHeader },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      page_title: this.$route.params.editable_order_sheet_id
        ? "Edit Order Sheet"
        : "Add New Order Sheet",
      base_url: process.env.VUE_APP_SERVICE_URL,
      order_sheet: {
        petition_id: this.$route.params.petition_id,
        order_sheet_type_id: "",
        id: this.$route.params.editable_order_sheet_id, //this is the id from the browser
        title: "",
        description: "",
      },
      petition:{},
      petition_types: [],
      order_sheet_types: [
        {
          id: 1,
          title: "Type 1",
        },
        {
          id: 2,
          title: "Type 2",
        },
        {
          id: 3,
          title: "Type 3",
        },
      ],
      saving: false,
    };
  },
  validations() {
    return {
      order_sheet: {
        order_sheet_type_id: { required },
        order_sheet_date: { required },
        title: { required },
      },
    };
  },
  created() {
    this.getUsers();
    this.getEditableOrderSheet();
    this.getCourts();
    this.getPetitionTypes();
    this.getPetition();
  },
  activated() {},
  methods: {
    getEditableOrderSheet: function(){
      if (this.$route.params.editable_order_sheet_id) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .get(
            this.base_url + "/api/petition_order_sheets/"+this.$route.params.editable_order_sheet_id,
            
            {
              headers,
            }
          )
          .then(
            (response) => {
              if (response.status === 200) {
                console.log("editable ordersheet object: ",response.data.record ); 
                this.order_sheet = response.data.record;
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
    submitForm: function (event) {
      this.v$.$validate();
      if (!this.v$.$error) {
        event.preventDefault();
        this.saving = true;
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(
            this.base_url + "/api/petition_order_sheets",
            this.order_sheet,
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
                  text: "Saved Successfully!",
                });
                this.saving = false;
                this.$router.push({ path: "/petition-order-sheets-index/"+ this.order_sheet.petition_id});
              }
              console.log(response);
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
    async getUsers() {
      let url = this.base_url + "/api/clients";
      var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
      await axios
        .get(url, {headers})
        .then((response) => {
          this.clients = response.data.users;
          console.log(this.users);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getCourts() {
      let url = this.base_url + "/api/courts";
      var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
      await axios
        .get(url, {headers})
        .then((response) => {
          this.courts = response.data.courts;
          console.log(this.courts);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getPetitionTypes() {
      let url = this.base_url + "/api/petition_types";
      var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
      await axios
        .get(url, {headers})
        .then((response) => {
          this.petition_types = response.data.petition_types;
          console.log(this.petition_types);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPetition() {
      
      if (this.$route.params.petition_id) {
        var url = this.base_url + "/api/petitions/" + this.$route.params.petition_id;
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
        axios
          .get(url, {headers})
          .then((response) => {
            this.petition = response.data.petition;
            this.opponents = [{}];
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style> 
</style>