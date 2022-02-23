<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Upload New Files</div>
          <div class="card-body">
            <div v-if="success != ''" class="alert alert-success">
              {{ success }}
            </div>
            <form @submit="formSubmit" enctype="multipart/form-data">
              <input @blur="v$.file.$touch" accept="image/png, image/jpeg, image/jpg" type="file" class="form-control" v-on:change="onChange" />
              <span v-if="v$.file.$error" class="errorMessage"
                >Select a File Before Uploading.</span
              ><br>
              <button class="btn btn-primary mt-2">Upload</button>
              <input type="hidden" />
            </form>
          </div>
        </div>
      </div>
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
        },
      };
      let data = new FormData();
      data.append("file", this.file);
      this.v$.$validate();
      if (!this.v$.$error) {
        data.append("attachmentable_id", this.attachmentable_id);
        axios
          .post("http://127.0.0.1:8000/api/uploads", data, config)
          .then(function (res) {
            existingObj.success = res.data.success;
          })
          .catch(function (err) {
            existingObj.output = err;
          });
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