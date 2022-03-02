<template>
  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center justify-content-between">
      <h1 class="logo"><router-link to="/">LFMS</router-link></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar">
        <ul>
          <li>
            <router-link class="nav-link" to="/"
              >Home</router-link
            >
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
          <li v-if="this.user">
            <a class="nav-link" href="javascript:void" @click="logout()"
              >Logout</a
            >
          </li>
          <!-- <li><a class="nav-link scrollto" href="#">Link-1</a></li>
          <li><a class="nav-link scrollto" href="#">Link-2</a></li>           -->
          <li class="dropdown">
            <a href="#"
              ><span>Settings</span> <i class="bi bi-chevron-down"></i
            ></a>
            <ul>
              <li><a href="#">User</a></li>
              <li class="dropdown">
                <a href="#"
                  ><span>System Settings</span>
                  <i class="bi bi-chevron-right"></i
                ></a>
                <ul>
                  <li><a href="#">System Setting 1</a></li>
                  <li><a href="#">System Setting 2</a></li>
                  <li><a href="#">System Setting 3</a></li>
                  <li><a href="#">System Setting 4</a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle" @click="showMobileMenu(e)"></i>
      </nav>
      <!-- .navbar -->
    </div>
  </header>
  <!-- End Header -->
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  computed: mapState(["user"]),
  methods: {
    showMobileMenu(e) {
      document.querySelector("#navbar").classList.toggle("navbar-mobile");
    },
    logout() {
      localStorage.removeItem("lfms_user");
      this.$store.dispatch("authUser");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style>
</style>