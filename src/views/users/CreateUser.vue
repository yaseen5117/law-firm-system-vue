<template>
  <ConfirmPopup />
  <main id="main">
    <page-header :title="page_title" :showUsers="true" :hideCaseFiles="true" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <form @submit.prevent="submitForm($event)">
          <div class="row" v-if="this.$route.params.company_id">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="form-group">
                <label>Company <span style="color: red">*</span></label>
                <Dropdown v-model="updatedOrNewUser.company_id" :options="companies" class="text-capitalize"
                  optionLabel="name" optionValue="id" placeholder="Select company" :filter="true" appendTo="self"
                  filterPlaceholder="Find by Company Name" v-bind:class="{
                    'error-boarder': v$.updatedOrNewUser.company_id.$error,
                  }" @blur="v$.updatedOrNewUser.company_id.$touch" />
                <span v-if="v$.updatedOrNewUser.company_id.$error" class="errorMessage error-font-size">Company field is
                  required.</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Name <span style="color: red">*</span></label>
                    <input autofocus class="form-control" v-model="updatedOrNewUser.name" v-bind:class="{
                      'error-boarder': v$.updatedOrNewUser.name.$error,
                    }" @blur="v$.updatedOrNewUser.name.$touch" />
                    <span v-if="v$.updatedOrNewUser.name.$error" class="errorMessage error-font-size">Name field is
                      required.</span>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>CNIC</label>
                    <InputMask type="text" class="form-control" v-model="updatedOrNewUser.cnic" mask="99999-9999999-9" />
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Email <span style="color: red">*</span></label>
                    <input type="email" class="form-control" v-model="updatedOrNewUser.email" v-bind:class="{
                      'error-boarder': v$.updatedOrNewUser.email.$error,
                      'is-invalid': error_email,
                    }" @blur="v$.updatedOrNewUser.email.$touch" />
                    <span v-if="v$.updatedOrNewUser.email.$error" class="errorMessage error-font-size">Email field is
                      required.</span>
                    <small v-if="!v$.updatedOrNewUser.email.$error" class="text-danger error-font-size">{{ error_email }}
                    </small>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Phone</label>
                    <InputMask class="form-control" mask="9999-9999999" v-model="updatedOrNewUser.phone" />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Password
                      <span v-show="!updatedOrNewUser.id" style="color: red">*</span></label>
                    <input type="text" class="form-control" v-model="updatedOrNewUser.password"
                      @blur="v$.updatedOrNewUser.password.$touch" />
                    <span v-if="v$.updatedOrNewUser.password.$error" class="errorMessage error-font-size">Password field
                      is required.</span>
                    <small v-if="!v$.updatedOrNewUser.password.$error" class="text-danger">{{ error_password }}
                    </small>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Confirm Password
                      <span v-show="!updatedOrNewUser.id" style="color: red">*</span></label>
                    <input type="text" v-bind:class="{
                      'error-boarder':
                        v$.updatedOrNewUser.confirm_password.$error,
                    }" @blur="v$.updatedOrNewUser.confirm_password.$touch" class="form-control"
                      v-model="updatedOrNewUser.confirm_password" />
                    <span v-if="v$.updatedOrNewUser.confirm_password.$error" class="errorMessage error-font-size">Password
                      and Confirm Password should be same.</span>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Role <span style="color: red">*</span></label>
                    <Dropdown :disabled="!this.user.is_admin" v-model="updatedOrNewUser.role_id" :options="roles"
                      class="text-capitalize" optionLabel="name" optionValue="id" placeholder="Select" :filter="true"
                      appendTo="self" filterPlaceholder="Find by Role Title" v-bind:class="{
                        'error-boarder': v$.updatedOrNewUser.role_id.$error,
                      }" @blur="v$.updatedOrNewUser.role_id.$touch" />
                    <span v-if="v$.updatedOrNewUser.role_id.$error" class="errorMessage error-font-size">Role field is
                      required.</span>
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Company Name</label>
                    <input class="form-control" v-model="updatedOrNewUser.company_name" />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label>Address</label>
                    <input class="form-control" v-model="updatedOrNewUser.address" />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <label>City</label>
                    <input class="form-control" v-model="updatedOrNewUser.city" />
                  </div>

                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <label>Province</label>
                    <input class="form-control" v-model="updatedOrNewUser.province" />
                  </div>

                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <label>Zip</label>
                    <input class="form-control" v-model="updatedOrNewUser.zip" />
                  </div>
                  
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>
                        <input type="checkbox" v-model="updatedOrNewUser.send_email" />
                        Send Details with Email</label>
                    </div>
                    <div class="form-group">
                      <button :disabled="saving" class="btn btn-success btn-sm">
                        {{ btnTitle }}
                      </button>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Profile Image</label>
                    <input accept="image/png, image/jpeg, image/jpg" type="file" id="file" class="form-control"
                      @change="onChange" ref="fileInput" @input="pickFile" />
                    <div class="" v-show="previewImage">
                      <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage})` }"
                        @click="selectImage"></div>
                    </div>

                    <div class="form-group">
                      <div class="row mt-2">
                        <div class="col-md-12">
                          <div class="form-group" v-for="(
                              contact_person, contact_person_index
                            ) in updatedOrNewUser.contact_persons" :key="contact_person">
                            <div class="row">
                              <div class="col-md-4">
                                <label for="">Name</label>
                                <input autofocus type="text" class="form-control" v-model="contact_person.name" />
                              </div>
                              <div class="col-md-4">
                                <label for="">Email</label>
                                <input v-model="contact_person.email" type="text" :class="contact_person_email_error
                                    ? 'form-control is-invalid'
                                    : 'form-control'
                                  " />
                                <small class="text-danger">{{ contact_person_email_error }}
                                </small>
                              </div>
                              <div class="col-md-4">
                                <label for="">Phone</label>
                                <div class="input-group">
                                  <InputMask class="form-control" mask="9999-9999999" v-model="contact_person.phone" />
                                  <button type="button" class="btn-danger" @click="
                                    removeContactPerson(
                                      $event,
                                      updatedOrNewUser.contact_persons,
                                      contact_person_index,
                                      contact_person.id
                                    )
                                    " v-tooltip.top="'Remove'" :disabled="saving">
                                    <span class="fa fa-minus"></span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button type="button" @click="addContactPerson()">
                            <span class="fa fa-plus"></span> Add Contact Person
                          </button>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                          <ToggleButton v-if="updatedOrNewUser &&
                            updatedOrNewUser.id &&
                            this.user.is_admin
                            " v-tooltip.top="blockOrApproved
      ? 'Click To Approve this User'
      : 'Click To Block this User'
    " v-model="blockOrApproved" onLabel="Approve this User" offLabel="Block this User"
                            onIcon="pi pi-check" offIcon="pi pi-ban" :style="blockOrApproved
                                ? 'background-color: green; color: white'
                                : 'background-color: red; color: white'
                              " class="w-full sm:w-10rem" aria-label="do you confirm" @change="
    blockOrApprove(updatedOrNewUser, !blockOrApproved)
    " />

                          <ToggleButton v-if="updatedOrNewUser &&
                            updatedOrNewUser.id &&
                            this.user.is_admin
                            " v-tooltip.top="updatedOrNewUser.documents_required
      ? 'Click to Approve Documents'
      : 'Click to Reject Documents'
    " v-model="updatedOrNewUser.documents_required" onLabel="Approve Documents"
                            offLabel="Reject Documents" onIcon="pi pi-check" offIcon="pi pi-ban" :style="updatedOrNewUser.documents_required
                                ? 'background-color: green; color: white'
                                : 'background-color: red; color: white'
                              " aria-label="Are you sure?" @change="approveRejectDocs()" />
                        </div>
                        <span class="mt-2 text-success" style="font-size: 12px;" v-if="updatedOrNewUser &&
                          updatedOrNewUser.id &&
                          updatedOrNewUser.is_approved > 0 &&
                          updatedOrNewUser.approved_at
                          ">
                          (User approved at:
                          <span>{{
                            updatedOrNewUser.approved_at
                            ? updatedOrNewUser.approved_at
                            : ""
                          }}</span>
                          by
                          <span>{{
                            updatedOrNewUser.approve_by
                            ? updatedOrNewUser.approve_by.name
                            : ""
                          }}</span>)
                        </span>
                        <span class="text-success" style="font-size: 12px;" v-if="updatedOrNewUser &&
                            !updatedOrNewUser.documents_required
                            ">(This user has uploaded required documents.)</span>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-12" v-show="profileImg">
                    <div>
                      <img v-if="updatedOrNewUser && updatedOrNewUser.attachment" :src="this.base_url +
                        '/storage/attachments/user/' +
                        updatedOrNewUser.id +
                        '/' +
                        updatedOrNewUser.attachment.file_name
                        " alt="avatar" style="width: 75px; height: 70px" />
                    </div>
                    <div v-if="updatedOrNewUser.required_documents.length > 0">
                      <p><strong>Required Documents </strong></p>
                      <div class="row" v-for="requiredDoc in updatedOrNewUser.required_documents">
                        <div class="col-md-12">
                          <img v-if="requiredDoc.path" :src="this.base_url + '/storage/' + requiredDoc.path
                            " :alt="requiredDoc.file_name" style="width: 80%" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </form>
      </div>
    </section>
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers, sameAs } from "@vuelidate/validators";
import ToggleButton from "primevue/togglebutton";

import { mapState } from "vuex";

export default {
  computed: mapState(["user"]),
  components: { PageHeader, ToggleButton },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      page_title: this.$route.params.edit_user_id
        ? "Edit User"
        : "Add New User",
      btnTitle: this.$route.params.edit_user_id ? "Update" : "Save",
      base_url: process.env.VUE_APP_SERVICE_URL,
      updatedOrNewUser: {
        password: this.$route.params.edit_user_id
          ? ""
          : this.generatePassword(),
        role_id: "",
        confirm_password: "",
        contact_persons: [],
        send_email: this.$route.params.edit_user_id ? false : true,
      },
      company_id: this.$route.params.company_id,
      roles: [],
      error_email: "",
      error_password: "",
      contact_person_email_error: "",
      previewImage:
        "localhost:8000/storage/attachments/user/1/1663842553_Profile Picture.jpg",
      saving: false,
      files: "",
      companies: [],
      profileImg: true,
      blockOrApproved: true,
      fromApproveBlockBtn: true,
    };
  },
  validations() {
    var confirmPassword;
    var Password;
    if (this.$route.params.edit_user_id) {
      Password = {};
      confirmPassword = {
        sameAs: sameAs(this.updatedOrNewUser.password),
      };
    } else {
      Password = {
        required,
      };
      confirmPassword = {
        required,
        sameAs: sameAs(this.updatedOrNewUser.password),
      };
    }
    return {
      updatedOrNewUser: {
        name: { required },
        email: { required, email },
        password: Password,
        confirm_password: confirmPassword,
        contact_persons: [],
        role_id: { required },
        company_id: this.$route.params.company_id ? { required } : "",
      },
    };
  },
  created() {
    this.getUser();
    this.getRoles();
    if (this.$route.params.company_id) {
      this.getCompanies();
    }
  },
  updated() {
    document.title = this.updatedOrNewUser.name
      ? this.updatedOrNewUser.name + " | " + this.page_title
      : this.page_title;
  },
  mounted() {
    document.getElementById("header");
  },
  methods: {
    blockOrApprove(updatedOrNewUser, param) {
      updatedOrNewUser.is_approved = param;
      this.fromApproveBlockBtn = false;
      this.submitForm();
    },

    approveRejectDocs() {
      this.fromApproveBlockBtn = false;
      this.submitForm();
    },

    generatePassword() {
      // program to generate random Password

      // declare all characters
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let length = 6;
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    removeContactPerson: function (event, obj, index, userId) {
      if (userId) {
        this.$confirm.require({
          target: event.currentTarget,
          message: "Do you want to Delete?",
          icon: "pi pi-exclamation-triangle",
          acceptLabel: "Delete",
          acceptClass: "p-button-danger",
          rejectClass: "p-button-primary",
          rejectLabel: "Cancel",
          accept: () => {
            this.saving = true;
            var headers = {
              Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
            };
            let url = this.base_url + "/api/users/" + userId;
            axios
              .delete(url, { headers })
              .then((response) => {
                this.saving = false;
                obj.splice(index, 1);
                console.log(response);
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "User Deleted Successfully!",
                });
              })
              .catch((error) => {
                this.saving = false;
                console.log(error);
                this.$notify({
                  type: "error",
                  title: "Something went wrong!",
                  text: error,
                });
              });
          },
          reject: () => {
            this.$confirm.close();
          },
        });
      } else {
        obj.splice(index, 1);
      }
    },
    addContactPerson() {
      var contact_person_single = {
        name: "",
        email: "",
        phone: "",
      };
      this.updatedOrNewUser.contact_persons.push(contact_person_single);
    },
    onChange(e) {
      this.files = e.target.files;
    },
    pickFile() {
      this.profileImg = false;
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        event.preventDefault();
        this.error_email = "";
        this.error_password = "";
        this.contact_person_email_error = "";
        this.saving = true;
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/users", this.updatedOrNewUser, {
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
                this.UploadImage(response.data.user.id);
                this.saving = false;
                if (response.data.is_admin_user && this.fromApproveBlockBtn) {
                  this.$router.push({ path: "/users" });
                } else {
                  this.getUser();
                }
              }
              console.log(response);
            },
            (error) => {
              this.blockOrApproved = true;
              this.saving = false;
              if (error.response.data.validation_error) {
                this.error_email =
                  error.response.data.validation_error.email[0];
              }
              if (error.response.data.validation_error) {
                this.error_password =
                  error.response.data.validation_error.password[0];
              }
              if (error.response.data.contact_person_validation_error) {
                this.contact_person_email_error =
                  error.response.data.contact_person_validation_error.email[0];
              }
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
    UploadImage(user_id) {
      let formData = new FormData();

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files[" + i + "]", file);
      }

      formData.append("attachmentable_id", user_id);
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/upload_user_image";
      axios
        .post(url, formData, { headers })
        .then((response) => {
          console.log("Image Uploaded successfully");
        })
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    getUser() {
      if (this.$route.params.edit_user_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        var url =
          this.base_url + "/api/users/" + this.$route.params.edit_user_id;
        axios
          .get(url, { headers })
          .then((response) => {
            this.updatedOrNewUser = response.data.user;
            console.log("USER: ", this.updatedOrNewUser);
            this.updatedOrNewUser.role_id = response.data.user.roles[0].id;
            (this.blockOrApproved =
              this.updatedOrNewUser && this.updatedOrNewUser.is_approved
                ? false
                : true),
              // this.previewImage =
              //   "localhost:8000/storage/attachments/user/" +
              //   response.data.user.id +
              //   "/" +
              //   response.data.user.attachment.file_name;
              console.log(this.previewImage);
          })
          .catch((error) => {
            console.log(error);
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.message,
            });
          });
      }
    },
    async getRoles() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/roles";
      await axios
        .post(url, { headers })
        .then((response) => {
          this.roles = response.data.roles;
        })
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    getCompanies() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/companies";
      axios
        .get(url, { headers })
        .then((response) => {
          this.companies = response.data.companies;
          this.updatedOrNewUser.company_id = parseInt(this.company_id);
        })
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
  },
};
</script>

<style>
.imagePreviewWrapper {
  background-repeat: no-repeat;
  width: 100px;
  height: 70px;
  display: block;
  cursor: pointer;
  margin: 0 auto 0px;
  background-size: contain;
  background-position: center center;
}

.pi-ban:before {
  color: white;
}

.error-font-size {
  font-size: 13px;
}
</style>
