<template>
  <div class="case_file">
    <main id="main">
      <!-- ======== Breadcrumbs ======== -->
      <section id="breadcrumbs" class="breadcrumbs">
        <div class="container">
          <div class="d-flex justify-content-between align-items-center">
            <h2>Case Files</h2>
            <ol>
              <li><router-link to="/">Home</router-link></li>
              <li>Case Files</li>
            </ol>
          </div>
        </div>
      </section>
      <!-- End Breadcrumbs -->
      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg">
        <div class="container" data-aos="fade-up">
          <div class="row gy-4">
            <div class="col-12">
            <form class="row gy-2 gx-3 align-items-center">
              <div class="col-auto">
                <input type="text" id="date" class="form-control form-control-sm" placeholder="Date of Institution">
              </div>
               <div class="col-auto">
                
                <input type="text" id="Case" class="form-control form-control-sm" placeholder="Case #" aria-describedby="Case">
              </div>
               <div class="col-auto">

                <input placeholder="Court" type="text" id="Court" class="form-control form-control-sm" aria-describedby="Court">
              </div>
               <div class="col-auto">
                
                <input placeholder="Client Name" type="text" id="ClientName" class="form-control form-control-sm" aria-describedby="ClientName">
              </div>

               <div class="col-auto">
                <button type="button" class="btn btn-danger btn-sm">Reset</button>
              </div>

            </form>
          </div>
             
            <div class="col-12">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Case #</th>
                      <th>Case Title</th>
                      <th>Court</th>
                      <th>Client Name </th>
                      <th>Date of Institution</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody v-for="petition in petitions" :key="petition.id">
                    <tr>
                      <td>{{ petition.id }}</td>
                      <td>{{ petition.case_no}}</td>
                      <td>{{ petition.title }}</td>
                      <td>{{ petition.court }}</td>
                      <td>{{ petition.client_name }}</td>
                      <td>{{ petition.created_at }}</td>
                      <td>
                        <router-link :to="{ name: 'case-detail', params: {id: petition.id}}" class="btn btn-primary btn-sm" role="button">View</router-link>
                        <router-link to="#" class="btn btn-success btn-sm" role="button">Update</router-link>
                        <router-link to="#" class="btn btn-warning btn-sm" role="button">Alerts</router-link>
                    </td>
                    </tr>                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End Services Section -->
    </main>
    <!-- End #main -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CaseFile',
    data(){
      return {
        petitions: Array,                 
      }
    },
    created() {
      this.getCaseFiles();
    },
    methods: {
      async getCaseFiles() {
        let url = 'http://127.0.0.1:8000/api/petitions';
        await axios.get(url).then(response => {
          this.petitions = response.data.petitions;
          console.log(this.petitions);
        }).catch(error => {
          console.log(error);
        })
      }
    },
    mounted() {
      console.log('Case File Component Mounted');
    }
};
</script>

<style>
</style>