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
                  <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
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

                  <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <label
                      >Case Category <span style="color: red">*</span></label
                    >
                    <select
                      class="form-control"
                      v-model="petition.petition_type_id"
                      @blur="v$.petition.petition_type_id.$touch"
                      v-bind:class="{
                        'error-boarder': v$.petition.petition_type_id.$error,
                      }"
                    >
                      <option value="">--Select--</option>
                      <template
                        v-for="petition_type in petition_types"
                        :key="petition_type.id"
                      >
                        <option :value="petition_type.id">
                          {{ petition_type.title }}
                        </option>
                      </template>
                    </select>
                    <span
                      v-if="v$.petition.petition_type_id.$error"
                      class="errorMessage"
                      >Case Category field is required.</span
                    >
                  </div>

                  <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <label>Court</label>
                    <select class="form-control" v-model="petition.court_id">
                      <option value="">--Select--</option>

                      <option
                        v-for="court in courts"
                        :key="court.id"
                        :value="court.id"
                      >
                        {{ court.title }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12">
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
                  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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

                        <div class="input-group mb-1" v-for="(petitioner,index) in petition.petitioners"
                          :key="petitioner">
                          <input
                            placeholder="Name"
                            v-model="petitioner.user.name"
                            class="form-control mb-2"
                        />
                          <div class="input-group-prepend">
                            
                            <span class="input-group-text cursor-pointer"  @click="removeInputRow(petition.petitioners , index)">Delete</span>
                          </div>
                          
                        </div>

                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt">
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

                        <div class="input-group mb-1" v-for="(opponent,index) in petition.opponents"
                          :key="opponent">
                          <input
                          placeholder="Name"
                          v-model="opponent.user.name"
                          class="form-control mb-2"
                        />
                          <div class="input-group-prepend">
                            
                            <span class="input-group-text cursor-pointer"  @click="removeInputRow(petition.opponents , index)">Delete</span>
                          </div>
                          
                        </div> 
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <label>Date Of Institution</label>
                    <datepicker                    
                    :enableTimePicker="false"
                    autoApply           
                    format="dd/MM/yyyy"  
                    placeholder="dd/mm/yyyy"          
                    v-model="petition.institution_date"
                    >
                     </datepicker>
                    <!-- <input
                      type="date"
                      class="form-control"
                      v-model="petition.institution_date"
                    /> -->
                  </div>
                </div>
              </div>

              <div class="form-group">
                <button class="btn btn-success btn-sm mt-2">Save</button>
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
      page_title: this.$route.params.id ? "Edit Petition" : "Add New Petition",
      base_url: process.env.VUE_APP_SERVICE_URL,
      petition: {
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
      },
      clients: [],
      courts: [],
      petition_types: [],
    };
  },
  validations() {
    return {
      petition: {
        petition_type_id: { required },
        title: { required },
        case_no: { required },
      },
    };
  },
  created() {
    this.getUsers();
    this.getCourts();
    this.getPetitionTypes();
    this.getPetition();
  },
  activated() {},
  methods: {
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
    removeInputRow: function (obj ,  index) {
      obj.splice(index,1);          
    },
    submitForm: function (event) {
      this.v$.$validate();
      if (!this.v$.$error) {
        event.preventDefault();

        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        };

        axios
          .post(this.base_url + "/api/petitions", this.petition, {
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
                this.$router.push({ path: "/petitions" });
              }
              console.log(response);
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
    async getUsers() {
      let url = this.base_url + "/api/clients";
      await axios
        .get(url)
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
      await axios
        .get(url)
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
      await axios
        .get(url)
        .then((response) => {
          this.petition_types = response.data.petition_types;
          console.log(this.petition_types);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPetition() {
      if (this.$route.params.id) {
        var url = this.base_url + "/api/petitions/" + this.$route.params.id;
        axios
          .get(url)
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
.card {
  background: #f7f7f7;
}
.form-group {
  margin-bottom: 5px;
}
.errorMessage {
  color: red;
}
.error-boarder {
  border: 1px solid red;
}
@media only screen and (max-width: 768px) {
  .mt {
    margin-top: 5px;
  }
}
</style>