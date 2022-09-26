<template>
  <ConfirmPopup />
  <main id="main">
    <page-header :title="page_title" :petition="null" />
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <form @submit.prevent="submitForm($event)">
          <div class="row" v-if="this.$route.params.company_id">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="form-group">
                <label>Company <span style="color: red">*</span></label>
                <Dropdown
                  v-model="user.company_id"
                  :options="companies"
                  class="text-capitalize"
                  optionLabel="name"
                  optionValue="id"
                  placeholder="Select company"
                  :filter="true"
                  appendTo="self"
                  filterPlaceholder="Find by Company Name"
                  v-bind:class="{
                    'error-boarder': v$.user.company_id.$error,
                  }"
                  @blur="v$.user.company_id.$touch"
                />
                <span v-if="v$.user.company_id.$error" class="errorMessage"
                  >Company field is required.</span
                >
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Name<span style="color: red">*</span></label>
                    <input
                      autofocus
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
                    <label>CNIC</label>
                    <InputMask
                      type="text"
                      class="form-control"
                      v-model="user.cnic"
                      mask="99999-9999999-9"
                    />
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Email<span style="color: red">*</span></label>
                    <input
                      type="email"
                      class="form-control"
                      v-model="user.email"
                      v-bind:class="{
                        'error-boarder': v$.user.email.$error,
                        'is-invalid': error_email,
                      }"
                      @blur="v$.user.email.$touch"
                    />
                    <span v-if="v$.user.email.$error" class="errorMessage"
                      >Email field is required.</span
                    >
                    <small class="text-danger">{{ error_email }} </small>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Phone</label>
                    <InputMask
                      class="form-control"
                      mask="9999-9999999"
                      v-model="user.phone"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label
                      >Password<span v-show="!user.id" style="color: red"
                        >*</span
                      ></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="user.password"
                    />
                    <small class="text-danger">{{ error_password }} </small>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label
                      >Confirm Password<span
                        v-show="!user.id"
                        style="color: red"
                        >*</span
                      ></label
                    >
                    <input
                      type="text"
                      v-bind:class="{
                        'error-boarder': v$.user.confirm_password.$error,
                      }"
                      @blur="v$.user.confirm_password.$touch"
                      class="form-control"
                      v-model="user.confirm_password"
                    />
                    <span
                      v-if="v$.user.confirm_password.$error"
                      class="errorMessage"
                      >Password and Confirm Password should be same.</span
                    >
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div
                    class="col-lg-6 col-md-6 col-sm-12"
                    v-if="!user.is_client"
                  >
                    <label>Role <span style="color: red">*</span></label>
                    <Dropdown
                      v-model="user.role_id"
                      :options="roles"
                      class="text-capitalize"
                      optionLabel="name"
                      optionValue="id"
                      placeholder="Select"
                      :filter="true"
                      appendTo="self"
                      filterPlaceholder="Find by Role Title"
                      v-bind:class="{
                        'error-boarder': v$.user.role_id.$error,
                      }"
                      @blur="v$.user.role_id.$touch"
                    />
                    <span v-if="v$.user.role_id.$error" class="errorMessage"
                      >Role field is required.</span
                    >
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Company Name</label>
                    <input class="form-control" v-model="user.company_name" />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label>Address</label>
                    <input class="form-control" v-model="user.address" />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <!-- <div class="col-lg-3 col-md-3 col-sm-12">
                        <label>Country</label>
                        <input
                        class="form-control"
                        v-model="user.country"                                             
                        />                     
                  </div>  -->
                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <label>City</label>
                    <input class="form-control" v-model="user.city" />
                  </div>

                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <label>Province</label>
                    <input class="form-control" v-model="user.province" />
                  </div>

                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <label>Zip</label>
                    <input class="form-control" v-model="user.zip" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <label>Profile Image</label>
                    <input
                      accept="image/png, image/jpeg, image/jpg"
                      type="file"
                      id="file"
                      class="form-control"
                      @change="onChange"
                      ref="fileInput"
                      @input="pickFile"
                    />
                  </div>
                  <div
                    class="col-lg-3 col-md-3 col-sm-12"
                    v-show="previewImage"
                  >
                    <div
                      class="imagePreviewWrapper"
                      :style="{ 'background-image': `url(${previewImage})` }"
                      @click="selectImage"
                    ></div>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12" v-show="profileImg">
                    <img
                      v-if="user && user.attachment"
                      :src="
                        this.base_url +
                        '/storage/attachments/user/' +
                        user.id +
                        '/' +
                        user.attachment.file_name
                      "
                      alt="avatar"
                      style="width: 75px; height: 70px"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row mt-2">
                  <div class="col-md-12">
                    <div
                      class="form-group"
                      v-for="(
                        contact_person, contact_person_index
                      ) in user.contact_persons"
                      :key="contact_person"
                    >
                      <div class="row">
                        <div class="col-md-4">
                          <label for="">Name</label>
                          <input
                            autofocus
                            type="text"
                            class="form-control"
                            v-model="contact_person.name"
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="">Email</label>
                          <input
                            v-model="contact_person.email"
                            type="text"
                            :class="
                              contact_person_email_error
                                ? 'form-control is-invalid'
                                : 'form-control'
                            "
                          />
                          <small class="text-danger"
                            >{{ contact_person_email_error }}
                          </small>
                        </div>
                        <!-- <div class="col-md-3">
                          <label for="">CNIC</label>
                          <InputMask
                            type="text"
                            class="form-control"
                            v-model="contact_person.cnic"
                            mask="99999-9999999-9"
                          />
                        </div> -->
                        <div class="col-md-4">
                          <label for="">Phone</label>
                          <div class="input-group">
                            <InputMask
                              class="form-control"
                              mask="9999-9999999"
                              v-model="contact_person.phone"
                            />
                            <button
                              type="button"
                              class="btn-danger"
                              @click="
                                removeContactPerson(
                                  $event,
                                  user.contact_persons,
                                  contact_person_index,
                                  contact_person.id
                                )
                              "
                              v-tooltip.top="'Remove'"
                              :disabled="saving"
                            >
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
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>
                <input type="checkbox" v-model="user.send_email" />
                Send Details with Email</label
              >
            </div>
            <div class="form-group">
              <button :disabled="saving" class="btn btn-success btn-sm">
                {{ btnTitle }}
              </button>
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

export default {
  components: { PageHeader },
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
      user: {
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
    };
  },
  validations() {
    return {
      user: {
        name: { required },
        email: { required, email },
        confirm_password: {
          sameAs: sameAs(this.user.password),
        },
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
    document.title = this.user.name
      ? this.user.name + " | " + this.page_title
      : this.page_title;
  },
  mounted() {
    document.getElementById("header");
  },
  methods: {
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
      this.user.contact_persons.push(contact_person_single);
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
    submitForm: function (event) {
      this.v$.$validate();
      if (!this.v$.$error) {
        event.preventDefault();
        this.error_email = "";
        this.contact_person_email_error = "";
        this.saving = true;
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
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
                this.UploadImage(response.data.user.id);
                this.saving = false;
                if (response.data.is_admin_user) {
                  this.$router.push({ path: "/users" });
                } else {
                  this.getUser();
                }
              }
              console.log(response);
            },
            (error) => {
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
            this.user = response.data.user;
            this.user.role_id = response.data.user.roles[0].id;
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
          this.user.company_id = parseInt(this.company_id);
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
</style>
