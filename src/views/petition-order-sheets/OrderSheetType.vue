<template>
  <main id="main" class="margintop85">  
      <page-header :title="page_title" :hideBreadCrumbs="true" />       
    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg mt-3">
      <div class="container" data-aos="fade-up">
        <div class="row">                
          <div class="table-responsive">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <table class="table table-hover">
                <thead>
                  <th>Title</th>         
                  <th>Display Order</th>                         
                  <th width="10%">Actions</th>                   
                </thead>
                <tbody>
                  <tr                    
                    v-for="(orderSheetType, row_index) in orderSheetTypes"
                    :key="orderSheetType.id"
                  >                      
                    <td>
                      <input
                        v-show="orderSheetType.editMode"
                        class="form-control"
                        v-model="orderSheetType.title"
                        v-on:keyup.enter="editOrderSheetType(orderSheetType)"
                      />
                      <span v-show="!orderSheetType.editMode">{{
                        orderSheetType.title
                      }}</span>
                    </td>
                    <td>
                      <input
                        v-show="orderSheetType.editMode"
                        class="form-control"
                        v-model="orderSheetType.display_order"
                        v-on:keyup.enter="editOrderSheetType(orderSheetType)"
                      />
                      <span v-show="!orderSheetType.editMode">{{
                        orderSheetType.display_order
                      }}</span>
                    </td>
                     
                    <td width="15%">
                      <a
                        class="btn btn-sm btn-primary action-btn"
                        v-show="!orderSheetType.editMode"
                        @click="orderSheetType.editMode = true"
                        href="javascript:void"
                        style="margin-left: 2px"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Edit"
                      >
                        Edit
                        <!-- <i class="fa fa-edit"></i> -->
                      </a>
                      <a
                        v-show="orderSheetType.editMode"
                        class="btn btn-sm btn-warning action-btn"
                        @click="editOrderSheetType(orderSheetType)"
                        href="javascript:void"
                        style="margin-left: 2px"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Update"
                      >
                        Update
                        <!-- <i class="fa fa-save"></i> -->
                      </a>

                      <a
                        v-show="orderSheetType.editMode"
                        @click="orderSheetType.editMode = false"
                        class="btn btn-sm btn-info action-btn"
                        href="javascript:void"
                        style="margin-left: 2px"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Cancel"
                      >
                        Cancel
                        <!-- <i class="fa fa-remove"></i> -->
                      </a>

                      <a
                        class="btn btn-sm btn-danger action-btn"
                        v-show="!orderSheetType.editMode"
                        @click="
                          deleteOrderSheetType(orderSheetType.id, row_index)
                        "
                        href="javascript:void"
                        style="margin-left: 2px"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Delete"
                      >
                        Delete
                        <!-- <i class="fa fa-trash-o"></i> -->
                      </a>                       
                    </td>                                                    
                    
                  </tr>
                  <tr>
                    <td colspan="2">
                      <input
                        class="form-control"
                        v-model="new_order_sheet.title"
                        v-on:keyup.enter="submitOrderSheetType()"
                        v-bind:class="{
                          'error-boarder': v$.new_order_sheet.title.$error,
                        }"
                        @blur="v$.new_order_sheet.title.$touch"
                      />
                     <span
                      v-if="v$.new_order_sheet.title.$error"
                      class="errorMessage"
                      >Title field is required.</span
                    >
                    </td> 
                   
                    <td>
                      <button
                        :disabled="saving"
                        @click="submitOrderSheetType()"
                        class="btn btn-sm btn-success action-btn"
                      >
                        Save
                        <!-- <i class="fa fa-save"></i> -->
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Services Section -->
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios"; 
import PageHeader from "../shared/PageHeader";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: {
     PageHeader
  },
  setup() {
      return {
        v$: useVuelidate(),
      };
    },
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      page_title: "Order Sheet Types",     
      new_order_sheet: {},
      orderSheetTypes: [],       
      saving: false,    
    };
  },
  validations() {
    return {      
        new_order_sheet: {
          title: { required },  
        }       
    };
  },
  created() {   
    this.getOrderSheetTypes();
  },
  methods: {    
    getOrderSheetTypes() {
       var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
      axios
        .get(
          this.base_url + "/api/get_order_sheet_types",
          {headers}
        )
        .then((response) => {
          this.orderSheetTypes = response.data.orderSheetTypes;          
          console.log(response.data.orderSheetTypes);           
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submitOrderSheetType() {
      this.v$.$validate();
      if (!this.v$.$error) { 
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;        
        axios
          .post(
            this.base_url + "/api/save_order_sheet_types",
            this.new_order_sheet,
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
                this.new_order_sheet = {};
                setTimeout(() => { this.v$.$reset() }, 0)
                this.getOrderSheetTypes();
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
    editOrderSheetType(orderSheetTypeToUpdate) {
      if (true) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(
            this.base_url + "/api/save_order_sheet_types",
            orderSheetTypeToUpdate,
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
                orderSheetTypeToUpdate.editMode = false;
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
    deleteOrderSheetType(OrderSheetTypeId, row_index) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .delete(this.base_url + "/api/delete_order_sheet_type/" + OrderSheetTypeId, {
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
                this.orderSheetTypes.splice(row_index, 1); //removing record from list/index after deleting record from DB
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
  mounted() {
    console.log("Court List Component Mounted");
  },
};
</script>

<style>
</style>
