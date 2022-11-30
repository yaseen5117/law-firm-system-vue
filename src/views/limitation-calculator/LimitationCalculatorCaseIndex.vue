<template>
  <ConfirmPopup />
  <BlockUI
    :blocked="blockPanel"
    :fullScreen="true"
    :autoZIndex="true"
    :baseZIndex="99999"
  >
    <main id="main">
      <page-header
        title="Limitation Calculator Cases"
        :hideBreadCrumbs="true"
      />
      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <div>
              <div class="col-lg-12 col-md-12 col-sm-12">
                <table class="table table-striped">
                  <thead>
                    <th>Title</th>
                    <th>Display Order</th>
                    <th width="10%">Actions</th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(
                        limitationCalculatorCase, limitationCalculatorCaseIndex
                      ) in limitationCalculatorCases"
                      :key="limitationCalculatorCase.id"
                    >
                      <td>
                        <input
                          v-show="limitationCalculatorCase.editMode"
                          class="form-control"
                          type="text"
                          v-model="limitationCalculatorCase.title"
                          v-on:keyup.enter="
                            editLimitationCalculatorCase(
                              limitationCalculatorCase
                            )
                          "
                        />
                        <span v-show="!limitationCalculatorCase.editMode">{{
                          limitationCalculatorCase.title
                        }}</span>
                      </td>
                      <td>
                        <InputNumber
                          style="width: 100%"
                          min="0"
                          inputId="withoutgrouping"
                          mode="decimal"
                          :useGrouping="false"
                          v-show="limitationCalculatorCase.editMode"
                          class="p-inputtext-sm"
                          v-model="limitationCalculatorCase.display_order"
                          v-on:keyup.enter="
                            editLimitationCalculatorCase(
                              limitationCalculatorCase
                            )
                          "
                        />

                        <span v-show="!limitationCalculatorCase.editMode">{{
                          limitationCalculatorCase.display_order
                        }}</span>
                      </td>
                      <td width="15%">
                        <a
                          class="btn btn-sm btn-primary action-btn"
                          v-show="!limitationCalculatorCase.editMode"
                          @click="limitationCalculatorCase.editMode = true"
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
                          v-show="limitationCalculatorCase.editMode"
                          class="btn btn-sm btn-warning action-btn"
                          @click="
                            editLimitationCalculatorCase(
                              limitationCalculatorCase
                            )
                          "
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
                          v-show="limitationCalculatorCase.editMode"
                          @click="limitationCalculatorCase.editMode = false"
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
                          v-show="!limitationCalculatorCase.editMode"
                          @click="
                            deleteLimitationCalculatorCase(
                              $event,
                              limitationCalculatorCase.id,
                              limitationCalculatorCaseIndex
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
                      <td>
                        <input
                          class="form-control"
                          type="text"
                          v-model="newLimitationCalculatorCase.title"
                          v-on:keyup.enter="submitLimitationCalculatorCase()"
                          @blur="v$.newLimitationCalculatorCase.title.$touch"
                          v-bind:class="{
                            'error-boarder':
                              v$.newLimitationCalculatorCase.title.$error,
                          }"
                        />
                        <span
                          v-if="v$.newLimitationCalculatorCase.title.$error"
                          class="errorMessage"
                          >Title field is required.</span
                        >
                      </td>
                      <td>
                        <InputNumber
                          style="width: 100%"
                          min="0"
                          inputId="withoutgrouping"
                          mode="decimal"
                          :useGrouping="false"
                          class="p-inputtext-sm"
                          v-model="newLimitationCalculatorCase.display_order"
                          v-on:keyup.enter="submitLimitationCalculatorCase()"
                        />
                      </td>
                      <td>
                        <button
                          :disabled="saving"
                          @click="submitLimitationCalculatorCase()"
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
  </BlockUI>
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import NavComponents from "../Cases/NavComponents.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import InputNumber from "primevue/inputnumber";

export default {
  components: { PageHeader, NavComponents, InputNumber },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      page_title: "Opinions",
      base_url: process.env.VUE_APP_SERVICE_URL,
      limitationCalculatorCases: [],
      newLimitationCalculatorCase: {},
      saving: false,
      blockPanel: true,
    };
  },
  validations() {
    return {
      newLimitationCalculatorCase: {
        title: { required },
      },
    };
  },
  created() {
    this.getLimitationCalculatorCases();
  },
  mounted() {
    document.title = "Limitation Calculator Cases";
  },

  methods: {
    getLimitationCalculatorCases() {
      this.blockPanel = true;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/limitation_calculator_cases", {
          headers,
        })
        .then((response) => {
          this.blockPanel = false;
          this.limitationCalculatorCases =
            response.data.limitation_calculator_cases;
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

    deleteLimitationCalculatorCase(
      event,
      limitationCalculatorCaseId,
      limitationCalculatorCaseIndex
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
                "/api/limitation_calculator_cases/" +
                limitationCalculatorCaseId,
              {
                headers,
              }
            )
            .then(
              (response) => {
                console.log(response);
                if (response.status === 200) {
                  this.$notify({
                    type: "success",
                    title: "Success",
                    text: "Deleted Successfully!",
                  });
                  //this.getCaseDetails()
                  this.limitationCalculatorCases.splice(
                    limitationCalculatorCaseIndex,
                    1
                  ); //removing record from list/index after deleting record from DB
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
    editLimitationCalculatorCase(LimitationCalculatorCaseToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(
            this.base_url + "/api/limitation_calculator_cases",
            LimitationCalculatorCaseToUpdate,
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
                  text: "Update Successfully!",
                });
                LimitationCalculatorCaseToUpdate.editMode = false;
                this.getLimitationCalculatorCases();
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
    submitLimitationCalculatorCase() {
      this.v$.$validate();
      if (!this.v$.$error) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;
        axios
          .post(
            this.base_url + "/api/limitation_calculator_cases",
            this.newLimitationCalculatorCase,
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
                this.newLimitationCalculatorCase = {};
                // setTimeout(() => {
                //   this.v$.$reset();
                // }, 0);
                this.getLimitationCalculatorCases();
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

<style></style>
