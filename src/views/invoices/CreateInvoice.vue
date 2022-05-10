<template>
  <main id="main">
    <page-header :title="'Create New Invoice'" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-md-12 text-center">
                <h1>The Law and Policy Chambers</h1>
              </div>
              <div class="col-md-6">
                <p class="text-left">
                  <strong
                    >Office No. 5, Saeed Plaza, Plot 71,<br />
                    I & T Center, opposite<br />
                    Islamabad High Court, Sector G-10/1<br />
                    Islamabad 44000, Pakistan<br
                  /></strong>
                </p>
              </div>
              <div class="col-md-6">
                <p class="text-right">
                  <strong>
                    Phone: (+92301) 5011568 <br />
                    (+9251) 8431759 <br />
                    Email: umer.gilani@lawandpolicychambers.com <br />
                  </strong>
                </p>
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-3">
                      <label for="">Select Client</label>
                      <select
                        name=""
                        id=""
                        class="form-control"
                        disabled="disabled"
                      ></select>
                    </div>
                    <div class="col-md-3">
                      <label for="">Invoice No</label>
                      <input type="text" readonly class="form-control" />
                    </div>
                    <div class="col-md-3">
                      <label for="">Due Date</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-3">
                      <label for="">Company Name</label>
                      <input type="text" class="form-control" />
                    </div>

                    <div class="col-md-3">
                      <label for="">Phone</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="col-md-3">
                      <label for="">Email</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="col-md-3">
                      <label for="">Address</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="row">
                    <div class="col-md-3">
                      <label for="">Attention</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="col-md-9">
                      <label for="">CC</label>
                      <textarea
                        name=""
                        id=""
                        class="form-control"
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 text center">
                <p>
                  <strong
                    >Subject: Professional Fee for Providing Legal
                    Opinion</strong
                  >
                </p>
                <Editor v-model="value" editorStyle="height: 320px" />
                <br />
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <table class="table table-striped">
                  <tr>
                    <th>Professional Services</th>
                    <th>Amount</th>
                  </tr>
                  <tr>
                    <td>
                      Legal Opinion on the matter of State Bank Circular related
                      to Closure of Govt. Accounts in commercial banksRs
                    </td>
                    <td>
                      <div class="input-group">
                        <span class="input-group-text">RS</span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="25000"
                        />
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- End #main -->
</template>
    
<script>
import PageHeader from "../shared/PageHeader.vue";
import Editor from "primevue/editor";
export default {
  components: {
    PageHeader,
    Editor,
  },
  data() {
    return {
      value: "any",
    };
  },
};
</script>

<style>
</style>