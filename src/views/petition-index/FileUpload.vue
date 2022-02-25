<template>
  <div class="card">
    <div class="card-header">Upload New Files</div>
    <div class="card-body">
      <!-- <div v-if="success != ''" class="alert alert-success">
        {{ success }}
      </div> -->
      <form @submit="formSubmit" enctype="multipart/form-data">
        <input           
          accept="image/png, image/jpeg, image/jpg"
          type="file"
          class="form-control"
          v-on:change="onChange"
          multiple 
        />
        <span v-if="v$.file.$error" class="errorMessage"
          >Select a File Before Uploading.</span
        ><br />
        <button class="btn btn-primary btn-sm">Upload</button>
        <input type="hidden" />
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {    
      base_url: process.env.VUE_APP_SERVICE_URL,  
      name: "",
      file: "",
      attachmentable_id: this.$route.params.id, //this is the id from the browser
      success: "",
    };
  },
  validations() {
    return {
      file: { required },
    };
  },
  methods: {
    onChange(e) {
      this.file = e.target.files[0];
    },
    formSubmit(e) {
      e.preventDefault();
      let existingObj = this;
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        },
      };
      let data = new FormData();
      data.append("file", this.file);
      this.v$.$validate();
      if (!this.v$.$error) {
        data.append("attachmentable_id", this.attachmentable_id);
        axios
          .post(this.base_url + "/api/attachments", data, config)
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "File Uploaded Successfully!",
                });
                console.log(response.data);
                this.$emit('afterUpload', response.data)
                //this.$root.petition_index_details.attachments = response;
                //attachmentToUpdate.editMode = false;
              }
            },
            (error) => {
              console.log(error.response.data.error);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.error,
              });
            }
          )  
      }
    },
  },
};
</script>
<style>
.errorMessage {
  color: red;
}
</style>