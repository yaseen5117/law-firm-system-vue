<template>
  <div class="case_file">
    <main id="main">
      <page-header title="Case Files"  />
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
                <router-link class="btn btn-success btn-sm mb-3" :to="'/petitions/create'" >New</router-link>
                <table  class="table table-bordered" style="font-size:12px">
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
                      <td>{{ (petition.title && petition.title.length >15) ? petition.title.substring(0,47)+"..." : petition.title }}</td>
                      <td>{{ (petition && petition.court) ?petition.court.title :'' }}</td>
                      <td>{{ petition.client?petition.client.first_name:'' }} {{ petition.client?petition.client.last_name:'' }}</td>
                      <td>{{ petition.institution_date }}</td>
                      <td>
                        <router-link style="    margin-right: 2px;" :to="{ name: 'case-detail', params: {id: petition.id}}" class="btn btn-primary btn-sm" role="button" data-bs-toggle="tooltip" data-bs-placement="top" title="View"><i class="fa fa-eye"></i></router-link>
                        <router-link style="    margin-right: 2px;"  to="#" class="btn btn-warning btn-sm" role="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Alert"><i class="fa fa-bell"></i></router-link>
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
import PageHeader from "../views/shared/PageHeader";
export default {
  components: {
    PageHeader,
  },
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