<template>
  <main id="main">
    <page-header :title="page_title" :petition="null" :hideBreadCrumbs="true" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
            <div class="alert alert-success " v-if="msgAfterSignUp" role="alert">
                {{msgAfterSignUp}}
            </div>
          <div class="col-md-4 col-lg-4"></div>
          <div class="col-md-8 col-lg-8 col-sm-12">
            <form @submit.prevent="submitForm($event)">
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    
                    <label>Name<span style="color: red">*</span></label>
                    <input
                      class="form-control"
                      v-model="user.name"
                      v-bind:class="{
                        'error-boarder': v$.user.name.$error,
                      }"
                      @blur="v$.user.name.$touch"
                    />
                    <span v-if="v$.user.name.$error" class="errorMessage"
                      >Name field is required.</span
                    >
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Email<span style="color: red">*</span></label>
                    <input
                      type="email"
                      class="form-control"
                      v-model="user.email"
                      v-bind:class="{
                        'error-boarder': v$.user.email.$error,
                      }"
                      @blur="v$.user.email.$touch"
                    />
                    <span v-if="v$.user.email.$error" class="errorMessage"
                      >Email field is required.</span
                    >
                    <small class="text-danger">{{ error_email }} </small>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-12 mt-2">
                    <label>Password<span style="color: red">*</span></label>
                    <input
                      type="password"
                      v-bind:class="{
                        'error-boarder': v$.user.password.$error,
                      }"
                      @blur="v$.user.password.$touch"
                      class="form-control"
                      v-model="user.password"
                    />
                    <span v-if="v$.user.password.$error" class="errorMessage"
                      >Password field is required.</span
                    >
                  </div>

                  <div class="col-lg-3 col-md-3 col-sm-12 mt-2">
                    <label>Confirm Password<span style="color: red">*</span></label>
                    <input
                      type="password"
                      v-bind:class="{
                        'error-boarder': v$.user.confirm_password.$error,
                      }"
                      @blur="v$.user.confirm_password.$touch"
                      class="form-control"
                      v-model="user.confirm_password"
                    />
                    <span
                      v-if="v$.user.confirm_password.$error"
                      class="errorMessage"
                      >Password and Confirm Password should be same.</span
                    >
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Phone</label>
                    <input class="form-control" v-model="user.phone" />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <button class="btn btn-success btn-sm mt-2">Sign Up</button>
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
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";

export default {
  components: { PageHeader },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      page_title: "Sign Up",
      base_url: process.env.VUE_APP_SERVICE_URL,
      user: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        phone: "",
      },
      msgAfterSignUp: "",    
      error_email: "",   
    };
  },
  validations() {
    return {
      user: {
        name: { required },
        email: { required, email },
        password: { required },
        confirm_password: {
            sameAs: sameAs(this.user.password),         
        },
        phone: { required },        
      },
    };
  },
  created() {},

  methods: {
    onChange(e) {
      this.file = e.target.file;
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
          .post(this.base_url + "/api/signup", this.user, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                // this.$notify({
                //   type: "success",
                //   title: "Success",
                //   text: "Account Created Successfully!",
                // });           
                this.user = {};    
                setTimeout(() => { this.v$.$reset() }, 0) 
                 this.msgAfterSignUp = "Account Created Successfully. After Admin Verification You Can Logged Into Your Account. Thanks.";
              }
              console.log(response);
            },
            (error) => {     
              this.error_email = error.response.data.error.email[0]     
                 
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