<template>
  <main id="main">
    <page-header :title="page_title" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">      
          <div class="col-12">
            <form @submit.prevent="submitForm($event)">
              <div class="form-group">
                <div class="row">                 
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Name</label>
                    <input
                      class="form-control"
                      v-model="user.name"
                      v-bind:class="{
                        'error-boarder': v$.user.name.$error,
                      }"  
                      @blur="v$.user.name.$touch"
                    />    
                    <span v-if="v$.user.name.$error" class="errorMessage"
                      >Name field is required.</span
                    >                
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Email</label>
                    <input
                      type="email"
                      class="form-control"
                      v-model="user.email"
                      v-bind:class="{
                        'error-boarder': v$.user.email.$error,
                      }"  
                      @blur="v$.user.email.$touch"                                        
                    />  
                    <span v-if="v$.user.email.$error" class="errorMessage"
                      >Email field is required.</span
                    >                  
                  </div>

                     <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Password</label>
                    <input
                      type="password"
                      class="form-control"
                      v-model="user.password"
                      v-bind:class="{
                        'error-boarder': v$.user.password.$error,
                      }"  
                      @blur="v$.user.password.$touch"                       
                    />    
                      <span v-if="v$.user.password.$error" class="errorMessage"
                      >Password field is required.</span
                    >             
                  </div> 

                   <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Company Name</label>
                    <input
                      class="form-control"
                      v-model="user.company_name"
                                          
                    />                    
                  </div>
 
                </div>
                <div class="row">
                     <div class="col-lg-6 col-md-6 col-sm-12">
                        <label>Address</label>
                        <input
                        class="form-control"
                        v-model="user.address"                                             
                        />                     
                  </div> 
                  <div class="col-lg-6 col-md-6 col-sm-12">                    
                    <label
                      >Roles <span style="color: red">*</span></label
                    >
                    <select
                      class="form-control"
                      v-model="roles.id"                   
                    >
                      <option value="">--Select--</option>
                      <template
                        v-for="role in roles"
                        :key="role.id"
                      >
                        <option :value="role.id">
                          {{ role.name }}
                        </option>
                      </template>
                    </select>
                    
                  </div>

                  
                </div>
                <div class="row">
                      
                  <!-- <div class="col-lg-3 col-md-3 col-sm-12">
                        <label>Country</label>
                        <input
                        class="form-control"
                        v-model="user.country"                                             
                        />                     
                  </div>  -->
                   <div class="col-lg-3 col-md-3 col-sm-12">
                        <label>City</label>
                        <input
                        class="form-control"
                        v-model="user.city"                                             
                        />                     
                  </div> 

                  <div class="col-lg-3 col-md-3 col-sm-12">
                        <label>Province</label>
                        <input
                        class="form-control"
                        v-model="user.province"                                             
                        />                     
                  </div>                  
                  
                  <div class="col-lg-3 col-md-3 col-sm-12">
                        <label>Zip</label>
                        <input
                        class="form-control"
                        v-model="user.zip"                                             
                        />                     
                  </div> 
                   <div class="col-lg-3 col-md-3 col-sm-12">
                        <label>Phone</label>
                        <input
                        class="form-control"
                        v-model="user.phone"                                             
                        />                     
                  </div> 
                </div>                
                <div class="row">
                     <div class="col-lg-3 col-md-3 col-sm-12">
                        <label>Profile Image</label>
                          <input
                          accept="image/png, image/jpeg, image/jpg"
                          type="file"
                          id="file" 
                          class="form-control"
                          @change="onChange"                          
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
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
  components: { PageHeader },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      page_title: this.$route.params.id ? "Edit User" : "Add New User",
      base_url: process.env.VUE_APP_SERVICE_URL,
      user: {},
      roles: [],      
    };
  },
  validations() {
    return {
      user: {         
        name: { required },
        email: { required, email },
        password: { required },   
                  
      },
    };
  },
  created() {
     this.getUser();
     this.getRoles();
  },
 
  methods: {
    onChange(e) {
      this.file = e.target.file;
    },
    submitForm: function (event) {
      this.v$.$validate();
      if (!this.v$.$error) {
        event.preventDefault();

        var headers = {          
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        };        

        axios
          .post(this.base_url + "/api/users", this.user, {
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
                this.$router.push({ path: "/users" });
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
    getUser() {
      if (this.$route.params.id) {
        var url = this.base_url + "/api/users/" + this.$route.params.id;
        axios
          .get(url)
          .then((response) => {
            this.user = response.data.user;            
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 
    async getRoles() {
      let url = this.base_url + "/api/roles";
      await axios
        .post(url)
        .then((response) => {
          this.roles = response.data.roles;          
        })
        .catch((error) => {
          console.log(error);
        });
    }, 
  },
};
</script>

<style>
.card {
  background: #f7f7f7;
}
.form-group {
  margin-bottom: 5px;
}
.errorMessage {
  color: red;
}
.error-boarder {
  border: 1px solid red;
}
@media only screen and (max-width: 768px) {
  .mt {
    margin-top: 5px;
  }
}
</style>