<template>
  <!-- ======= Hero Section ======= -->
  <section id="hero" class="d-flex align-items-center">
    <div class="container-fluid" data-aos="fade-up">
      <div class="row justify-content-center">
        <div
          class="col-xl-5 col-lg-6 pt-3 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center"
        >
          <h1>Welcome to <br />ELAWFIRM</h1>
          <!-- <h2>We are team of talented designers making websites with Bootstrap</h2> -->
          <div v-if="!this.user">
            <router-link
              :to="{
                name: 'Login',
              }"
              class="btn-get-started scrollto"
              >Get Started</router-link
            >
          </div>
          <div v-if="this.user">
            <router-link
              :to="{
                name: 'DashBoard',
              }"
              class="btn-get-started scrollto"
              >Dashboard</router-link
            >
          </div>
        </div>
        <div
          class="col-xl-4 col-lg-6 order-1 order-lg-2 hero-img"
          data-aos="zoom-in"
          data-aos-delay="150"
        >
          <!-- <img
            src="assets/img/portfolio/Legal-Hammer.png"
            class="img-fluid animated"
            alt=""
          /> -->

          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/z3gch7kq7RM?version=3&autoplay=1&loop=1&mute=1&showinfo=0&playlist=z3gch7kq7RM"
            title="YouTube video player"
            frameborder="0"
            allow="autoplay;;"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
  <!-- End Hero -->

  <main id="main">
    <!-- ======= About Section ======= -->
    <section id="about" class="about">
      <div class="container">
        <div class="row">
          <div
            class="col-lg-6 order-1 order-lg-2"
            data-aos="zoom-in"
            data-aos-delay="150"
          >
            <img src="assets/img/aboutus.jpg" class="img-fluid" alt="" />
          </div>
          <div
            class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content"
            data-aos="fade-right"
            id="about_us"
          >
            <h3>ABOUT US</h3>
            <p class="fst-italic">
              This is a cloud-based law firm management system tailored for your
              needs. It can also be adopted by a court automation of its entire
              process. Here’s how it’s better than other solutions out there:
            </p>
            <ul>
              <li>
                <i class="bi bi-check-circle"></i> It’s SIMPLE. We know that
                most lawyers are not techies.
              </li>
              <li><i class="bi bi-check-circle"></i> It's FAST.</li>
              <li><i class="bi bi-check-circle"></i> It's Affordable.</li>
              <li>
                <i class="bi bi-check-circle"></i> It’s EVOLVING. We are
                constantly updating it.
              </li>
            </ul>
            <router-link to="about-elawfirm" class="read-more"
              >Read More <i class="bi bi-long-arrow-right"></i
            ></router-link>
          </div>
        </div>
      </div>
    </section>
    <!-- End About Section -->

    <!-- ======= Counts Section ======= -->
    <section style="display: none" id="counts" class="counts">
      <div class="container">
        <div class="row counters">
          <div class="col-lg-3 col-6 text-center">
            <span
              data-purecounter-start="0"
              data-purecounter-end="232"
              data-purecounter-duration="1"
              class="purecounter"
            ></span>
            <p>Clients</p>
          </div>

          <div class="col-lg-3 col-6 text-center">
            <span
              data-purecounter-start="0"
              data-purecounter-end="521"
              data-purecounter-duration="1"
              class="purecounter"
            ></span>
            <p>Projects</p>
          </div>

          <div class="col-lg-3 col-6 text-center">
            <span
              data-purecounter-start="0"
              data-purecounter-end="1463"
              data-purecounter-duration="1"
              class="purecounter"
            ></span>
            <p>Hours Of Support</p>
          </div>

          <div class="col-lg-3 col-6 text-center">
            <span
              data-purecounter-start="0"
              data-purecounter-end="15"
              data-purecounter-duration="1"
              class="purecounter"
            ></span>
            <p>Hard Workers</p>
          </div>
        </div>
      </div>
    </section>
    <!-- End Counts Section -->

    <!-- ======= Features Section ======= -->
    <section id="features" class="features section-bg-grey">
      <div class="container" data-aos="fade-up">
        <div class="section-title" id="main_features">
          <h2>Features</h2>
          <p>Our Main Features are:</p>
        </div>
        <div class="row">
          <div
            class="col-lg-5 order-2 order-lg-1 d-flex flex-column align-items-lg-center"
          >
            <template
              v-for="(singleFeature, rowIndex) in featureJsonData"
              :key="rowIndex.id"
            >
              <template v-if="singleFeature.id < 7">
                <Feature :singleFeature="singleFeature" :rowIndex="rowIndex" />
              </template>
            </template>
          </div>
          <div
            class="col-lg-5 order-2 order-lg-1 d-flex flex-column align-items-lg-center"
          >
            <template
              v-for="(singleFeature, rowIndex) in featureJsonData"
              :key="singleFeature.id"
            >
              <template v-if="singleFeature.id > 6">
                <Feature :singleFeature="singleFeature" :rowIndex="rowIndex" />
              </template>
            </template>
          </div>
          <div
            class="image col-lg-2 order-1 order-lg-2"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <img src="assets/img/features2.png" alt="" class="img-fluid" />
          </div>
        </div>
      </div>
    </section>
    <!-- End Features Section -->

    <!-- ======= Portfolio Section ======= -->

    <!-- ======= Pricing Section ======= -->
    <section id="pricing" class="pricing">
      <div class="container" data-aos="fade-up">
        <div class="section-title" id="pricing_plans">
          <h2>Pricing</h2>
          <!-- <p>Choose Plan according to your needs.</p> -->
        </div>

        <div class="row">
          <div
            class="col-lg-12 col-md-12"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="table-responsive">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr class="pricing-th-text">
                    <th class="text-center">Features</th>
                    <th class="text-center">Law School Plan</th>
                    <th class="text-center">Individual Lawyer</th>
                    <th class="text-center">
                      Law Firm OR In-house Legal Department
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="plan in this.plans_n_features"
                    :key="plan.id"
                    class="pricing-td-text"
                  >
                    <td class="text-start" style="padding-left: 20px">
                      <strong>{{ plan.feature_name }}</strong>
                    </td>
                    <!-- <td v-html="plan.free_plan"></td> -->
                    <td class="text-center" v-html="plan.student_plan"></td>
                    <td class="text-center" v-html="plan.individual_plan"></td>
                    <td class="text-center" v-html="plan.lawfirm_plan"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Pricing Section -->

    <!-- ======= Testimonials Section ======= -->
    <section id="reviews" class="testimonials section-bg-grey">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Reviews</h2>
        </div>
        <div
          class="testimonials-slider swiper"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="swiper-wrapper">
            <div
              v-for="(singleReview, rowIndex) in reviewJsonData"
              :key="rowIndex"
              class="swiper-slide"
            >
              <Review :singleReview="singleReview" />
            </div>

            <!-- End testimonial item -->
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </section>
    <!-- End Testimonials Section -->

    <!-- ======= Frequently Asked Questions Section ======= -->
    <!-- End Frequently Asked Questions Section -->

    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Contact</h2>
          <p>Umer Ijaz Gilani <small>(Advocate High Courts)</small></p>
          <p>Muhammed Alee Qureshi <small>(Advocate High Courts)</small></p>
        </div>

        <div class="row">
          <div class="col-lg-6">
            <div class="info-box mb-4">
              <i class="bx bx-map"></i>
              <h3>Our Address</h3>
              <p>
                Office No. 5, Saeed Plaza, I and T Center, G-10/1, Opposite
                Islamabad High Court
              </p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="info-box mb-4">
              <i class="bx bx-envelope"></i>
              <h3>Email Us</h3>
              <p>{{ this.globalGeneralSetting.site_email }}</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="info-box mb-4">
              <i class="bx bx-phone-call"></i>
              <h3>Call Us</h3>
              <p>{{ this.globalGeneralSetting.site_phone }}</p>
            </div>
          </div>
        </div>

        <div class="row" id="quote">
          <div class="col-lg-6">
            <a
              href="https://www.linkedin.com/in/elawfirm-bringing-law-and-tech-together-50b67523b/"
              target="_blank"
            >
              <i class="fa fa-linkedin-square linkedin-icon icon-font"></i>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100081095452021"
              target="_blank"
            >
              <i class="fa fa-facebook-square facebook-icon icon-font"></i
            ></a>
            <a href="https://twitter.com/@E_Lawfirm" target="_blank">
              <i class="fa fa-twitter-square twitter-icon icon-font"></i
            ></a>
            <a href="#" target="_blank">
              <i class="fa fa-instagram-square instagram-icon icon-font"></i
            ></a>
            <!-- <iframe
              width="560"
              height="315"
              src="https://www.youtube-nocookie.com/embed/z3gch7kq7RM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe> -->
          </div>

          <div class="col-lg-6">
            <form
              @submit.prevent="submitForm($event)"
              role="form"
              class="php-email-form"
            >
              <div class="row">
                <div class="col-md-6 form-group">
                  <input
                    class="form-control"
                    v-model="contact_request.name"
                    placeholder="Your Name"
                    v-bind:class="{
                      'error-boarder': v$.contact_request.name.$error,
                    }"
                    @blur="v$.contact_request.name.$touch"
                  />
                  <span
                    v-if="v$.contact_request.name.$error"
                    class="errorMessage"
                    >Name field is required.</span
                  >
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input
                    class="form-control"
                    v-model="contact_request.email"
                    placeholder="Your Email"
                    v-bind:class="{
                      'error-boarder': v$.contact_request.email.$error,
                    }"
                    @blur="v$.contact_request.email.$touch"
                  />
                  <span
                    v-if="v$.contact_request.email.$error"
                    class="errorMessage"
                    >Email field is required.</span
                  >
                </div>
              </div>
              <div class="form-group mt-3">
                <input
                  class="form-control"
                  v-model="contact_request.subject"
                  placeholder="Subject"
                />
              </div>
              <div class="form-group mt-3">
                <textarea
                  class="form-control"
                  v-model="contact_request.message"
                  placeholder="Message"
                  v-bind:class="{
                    'error-boarder': v$.contact_request.message.$error,
                  }"
                  @blur="v$.contact_request.message.$touch"
                />
                <span
                  v-if="v$.contact_request.message.$error"
                  class="errorMessage"
                  >Message field is required.</span
                >
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">
                  Your message has been sent. Thank you!
                </div>
              </div>
              <div class="text-center">
                <button :disabled="saving" type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- End Contact Section -->
  </main>
  <!-- End #main -->
</template>

<script>
// @ is an alias to /src
//import CaseDetail from "./CaseDetail.vue";
import jsonOfReviews from "./../store/reviews.json";
import jsonOfFeatures from "./../store/features.json";

import axios from "axios";
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import Feature from "./../components/Feature.vue";
import Review from "./../components/Review.vue";

export default {
  name: "Home",
  components: { Feature, Review },
  computed: mapState(["user", "globalGeneralSetting"]),
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      featureRestrictedDialog: false,
      base_url: process.env.VUE_APP_SERVICE_URL,
      saving: false,
      contact_request: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      plans_n_features: [
        {
          id: 0,
          feature_name: "",
          free_plan: "",
          student_plan: '<a href="#contact">Get a Quote</a>',
          individual_plan: '<a href="#contact">Get a Quote</a>',
          lawfirm_plan: '<a href="#contact">Get a Quote</a>',
        },
        {
          id: 1,
          feature_name: "Calendar",
          free_plan: "&#10004",
          student_plan: "",
          individual_plan: "&#10004",
          lawfirm_plan: "&#10004",
        },
        {
          id: 2,
          feature_name: "Case Files",
          free_plan: "Up to 5 case files",
          student_plan: "Access up to 10 pre-uploaded case files",
          individual_plan: "Up to 50 case files",
          lawfirm_plan: "Unlimited case files",
        },
        {
          id: 3,
          feature_name: "Frequently Asked Legal Propositions",
          free_plan: "",
          student_plan: "&#10004",
          individual_plan: "",
          lawfirm_plan: "&#10004",
        },
        {
          id: 4,
          feature_name: "Sample Pleadings",
          free_plan: "",
          student_plan: "&#10004",
          individual_plan: "&#10004",
          lawfirm_plan: "&#10004",
        },
        {
          id: 5,
          feature_name: "Sample Contracts",
          free_plan: "",
          student_plan: "&#10004",
          individual_plan: "&#10004",
          lawfirm_plan: "&#10004",
        },
        {
          id: 6,
          feature_name: "Case Law Library",
          free_plan: "",
          student_plan: "",
          individual_plan: "&#10004",
          lawfirm_plan: "&#10004",
        },
        {
          id: 7,
          feature_name: "Legal Opinions Module",
          free_plan: "",
          student_plan: "",
          individual_plan: "",
          lawfirm_plan: "&#10004",
        },
        {
          id: 8,
          feature_name: "Accounts Module",
          free_plan: "",
          student_plan: "",
          individual_plan: "",
          lawfirm_plan: "&#10004",
        },
        {
          id: 9,
          feature_name: "Client Consultation Module",
          free_plan: "",
          student_plan: "",
          individual_plan: "",
          lawfirm_plan: "&#10004",
        },
        {
          id: 10,
          feature_name: "Separate Sub-Domain",
          free_plan: "",
          student_plan: "",
          individual_plan: "",
          lawfirm_plan: "&#10004",
        },
      ],
      showMoreOrLessTestimonial1: true,
      showMoreOrLessTestimonial2: true,
      featureJsonData: [],
      reviewJsonData: [],
    };
  },
  validations() {
    return {
      contact_request: {
        name: { required },
        email: { required, email },
        message: { required },
      },
    };
  },
  created() {
    this.getReviews();
    this.getFeatures();
  },

  mounted() {
    document.getElementById("header");
    document.title = "Home";
    /**
     * Testimonials slider
     */
    new Swiper(".testimonials-slider", {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 40,
        },

        1200: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    });
  },
  methods: {
    getReviews() {
      this.reviewJsonData = jsonOfReviews;
    },
    getFeatures() {
      this.featureJsonData = jsonOfFeatures;
    },

    scrollIntoView(id) {
      const yOffset = -200;
      const element = document.getElementById(id);
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    submitForm: function (event) {
      this.v$.$validate();
      if (!this.v$.$error) {
        event.preventDefault();

        this.saving = true;

        axios
          .post(this.base_url + "/api/contact_requests", this.contact_request)
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                this.contact_request = {};
                setTimeout(() => {
                  this.v$.$reset();
                }, 0);
              }
              this.saving = false;
            },
            (error) => {
              this.saving = false;
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

<style scoped>
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  iframe {
    width: 100%;
  }
}
.pricing-td-text {
  font-size: 13px;
  border: 1px solid #bebcbc;
}
.pricing-th-text {
  background: #8f3a30;
  color: #f3be32;
  font-size: 14px;
}
.icon-font {
  font-size: 30px;
}
.linkedin-icon {
  color: #0a66c2;
}
.facebook-icon {
  color: #3b5998;
  margin-left: 10px;
}
.twitter-icon {
  color: #00acee;
  margin-left: 10px;
}
.instagram-icon {
  color: rgb(214, 41, 118);
  margin-left: 10px;
}
</style>
