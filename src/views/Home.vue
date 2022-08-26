<template>
  <!-- ======= Hero Section ======= -->
  <section id="hero" class="d-flex align-items-center">
    <div class="container-fluid" data-aos="fade-up">
      <div class="row justify-content-center">
        <div
          class="col-xl-5 col-lg-6 pt-3 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center"
        >
          <h1>Welcome to <br />{{ this.globalGeneralSetting.site_name }}</h1>
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
          <img
            src="assets/img/portfolio/Legal-Hammer.png"
            class="img-fluid animated"
            alt=""
          />
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
            <img src="assets/img/about-us.jpg" class="img-fluid" alt="" />
          </div>
          <div
            class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content"
            data-aos="fade-right"
            id="about_us"
          >
            <h3>ABOUT US</h3>
            <p class="fst-italic">
              This is a cloud-based law firm management system tailored for your
              needs. Here’s how it’s better than other solutions out there:
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
            <a
              href="javascript:void(0)"
              @click="scrollIntoView('main_features')"
              class="read-more"
              >Read More <i class="bi bi-long-arrow-right"></i
            ></a>
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
            class="col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-lg-center"
          >
            <div
              class="icon-box mt-5 mt-lg-0"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <i class="bx bx-receipt"></i>
              <h4>Case File View</h4>
              <p>
                You can view all your case files online - and from anywhere.
              </p>
            </div>
            <div class="icon-box mt-5" data-aos="fade-up" data-aos-delay="200">
              <i class="bx bx-cube-alt"></i>
              <h4>Court Calendar</h4>
              <p>Keep track of all the dates of hearing.</p>
            </div>
            <div class="icon-box mt-5" data-aos="fade-up" data-aos-delay="300">
              <i class="bx bx-images"></i>
              <h4>Case Law Library</h4>
              <p>Organize and store all the case law which you read daily.</p>
            </div>
            <div class="icon-box mt-5" data-aos="fade-up" data-aos-delay="400">
              <i class="bx bx-shield"></i>
              <h4>Auto-invoicing</h4>
              <p>
                Use our Invoice-generator to generate professional invoices and
                keep a track of your firm's finances.
              </p>
            </div>
          </div>
          <div
            class="image col-lg-6 order-1 order-lg-2"
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
          <p>
            Choose Plan according to your needs.
          </p>
        </div>

        <div class="row">
          <div
            class="col-lg-12 col-md-12"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="box">

              <table class="table  pricing_table">

                <tr>
                  <td></td>
                  <td class="pricing_table_header_col">Free</td>
                  <td class="pricing_table_header_col">Student</td>
                  <td class="pricing_table_header_col">Individual Lawyer</td>
                  <td class="pricing_table_header_col">Law Firm</td>
                </tr>
                
                
                <tr v-for="plan in this.plans_n_features" :key="plan.id">
                  <td class="text-start" style="padding-left:20px">{{plan.feature_name}}</td>
                  <td v-html="plan.free_plan"></td>
                  <td v-html="plan.student_plan"></td>
                  <td v-html="plan.individual_plan"></td>
                  <td v-html="plan.lawfirm_plan"></td>
                  
                </tr>
              </table>
            </div>
          </div>

          
          
        </div>
      </div>
    </section>
    <!-- End Pricing Section -->

    <!-- ======= Testimonials Section ======= -->
    <section id="testimonials" class="testimonials section-bg-grey">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Testimonials</h2>
          <p>
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex
            aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos
            quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia
            fugiat sit in iste officiis commodi quidem hic quas.
          </p>
        </div>
        <div
          class="testimonials-slider swiper"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="testimonial-item">
                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                  Proin iaculis purus consequat sem cure digni ssim donec
                  porttitora entum suscipit rhoncus. Accusantium quam, ultricies
                  eget id, aliquam eget nibh et. Maecen aliquam, risus at
                  semper.
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
                <img
                  src="assets/img/testimonials/testimonials-1.jpg"
                  class="testimonial-img"
                  alt=""
                />
                <h3>Saul Goodman</h3>
                <h4>Ceo &amp; Founder</h4>
              </div>
            </div>
            <!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-item">
                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                  Export tempor illum tamen malis malis eram quae irure esse
                  labore quem cillum quid cillum eram malis quorum velit fore
                  eram velit sunt aliqua noster fugiat irure amet legam anim
                  culpa.
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
                <img
                  src="assets/img/testimonials/testimonials-2.jpg"
                  class="testimonial-img"
                  alt=""
                />
                <h3>Sara Wilsson</h3>
                <h4>Designer</h4>
              </div>
            </div>
            <!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-item">
                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                  Enim nisi quem export duis labore cillum quae magna enim sint
                  quorum nulla quem veniam duis minim tempor labore quem eram
                  duis noster aute amet eram fore quis sint minim.
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
                <img
                  src="assets/img/testimonials/testimonials-3.jpg"
                  class="testimonial-img"
                  alt=""
                />
                <h3>Jena Karlis</h3>
                <h4>Store Owner</h4>
              </div>
            </div>
            <!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-item">
                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                  Fugiat enim eram quae cillum dolore dolor amet nulla culpa
                  multos export minim fugiat minim velit minim dolor enim duis
                  veniam ipsum anim magna sunt elit fore quem dolore labore.
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
                <img
                  src="assets/img/testimonials/testimonials-4.jpg"
                  class="testimonial-img"
                  alt=""
                />
                <h3>Matt Brandon</h3>
                <h4>Freelancer</h4>
              </div>
            </div>
            <!-- End testimonial item -->

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

        <div class="row">
          <div class="col-lg-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.4985850154235!2d73.01338161520496!3d33.670151880711735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8002693aa3eb051!2zMzPCsDQwJzEyLjYiTiA3M8KwMDAnNTYuMSJF!5e0!3m2!1sen!2s!4v1650019163750!5m2!1sen!2s"
              width="100%"
              height="450"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
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
import axios from "axios";
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  name: "Home",
  components: {},
  computed: mapState(["user", "globalGeneralSetting"]),
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      saving: false,
      contact_request: {
        name: "",
        email: "",
        subject: "",
        message: "",
        
      },
      plans_n_features:[
        {
            id:0,
            feature_name:"",
            free_plan:"",
            student_plan:"Rs. 5,000/quater per student",
            individual_plan:"Rs. 5,000/month",
            lawfirm_plan:"Rs. 10,000/month ",
          },
          {
            id:1,
            feature_name:"Calendar",
            free_plan:"&#10004",
            student_plan:"",
            individual_plan:"&#10004",
            lawfirm_plan:"&#10004",
          },
          {
            id:2,
            feature_name:"Case Files",
            free_plan:"Up to 5 case files",
            student_plan:"Access to 10 pre-uploaded case files",
            individual_plan:"Up to 50 case files",
            lawfirm_plan:"Unlimited case files",
          },
          {
            id:3,
            feature_name:"Frequently Asked Legal Propositions",
            free_plan:"",
            student_plan:"&#10004",
            individual_plan:"",
            lawfirm_plan:"&#10004",
          },
          {
            id:4,
            feature_name:"Sample Pleadings",
            free_plan:"",
            student_plan:"&#10004",
            individual_plan:"&#10004",
            lawfirm_plan:"&#10004",
          },
          {
            id:5,
            feature_name:"Sample Contracts",
            free_plan:"",
            student_plan:"&#10004",
            individual_plan:"&#10004",
            lawfirm_plan:"&#10004",
          },
          {
            id:6,
            feature_name:"Case Law Library",
            free_plan:"",
            student_plan:"",
            individual_plan:"&#10004",
            lawfirm_plan:"&#10004",
          },
          {
            id:7,
            feature_name:"Legal Opinions Module",
            free_plan:"",
            student_plan:"",
            individual_plan:"",
            lawfirm_plan:"&#10004",
          },
          {
            id:8,
            feature_name:"Accounts Module",
            free_plan:"",
            student_plan:"",
            individual_plan:"",
            lawfirm_plan:"&#10004",
          },
          {
            id:9,
            feature_name:"Client Consultation Module",
            free_plan:"",
            student_plan:"",
            individual_plan:"",
            lawfirm_plan:"&#10004",
          },
          {
            id:10,
            feature_name:"Separate Sub-Domain",
            free_plan:"",
            student_plan:"",
            individual_plan:"",
            lawfirm_plan:"&#10004",
          }


        ]
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

<style></style>
