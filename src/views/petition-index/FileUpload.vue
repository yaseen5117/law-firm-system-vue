<template>
  <div class="" :class="compactInlineView ? '' : 'card'">
    <div
      :class="compactInlineView ? 'display' : 'card-header'"
      class=""
      v-if="receipt"
    >
      Upload Receipt
    </div>
    <div
      :class="compactInlineView ? 'display' : 'card-header'"
      class=""
      v-if="upload_site_image"
    >
      Upload Image
    </div>
    <div
      :class="compactInlineView ? 'display' : 'card-header'"
      class=""
      v-if="!receipt && !upload_site_image"
    >
      Upload New Files
    </div>

    <div class="" :class="compactInlineView ? '' : 'card-body'">
      <!-- <div v-if="success != ''" class="alert alert-success">
        {{ success }}
      </div> -->
      <form @submit="onUploadFile" enctype="multipart/form-data">
        <input
          :accept="
            image_type
              ? image_type
              : 'image/png, image/jpeg, image/jpg, application/pdf, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          "
          type="file"
          id="file"
          class="form-control"
          @change="onChange"
          :multiple="multiple_or_single ? multiple : ''"
          :class="compactInlineView ? 'width-p' : ''"
          ref="fileupload"
        />
        <span class="" v-if="beforUploading" role="alert">
          {{ beforUploading }}
        </span>
        <span v-if="v$.files.$error" class="errorMessage"
          >Select a File Before Uploading.</span
        ><br />
        <button
          :disabled="saving"
          :class="compactInlineView ? 'display' : ''"
          class="btn btn-primary btn-sm"
        >
          Upload
        </button>
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
  emits: ["afterUpload", "disableOrderSheetBtn"],
  props: [
    "type",
    "attachmentable_id",
    "compactInlineView",
    "isOral",
    "receipt",
    "upload_site_image",
    "image_type",
    "petition_id",
    "multiple_or_single",
    "fromOrderSheet",
  ],
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
      //attachmentable_id: this.$route.params.id, //this is the id from the browser
      success: "",
      beforUploading: "",
      saving: true,
      orderSheetId: "",
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
      this.saving = false;
      if (this.compactInlineView) {
        this.onUploadFile();
      }
    },
    async onUploadFile(e) {
      if (!this.compactInlineView) {
        e.preventDefault();
      }
      this.$emit(
        "disableOrderSheetBtn",
        "disable the order sheet buttons while uploading attachments"
      );
      this.beforUploading = "Please Wait..!";
      this.saving = true;
      console.log("attachmentable_id: ", this.attachmentable_id);
      //if control coming from Order Sheet page
      if (this.fromOrderSheet && !this.attachmentable_id) {
        //first creating Order Sheet
        await this.createOrderSheet();
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        },
      };
      let formData = new FormData();

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files[" + i + "]", file);
      }

      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.orderSheetId) {
          formData.append("attachmentable_id", this.orderSheetId);
        } else {
          formData.append("attachmentable_id", this.attachmentable_id);
        }
        console.log("FormData: ", formData);
        formData.append("attachmentable_type", this.type);
        formData.append("petition_id", this.petition_id);

        axios.post(this.base_url + "/api/attachments", formData, config).then(
          (response) => {
            if (response.status === 200) {
              this.$notify({
                type: "success",
                title: "Success",
                text: "Files Uploaded Successfully!",
              });

              this.saving = true;
              this.beforUploading = "";
              this.$refs.fileupload.value = null;
              console.log(response.data);

              this.$emit(
                "afterUpload",
                this.orderSheetId ? this.orderSheetId : "",
                "Reloading the Data of attachments"
              );
            }
          },
          (error) => {
            this.saving = false;
            this.beforUploading = "";
            console.log(error.response.data);
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.message,
            });
          }
        );
      }
    },
    createOrderSheet() {
      var order_sheet = {
        petition_id: this.petition_id,
      };
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      return axios
        .post(this.base_url + "/api/petition_order_sheets", order_sheet, {
          headers,
        })
        .then(
          (response) => {
            if (response.status === 200) {
              order_sheet = response.data.petitionOrderSheet;
              this.orderSheetId = order_sheet.id;
              console.log("New Created Order Sheet Data: ", order_sheet);
            }
            console.log(response);
          },
          (error) => {
            this.saving = false;
            console.log(error.response.data);
            this.$notify({
              type: "error",
              title: "Something went wrong to create New ordersheet!",
              text: error.response.data.message,
            });
          }
        );
    },
  },
};
</script>
<style>
.errorMessage {
  color: red;
}
.width-p {
  width: 115px !important;
}
.display {
  display: none;
}
</style>
