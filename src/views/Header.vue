<template>
  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center justify-content-between">
      <h1 class="logo">
        <router-link to="/">{{
          this.globalGeneralSetting.site_name
        }}</router-link>
      </h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar">
        <ul>
          <li v-show="!this.user">
            <router-link class="nav-link" @click="scrollIntoView('hero')" to="/"
              >Home</router-link
            >
          </li>
          <li v-show="!this.user">
            <a class="nav-link" href="#about">About Us</a>
          </li>
          <li v-show="!this.user">
            <a class="nav-link" href="#features">Features</a>
          </li>
          <li v-show="!this.user">
            <a class="nav-link" href="#pricing">Pricing</a>
          </li>
          <li v-show="!this.user">
            <a class="nav-link" href="#reviews">Reviews</a>
          </li>
          <li v-show="!this.user">
            <a class="nav-link" href="#contact">Contact Us</a>
          </li>
          <li v-if="this.user && this.user.id">
            <router-link class="nav-link" to="/dashboard"
              >Welcome {{ this.user.name }}!</router-link
            >
          </li>
          <li v-show="this.user">
            <router-link class="nav-link" to="/dashboard"
              >Dashboard</router-link
            >
          </li>
          <li v-if="this.user && this.user.is_client">
            <router-link
              class="nav-link"
              :to="{
                name: 'edit-user',
                params: { edit_user_id: this.user.id },
              }"
              >My Profile</router-link
            >
          </li>
          <li v-show="!this.user">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-show="!this.user">
            <router-link class="nav-link" to="/sign-up">Sign Up</router-link>
          </li>

          <!-- <li><a class="nav-link scrollto" href="#">Link-1</a></li>
          <li><a class="nav-link scrollto" href="#">Link-2</a></li>           -->
          <li v-show="this.user && this.user.is_admin" class="dropdown">
            <a href="javascript:void"
              ><span>Settings</span> <i class="bi bi-chevron-down"></i
            ></a>
            <ul>
              <li v-if="this.user && this.user.id">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'edit-user',
                    params: { edit_user_id: this.user.id },
                  }"
                >
                  My Profile
                </router-link>
              </li>
              <li v-show="this.user && this.user.is_admin">
                <router-link class="nav-link" to="/users">Users</router-link>
              </li>
              <li>
                <router-link class="nav-link" to="/settings"
                  >General Settings</router-link
                >
              </li>
              <li>
                <router-link class="nav-link" to="/courts">Courts</router-link>
              </li>
              <li>
                <router-link to="/petition-types">Case Categories</router-link>
              </li>
              <li>
                <router-link to="/module-types">Module Types</router-link>
              </li>
              <li>
                <router-link to="/contact-requests"
                  >Contact Requests</router-link
                >
              </li>
              <!-- <li class="dropdown" v-show="this.user && this.user.is_admin">
                <a href="javascript:void"
                  ><span>System Settings</span>
                  <i class="bi bi-chevron-right"></i
                ></a>                
              </li> -->
            </ul>
          </li>
          <li v-if="this.user">
            <a class="nav-link" href="javascript:void" @click="logout()"
              >Logout</a
            >
          </li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
      <!-- .navbar -->
    </div>
  </header>

  <!-- End Header -->
</template>

<script>
import { mapState } from "vuex";
import PageLoader from "./shared/PageLoader.vue";
export default {
  name: "Header",
  computed: mapState(["user", "globalGeneralSetting"]),
  components: {
    PageLoader,
  },
  methods: {
    logout() {
      localStorage.removeItem("lfms_user");
      this.$store.dispatch("authUser");
      this.$router.push({ name: "Login" });
    },
    scrollIntoView(id) {
      const yOffset = -200;
      const element = document.getElementById(id);
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
  },

  mounted() {
    //Start nav bar buttons active
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      link.addEventListener("click", function () {
        links.forEach((e) => {
          e.classList.remove("active");
        });
        this.classList.add("active");
      });
    }); //End nav bar buttons active

    document.querySelector(".mobile-nav-toggle").onclick = function () {
      document.querySelector("#navbar").classList.toggle("navbar-mobile");
    };

    document.querySelector(".navbar .dropdown > a").onclick = function (e) {
      if (
        document.querySelector("#navbar").classList.contains("navbar-mobile")
      ) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    };
  },
};
</script>

<style></style>
