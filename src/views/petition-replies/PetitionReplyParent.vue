<template>
  <ConfirmPopup></ConfirmPopup>
  <main id="main">
    <page-header title="Petition Replies Parent" />
    <nav-components activeNavPill="reply" :petition_id="petition.id" />
    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg mt-3">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="table-responsive">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <table class="table table-striped">
                <thead>
                  <th>Title</th>

                  <th width="10%" v-if="this.user.is_admin || this.user.is_lawyer">Actions</th>
                </thead>
                <tbody>
                  <tr
                    v-for="(
                      petition_reply_parent, petitionReplyParentIndex
                    ) in petition_reply_parents"
                    :key="petition_reply_parent.id"
                    class="draggable"
                    draggable="true"
                    @dragstart="startDrag($event, petitionReplyParentIndex)"
                    @drop="onDrop($event, petitionReplyParentIndex)"
                    @dragenter.prevent
                    @dragover.prevent
                  >
                    <td>
                      <input
                        v-show="petition_reply_parent.editMode"
                        class="form-control"
                        v-model="petition_reply_parent.title"
                        v-on:keyup.enter="
                          editPetitionReplyParent(petition_reply_parent)
                        "
                      />
                      <router-link
                        v-show="!petition_reply_parent.editMode"
                        :to="{
                          name: 'petition-replies',
                          params: { id: petition_reply_parent.id },
                        }"
                        >{{ petition_reply_parent.title }}
                      </router-link>
                    </td>

                    <td width="15%" v-if="this.user.is_admin || this.user.is_lawyer">
                      <a
                        class="btn btn-sm btn-primary action-btn"
                        v-show="!petition_reply_parent.editMode"
                        @click="petition_reply_parent.editMode = true"
                        href="javascript:void"
                        style="margin-left: 2px"
                        v-tooltip.top="'Edit'"
                      >
                        Edit
                        <!-- <i class="fa fa-edit"></i> -->
                      </a>
                      <a
                        v-show="petition_reply_parent.editMode"
                        class="btn btn-sm btn-warning action-btn"
                        @click="editPetitionReplyParent(petition_reply_parent)"
                        href="javascript:void"
                        style="margin-left: 2px"
                        v-tooltip.top="'Update'"
                      >
                        Update
                        <!-- <i class="fa fa-save"></i> -->
                      </a>

                      <a
                        v-show="petition_reply_parent.editMode"
                        @click="petition_reply_parent.editMode = false"
                        class="btn btn-sm btn-info action-btn"
                        href="javascript:void"
                        style="margin-left: 2px"
                        v-tooltip.top="'Cancel'"
                      >
                        Cancel
                        <!-- <i class="fa fa-remove"></i> -->
                      </a>

                      <a
                        class="btn btn-sm btn-danger action-btn"
                        v-show="!petition_reply_parent.editMode"
                        @click="
                          deletePetitionReply(
                            $event,
                            petition_reply_parent.id,
                            petitionReplyParentIndex
                          )
                        "
                        href="javascript:void"
                        style="margin-left: 2px"
                        v-tooltip.top="'Delete'"
                      >
                        Delete
                        <!-- <i class="fa fa-trash-o"></i> -->
                      </a>
                    </td>
                  </tr>
                  <tr v-if="this.user.is_admin || this.user.is_lawyer">
                    <td>
                      <input
                        class="form-control"
                        v-model="new_petition_reply_parent.title"
                        v-on:keyup.enter="submitPetitionReply()"
                        v-bind:class="{
                          'error-boarder':
                            v$.new_petition_reply_parent.title.$error,
                        }"
                        @blur="v$.new_petition_reply_parent.title.$touch"
                      />
                      <span
                        v-if="v$.new_petition_reply_parent.title.$error"
                        class="errorMessage"
                        >Title field is required.</span
                      >
                    </td>
                    <td>
                      <button
                        :disabled="saving"
                        @click="submitPetitionReply()"
                        class="btn btn-sm btn-success action-btn"
                        v-tooltip.top="'Save'"
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
import ConfirmPopup from "primevue/confirmpopup";

export default {
  components: { PageHeader, NavComponents, ConfirmPopup },
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
      petition_reply_parents: [],
      petition: {},
      id: this.$route.params.id,
      petition_id: this.$route.params.id,
      new_petition_reply_parent: {},
      saving: false,
    };
  },
  validations() {
    return {
      new_petition_reply_parent: {
        title: { required },
      },
    };
  },
  created() {
    this.getCaseDetails();
    this.getPetitionReplyParents();
  },
  mounted() {
    document.title = "Petition Reply Parents";
  },
  methods: {
    //Drag and Drop Functionality
    startDrag(event, index) {
      console.log(index);
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("index_id", index);
    },

    onDrop(event, newIndex) {
      var old_index = event.dataTransfer.getData("index_id");
      this.petition_reply_parents = this.array_move(
        this.petition_reply_parents,
        old_index,
        newIndex
      );
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .post(
          this.base_url + "/api/petition_reply_parents/update_display_order",
          {
            petition_reply_parents: this.petition_reply_parents,
          },
          { headers }
        )
        .then((response) => {})
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    //Drag and Drop Functionality
    getCaseDetails() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/petitions/" + this.petition_id, { headers })
        .then((response) => {
          this.petition = response.data.petition;

          console.log(this.petition);
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
    getPetitionReplyParents() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/petition_reply_parents/" + this.id, {
          headers,
        })
        .then((response) => {
          this.petition_reply_parents = response.data.petition_reply_parents;
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
    deletePetitionReply(event, petitionId, petitionReplyParentIndex) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Do you want to Delete?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Delete",
        acceptClass: "p-button-danger",
        rejectClass: "p-button-primary",
        rejectLabel: "Cancel",
        accept: () => {
          var headers = {
            Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
          };

          axios
            .delete(
              this.base_url + "/api/petition_reply_parents/" + petitionId,
              {
                headers,
              }
            )
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
                  this.petition_reply_parents.splice(
                    petitionReplyParentIndex,
                    1
                  ); //removing record from list/index after deleting record from DB
                }
              },
              (error) => {
                console.log(error.response.data);
                this.$notify({
                  type: "error",
                  title: "Something went wrong!",
                  text: error.response.data.message,
                });
              }
            );
        },
        reject: () => {
          this.$confirm.close();
        },
      });
    },
    editPetitionReplyParent(petitionReplyParentToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(
            this.base_url + "/api/petition_reply_parents",
            petitionReplyParentToUpdate,
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
                petitionReplyParentToUpdate.editMode = false;
              }
            },
            (error) => {
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
    submitPetitionReply() {
      this.v$.$validate();
      if (!this.v$.$error) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;
        this.new_petition_reply_parent.petition_id = this.id;
        axios
          .post(
            this.base_url + "/api/petition_reply_parents",
            this.new_petition_reply_parent,
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
                this.new_petition_reply_parent = {};
                setTimeout(() => {
                  this.v$.$reset();
                }, 0);
                this.getPetitionReplyParents();
              }
            },
            (error) => {
              this.saving = false;
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
  },
};
</script>

<style></style>
