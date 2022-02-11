<template>
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <h2>
            Case Details
            <span>(<strong>Case Title:</strong> Criminal,</span>
            <span><strong>Case #:</strong> AS123,</span>
            <span><strong>Client Name:</strong> XYZ Client,</span>
            <span><strong>Court:</strong> Supreme Court)</span>
          </h2>
          <ol>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/petitions">Case Files</router-link></li>
            <li>Case Details</li>
          </ol>
        </div>
      </div>
    </section>
    <!-- End Breadcrumbs -->

    <!-- ======= tab using nav component ======= -->
    <NavComponents />
    <!-- End tab using nav component -->

    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-12">
            <div class="card-body align-center case_heading">
              <div>
                <h6>
                  <u>BEFORE THE {{petition.court.title}}</u>
                </h6>
                <p>Writ Petition No. {{petition.writ_number}}</p>
                <p>{{petition.client.company_name}}</p>
                <p>VERSUS</p>
                <p>CDA AND OTHERS</p>
                <p>
                 {{petition.title}}
                </p>
                <p>
                  <u><strong>INDEX</strong></u>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row gy-4">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-start">
                  <table class="table table-bordered">
                    <thead>
                      <th>Sr. #</th>
                      <th>Description of Documents</th>
                      <th>Date</th>
                      <th>Annexure</th>
                      <th>Page</th>
                    </thead>
                    <tbody>
                      <template
                        v-for="petition_detail in petition_details"
                        :key="petition_detail.id"
                      >
                        <tr>
                          <td>{{ petition_detail.id }}</td>
                          <td>
                            <a href="petition_slide_docs.html">{{
                              petition_detail.document_description
                            }}</a>
                          </td>
                          <td>{{ petition_detail.date }}</td>
                          <td>{{ petition_detail.annexure }}</td>
                          <td>{{ petition_detail.page_info }}</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Services Section -->
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import NavComponents from "./Cases/NavComponents.vue";
export default {
  components: {
    NavComponents,
  },
  data() {
    return {
      petition: {},
      petition_details: [],
      id: this.$route.params.id, //this is the id from the browser
    };
  },
  created() {
    this.getCaseDetails();
  },
  methods: {
    async getCaseDetails() {
      await axios
        .get("http://127.0.0.1:8000/api/petitions/1")
        .then((response) => {
          this.petition = response.data.petition;
          this.petition_details = response.data.petition_details;
          console.log(this.petition);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.log("Case Details Component Mounted");
  },
};
</script>

