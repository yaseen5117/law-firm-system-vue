<template>
  <ConfirmPopup />
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="" class="margintop85">
      <page-header :title="page_title" :hideBreadCrumbs="true" />
      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg mt-3">
        <BlockUI :blocked="invoices" :fullScreen="true">
          <div class="container" data-aos="fade-up">
            <div class="row">
              <div class="col-lg-3 col-md-3 col-sm-4 mb-3">
                <select class="form-select" v-model="filters.module_id">
                  <option
                    class="text-capitalize"
                    v-for="module_type in module_types"
                    :key="module_type.id"
                    :value="module_type.id"
                  >
                    {{ module_type.title }}
                  </option>
                </select>
              </div>
              <div class="col-lg-12 col-md-12 col-sm-12">
                <table class="table table-hover" v-if="isLoaded">
                  <thead>
                    <th>Module</th>
                    <th>Title</th>
                    <th>Display Order</th>
                    <th width="10%">Actions</th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(orderSheetType, row_index) in moduleTypes"
                      :key="orderSheetType.id"
                    >
                      <td>
                        <span
                          v-for="module_type in module_types"
                          :key="module_type"
                        >
                          <span
                            v-if="module_type.id == orderSheetType.module_id"
                          >
                            {{ module_type.title }}
                          </span>
                        </span>
                      </td>
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
                            deleteOrderSheetType(
                              $event,
                              orderSheetType.id,
                              row_index
                            )
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
                      <td colspan="">
                        <Dropdown
                          v-model="new_module_type.module_id"
                          :options="module_types"
                          optionLabel="title"
                          optionValue="id"
                          placeholder="Select a Module"
                          :filter="true"
                          appendTo="self"
                          filterPlaceholder="Find by Module Title"
                          v-bind:class="{
                            'error-boarder':
                              v$.new_module_type.module_id.$error,
                          }"
                          @blur="v$.new_module_type.module_id.$touch"
                        />
                        <span
                          v-if="v$.new_module_type.module_id.$error"
                          class="errorMessage"
                          >Module field is required.</span
                        >
                      </td>
                      <td colspan="">
                        <input
                          class="form-control"
                          v-model="new_module_type.title"
                          v-on:keyup.enter="submitModuleType()"
                          v-bind:class="{
                            'error-boarder': v$.new_module_type.title.$error,
                          }"
                          @blur="v$.new_module_type.title.$touch"
                        />
                        <span
                          v-if="v$.new_module_type.title.$error"
                          class="errorMessage"
                          >Title field is required.</span
                        >
                      </td>
                      <td colspan="">
                        <input
                          class="form-control"
                          v-model="new_module_type.display_order"
                          v-on:keyup.enter="submitModuleType()"
                        />
                      </td>

                      <td>
                        <button
                          :disabled="saving"
                          @click="submitModuleType()"
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
        </BlockUI>
      </section>
      <!-- End Services Section -->
    </main>
  </BlockUI>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: {
    PageHeader,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      page_title: "Module Types",
      new_module_type: {},
      module_types: [
        {
          id: 1,
          title: "Order Sheet",
        },
        {
          id: 2,
          title: "Naqal Form",
        },
        {
          id: 3,
          title: "Talbana",
        },
        {
          id: 4,
          title: "Synopsis",
        },
      ],
      moduleTypes: [],
      saving: false,
      filters: {
        module_id: 1,
      },
      isLoaded: false,
    };
  },
  validations() {
    return {
      new_module_type: {
        title: { required },
        module_id: { required },
      },
    };
  },
  created() {
    this.getModuleTypes();
  },
  mounted() {
    document.getElementById("header");
    document.title = "Module Types";
  },
  methods: {
    getModuleTypes() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/module_types", {
          headers,
          params: this.filters,
        })
        .then((response) => {
          this.moduleTypes = response.data.moduleTypes;
          console.log(response.data.moduleTypes);
          this.isLoaded = true;
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
    submitModuleType() {
      this.v$.$validate();
      if (!this.v$.$error) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;
        axios
          .post(this.base_url + "/api/module_types", this.new_module_type, {
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
                this.saving = false;
                this.new_module_type = {};
                setTimeout(() => {
                  this.v$.$reset();
                }, 0);
                this.getModuleTypes();
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
    editOrderSheetType(moduleTypeToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/module_types", moduleTypeToUpdate, {
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
                moduleTypeToUpdate.editMode = false;
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
    },
    deleteOrderSheetType(event, moduleTypeId, row_index) {
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
            .delete(this.base_url + "/api/module_types/" + moduleTypeId, {
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
                  this.moduleTypes.splice(row_index, 1); //removing record from list/index after deleting record from DB
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
        },
        reject: () => {
          this.$confirm.close();
        },
      });
    },
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.getModuleTypes();
            this.new_module_type.module_id = this.filters.module_id;
            this.awaitingSearch = false;
          }, 1000); // 1 sec delay
        }
        this.awaitingSearch = true;
      },
    },
  },
};
</script>

<style></style>
