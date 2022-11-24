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
                            editOpinion(limitationCalculatorCase)
                          "
                        />
                        <span v-show="!limitationCalculatorCase.editMode">{{
                          limitationCalculatorCase.title
                        }}</span>
                      </td>
                      <td>
                        <input
                          v-show="limitationCalculatorCase.editMode"
                          class="form-control"
                          v-model="limitationCalculatorCase.display_order"
                          v-on:keyup.enter="
                            editOpinion(limitationCalculatorCase)
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
                          @click="editOpinion(limitationCalculatorCase)"
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
                            deleteOpinion(
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
                          v-on:keyup.enter="submitOpinion()"
                        />
                      </td>
                      <td>
                        <input
                          class="form-control"
                          type="text"
                          v-model="newLimitationCalculatorCase.display_order"
                          v-on:keyup.enter="submitOpinion()"
                        />
                      </td>
                      <td>
                        <button
                          :disabled="saving"
                          @click="submitOpinion()"
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

export default {
  components: { PageHeader, NavComponents },

  data() {
    return {
      page_title: "Opinions",
      base_url: process.env.VUE_APP_SERVICE_URL,
      limitationCalculatorCases: [],
      newLimitationCalculatorCase: {},
      petition: {},
      saving: false,
      blockPanel: true,
    };
  },

  created() {
    this.getLimitationCalculatorCases();
  },
  mounted() {
    document.getElementById("header");
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

    deleteOpinion(event, opinionId, opinionIndex) {
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
            .delete(this.base_url + "/api/opinions/" + opinionId, {
              headers,
            })
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
                  this.opinions.splice(opinionIndex, 1); //removing record from list/index after deleting record from DB
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
    editOpinion(OpinionToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/opinions", OpinionToUpdate, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Update Successfully!",
                });
                OpinionToUpdate.editMode = false;
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
    submitOpinion() {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;
        axios
          .post(
            this.base_url + "/api/opinions",
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
