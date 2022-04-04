<template>
  <main id="main">
    <page-header
      :title="'Password Reset'"
      :petition="null"
      :hideBreadCrumbs="true"
    />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">         
          <div class="col-md-4"></div>
          <div class="col-md-3">
              <form @submit.prevent="submitForm($event)" class="row g-3">
               
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
                <button :disabled="saving" type="submit" class="btn btn-primary">
                  Send Password Reset Link
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
        email: "",  
        saving: false,        
    };
  },
  validations() {
    return {
        email:{ required, email },        
    };
  },
  methods: {
    submitForm: function (event) {       
      this.v$.$validate();
      if (!this.v$.$error) {
         
        let data = new FormData();
        data.append("email", this.email);       
       
        event.preventDefault();        
        this.saving = true;
        axios
          .post(this.base_url + "/password.email",data,{
            
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Link send successfully, Check Email.",
                });             
                this.saving = false;   
                this.$router.push({ path: "/login" });
              }
              console.log(response);
            },
            (error) => {
              this.saving = false;
              console.log(error.response.data.error);
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

<style>
.errorMessage {
  color: red;
}
</style>