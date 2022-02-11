<template>
  
      <main id="main">

    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2>Case Details
            <span>(<strong>Case Title:</strong> Criminal,</span>
            <span><strong>Case #:</strong> AS123,</span>
            <span><strong>Client Name:</strong> XYZ Client,</span>
            <span><strong>Court:</strong> Supreme Court)</span>
          </h2>
          <ol>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="petitions">Case Files</router-link></li>
            <li>Case Details</li>
          </ol>
        </div>

      </div>
    </section><!-- End Breadcrumbs -->

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
                  <u>BEFORE THE ISLAMABAD HIGH COURT, ISLAMABAD</u>

                </h6>
                <p>
                  Writ Petition No. <u>1812</u> /2021
                </p>
                <p>KAMRAN KHAN AND OTHERS</p>
                <p>VERSUS</p>
                <p>CDA AND OTHERS</p>
                <p>
                  WRIT PETITION UNDER ARTICLE 199 OF THE CONSTITUTION OF THE ISLAMIC REPUBLIC OF PAKISTAN, 1973
                </p> 
                <p><u><strong>INDEX</strong></u></p>
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
                      <template v-for="petition_detail in petition_details" :key="petition_detail.id">
                      <tr>
                        <td>{{ petition_detail.id  }}</td>
                        <td><a href="petition_slide_docs.html">{{ petition_detail.document_description  }}</a></td>
                        <td>{{ petition_detail.date  }}</td>
                        <td>{{ petition_detail.annexure  }}</td>
                        <td>{{ petition_detail.page_info  }}</td>
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
    </section><!-- End Services Section -->

  </main><!-- End #main -->
   
</template>

<script> 
import axios from 'axios';
import NavComponents from './Cases/NavComponents.vue';
export default {  
  components: {
    NavComponents
  },   
    data(){
      return {
        petition_details: Array,
        id: this.$route.params.id //this is the id from the browser
      }
    },
    created() {
      this.getCaseDetails();
    },
    methods: {
      async getCaseDetails() {       
        await axios.get('http://127.0.0.1:8000/api/petitions/1').then(response => {
          this.petition_details = response.data.petition_details;  
          console.log(this.petition_details);
        }).catch(error => {
          console.log(error);
        })
      }
    },
    mounted() {
      console.log('Case Details Component Mounted');
    }
};  
</script>

<style>
.nav-pills .nav-link {
      background-color: #f2f6f9;
      color: black;
      margin: 2px !important;
    }

    .nav-pills .nav-link.active,
    .nav-pills .show>.nav-link {
      color: #fff;
      background-color: #0d6efd;
    }

    section {
      padding: 40px 0 !important;
      overflow: hidden !important;
    }

    h2 span {
      font-size: 16px;
    }

    .align-center {
      text-align: center;
    }
    .case_heading p{
        font-size: 12px;
        line-height: 2px;
      }
</style>