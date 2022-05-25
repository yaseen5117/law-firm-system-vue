<template>
  <main id="main">
    <page-header :title="page_title" :hideCaseFiles="true" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="submitForm($event)">
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label>Category<span style="color: red">*</span></label>
                    <Dropdown
                      v-model="contract_and_agreement.contract_category_id"
                      :options="categories"
                      optionLabel="contract_category_id"
                      optionValue="contract_category_id"
                      placeholder="Select a Category"
                      :filter="true"
                      appendTo="self"
                      filterPlaceholder="Find by Category Name"                      
                    />
                   
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <label>Title <span style="color: red">*</span></label>
                    <input                      
                      class="form-control"                      
                    />                   
                  </div>
                  
                </div>
              </div>
              <div class="form-group">
                <button :disabled="saving" class="btn btn-success btn-sm">
                  Save
                </button>
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
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    PageHeader,
    Multiselect,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      categories: [
        { contract_category_id: 1 },
        { contract_category_id: 2 },
        { contract_category_id: 3 },
        { contract_category_id: 4 },
        { contract_category_id: 5 },
      ],
      saving: false,
      page_title: this.$route.params.id
        ? "Edit Contract and Agreement"
        : "Add New Contract and Agreement",
      base_url: process.env.VUE_APP_SERVICE_URL,
      contract_and_agreement: {
         
      },     
    };
  },
  validations() {
    return {
    //   petition: {
    //     petition_type_id: { required },
    //     title: { required },
    //     case_no: { required },
    //     court_id: { required },
    //   },
    };
  },
  created() {
   
  },
  activated() {},
  methods: {
    submitForm: function (event) {
      this.v$.$validate();
      if (!this.v$.$error) {
        event.preventDefault();

        this.saving = true;
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/petitions", this.petition, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                var petition_id = response.data.petition_id;
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                this.$router.push({ path: "/petitions/" + petition_id });
              }
              console.log(response);
              this.saving = false;
            },
            (error) => {
              this.saving = false;
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