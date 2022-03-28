<template>
  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top">
    <PageLoader />
    <div class="container d-flex align-items-center justify-content-between">
      <h1 class="logo"><router-link to="/">LFMS</router-link></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar">
        <ul>
          <li>
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li v-if="this.user">
            <router-link class="nav-link" to="/dashboard"
              >Welcome {{ this.user.name }}!</router-link
            >
          </li>
          <li v-if="this.user">
            <router-link class="nav-link" to="/dashboard"
              >Dashboard</router-link
            >
          </li>
          <li v-if="!this.user">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-if="!this.user">
            <router-link class="nav-link" to="/sign-up">Sign Up</router-link>
          </li>
         
          <!-- <li><a class="nav-link scrollto" href="#">Link-1</a></li>
          <li><a class="nav-link scrollto" href="#">Link-2</a></li>           -->
          <li class="dropdown" v-show="this.user && this.user.is_admin">
            <a href="javascript:void"
              ><span>Settings</span> <i class="bi bi-chevron-down"></i
            ></a>
            <ul>
              <li><router-link class="nav-link" to="/users">Users</router-link></li>
              <li><router-link class="nav-link" to="/my-profile">My Profile</router-link></li>
              <li class="dropdown">
                <a href="#"
                  ><span>System Settings</span>
                  <i class="bi bi-chevron-right"></i
                ></a>
                <ul>
                  <li><router-link class="nav-link" to="/users">Users</router-link></li>
                  <li><a href="#">System Setting 2</a></li>
                  <li><a href="#">System Setting 3</a></li>
                  <li><a href="#">System Setting 4</a></li>
                </ul>
              </li>
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
  computed: mapState(["user"]),
  components: {
    PageLoader,     
  },
  methods: {
    logout() {
      localStorage.removeItem("lfms_user");
      this.$store.dispatch("authUser");
      this.$router.push({ name: "Login" });
    },
  },

  mounted() {
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

<style>
</style>