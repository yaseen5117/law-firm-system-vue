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
        title="Limitation Calculator Case Questions"
        :hideBreadCrumbs="true"
        :route_object="route_obj"
        :header_button="header_button"
        :header_button_text="header_button_text"
      />
      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <div>
              <div class="col-lg-12 col-md-12 col-sm-12">
                <table class="table table-striped">
                  <thead>
                    <th>Question</th>
                    <th>Case</th>
                    <!-- <th>Display Order</th> -->
                    <th width="10%">Actions</th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(
                        limitationCalculatorCaseQuestion,
                        limitationCalculatorCaseQuestionIndex
                      ) in limitationCalculatorCaseQuestions"
                      :key="limitationCalculatorCaseQuestion.id"
                    >
                      <td>
                        <input
                          v-show="limitationCalculatorCaseQuestion.editMode"
                          class="form-control"
                          type="text"
                          v-model="limitationCalculatorCaseQuestion.question"
                          v-on:keyup.enter="
                            editLimitationCalculatorCase(
                              limitationCalculatorCaseQuestion
                            )
                          "
                        />
                        <span
                          v-show="!limitationCalculatorCaseQuestion.editMode"
                          >{{ limitationCalculatorCaseQuestion.question }}</span
                        >
                      </td>
                      <td>
                        <Dropdown
                          v-show="limitationCalculatorCaseQuestion.editMode"
                          v-model="
                            limitationCalculatorCaseQuestion.limitation_calculator_case_id
                          "
                          :options="limitationCalculatorCases"
                          optionLabel="title"
                          class="p-inputtext-sm drop-down-height"
                          optionValue="id"
                          placeholder="Select a Case"
                          :filter="true"
                          :showClear="true"
                          appendTo="self"
                          filterPlaceholder="Find by Case title"
                        />
                        <span
                          v-if="
                            limitationCalculatorCaseQuestion.limitation_calculator_case
                          "
                          v-show="!limitationCalculatorCaseQuestion.editMode"
                          >{{
                            limitationCalculatorCaseQuestion
                              .limitation_calculator_case.title
                          }}</span
                        >
                      </td>
                      <!-- <td>
                        <InputNumber
                          style="width: 100%"
                          min="0"
                          inputId="withoutgrouping"
                          mode="decimal"
                          :useGrouping="false"
                          v-show="limitationCalculatorCaseQuestion.editMode"
                          class="p-inputtext-sm"
                          v-model="
                            limitationCalculatorCaseQuestion.display_order
                          "
                          v-on:keyup.enter="
                            editLimitationCalculatorCase(
                              limitationCalculatorCaseQuestion
                            )
                          "
                        />

                        <span
                          v-show="!limitationCalculatorCaseQuestion.editMode"
                          >{{
                            limitationCalculatorCaseQuestion.display_order
                          }}</span
                        >
                      </td> -->
                      <td width="15%">
                        <router-link
                          style="margin-right: 2px"
                          :to="{
                            name: 'edit-limitation-calculator-questions-answers',
                            params: {
                              question_id: limitationCalculatorCaseQuestion.id,
                            },
                          }"
                          class="btn btn-primary btn-sm action-btn"
                          role="button"
                          v-tooltip.top="'Edit'"
                          >Edit
                        </router-link>

                        <a
                          class="btn btn-sm btn-danger action-btn"
                          @click="
                            deleteLimitationCalculatorCaseQuestion(
                              $event,
                              limitationCalculatorCaseQuestion.id,
                              limitationCalculatorCaseQuestionIndex
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

import InputNumber from "primevue/inputnumber";

export default {
  components: { PageHeader, NavComponents, InputNumber },

  data() {
    return {
      route_obj: {
        name: "create-limitation-calculator-questions-answers",
      },
      header_button: true,
      header_button_text: "Add Question And Answers",
      base_url: process.env.VUE_APP_SERVICE_URL,
      limitationCalculatorCaseQuestions: [],
      limitationCalculatorCases: [],
      blockPanel: true,
    };
  },

  created() {
    this.getLimitationCalculatorCaseQuestions();
    this.getLimitationCalculatorCases();
  },
  mounted() {
    document.title = "Limitation Calculator Questions";
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
    getLimitationCalculatorCaseQuestions() {
      this.blockPanel = true;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(
          this.base_url + "/api/get_all_limitation_calculator_case_questions",

          {
            headers,
          }
        )
        .then((response) => {
          this.blockPanel = false;
          this.limitationCalculatorCaseQuestions = response.data.caseQuestions;
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

    deleteLimitationCalculatorCaseQuestion(
      event,
      limitationCalculatorQuestionId,
      limitationCalculatorCaseQuestionIndex
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
                "/api/delete_limitation_calculator_case_question/" +
                limitationCalculatorQuestionId,
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
                  this.limitationCalculatorCaseQuestions.splice(
                    limitationCalculatorCaseQuestionIndex,
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
  },
};
</script>

<style></style>
