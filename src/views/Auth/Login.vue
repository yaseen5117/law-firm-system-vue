<template>
  <main id="main">
    <page-header
      :title="'Welcome Back'"
      :petition="null"
      :hideBreadCrumbs="true"
    />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div
            class="col-lg-3 col-md-4 col-sm-12 card"
            style="background-color: rgb(203 203 203 / 12%); padding-top: 10px"
          >
            <form
              @submit.prevent="submitForm($event)"
              class="row g-3"
              id="userlogin"
            >
              <div class="col-md-12 col-sm-12">
                <label>Email</label>
                <input
                  v-model="email"
                  type="text"
                  name="email"
                  class="form-control"
                  placeholder="Enter your email"
                />
                <span v-if="v$.email.$error" class="errorMessage"
                  >Email is Required.</span
                >
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
              <div class="col-md-12 col-sm-12">
                <a href="https://elawfirmpk.com/password/reset">
                  Forgot Password?
                </a>

                <router-link class="d-block" to="/sign-up"
                  >Register your account</router-link
                >
              </div>
            </form>
          </div>
          <div
            class="
              offset-md-1 offset-lg-1
              col-lg-5 col-md-4 col-sm-12
              mt-on-mobile
            "
          >
            <span v-html="this.globalGeneralSetting.login_page_content"></span>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-12">
            <Image
              v-if="globalGeneralSetting.site_file_name"
              :src="
                this.base_url +
                '/storage/attachments/settings' +
                '/' +
                setting_id +
                '/' +
                globalGeneralSetting.site_file_name
              "
              alt="Site Image"
              width="250"
            />
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

export default {
  name: "Login",
  components: { PageHeader, Image },
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