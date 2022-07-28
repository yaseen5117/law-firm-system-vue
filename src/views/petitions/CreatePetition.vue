<template>
  <main id="main">
    <page-header :title="page_title" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="submitForm($event)">
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Case No.<span style="color: red">*</span></label>
                    <input
                      class="form-control"
                      v-model="petition.case_no"
                      v-bind:class="{
                        'error-boarder': v$.petition.case_no.$error,
                      }"
                      @blur="v$.petition.case_no.$touch"
                    />
                    <span v-if="v$.petition.case_no.$error" class="errorMessage"
                      >Case No field is required.</span
                    >
                  </div>

                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Year</label>
                    <input
                      type="text"
                      min="0"
                      class="form-control"
                      v-model="petition.year"
                    />
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Title <span style="color: red">*</span></label>
                    <input
                      v-bind:class="{
                        'error-boarder': v$.petition.title.$error,
                      }"
                      class="form-control"
                      v-model="petition.title"
                      @blur="v$.petition.title.$touch"
                    />
                    <span v-if="v$.petition.title.$error" class="errorMessage"
                      >Title field is required.</span
                    >
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Court</label>
                    <Dropdown
                      v-model="petition.court_id"
                      :options="courts"
                      optionLabel="title"
                      optionValue="id"
                      placeholder="Select a Court"
                      :filter="true"
                      appendTo="self"
                      filterPlaceholder="Find by Title"
                      @change="getCaseCategories(petition.court_id)"
                    />
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Case Category</label>
                    <Dropdown
                      v-model="petition.petition_type_id"
                      :options="petition_types"
                      optionLabel="title"
                      optionValue="id"
                      placeholder="Select a Case Category"
                      :filter="true"
                      appendTo="self"
                      filterPlaceholder="Find by Title"
                    />
                  </div>

                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Lawyer</label>
                    <Multiselect
                      placeholder="--Select--"
                      class="text-capitalize"
                      mode="tags"
                      :close-on-select="false"
                      :searchable="true"
                      v-model="petition.lawyer_ids"
                      :options="lawyers"
                      :value="petition.lawyer_ids"
                    />
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Date of Institution</label>
                    <br />
                    <InputMask
                      v-model="petition.institution_date"
                      mask="99/99/9999"
                      aria-placeholder=""
                      placeholder="dd/mm/yyyy "
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="card">
                      <img
                        class="card-img-top"
                        src="holder.js/100px180/"
                        alt=""
                      />
                      <div class="card-body">
                        <h4 class="card-title">
                          Petitioner
                          <small
                            style="
                              cursor: pointer;
                              font-size: 12px;
                              text-decoration: underline;
                            "
                            @click="addMorePetitioner()"
                            class="pull-right"
                            >Add More</small
                          >
                        </h4>

                        <div
                          class="input-group mb-1"
                          v-for="(petitioner, index) in petition.petitioners"
                          :key="petitioner"
                        >
                          <AutoComplete
                            delay="1"
                            :suggestions="filteredClients"
                            @complete="searchClient($event)"
                            field="name"
                            minLength="3"
                            appendTo="self"
                            placeholder="Name"
                            class="p-autocomplete"
                            v-model="petitioner.user.name"
                          />
                          <div class="input-group-prepend">
                            <span
                              class="input-group-text cursor-pointer"
                              @click="
                                removeInputRow(petition.petitioners, index)
                              "
                              >Delete</span
                            >
                          </div>
                          <div
                            v-if="petitioner.user.id"
                            class="input-group-prepend"
                          >
                            <span class="input-group-text cursor-pointer">
                              <router-link
                                :to="{
                                  name: 'edit-user',
                                  params: { id: petitioner.user.id },
                                }"
                              >
                                View
                              </router-link>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-12 mt">
                    <div class="card">
                      <img
                        class="card-img-top"
                        src="holder.js/100px180/"
                        alt=""
                      />
                      <div class="card-body">
                        <h4 class="card-title">
                          Opponent
                          <small
                            style="
                              cursor: pointer;
                              font-size: 12px;
                              text-decoration: underline;
                            "
                            @click="addMoreOpponent()"
                            class="pull-right"
                            >Add More</small
                          >
                        </h4>

                        <div
                          class="input-group mb-1"
                          v-for="(opponent, index) in petition.opponents"
                          :key="opponent"
                        >
                          <AutoComplete
                            delay="1"
                            :suggestions="filteredClients"
                            @complete="searchClient($event)"
                            field="name"
                            minLength="3"
                            appendTo="self"
                            placeholder="Name"
                            class="p-autocomplete"
                            v-model="opponent.user.name"
                          />
                          <div class="input-group-prepend">
                            <span
                              class="input-group-text cursor-pointer"
                              @click="removeInputRow(petition.opponents, index)"
                              >Delete</span
                            >
                          </div>
                          <div
                            v-if="opponent.user.id"
                            class="input-group-prepend"
                          >
                            <span class="input-group-text cursor-pointer"
                              ><router-link
                                :to="{
                                  name: 'edit-user',
                                  params: { id: opponent.user.id },
                                }"
                              >
                                View
                              </router-link></span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <button :disabled="saving" class="btn btn-success btn-sm">
                  Save
                </button>
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
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    PageHeader,
    Multiselect,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      saving: false,
      page_title: this.$route.params.id ? "Edit Petition" : "Add New Petition",
      base_url: process.env.VUE_APP_SERVICE_URL,
      petition: {
        year: 2022,

        petitioners: [
          {
            user: {},
          },
        ],
        opponents: [
          {
            user: {},
          },
        ],
        petition_type_id: "",
        id: this.$route.params.id, //this is the id from the browser
        court_id: "",
        title: "",
        case_no: "",
        lawyer_ids: [],
      },
      lawyers: [],
      courts: [],
      petition_types: [],
      filteredClients: [],
    };
  },
  validations() {
    return {
      petition: {
        title: { required },
        case_no: { required },
      },
    };
  },
  created() {
    this.getCourts();
    //this.getPetitionTypes();
    this.getPetition();
    this.getLawyers();
  },
  activated() {},
  methods: {
    searchClient(event) {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };

      let url = this.base_url + "/api/clients";
      var query = {
        serach_param: event.query,
      };
      axios
        .get(url, { headers, params: query })
        .then((response) => {
          this.filteredClients = response.data.clients;
          console.log(response.data.clients);
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
    addMorePetitioner: function () {
      var new_petitioner = {
        user: {},
      };
      this.petition.petitioners.push(new_petitioner);
    },
    addMoreOpponent: function () {
      var new_opponent = {
        user: {},
      };
      this.petition.opponents.push(new_opponent);
    },
    removeInputRow: function (obj, index) {
      obj.splice(index, 1);
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
          .post(this.base_url + "/api/petitions", this.petition, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                var petition_id = response.data.petition_id;
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                this.$router.push({ path: "/petitions/" + petition_id });
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
    getLawyers() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/lawyers";
      axios
        .get(url, { headers })
        .then((response) => {
          this.lawyers = response.data.lawyers;
          console.log(this.lawyers);
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
    async getCourts() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/courts";
      await axios
        .get(url, { headers })
        .then((response) => {
          this.courts = response.data.courts;
          console.log(this.courts);
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
    async getCaseCategories(court_id) {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/petition_types";
      await axios
        .get(url, { headers, params: { court_id: court_id } })
        .then((response) => {
          this.petition_types = response.data.petition_types;
          console.log(this.petition_types);
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
    getPetition() {
      if (this.$route.params.id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        var url = this.base_url + "/api/petitions/" + this.$route.params.id;
        axios
          .get(url, { headers })
          .then((response) => {
            this.petition = response.data.petition;
            //this.lawyers = response.data.petition.lawyers;
            this.opponents = [{}];

            this.petition.lawyer_ids = response.data.petition.lawyer_ids_array;
          })
          .catch((error) => {
            console.log(error);
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.message,
            });
          });
      }
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
