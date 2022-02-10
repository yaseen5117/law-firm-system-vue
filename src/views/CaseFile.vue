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
              <div class="row">
                <div class="col-3">
                  <label for="Date" class="form-label fw-bold"
                    >Date of Institution</label
                  >
                  <input
                    type="text"
                    id="Date"
                    class="form-control"
                    aria-describedby="Date"
                  />
                </div>
                <div class="col-3">
                  <label for="Case" class="form-label fw-bold">Case #</label>
                  <input
                    type="text"
                    id="Case"
                    class="form-control"
                    aria-describedby="Case"
                  />
                </div>
                <div class="col-3">
                  <label for="Court" class="form-label fw-bold">Court</label>
                  <input
                    type="text"
                    id="Court"
                    class="form-control"
                    aria-describedby="Court"
                  />
                </div>
                <div class="col-3">
                  <label for="ClientName" class="form-label fw-bold"
                    >Client Name</label
                  >
                  <input
                    type="text"
                    id="ClientName"
                    class="form-control"
                    aria-describedby="ClientName"
                  />
                </div>
              </div>
            </div>
            <div class="col-12">
              <button type="button" class="btn btn-primary btn-md">
                Search
              </button>
              <button type="button" class="btn btn-danger btn-md">Reset</button>
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
                  <tbody v-for="case_file in case_files" :key="case_file.id">
                    <tr>
                      <td>{{ case_file.id }}</td>
                      <td>{{ case_file.case_no }}</td>
                      <td>{{ case_file.title }}</td>
                      <td>{{ case_file.court }}</td>
                      <td>{{ case_file.client_name }}</td>
                      <td>{{ case_file.institution_date }}</td>
                      <td>
                        <router-link
                          to="case_details"
                          class="btn btn-primary"
                          role="button"
                          >View</router-link
                        >
                        <router-link to="#" class="btn btn-success" role="button"
                          >Update</router-link
                        >
                        <router-link to="#" class="btn btn-warning" role="button"
                          >Alerts</router-link
                        >
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
        case_files: Array
      }
    },
    created() {
      this.getCaseFiles();
    },
    methods: {
      async getCaseFiles() {
        let url = 'http://127.0.0.1:8000/api/case_files';
        await axios.get(url).then(response => {
          this.case_files = response.data.case_files;
          console.log(this.case_files);
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