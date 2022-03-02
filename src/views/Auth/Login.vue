<template>
  <main id="main">
    <page-header
      :title="'LOGIN'"
      :petition="null"
      :hideBreadCrumbs="true"
    />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">         
          <div class="col-md-4"></div>
          <div class="col-md-3">
              <form @submit.prevent="submitForm($event)" class="row g-3" id="userlogin">
              <h4>Welcome Back</h4>
              <div class="col-md-12 col-sm-12">
                <label>Email</label>
                <input                 
                    v-model="email"
                    type="text"
                    name="email"
                    class="form-control"
                    placeholder="Enter your email"
                    
                />   
                <span v-if="v$.email.$error" class="errorMessage">Email is Required.</span>             
              </div>
              <div class="col-md-12 col-sm-12">
                <label>Password</label>
                <input                    
                    v-model="password"
                    type="password"
                    name="password"
                    class="form-control"
                    placeholder="Enter your password"
                    
                />
                <span v-if="v$.password.$error" class="errorMessage">Password is Required.</span>            
              </div>
              <div class="col-md-12 col-sm-12">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    
                  />
                  <label class="form-check-label" for="rememberMe">
                    Remember me</label
                  >
                </div>
              </div>
              <div class="col-md-12 col-sm-12">
                <button type="submit" class="btn btn-primary">
                  Login
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
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import PageHeader from "../shared/PageHeader.vue";

export default {
  name: "Login",
  components: { PageHeader },
    setup() {
        return {
        v$: useVuelidate(),
        };
    },
    data() {
    return {
        base_url: process.env.VUE_APP_SERVICE_URL,
        email: process.env.VUE_APP_ADMIN_EMAIL,
        password: process.env.VUE_APP_ADMIN_PASSWORD,    
    };
  },
  validations() {
    return {
        email:{ required, email },
        password: { required },   
    };
  },
  methods: {
    submitForm: function (event) {       
      this.v$.$validate();
      if (!this.v$.$error) {
         
        let data = new FormData();
        data.append("email", this.email);
        data.append("password", this.password);
       
        event.preventDefault();        

        axios
          .post(this.base_url + "/api/login",data,{
            
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Login Successfully!",
                });
                localStorage.setItem("lfms_user", response.data.token);
                this.$store.dispatch("authUser");
                this.$router.push({ path: "/dashboard" });
              }
              console.log(response);
            },
            (error) => {
              console.log(error.response.data.error);
              this.$notify({
                type: "error",
                title: "Can't login",
                text: error.response.data.message,
              });
            }
          );
      }
    },
  },
};
</script>

<style>
.errorMessage {
  color: red;
}
</style>