<template>
  <main id="main">
    <page-header title="Petition" />
    <nav-components />
    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-12">
            <div class="card-body align-center case_heading">
              <div>
                <h6>
                  <u>BEFORE THE {{ petition.court.title }}</u>
                </h6>
                <p>Writ Petition No. {{ petition.writ_number }}</p>
                <p>{{ petition.client.company_name }}</p>
                <p>VERSUS</p>
                <p>CDA AND OTHERS</p>
                <p>
                  {{ petition.title }}
                </p>
                <p>
                  <u><strong>INDEX</strong></u>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
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
                      <router-link
                        :to="{
                          name: 'petition-index-details',
                          params: { id: petition_detail.id },
                        }"
                        >{{ petition_detail.document_description }}</router-link
                      >
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
    </section>
    <!-- End Services Section -->
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import NavComponents from "./Cases/NavComponents.vue";
import PageHeader from "../views/shared/PageHeader";
export default {
  components: {
    NavComponents,
    PageHeader,
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
        .get("http://127.0.0.1:8000/api/petitions/" + this.id)
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

    let externalScript = document.createElement("script");
    externalScript.setAttribute(
      "src",
      "../../public/js/bootstrap-nav-paginator.min.js"
    );
    document.head.appendChild(externalScript);
  },
};
</script>

