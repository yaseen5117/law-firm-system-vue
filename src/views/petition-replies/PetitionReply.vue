<template>
  <main id="main">
    <page-header title="Petition Replies" />
    <nav-components activeNavPill="reply" :petition_id="petition.id" />
    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="table-responsive">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <table class="table table-striped">
                <thead>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Annexure</th>
                  <th>Page</th>
                  <th width="10%" v-if="this.user.is_admin">Actions</th>
                </thead>
                <tbody>
                  <tr
                    v-for="(
                      petition_reply, petitionReplyIndex
                    ) in petition_replies"
                    :key="petition_reply.id"
                  >
                    <td>
                      <input
                        v-show="petition_reply.editMode"
                        class="form-control"
                        v-model="petition_reply.document_description"
                        v-on:keyup.enter="editPetitionReply(petition_reply)"
                      />
                      <router-link
                        v-show="!petition_reply.editMode"
                        :to="{
                          name: 'petition-reply-details',
                          params: { id: petition_reply.id },
                        }"
                        >{{ petition_reply.document_description }}
                      </router-link>
                    </td>
                    <td>
                      <InputMask
                        mask="99/99/9999"
                        v-show="petition_reply.editMode"
                        class="form-control"
                        type="text"
                        placeholder="dd/mm/yyyy"
                        v-model="petition_reply.date"
                        v-on:keyup.enter="editPetitionReply(petition_reply)"
                      />
                      <span v-show="!petition_reply.editMode">{{
                        petition_reply.date
                      }}</span>
                    </td>
                    <td>
                      <input
                        v-show="petition_reply.editMode"
                        class="form-control"
                        v-model="petition_reply.annexure"
                        v-on:keyup.enter="editPetitionReply(petition_reply)"
                      />
                      <span v-show="!petition_reply.editMode">{{
                        petition_reply.annexure
                      }}</span>
                    </td>
                    <td>
                      <input
                        v-show="petition_reply.editMode"
                        class="form-control"
                        v-model="petition_reply.page_info"
                        v-on:keyup.enter="editPetitionReply(petition_reply)"
                      />
                      <span v-show="!petition_reply.editMode">{{
                        petition_reply.page_info
                      }}</span>
                    </td>
                    <td width="15%" v-if="this.user.is_admin">
                      <a
                        class="btn btn-sm btn-primary action-btn"
                        v-show="!petition_reply.editMode"
                        @click="petition_reply.editMode = true"
                        href="javascript:void"
                        style="margin-left: 2px"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Edit"
                      >
                        Edit
                        <!-- <i class="fa fa-edit"></i> -->
                      </a>
                      <a
                        v-show="petition_reply.editMode"
                        class="btn btn-sm btn-warning action-btn"
                        @click="editPetitionReply(petition_reply)"
                        href="javascript:void"
                        style="margin-left: 2px"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Update"
                      >
                        Update
                        <!-- <i class="fa fa-save"></i> -->
                      </a>

                      <a
                        v-show="petition_reply.editMode"
                        @click="petition_reply.editMode = false"
                        class="btn btn-sm btn-info action-btn"
                        href="javascript:void"
                        style="margin-left: 2px"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Cancel"
                      >
                        Cancel
                        <!-- <i class="fa fa-remove"></i> -->
                      </a>

                      <a
                        class="btn btn-sm btn-danger action-btn"
                        v-show="!petition_reply.editMode"
                        @click="
                          deletePetitionReply(
                            petition_reply.id,
                            petitionReplyIndex
                          )
                        "
                        href="javascript:void"
                        style="margin-left: 2px"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Delete"
                      >
                        Delete
                        <!-- <i class="fa fa-trash-o"></i> -->
                      </a>
                    </td>
                  </tr>
                  <tr v-if="this.user.is_admin">
                    <td>
                      <input
                        class="form-control"
                        v-model="new_petition_reply.document_description"
                        v-on:keyup.enter="submitPetitionReply()"
                        v-bind:class="{
                          'error-boarder':
                            v$.new_petition_reply.document_description.$error,
                        }"
                        @blur="
                          v$.new_petition_reply.document_description.$touch
                        "
                        ref="newreplydescription"
                      />
                      <span
                        v-if="v$.new_petition_reply.document_description.$error"
                        class="errorMessage"
                        >Description field is required.</span
                      >
                    </td>
                    <td>
                      <InputMask
                        mask="99/99/9999"
                        class="form-control"
                        type="text"
                        placeholder="dd/mm/yyyy"
                        v-model="new_petition_reply.date"
                        v-on:keyup.enter="submitPetitionReply()"
                      />
                    </td>
                    <td>
                      <input
                        class="form-control"
                        v-model="new_petition_reply.annexure"
                        v-on:keyup.enter="submitPetitionReply()"
                      />
                    </td>
                    <td>
                      <input
                        class="form-control"
                        v-model="new_petition_reply.page_info"
                        v-on:keyup.enter="submitPetitionReply()"
                      />
                    </td>
                    <td>
                      <button
                        :disabled="saving"
                        @click="submitPetitionReply()"
                        class="btn btn-sm btn-success action-btn"
                      >
                        Save
                        <!-- <i class="fa fa-save"></i> -->
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Services Section -->
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import NavComponents from "../Cases/NavComponents.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapState } from "vuex";

export default {
  components: { PageHeader, NavComponents },
  computed: mapState(["user"]),
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      page_title: "Petiton Replies",
      base_url: process.env.VUE_APP_SERVICE_URL,
      petition_replies: [],
      id: this.$route.params.id, //this is the id from the browser
      new_petition_reply: {},
      petition: {},
      saving: false,
    };
  },
  validations() {
    return {
      new_petition_reply: {
        document_description: { required },
      },
    };
  },
  created() {
    this.getPetitionReplyDetails();
  },
  methods: {
    getPetitionReplyDetails() {
      var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
      axios
        .get(this.base_url + "/api/petition_replies/" + this.id, {headers})
        .then((response) => {
          this.petition_replies = response.data.petition_replies;
          this.petition = response.data.petition;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePetitionReply(petitionId, petitionReplyIndex) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .delete(this.base_url + "/api/petition_replies/" + petitionId, {
            headers,
          })
          .then(
            (response) => {
              console.log(response);
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Deleted Successfully!",
                });
                //this.getCaseDetails()
                this.petition_replies.splice(petitionReplyIndex, 1); //removing record from list/index after deleting record from DB
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
    editPetitionReply(petitionReplyToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(
            this.base_url + "/api/petition_replies",
            petitionReplyToUpdate,
            {
              headers,
            }
          )
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Update Successfully!",
                });
                petitionReplyToUpdate.editMode = false;
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
    submitPetitionReply() {
      this.v$.$validate();
      if (!this.v$.$error) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;
        this.new_petition_reply.petition_reply_parent_id = this.id;
        axios
          .post(
            this.base_url + "/api/petition_replies",
            this.new_petition_reply,
            {
              headers,
            }
          )
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                this.saving = false;
                
                this.new_petition_reply = {
                  
                };
                setTimeout(() => {
                  this.v$.$reset();
                  this.$refs.newreplydescription.focus()
                   
                }, 0);
                this.getPetitionReplyDetails();
              }
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