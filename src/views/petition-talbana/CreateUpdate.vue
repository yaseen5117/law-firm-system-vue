<template>
  <main id="main">
    <page-header :title="page_title" :talbana="null" :petition="petition" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="submitForm($event)">
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Title<span style="color: red">*</span></label>
                    <input
                      class="form-control"
                      v-model="talbana.title"
                      v-bind:class="{
                        'error-boarder': v$.talbana.title.$error,
                      }"
                      @blur="v$.talbana.title.$touch"
                    />
                    <span
                      v-if="v$.talbana.title.$error"
                      class="errorMessage"
                      >Title field is required.</span
                    >
                  </div>

                   <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Talbana Date<span style="color: red">*</span></label>
                    <!-- <datepicker
                    v-bind:class="{
                        'error-boarder': v$.talbana.talbana_date.$error,
                      }"
                      @blur="v$.talbana.talbana_date.$touch"
                      :enableTimePicker="false"
                      autoApply
                      format="dd/MM/yyyy"
                      placeholder="dd/mm/yyyy"
                      v-model="talbana.talbana_date"
                    >
                    </datepicker> -->

                     <input
                      class="form-control"
                      type="text"
                     placeholder="yyyy/mm/dd"
                      v-model="talbana.talbana_date"
                      v-bind:class="{
                        'error-boarder': v$.talbana.talbana_date.$error,
                      }"
                      @blur="v$.talbana.talbana_date.$touch"
                    />
                     <span
                      v-if="v$.talbana.talbana_date.$error"
                      class="errorMessage"
                      >Date field is required.</span
                    >
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Type</label>
                    <select                     
                      class="form-control"
                      v-model="talbana.talbana_type_id"
                    >
                      <option value="">--Select--</option>
                      <option
                        v-for="talbana_type in this.talbana_types"
                        :key="talbana_type.id"
                        :value="talbana_type.id"
                      >
                        {{ talbana_type.title }}
                      </option>
                    </select>                    
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label>Description </label>
                    <input
                      class="form-control"
                      v-model="talbana.description"
                    />
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
      page_title: this.$route.params.id
        ? "Edit Talbana"
        : "Add New Talbana",
      base_url: process.env.VUE_APP_SERVICE_URL,
      talbana: {
        petition_id: this.$route.params.petition_id,
        talbana_type_id: "",
        id: this.$route.params.id, //this is the id from the browser
        title: "",
        description: "",
      },
      petition:{},
      petition_types: [],
      talbana_types: [
        {
          id: 1,
          title: "Type 1",
        },
        {
          id: 2,
          title: "Type 2",
        },
        {
          id: 3,
          title: "Type 3",
        },
      ],
    };
  },
  validations() {
    return {
      talbana: {
        talbana_date: { required },
        title: { required },
      },
    };
  },
  created() {     
    this.getPetitionTypes();
    this.getPetition();
  },
  activated() {},
  methods: {
    submitForm: function (event) {
      this.v$.$validate();
      if (!this.v$.$error) {
        event.preventDefault();

        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(
            this.base_url + "/api/petition_talbana",
            this.talbana,
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
                this.$router.push({ path: "/petition-talbana-index/"+ this.talbana.petition_id});
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
    
    async getPetitionTypes() {
      var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
      let url = this.base_url + "/api/petition_types";
      await axios
        .get(url, {headers})
        .then((response) => {
          this.petition_types = response.data.petition_types;
          console.log(this.petition_types);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPetition() {
      var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
      if (this.$route.params.petition_id) {
        var url = this.base_url + "/api/petitions/" + this.$route.params.petition_id;
        axios
          .get(url, {headers})
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