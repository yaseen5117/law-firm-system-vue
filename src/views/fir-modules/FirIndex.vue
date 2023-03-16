<template>
  <main id="main">
    <page-header
      :title="'We Provide the FIR Reader. That will help you to read FIR.'"
      :isNotHeading="true"
      :hideBreadCrumbs="true"
    />
    <section id="services" class="services section-bg">
      <div class="container-fluid" data-aos="fade-up">
        <div class="row">
          <!-- <fir-heading /> -->
          <div class="col-lg-8 col-md-12 col-sm-12">
            <Transition name="fade">
              <div class="card" id="card">
                <h4 style="text-align: center" class="mt-4 mb-1">
                  <b>OFFENCES ATTRACTED</b>
                </h4>
                <div class="container-fluid mt-3">
                  <form class="row mb-2" @submit.prevent="submitForm($event)">
                    <div class="card" id="card">
                      <div class="form-group row mt-4">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                          <label for="">Police Station</label>

                          <input
                            v-model="sectionData.police_station"
                            type="text"
                            id="police_station"
                            class="form-control form-control-sm"
                            placeholder="Police Station"
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                          <label for="">FIR No.</label>

                          <input
                            v-model="sectionData.fir_no"
                            type="text"
                            id="fir_no"
                            class="form-control form-control-sm"
                            placeholder="636"
                          />
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                          <label for="">YEAR</label>

                          <input
                            v-model="sectionData.year"
                            id="year"
                            type="text"
                            class="form-control form-control-sm"
                            placeholder="22"
                          />
                        </div>
                      </div>
                      <div
                        class="form-group row"
                        v-for="(
                          filterSection, filterSectionIndex
                        ) in filterSections"
                        :key="filterSectionIndex"
                      >
                        <div class="col-lg-6 col-md-6 col-sm-12">
                          <label for="">Section</label>

                          <input
                            class="form-control form-control-sm"
                            type="text"
                            v-model="filterSections[filterSectionIndex].section"
                            :id="'section' + filterSectionIndex"
                            @focus="errorClassAddOrRemove(filterSectionIndex)"
                          />
                          <label
                            style="display: none"
                            class="errorMessage"
                            :id="filterSectionIndex"
                            for=""
                            >Section field is required</label
                          >
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-12 mb-2">
                          <label for="">Statute</label>

                          <div class="input-group input-group-sm">
                            <select
                              class="form-control form-control-sm"
                              v-model="
                                filterSections[filterSectionIndex].statute_id
                              "
                            >
                              <option value="">--All--</option>
                              <option
                                v-for="statute in statutes"
                                :key="statute.id"
                                :value="statute.id"
                              >
                                {{ statute.title }}
                              </option>
                            </select>
                            <div
                              class="input-group-append"
                              v-if="filterSectionIndex > 0"
                            >
                              <label class="input-group-text"
                                ><i
                                  @click="removeSection(filterSectionIndex)"
                                  v-tooltip.top="'Remove'"
                                  class="fa fa-remove rmIcon"
                                ></i
                              ></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="add_more"></div>
                    <div class="col-lg-12 col-md-12 col-sm-12 mb-2">
                      <button
                        style="width: 100%"
                        type="button"
                        class="btn btn-primary btn-sm mr-md-2 mt-3"
                        @click="addMoreSection()"
                        v-tooltip.top="'Add more'"
                      >
                        <i class="fa fa-plus" aria-hidden="true"></i> Add
                      </button>

                      <button
                        style="width: 100%"
                        class="btn btn-success btn-sm mr-md-2 mt-2"
                        v-tooltip.top="'Click to Search'"
                      >
                        <i class="fa fa-search" aria-hidden="true"></i> Go
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition>
          </div>
          <div class="col-lg-4 col-md-12 col-sm-12 mt-fir">
            <div class="card" id="">
              <img src="assets/img/fir/fir.jpg" class="img-fluid" alt="" />
            </div>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 mt-4">
            <div class="card mb-4" id="card">
              <div class="container-fluid">
                <div class="mt-5">
                  <h4>Need Legal Help?</h4>
                  <button class="btn btn-danger">Contact Us</button>
                  <p style="vertical-align: bottom; padding-top: 25px">
                    <b>
                      Reference:
                      <a
                        href="assets/pdf/Code_of_criminal_procedure_1898.pdf"
                        target="_blank"
                        >Code_of_criminal_procedure_1898
                      </a></b
                    >
                  </p>
                </div>
              </div>
            </div>
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
import FirHeading from "./FirHeading.vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  components: {
    PageHeader,
    FirHeading,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      sectionData: { police_station: "", fir_no: "", year: "" },
      filterSections: [
        {
          section: "",
          statute_id: "",
        },
      ],
      firs: [],
      base_url: process.env.VUE_APP_SERVICE_URL,
      statutes: [],
      fir_pdf_download_url: null,
      showExtraDetails: false,
      policeStation: null,
      firNo: null,
      year: null,
    };
  },
  validations() {
    return {
      filterSections: {
        required,
        $each: helpers.forEach({
          section: {
            required,
          },
        }),
      },
    };
  },
  created() {
    this.getStatuses();
  },
  mounted() {
    document.title = "FIR Section";
  },

  methods: {
    //removing errors from sections input
    errorClassAddOrRemove(index) {
      document.getElementById(index).style.display = "none";
      var v = document.getElementById("section" + index);
      v.className = "form-control form-control-sm";
    },
    submitForm: function (event) {
      if (this.SectionInputValidation()) {
        localStorage.setItem(
          "filterSections",
          JSON.stringify(this.filterSections)
        );
        localStorage.setItem("sectionData", JSON.stringify(this.sectionData));
        this.$router.push({
          name: "fir_reader_result",
        });
      }
    },
    SectionInputValidation() {
      var isValid = true;
      this.filterSections.forEach(function (singeFilterSection, i) {
        if (!singeFilterSection.section) {
          document.getElementById(i).style.display = "block";
          var v = document.getElementById("section" + i);
          console.log("NAme::::", v);
          v.className = "form-control form-control-sm error";
          //document.getElementsByName(i).classList.add("error-boarder");
          //console.log("element: ", element);
          isValid = false;
        }
      });
      return isValid;
    },
    getStatuses() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/statutes";
      axios
        .get(url, { headers })
        .then((response) => {
          this.statutes = response.data.statutes;
          console.log(this.statutes);
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

    addMoreSection() {
      var singleSection = {
        section: "",
        statute_id: "",
      };
      this.filterSections.push(singleSection);
    },
    removeSection: function (index) {
      this.filterSections.splice(index, 1);
    },
  },
};
</script>

<style scoped>
#card {
  box-shadow: 0 0 11px rgba(15, 15, 15, 0.11);
}
#card:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}
@media only screen and (max-width: 768px) {
  .mt-fir {
    margin-top: 8px;
  }
}
.removeIcon {
  text-align: right;
  justify-content: right;
}
.rmIcon {
  font-size: 20px;
  color: red;
  cursor: pointer;
}
.error {
  border: 1px solid red;
}
</style>
