<template>
  <main id="main">
    <page-header :title="page_title" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-12">
            <form @submit="submitForm($event)">
              <div class="form-group">
                <div class="row">
                  <div class="col-3">
                    <label>Petitioner</label>
                    <select
                      class="form-control"
                      v-model="petition.petitioner_id"
                    >
                      <option value="">--Select--</option>
                      <option value="1">Person 1</option>
                      <option value="2">Person 2</option>
                      <option value="3">Person 3</option>
                    </select>
                  </div>
                  <div class="col-3">
                    <label>Opponent</label>
                    <select class="form-control" v-model="petition.opponent_id">
                      <option value="">--Select--</option>
                      <option value="1">Person 1</option>
                      <option value="2">Person 2</option>
                      <option value="3">Person 3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-9">
                    <label>Title</label>
                    <input class="form-control" v-model="petition.title" />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-3">
                    <label>Petition Type</label>
                    <select
                      class="form-control"
                      v-model="petition.petition_type_id"
                    >
                      <option value="">--Select--</option>
                      <option value="1">Type 1</option>
                      <option value="2">Type 2</option>
                      <option value="3">Type 3</option>
                    </select>
                  </div>

                  <div class="col-3">
                    <label>Court</label>
                    <select class="form-control" v-model="petition.court_id">
                      <option value="">--Select--</option>
                      <option value="1">Court 1</option>
                    </select>
                  </div>
                  <div class="col-3">
                    <label>Case No.</label>
                    <input class="form-control" v-model="petition.case_no" />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-3">
                    <label>Date Of Institution</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="petition.institution_date"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <button class="btn btn-success">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";

export default {
  components: { PageHeader },
  data() {
    return {
      page_title: "Create New Petition",
      petition: {
        petitioner_id: "",
        petition_type_id: "",
        court_id: "",
        opponent_id: "",
      },
    };
  },
  created() {},
  methods: {
    submitForm: function (event) {
      if (event) {
        event.preventDefault();

        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        };

        axios
          .post("http://127.0.0.1:8000/api/petitions", this.petition, {
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
                this.$router.push({ path: "/petitions" });
              }
              console.log(response);
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
};
</script>

<style>
</style>