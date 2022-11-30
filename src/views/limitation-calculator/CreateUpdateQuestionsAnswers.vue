<template>
  <ConfirmPopup />
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main">
      <page-header
        :title="page_title"
        :hideCaseFiles="true"
        :showLCLink="true"
        :petition="null"
      />
      <section id="services" class="services section-bg">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <form @submit.prevent="submitForm($event)">
                <div class="form-group row">
                  <div class="col-lg-3 col-md-4 col-sm-12">
                    <label for="">
                      Case<span style="color: red">*</span>
                    </label>
                    <Dropdown
                      v-model="
                        newLimitationCalculatorCaseQuestionAndAnswer.limitation_calculator_case_id
                      "
                      :options="limitationCalculatorCases"
                      optionLabel="title"
                      class="p-inputtext-sm"
                      optionValue="id"
                      placeholder="Select a Case"
                      :filter="true"
                      :showClear="true"
                      appendTo="self"
                      filterPlaceholder="Find by Case title"
                      @blur="
                        v$.newLimitationCalculatorCaseQuestionAndAnswer
                          .limitation_calculator_case_id.$touch;
                      "
                      v-bind:class="{
                        'error-boarder':
                          v$.newLimitationCalculatorCaseQuestionAndAnswer
                            .limitation_calculator_case_id.$error,
                      }"
                    />
                    <span
                      v-if="
                        v$.newLimitationCalculatorCaseQuestionAndAnswer
                          .limitation_calculator_case_id.$error
                      "
                      class="errorMessage"
                      >Case field is required.</span
                    >
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label for="">
                      Question<span style="color: red">*</span>
                    </label>
                    <input
                      type="text"
                      v-model="
                        newLimitationCalculatorCaseQuestionAndAnswer.question
                      "
                      class="form-control"
                      @blur="
                        v$.newLimitationCalculatorCaseQuestionAndAnswer.question
                          .$touch;
                      "
                      v-bind:class="{
                        'error-boarder':
                          v$.newLimitationCalculatorCaseQuestionAndAnswer
                            .question.$error,
                      }"
                    />
                    <span
                      v-if="
                        v$.newLimitationCalculatorCaseQuestionAndAnswer.question
                          .$error
                      "
                      class="errorMessage"
                      >Question field is required.</span
                    >
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label for=""> Answer </label>
                    <button
                      v-tooltip.top="'Add New Answer'"
                      type="button"
                      @click="addAnotherAnswer()"
                      class="margin-plus-btn btn-primary"
                    >
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                    <template
                      v-for="(
                        answer, i
                      ) in newLimitationCalculatorCaseQuestionAndAnswer.limitation_calculator_answers"
                      :key="answer.id"
                    >
                      <div class="input-group">
                        <input
                          type="text"
                          v-model.lazy="
                            newLimitationCalculatorCaseQuestionAndAnswer
                              .limitation_calculator_answers[i].answer
                          "
                          class="form-control mb-1"
                          aria-describedby="button-addon2"
                        />

                        <button
                          v-tooltip.top="'Sub Answers'"
                          class="btn btn-sm btn-success mb-1"
                          type="button"
                          id="button-addon2"
                          @click="addSubAnswer(i)"
                        >
                          <i :id="'fav' + i" class="fa fa-plus"></i>
                        </button>
                        <button
                          v-tooltip.top="'Permanently Delete This Answer'"
                          class="btn btn-sm btn-danger mb-1"
                          type="button"
                          id="button-addon2"
                          v-if="
                            newLimitationCalculatorCaseQuestionAndAnswer
                              .limitation_calculator_answers[i].id
                          "
                          @click="
                            deleteAnswer(
                              $event,
                              newLimitationCalculatorCaseQuestionAndAnswer
                                .limitation_calculator_answers[i].id,
                              i
                            )
                          "
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      </div>
                      <div
                        :id="'box' + i"
                        style="display: none"
                        class="form-group"
                      >
                        <div class="card">
                          <div class="card-header">
                            <span><b>Sub Answers</b></span>
                            <span class="margin-l"
                              ><button
                                type="button"
                                @click="addAnOtherSubAnswer(i)"
                                v-tooltip.top="'Add New Sub Aswer'"
                                class="btn btn-sm btn-primary"
                              >
                                <i class="fa fa-plus"></i></button
                            ></span>
                          </div>
                          <div class="card-body">
                            <div
                              class="form-group row"
                              v-for="(
                                subAnswer, index
                              ) in newLimitationCalculatorCaseQuestionAndAnswer
                                .limitation_calculator_answers[i]
                                .limitation_calculator_sub_answers"
                              :key="subAnswer.id"
                            >
                              <div class="col-lg-6">
                                <label for="">Question</label>
                                <textarea
                                  v-model="
                                    newLimitationCalculatorCaseQuestionAndAnswer
                                      .limitation_calculator_answers[i]
                                      .limitation_calculator_sub_answers[index]
                                      .sub_answer
                                  "
                                  type="text"
                                  class="form-control"
                                  aria-describedby="emailHelp"
                                  placeholder="Enter sub answer question"
                                />
                              </div>
                              <div class="col-lg-2">
                                <label for="">Date Type</label>
                                <select
                                  v-model="
                                    newLimitationCalculatorCaseQuestionAndAnswer
                                      .limitation_calculator_answers[i]
                                      .limitation_calculator_sub_answers[index]
                                      .date_field_label
                                  "
                                  class="form-control"
                                >
                                  <option value="">Select</option>
                                  <option>Challanging Date</option>
                                  <option>Order Date</option>
                                  <option>Prepared Date</option>
                                </select>
                              </div>
                              <div class="col-lg-2">
                                <label for="">Days</label>
                                <input
                                  v-model="
                                    newLimitationCalculatorCaseQuestionAndAnswer
                                      .limitation_calculator_answers[i]
                                      .limitation_calculator_sub_answers[index]
                                      .days
                                  "
                                  class="form-control"
                                  type="text"
                                  placeholder="no. of days"
                                />
                              </div>
                              <div class="col-lg-2">
                                <label for="">Display Order</label>
                                <div class="input-group">
                                  <input
                                    type="text"
                                    v-model="
                                      newLimitationCalculatorCaseQuestionAndAnswer
                                        .limitation_calculator_answers[i]
                                        .limitation_calculator_sub_answers[
                                        index
                                      ].display_order
                                    "
                                    placeholder="Display Order"
                                    class="form-control"
                                    aria-describedby="button-addon2"
                                  />

                                  <button
                                    v-if="
                                      newLimitationCalculatorCaseQuestionAndAnswer
                                        .limitation_calculator_answers[i]
                                        .limitation_calculator_sub_answers[
                                        index
                                      ].id
                                    "
                                    v-tooltip.top="'Delete Sub Answers'"
                                    class="btn btn-sm btn-danger"
                                    type="button"
                                    id="button-addon2"
                                    @click="
                                      deleteSubAnswer(
                                        $event,
                                        newLimitationCalculatorCaseQuestionAndAnswer
                                          .limitation_calculator_answers[i]
                                          .limitation_calculator_sub_answers[
                                          index
                                        ].id,
                                        index,
                                        i
                                      )
                                    "
                                  >
                                    <i :id="'fav' + i" class="fa fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-sm-2">
                    <button :disabled="saving" class="btn btn-success btn-sm">
                      {{ button_title }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!-- End #main -->
  </BlockUI>
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Dialog from "primevue/dialog";
import $ from "jquery";

export default {
  components: {
    PageHeader,
    Dialog,
    $,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      isLoaded: true,
      saving: false,
      page_title: this.$route.params.question_id
        ? "Edit Limitation Calculator Case Question And Answers"
        : "Add Limitation Calculator Case Question And Answers",
      button_title: this.$route.params.question_id ? "Update" : "Save",
      base_url: process.env.VUE_APP_SERVICE_URL,
      newLimitationCalculatorCaseQuestionAndAnswer: {
        limitation_calculator_case_id: null,
        question: "",
        limitation_calculator_answers: [],
      },

      limitationCalculatorCases: [],
    };
  },
  validations() {
    return {
      newLimitationCalculatorCaseQuestionAndAnswer: {
        limitation_calculator_case_id: { required },
        question: { required },
      },
    };
  },
  created() {
    this.getLimitationCalculatorCases();
    if (!this.$route.params.question_id) {
      this.addAnotherAnswer();
    } else {
      this.getQuestionAndAnswers();
    }
  },
  mounted() {
    document.title = this.page_title;
  },
  activated() {},
  methods: {
    addAnOtherSubAnswer(i) {
      console.log("Index: ", i);
      var single_new_sub_answer = {
        id: "",
        date_field_label: "",
        sub_answer: "",
      };
      this.newLimitationCalculatorCaseQuestionAndAnswer.limitation_calculator_answers[
        i
      ].limitation_calculator_sub_answers.push(single_new_sub_answer);
    },
    addSubAnswer(index) {
      var el = document.querySelector("#box" + index);
      $("#fav" + index).toggleClass("fa-plus fa-minus");
      el.style.display = el.style.display === "none" ? "block" : "none";
      if (
        !this.newLimitationCalculatorCaseQuestionAndAnswer
          .limitation_calculator_answers[index]
          .limitation_calculator_sub_answers[0]
      ) {
        this.addAnOtherSubAnswer(index);
      }
    },
    addAnotherAnswer() {
      var single_new_answer = {
        id: "",
        answer: "",
        limitation_calculator_sub_answers: [],
      };
      this.newLimitationCalculatorCaseQuestionAndAnswer.limitation_calculator_answers.push(
        single_new_answer
      );
    },
    getLimitationCalculatorCases() {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        let url = this.base_url + "/api/limitation_calculator_cases";
        axios
          .get(url, { headers })
          .then((response) => {
            this.limitationCalculatorCases =
              response.data.limitation_calculator_cases;
          })
          .catch((error) => {
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.message,
            });
          });
      }
    },
    async getQuestionAndAnswers() {
      this.isLoaded = false;
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        let url =
          this.base_url +
          "/api/get_limitation_calculator_case_questionand_answer/by_question_id/";
        await axios
          .post(
            url,
            { question_id: this.$route.params.question_id },
            { headers }
          )
          .then((response) => {
            console.log("Data: ", response.data.caseQuestion);
            this.newLimitationCalculatorCaseQuestionAndAnswer =
              response.data.caseQuestion;
            console.log(
              "Data-2: ",
              this.newLimitationCalculatorCaseQuestionAndAnswer
            );
            // this.newLimitationCalculatorCaseQuestionAndAnswer.answers =
            //   response.data.caseQuestion.limitation_calculator_answers;
            this.isLoaded = true;
          })
          .catch((error) => {
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.message,
            });
          });
      }
    },
    deleteAnswer(event, answerId, answerIndex) {
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
                "/api/delete_limitation_calculator_case_answer/" +
                answerId,
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
                  this.newLimitationCalculatorCaseQuestionAndAnswer.limitation_calculator_answers.splice(
                    answerIndex,
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
    deleteSubAnswer(event, subAnswerId, subAnswerIndex, answerIndex) {
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
                "/api/delete_limitation_calculator_sub_answer/" +
                subAnswerId,
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

                  this.newLimitationCalculatorCaseQuestionAndAnswer.limitation_calculator_answers[
                    answerIndex
                  ].limitation_calculator_sub_answers.splice(subAnswerIndex, 1); //removing record from list/index after deleting record from DB
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
    submitForm: function (event) {
      this.v$.$validate();
      if (!this.v$.$error) {
        event.preventDefault();

        this.saving = true;
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(
            this.base_url +
              "/api/save_limitation_calculator_case_questions_and_answers",
            this.newLimitationCalculatorCaseQuestionAndAnswer,
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
                this.$router.push({
                  path: "/limitation-calculator-case-question",
                });
              }
              console.log(response);
              this.saving = false;
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
.margin-l {
  margin-left: 5px;
}
.margin-plus-btn {
  margin-left: 5px;
  margin-bottom: 2px;
}
</style>
