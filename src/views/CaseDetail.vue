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
            <table class="table">
              <thead>
                <th>Sr. #</th>
                <th>Description of Documents</th>
                <th>Date</th>
                <th>Annexure</th>
                <th>Page</th>
                <th>Actions</th>
              </thead>
              <tbody>
                <tr
                  @dblclick="petition_detail.editMode = true"
                  v-for="petition_detail in petition_details"
                  :key="petition_detail.id"
                >
                  <td>{{ petition_detail.id }}</td>
                  <td>
                    <input
                      v-show="petition_detail.editMode"
                      class="form-control"
                      v-model="petition_detail.document_description"
                    />
                    <router-link
                      v-show="!petition_detail.editMode"
                      :to="{
                        name: 'petition-index-details',
                        params: { id: petition_detail.id },
                      }"
                      >{{ petition_detail.document_description }}
                    </router-link>
                  </td>
                  <td>
                    <input
                      v-show="petition_detail.editMode"
                      class="form-control"
                      type="date"
                      v-model="petition_detail.date"
                    />
                    <span v-show="!petition_detail.editMode">{{
                      petition_detail.date
                    }}</span>
                  </td>
                  <td>
                    <input
                      v-show="petition_detail.editMode"
                      class="form-control"
                      v-model="petition_detail.annexure"
                    />
                    <span v-show="!petition_detail.editMode">{{
                      petition_detail.annexure
                    }}</span>
                  </td>
                  <td>
                    <input
                      v-show="petition_detail.editMode"
                      class="form-control"
                      v-model="petition_detail.page_info"
                    />
                    <span v-show="!petition_detail.editMode">{{
                      petition_detail.page_info
                    }}</span>
                  </td>
                  <td>
                    <button
                      v-show="!petition_detail.editMode"
                      @click="petition_detail.editMode = true"
                      class="btn btn-primary btn-sm bx-pull-right"
                    >
                      Edit
                    </button>
                    <button
                      v-show="petition_detail.editMode"
                      @click="editPetitionIndex(petition_detail)"
                      class="btn btn-warning btn-sm bx-pull-right"
                    >
                      Update
                    </button>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <input
                      class="form-control"
                      v-model="new_petition_index.document_description"
                    />
                  </td>
                  <td>
                    <input
                      class="form-control"
                      type="date"
                      v-model="new_petition_index.date"
                    />
                  </td>
                  <td>
                    <input
                      class="form-control"
                      v-model="new_petition_index.annexure"
                    />
                  </td>
                  <td>
                    <input
                      class="form-control"
                      v-model="new_petition_index.page_info"
                    />
                  </td>
                  <td>
                    <button
                      @click="submitPetitionIndex()"
                      class="btn btn-success btn-sm bx-pull-right"
                    >
                      Save
                    </button>
                  </td>
                </tr>
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
      new_petition_index: {},
    };
  },
  created() {
    this.getCaseDetails();
  },
  methods: {
    getCaseDetails() {
      axios
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

    submitPetitionIndex() {
      if (true) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        };
        this.new_petition_index.petition_id = this.id;
        axios
          .post(
            "http://127.0.0.1:8000/api/petitions_index",
            this.new_petition_index,
            {
              headers,
            }
          )
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                this.new_petition_index = {};
                this.getCaseDetails();
              }
            },
            (error) => {
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
    editPetitionIndex(petitionToUpdate) {
      if (true) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        };

        axios
          .post("http://127.0.0.1:8000/api/petitions_index", petitionToUpdate, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                petitionToUpdate.editMode = false;
              }
            },
            (error) => {
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
  mounted() {
    console.log("Case Details Component Mounted");
  },
};
</script>

