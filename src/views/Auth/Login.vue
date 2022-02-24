<template>
  <div id="login">
    <div class="container">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="login-form bg-light mt-4 p-4">
            <form @submit.prevent="submitForm($event)" class="row g-3">
              <h4>Welcome Back</h4>
              <div class="col-12">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  class="form-control"
                  placeholder="email"
                />   
                <span v-if="v$.email.$error" class="errorMessage">Email is Required.</span>             
              </div>
              <div class="col-12">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <div class="col-12">
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
              <div class="col-12">
                <button type="submit" class="btn btn-dark float-end">
                  Login
                </button>
              </div>
            </form>
            <hr class="mt-4" />
            <div class="col-12">
              <p class="text-center mb-0">
                Have not account yet? <a href="#">Signup</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
  name: "Login",
    setup() {
        return {
        v$: useVuelidate(),
        };
    },
    data() {
    return {
        email: "",
        password: "",    
    };
  },
  validations() {
    return {
        email:{ required },
        password: { required },   
    };
  },
  methods: {
    submitForm: function (event) {       
      this.v$.$validate();
      if (!this.v$.$error) {
        event.preventDefault();

        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        };

        axios
          .post("http://127.0.0.1:8000/api/petitions", this.petition, {
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
  },
};
</script>

<style>
.errorMessage {
  color: red;
}
</style>