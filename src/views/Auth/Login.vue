<template>
  <main id="main">
    <page-header
      :title="'Welcome Back | Login To Start Your Session'"
      :petition="null"
      :hideBreadCrumbs="true"
    />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div
            class="col-md-4 offset-md-4 card mt-3 p-3"
            style=""
          >
            <form
              @submit.prevent="submitForm($event)"
              class="row g-3"
              id="userlogin"
            >
              <div class="col-md-12 col-sm-12">
                <label>Email</label>
                <InputText
                  style="width: 100%"
                  placeholder="Enter your email"
                  name="email"
                  type="text"
                  v-model="email"
                />
                <span v-if="v$.email.$error" class="errorMessage"
                  >Email is Required.</span
                >
              </div>
              <div class="col-md-12 col-sm-12">
                <label>Password</label>
                <Password
                  style="width: 100%"
                  :inputStyle="'width: 100%'"
                  v-model="password"
                  :feedback="false"
                  toggleMask
                  placeholder="Enter your password"
                ></Password>
                <span v-if="v$.password.$error" class="errorMessage"
                  >Password is Required.</span
                >
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
                <button :disabled="saving" type="submit" class="btn auth-btn">
                  Login
                </button>
              </div>
              <div class="col-md-12 col-sm-12 text-center">
                <a class="badge rounded-pill bg-success" style="margin-right:2px" href="https://api.elawfirmpk.com/password/reset">
                  Forgot Password?
                </a>

                <router-link class="badge rounded-pill bg-primary" to="/sign-up"
                  >Don't have account? Sign up here!</router-link
                >
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
import { mapState } from "vuex";
import Image from "primevue/image";
import Password from "primevue/password";
import InputText from "primevue/inputtext";

export default {
  name: "Login",
  components: { PageHeader, Image, Password, InputText },
  computed: mapState(["globalGeneralSetting"]),
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      email: "",
      password: "",
      saving: false,
      setting_id: 1,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  mounted() {
    document.getElementById("header");
    document.title = "Login";
  },
  methods: {
    submitForm: function (event) {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();
        data.append("email", this.email);
        data.append("password", this.password);

        event.preventDefault();
        this.saving = true;
        axios.post(this.base_url + "/api/login", data, {}).then(
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
            this.saving = false;
            console.log(error.response.data);
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

<style scoped>
.errorMessage {
  color: red;
}

.badge{
  font-size: 11px !important;
}
.badge:hover{
  color: white;
}
</style>
