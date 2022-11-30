<template>
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main">
      <page-header
        :title="'Elawfirm Limitation Calculator'"
        :petition="null"
        :hideCaseFiles="true"
        :showInvoices="false"
      />
      <section id="services" class="services section-bg">
        <BlockUI :blocked="links" :fullScreen="true">
          <div class="container" data-aos="fade-up">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <!-- Title Container -->
                <div class="container text-center" style="margin-bottom: -22px">
                  <p>
                    Limitation Calculator allows you to calculate the last date
                    before which your case must be filed. It is based on
                    Pakistani laws related to limitation, primarily Limitation
                    Act, 1908.
                  </p>
                  <br />
                </div>
                <!-- Title Container End-->

                <!-- limitaion Container start -->
                <div
                  id="band"
                  class="container"
                  v-if="limitationCalculatorCases.length > 0"
                >
                  <div class="card">
                    <div class="container-fluid">
                      <!-- <h2>What kind of case are you filing?</h2>
                    <br /> -->
                      <!--  Limitation Dropdown -->
                      <div class="row mt-2">
                        <div class="col-lg-4 col-md-4 col-sm-12 mb-2">
                          <label for=""
                            >What kind of case are you filing?</label
                          >
                          <div class="row">
                            <div class="col-lg-9 col-md-12 col-sm-12">
                              <select
                                id=""
                                class="form-select form-control mt-2"
                                v-model="newlimitationCalculatorCaseObject"
                                @change="getCaseType"
                              >
                                <option value="">Select Case</option>
                                <option
                                  v-for="limitationCalculatorCase in limitationCalculatorCases"
                                  :key="limitationCalculatorCase.id"
                                  :value="limitationCalculatorCase"
                                >
                                  {{ limitationCalculatorCase.title }}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <!--  Limitation Dropdown End -->
                        <div class="col-lg-12 col-md-12 col-sm-12">
                          <!-- <label for="">{{ caseQuestion.question }}</label>
                        <select class="form-select form-control mt-2">
                          <option value="">Search for {{}}..</option>
                          <option
                            v-for="caseQuestionAnswer in caseQuestionAnswers"
                            :key="caseQuestionAnswer.id"
                            :value="caseQuestionAnswer.id"
                          >
                            {{ caseQuestionAnswer.answer }}
                          </option>
                        </select> -->
                        </div>
                      </div>
                      <hr />
                      <!--  Limitation box -->

                      <h4 class="mt-2">
                        {{
                          caseQuestion &&
                          caseQuestion.question &&
                          showCaseQuestion
                            ? newlimitationCalculatorCaseObject.title
                            : "Appeal / Application / Revision / Suit"
                        }}
                      </h4>
                      <div v-if="showCaseQuestion" class="mt-2">
                        <label for="">{{ caseQuestion.question }}</label>

                        <br />
                        <Dropdown
                          v-model="newlimitationCalculatorCaseObject.answer_id"
                          :options="caseQuestionAnswers"
                          optionLabel="answer"
                          :placeholder="
                            'Search for ' +
                            newlimitationCalculatorCaseObject.title +
                            '..'
                          "
                          :filter="true"
                          appendTo="self"
                          class="p-inputtext-sm"
                          :filterPlaceholder="
                            'Search for ' +
                            newlimitationCalculatorCaseObject.title +
                            '..'
                          "
                          @change="getSubAnswers()"
                        />
                        <!-- <Listbox
                          v-model="newlimitationCalculatorCaseObject.answer_id"
                          :options="caseQuestionAnswers"
                          :multiple="false"
                          :filter="true"
                          optionLabel="answer"
                          listStyle="max-height:250px"
                          style="width: 100%"
                          :filterPlaceholder="
                            'Search for ' +
                            newlimitationCalculatorCaseObject.title +
                            '..'
                          "
                          class="mb-2"
                          @change="getSubAnswers()"
                        >
                        </Listbox> -->
                      </div>
                      <div
                        v-if="newlimitationCalculatorCaseObject.answer_id"
                        class="accordion mt-3"
                        id="accordionExample"
                      >
                        <div class="accordion-item">
                          <div
                            id="collapseOne"
                            class="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                            style="
                              border-left-style: solid;
                              color: rgb(143 58 48);
                            "
                          >
                            <div class="accordion-body">
                              {{
                                newlimitationCalculatorCaseObject.answer_id
                                  .answer
                              }}
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr />
                      <!-- Limition box End-->

                      <!-- challenging date box -->
                      <div v-if="showCaseSubAnswers && subAnswers.length > 0">
                        <div
                          class="row"
                          v-for="(subAnswer, subAnswerIndex) in subAnswers"
                          :key="subAnswer.id"
                          :value="subAnswer"
                        >
                          <div class="col-lg-12 col-md-12 col-sm-12">
                            <h5 class="">
                              Q{{ subAnswerIndex + 1 }}.
                              {{ subAnswer.sub_answer }}
                            </h5>
                          </div>
                          <div class="col-lg-3 col-md-4 col-sm-12">
                            <b> {{ subAnswer.date_field_label }}: </b>
                            <input
                              class="form-control mb-2"
                              type="date"
                              v-model="date"
                              @change="
                                subAnswer.id ? setDate(subAnswer.days) : ''
                              "
                              :id="
                                subAnswer.date_field_label.replace(/ +/g, '')
                              "
                            />
                          </div>
                          <hr />
                        </div>
                      </div>

                      <!-- challenging date box End -->

                      <!-- Order date box -->

                      <!-- <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                          <h4 class="mt-3">
                            Q2: Date of applied for a certified copy?
                          </h4>
                        </div>
                        <br />
                        <div class="col-lg-3 col-md-4 col-sm-12">
                          <b> Order Date : </b
                          ><input
                            class="form-control mb-2"
                            type="date"
                            onchange="setDate();"
                            id="Orderdate"
                          />
                        </div>
                      </div> -->
                      <!-- <hr /> -->
                      <!-- Order date box End-->

                      <!-- Prepared date box -->

                      <!-- <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                          <h4 class="mt-3">Q3: Date of copy prepared?</h4>
                          <br />
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-12">
                          <b> Prepared Date : </b>
                          <input
                            class="form-control mb-2"
                            type="date"
                            onchange="setDate();"
                            id="Prepareddate"
                          />
                        </div>
                      </div>
                      <hr /> -->
                      <!-- Prepared date box End -->

                      <!-- Filing date box -->

                      <div class="row">
                        <div class="col-12">
                          <h5 class="mt-3">
                            Time Period: <b> <span id="time"> </span></b>
                          </h5>
                          <h5><span> </span><b>Last Date of Filing:</b></h5>
                          <b>
                            <h2
                              class="w3-animate-top"
                              style="margin-bottom: 80px; font-weight: bold"
                              id="demo"
                            ></h2
                          ></b>
                        </div>
                        <!-- Reminder button -->
                        <div class="2">
                          <button
                            @click="clickToRemind()"
                            class="btn btn-outline-secondary"
                          >
                            Click to reminde me
                          </button>
                        </div>
                        <div class="col-12">
                          <p style="color: red; vertical-align: bottom">
                            <b>
                              Note: Date might be slightly different due to
                              holidays</b
                            >
                          </p>
                        </div>
                        <div class="col-12">
                          <p
                            style="
                              color: blue;
                              vertical-align: bottom;
                              padding-top: 25px;
                            "
                          >
                            <b>
                              Reference:
                              <a
                                href="https://www.ma-law.org.pk/pdflaw/Limitation%20%20Act%20-%201908.pdf"
                                target="_blank"
                                >THE LIMITATION ACT NO. IX OF 1908
                              </a></b
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Filing date box End -->
                </div>
                <!-- limitation Container end -->
                <div
                  v-if="!isLoaded"
                  class="container col-lg-12 col-md-12 col-sm-12"
                >
                  <p class="alert alert-warning">Loading....</p>
                </div>
              </div>
            </div>
          </div>
        </BlockUI>
      </section>
    </main>
    <!-- End #main -->
  </BlockUI>
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import Editor from "primevue/editor";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Listbox from "primevue/listbox";
import moment from "moment";

export default {
  components: {
    PageHeader,
    Listbox,
  },

  data() {
    return {
      limitationCalculatorCases: "",
      newlimitationCalculatorCaseObject: {
        case_id: "",
        answer_id: "",
      },
      caseQuestion: {},
      caseQuestionAnswers: [],
      showCaseQuestion: false,
      saving: false,
      base_url: process.env.VUE_APP_SERVICE_URL,
      isLoaded: false,
      subAnswers: [],
      showCaseSubAnswers: false,
    };
  },
  created() {
    this.getLimitationCalculatorCases();
  },
  mounted() {
    document.title = "Limitation Calculator";
  },
  methods: {
    getLimitationCalculatorCases() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/limitation_calculator_cases";
      axios
        .get(url, { headers })
        .then((response) => {
          this.limitationCalculatorCases =
            response.data.limitation_calculator_cases;
          this.newlimitationCalculatorCaseObject = "";
          this.isLoaded = true;
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    setDate(daysFromDropDown) {
      // Holidays date
      var decholiday = new Date("December 25");
      var augholiday = new Date("August 14");
      var kashmirday = new Date("February 5");
      var Labourday = new Date("May 1");
      var march = new Date("March 23");

      var globalVariable; // global variable
      document.querySelector("#time").innerHTML;
      // appeal dates
      if (this.newlimitationCalculatorCaseObject.title == "Suit") {
        document.querySelector("#time").innerHTML = "";
      } else {
        document.querySelector("#time").innerHTML =
          daysFromDropDown > 0 ? daysFromDropDown + " Days" : "";
      }
      var selectedvalue = daysFromDropDown > 0 ? daysFromDropDown : 0;
      //selected case filling days

      //Challanging Date
      var rawChallengingdate = document.querySelector("#ChallengingDate").value; // Challenging Date
      var newChallengingdate = moment(rawChallengingdate).format("MMMM D Y");
      var Challengingdate = new Date(newChallengingdate);
      console.log("Challengingdate", Challengingdate);

      //Order Date
      var Orderdate = "Invalid Date";
      var OrderDateElement = document.querySelector("#OrderDate");
      if (OrderDateElement) {
        var rawOrderdate = document.querySelector("#OrderDate").value; // Challenging Date
        var newOrderdate = moment(rawOrderdate).format("MMMM D Y");
        var Orderdate = new Date(newOrderdate);
        console.log("Orderdate", Orderdate);
      }

      //Prepared Date
      var Prepareddate = "Invalid Date";
      var PreparedDateElement = document.querySelector("#PreparedDate");
      if (PreparedDateElement) {
        var rawPrepareddate = document.querySelector("#PreparedDate").value; // Challenging Date
        var newPrepareddate = moment(rawPrepareddate).format("MMMM D Y");
        var Prepareddate = new Date(newPrepareddate);
        console.log("Prepareddate", Prepareddate);
      }
      if (
        Orderdate < Challengingdate ||
        Prepareddate < Orderdate ||
        Prepareddate < Challengingdate
      ) {
        alert("Check Dates Again! ");
      }

      var diffTime = Math.abs(Prepareddate - Orderdate); // calculate prepared-order

      var preparesuborder = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (Orderdate == "Invalid Date" && Prepareddate == "Invalid Date") {
        Challengingdate.setDate(
          Challengingdate.getDate() + parseInt(selectedvalue)
        );
      } else if (Prepareddate == "Invalid Date") {
        Challengingdate.setDate(
          Challengingdate.getDate() +
            Orderdate.getDate() +
            parseInt(selectedvalue)
        );
      } else {
        Challengingdate.setDate(
          Challengingdate.getDate() +
            parseInt(preparesuborder) +
            parseInt(selectedvalue)
        );
      }

      //All days calculation
      var updated_date = Challengingdate.toDateString(); // set Updated Date

      // for sunday
      if (Challengingdate.getDay() == 0) {
        var days = 1;
        Challengingdate.setDate(Challengingdate.getDate() + parseInt(days));
        var filingdate = Challengingdate.toDateString();

        document.querySelector("#demo").innerHTML = filingdate
          .split(" ")
          .join("-");
      }

      // for 25 dec
      if (
        Challengingdate.toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
        }) ==
        decholiday.toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
        })
      ) {
        var days = 1;
        Challengingdate.setDate(Challengingdate.getDate() + parseInt(days)); // Add day because of holiday

        if (Challengingdate.getDay() == 0) {
          // for sunday check
          var days = 1;
          Challengingdate.setDate(Challengingdate.getDate() + parseInt(days));
        }

        var filingdate = Challengingdate.toDateString();
        document.querySelector("#demo").innerHTML =
          filingdate.split(" ").join("-") +
          " Date Updated , Because of 25 December holiday";
      }

      // for 14 Aug
      else if (
        Challengingdate.toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
        }) ==
        augholiday.toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
        })
      ) {
        var days = 1;
        Challengingdate.setDate(Challengingdate.getDate() + parseInt(days)); // Add day because of holiday
        if (Challengingdate.getDay() == 0) {
          // for sunday check
          var days = 1;
          Challengingdate.setDate(Challengingdate.getDate() + parseInt(days));
        }

        var filingdate = Challengingdate.toDateString();
        document.querySelector("#demo").innerHTML =
          filingdate.split(" ").join("-") +
          " Date updated, Because of 14 August holiday";
      }
      // for 5Feb kashmirday
      else if (
        Challengingdate.toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
        }) ==
        kashmirday.toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
        })
      ) {
        var days = 1;
        Challengingdate.setDate(Challengingdate.getDate() + parseInt(days)); // Add day because of holiday

        if (Challengingdate.getDay() == 0) {
          // for sunday check
          var days = 1;
          Challengingdate.setDate(Challengingdate.getDate() + parseInt(days));
        }

        var filingdate = Challengingdate.toDateString();
        document.querySelector("#demo").innerHTML =
          filingdate.split(" ").join("-") +
          " Date updated, Because of 5 Feb Kashmir day ";
      }

      // for 1 May Labourday
      else if (
        Challengingdate.toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
        }) ==
        Labourday.toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
        })
      ) {
        var days = 1;
        Challengingdate.setDate(Challengingdate.getDate() + parseInt(days)); // Add day because of holiday
        if (Challengingdate.getDay() == 0) {
          // for sunday check
          var days = 1;
          Challengingdate.setDate(Challengingdate.getDate() + parseInt(days));
        }

        var filingdate = Challengingdate.toDateString();
        document.querySelector("#demo").innerHTML =
          filingdate.split(" ").join("-") +
          " Date updated, Because of 1 May Labour holiday";
      }
      // for 23 march
      else if (
        Challengingdate.toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
        }) ==
        march.toLocaleDateString("en-us", { month: "long", day: "numeric" })
      ) {
        var days = 1;
        Challengingdate.setDate(Challengingdate.getDate() + parseInt(days)); // Add day because of holiday
        if (Challengingdate.getDay() == 0) {
          // for sunday check
          var days = 1;
          Challengingdate.setDate(Challengingdate.getDate() + parseInt(days));
        }

        var filingdate = Challengingdate.toDateString();
        document.querySelector("#demo").innerHTML =
          filingdate.split(" ").join("-") +
          " Date updated, Because of 23 March Resolution Day ";
      } else {
        var filingdate = Challengingdate.toDateString();
        document.querySelector("#demo").innerHTML = filingdate
          .split(" ")
          .join("-");
      } // function end
    },
    getSubAnswers() {
      console.log(
        "NEW DATA: ",
        this.newlimitationCalculatorCaseObject.answer_id
      );
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/limitation_calculator_case_sub_answers";
      axios
        .post(
          url,
          {
            anser_id: this.newlimitationCalculatorCaseObject.answer_id.id,
          },
          { headers }
        )
        .then((response) => {
          this.showCaseSubAnswers = true;
          this.subAnswers = response.data.subAnswers;
          console.log("Sub Answers", this.subAnswers);
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    clickToRemind() {
      alert("Coming Soon!");
    },
    getCaseType() {
      if (!this.newlimitationCalculatorCaseObject) {
        this.showCaseQuestion = false;
        this.showCaseSubAnswers = false;
        document.querySelector("#time").innerHTML = "";
        document.querySelector("#demo").innerHTML = "";
        return;
      }
      this.isLoaded = false;
      this.showCaseQuestion = true;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/limitation_calculator_case_questions";
      axios
        .post(
          url,
          { case_id: this.newlimitationCalculatorCaseObject.id },
          { headers }
        )
        .then((response) => {
          this.caseQuestion = response.data.caseQuestion;
          this.caseQuestionAnswers =
            response.data.caseQuestion.limitation_calculator_answers;
          this.isLoaded = true;
          this.showCaseSubAnswers = false;
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
  },
};
</script>

<style scoped></style>
