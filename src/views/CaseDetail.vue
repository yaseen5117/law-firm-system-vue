<template>
  <div id="case_detail">
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
            <div class="card-body align-center">
              <div>
                <h5>
                  <u>BEFORE THE ISLAMABAD HIGH COURT, ISLAMABAD</u>

                </h5>
                <p>
                  Writ Petition No. <u>1812</u> /2021
                </p>
                <h6>KAMRAN KHAN AND OTHERS</h6>
                <h6>VERSUS</h6>
                <h6>CDA AND OTHERS</h6>
                <h6>
                  WRIT PETITION UNDER ARTICLE 199 OF THE CONSTITUTION OF THE ISLAMIC REPUBLIC OF PAKISTAN, 1973
                </h6><br/>
                <h6><u>INDEX</u></h6>
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
                    <tbody>
                      <thead>
                        <th>Sr. #</th>
                        <th>Description of Documents</th>
                        <th>Date</th>
                        <th>Annexure</th>
                        <th>Page</th>
                      </thead>
                      <tr>
                        <td>1</td>
                        <td><a href="petition_slide_docs.html">Writ Petition along with Affidavit</a></td>
                        <td></td>
                        <td></td>
                        <td>1-15</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td><a href="petition_slide_docs_a.html">Copy of Impugned Turmintion Order</a></td>
                        <td>02.12.2021</td>
                        <td>A</td>                        
                        <td>16-17</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td><a href="petition_slide_docs_b.html">Copy of Contract of the Petitioner</a></td>
                        <td>04.05.2021</td>
                        <td>B</td>
                        <td>18-19</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td><a href="petition_slide_docs_c.html">Copy of the Additional Charge Notification</a></td>
                        <td>20.09.2021</td>
                        <td>C</td>
                        <td>20-22</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td><a href="petition_slide_docs_d.html">Copy of the Complaint Submitted to the Ombudsman</a></td>
                        <td>01.11.2021</td>
                        <td>D</td>
                        <td>23-42</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td><a href="#">Copy of the Petitioner Urgent Email to the Respodent</a></td>
                        <td>30.11.2021</td>
                        <td>E</td>
                        <td>43</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td><a href="#">Copy of the Civil Suit Seeking Pre-termination hearing</a></td>
                        <td>01.12.2021</td>
                        <td>F</td>
                        <td>44-50</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td><a href="#">Copy of the Stay Order passed by ADJ</a></td>
                        <td>2.12.2021</td>
                        <td>G</td>
                        <td>51</td>
                      </tr>

                      <tr>
                        <td>9</td>
                        <td><a href="#">Application for Exemption of Certified Copies Along With Affidavit</a></td>
                        <td></td>
                        <td></td>
                        <td>52-53</td>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td><a href="#">Application for Intirem Relief Along with Affidavit</a></td>
                        <td></td>
                        <td></td>
                        <td>54-55</td>
                      </tr>
                      <tr>
                        <td>11</td>
                        <td><a href="#">Power of Attorney</a></td>
                        <td></td>
                        <td></td>
                        <td>56-57</td>
                      </tr>
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
  </div>
</template>

<script> 
import NavComponents from "./Cases/NavComponents.vue";

export default {
  name: "CaseDetail",
  components: {
    NavComponents
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
</style>