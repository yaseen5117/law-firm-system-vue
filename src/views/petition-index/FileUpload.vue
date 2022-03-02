<template>
  <div class="card">
    <div class="card-header">Upload New Files</div>
    <div class="card-body">
      <!-- <div v-if="success != ''" class="alert alert-success">
        {{ success }}
      </div> -->
       
      <form @submit="onUploadFile" enctype="multipart/form-data">
        <input
          accept="image/png, image/jpeg, image/jpg"
          type="file"
          id="file" 
          class="form-control"
          @change="onChange"
          multiple
        />
        <span v-if="v$.files.$error" class="errorMessage"
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
  props: {
    type: String
  },
  setup() {    
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      name: "",
      files: "",
      attachmentable_id: this.$route.params.id, //this is the id from the browser
      success: "",
    };
  },
  validations() {
    return {
      files: { required },
    };
  },
  methods: {

    onChange(e) {
      this.files = e.target.files;
    },
    onUploadFile(e) {       
      e.preventDefault();
      //let existingObj = this;
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        },
      };

      let formData = new FormData();

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files[" + i + "]", file);
      }

      this.v$.$validate();
      if (!this.v$.$error) {
        formData.append("attachmentable_type", this.type);
        formData.append("attachmentable_id", this.attachmentable_id);
        axios.post(this.base_url + "/api/attachments", formData, config).then(
          (response) => {
            if (response.status === 200) {
              this.$notify({
                type: "success",
                title: "Success",
                text: "Files Uploaded Successfully!",
              });
              console.log(response.data);
              this.$emit("afterUpload");                         
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
        );
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