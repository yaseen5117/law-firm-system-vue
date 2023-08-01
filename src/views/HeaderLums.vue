<template>
  <!-- ======= Header ======= -->
  
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center justify-content-between">
      <div class="logo-container">
            <img src="/assets/img/lums-logo.jpg" class="logo-img" alt="Lums Law Clinic Logo" style="width: 70px!important;" />
            <h1 class="logo">
                <router-link to="/login">Lums Law Clinic</router-link>
            </h1>
        </div>

      <nav id="navbar" class="navbar">
        <ul>

          <li v-if="this.user && this.user.id">
            <router-link class="nav-link" to="/dashboard">Welcome {{ this.user.name }}!</router-link>
          </li>
          <li v-show="this.user">
            <router-link :class="this.$route.name == 'DashBoard' ? 'active nav-link' : 'nav-link'
              " to="/dashboard">Dashboard</router-link>
          </li>
          <li v-if="this.user &&
            (this.user.is_client ||
              this.user.is_student ||
              this.user.is_lawyer)
            ">
            <router-link class="nav-link" :to="{
              name: 'edit-user',
              params: { edit_user_id: this.user.id },
            }">My Profile</router-link>
          </li>
          <li v-show="!this.user">
            <router-link :class="this.$route.name == 'Login' ? 'active nav-link' : 'nav-link'
              " to="/login">Login</router-link>
          </li>
          <li v-show="this.user && this.user.is_admin" class="dropdown">
            <a href="javascript:void"><span>Settings</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li v-if="this.user && this.user.id">
                <router-link :class="this.$route.name == 'edit-user'
                  ? 'active nav-link drop-down'
                  : 'nav-link drop-down'
                  " :to="{
    name: 'edit-user',
    params: { edit_user_id: this.user.id },
  }">
                  My Profile
                </router-link>
              </li>
              <li v-show="this.user && this.user.is_admin">
                <router-link :class="this.$route.name == 'users-list'
                  ? 'active nav-link drop-down'
                  : 'nav-link drop-down'
                  " to="/users">Users</router-link>
              </li>
              <li>
                <router-link :class="this.$route.name == 'settings'
                  ? 'active nav-link drop-down'
                  : 'nav-link drop-down'
                  " to="/settings">General Settings</router-link>
              </li>
              <li>
                <router-link :class="this.$route.name == 'courts'
                  ? 'active nav-link drop-down'
                  : 'nav-link drop-down'
                  " to="/courts">Courts</router-link>
              </li>
              <li>
                <router-link :class="this.$route.name == 'petition-types'
                  ? 'active nav-link drop-down'
                  : 'nav-link drop-down'
                  " to="/petition-types">Case Categories</router-link>
              </li>
              <li>
                <router-link :class="this.$route.name == 'module-types'
                  ? 'active nav-link drop-down'
                  : 'nav-link drop-down'
                  " to="/module-types">Module Types</router-link>
              </li>
            </ul>
          </li>
          <li v-if="this.user">
            <a class="nav-link" href="javascript:void" @click="logout()">Logout</a>
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

<style scoped>
nav .dropdown .drop-down {
  border: 1px solid rgb(143 58 48 / 8%);
  
}

nav .dropdown .drop-down:hover {
  
  color: #2e3192;
  font-weight: bold;
  text-decoration: underline;
}

nav .dropdown .drop-down.active {
  color: #2e3192;
  
}
.logo-container {
  display: flex;
  align-items: center;
}

.logo-container img {
  margin-right: 10px; /* Adjust the spacing between the logo and text */
}

.logo {
  margin: 0; /* Remove any default margin on the H1 element */
}

/* Add the following CSS if you want to make the logo and text vertically centered */
.container {
  display: flex;
  align-items: center;
}

/* Hide the H1 element in mobile view (up to 768px width, adjust as needed) */
@media (max-width: 768px) {
  .logo-img {
    display: none;
  }
  .logo {
    font-size: 16px!important ;
  }
}


</style>
