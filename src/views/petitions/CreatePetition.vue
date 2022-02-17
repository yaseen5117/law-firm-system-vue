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
                      <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.first_name +' '+ client.first_name}}</option>                       
                    </select>
                  </div>
                  <div class="col-3">
                    <label>Opponent</label>
                    <select class="form-control" v-model="petition.opponent_id">
                      <option value="">--Select--</option>                                                                 
                      <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.first_name +' '+ client.first_name}}</option>                            
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
                      <template v-for="petition_type in petition_types" :key="petition_type.id">                                          
                      <option :value="petition_type.id">{{ petition_type.title }}</option>                       
                      </template>
                    </select>
                  </div>

                  <div class="col-3">
                    <label>Court</label>
                    <select class="form-control" v-model="petition.court_id">
                      <option value="">--Select--</option>   
                                                                
                      <option  v-for="court in courts" :key="court.id" :value="court.id">{{ court.title }}</option>                       
                      
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
                <button class="btn btn-success btn-sm mt-2">Save</button>
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
      clients: [],
      courts: [],
      petition_types: []
    };
  },
  created() {
    this.getUsers();
    this.getCourts();
    this.getPetitionTypes();
  },
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
    async getUsers() {
        let url = 'http://127.0.0.1:8000/api/clients';
        await axios.get(url).then(response => {
          this.clients = response.data.clients;
          console.log(this.clients);
        }).catch(error => {
          console.log(error);
        })
      },
      async getCourts() {
        let url = 'http://127.0.0.1:8000/api/courts';
        await axios.get(url).then(response => {
          this.courts = response.data.courts;
          console.log(this.courts);
        }).catch(error => {
          console.log(error);
        })
      },
      async getPetitionTypes() {
        let url = 'http://127.0.0.1:8000/api/petition_types';
        await axios.get(url).then(response => {
          this.petition_types = response.data.petition_types;
          console.log(this.petition_types);
        }).catch(error => {
          console.log(error);
        })
      },
  },
};
</script>

<style>
</style>