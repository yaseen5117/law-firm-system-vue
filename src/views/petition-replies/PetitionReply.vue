<template>
  <main id="main">
    <page-header title="Petition Replies" />
    <nav-components />
    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">        
        <div class="row">
          <div class="table-responsive">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <table  class="table table-striped">
              <thead>                 
                <th>Description of Documents</th>
                <th>Date</th>
                <th>Annexure</th>
                <th>Page</th>
                <th width=10%>Actions</th>
              </thead>
              <tbody>
                <tr
                  @dblclick="petition_reply.editMode = true"
                  v-for="(petition_reply , petitionReplyIndex) in petition_replies"
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
                    <input
                      v-show="petition_reply.editMode"
                      class="form-control"
                      type="date"
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
                  <td width="15%">
                    <a
                      class="btn btn-sm btn-primary"
                      v-show="!petition_reply.editMode"
                      @click="petition_reply.editMode = true"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                    >
                      <i class="fa fa-edit"></i>
                    </a>
                    <a
                      v-show="petition_reply.editMode"
                      class="btn btn-sm btn-warning"
                      @click="editPetitionReply(petition_reply)"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Update"
                    >
                      <i class="fa fa-save"></i>
                    </a>

                    <a
                      v-show="petition_reply.editMode"
                      @click="petition_reply.editMode=false"
                      class="btn btn-sm btn-info"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Cacncel"
                    >
                      <i class="fa fa-remove"></i>
                    </a>

                    <a
                    class="btn btn-sm btn-danger"

                      v-show="!petition_reply.editMode"
                      @click="deletePetitionReply(petition_reply.id,petitionReplyIndex)"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"
                    >
                     <i class="fa fa-trash-o"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  
                  <td>
                    <input
                      class="form-control"
                      v-model="new_petition_reply.document_description"
                    />
                  </td>
                  <td>
                    <input
                      class="form-control"
                      type="date"
                      v-model="new_petition_reply.date"
                    />
                  </td>
                  <td>
                    <input
                      class="form-control"
                      v-model="new_petition_reply.annexure"
                    />
                  </td>
                  <td>
                    <input
                      class="form-control"
                      v-model="new_petition_reply.page_info"
                    />
                  </td>
                  <td>
                    <a
                      href="javascript:void"
                      @click="submitPetitionReply()"
                      class="btn btn-sm btn-success"
                    >
                      <i class="fa fa-save"></i>
                    </a>
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

export default {
    components: { PageHeader,NavComponents },
     
    data() {
    return {
      'page_title':'Petiton Replies',
      base_url: process.env.VUE_APP_SERVICE_URL,
      petition_replies: [],       
      id: this.$route.params.id, //this is the id from the browser 
      new_petition_reply: {},      
    };
  },
  created() {
    this.getPetitionReplyDetails();
  },
  methods: {
    getPetitionReplyDetails() {
      axios
        .get(this.base_url + "/api/petition_replies/" + this.id)
        .then((response) => {
          this.petition_replies = response.data;                 
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePetitionReply(petitionId,petitionReplyIndex) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),           
        };
       
        axios
          .delete(this.base_url + "/api/petition_replies/"+petitionId, {
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
                this.petition_replies.splice(petitionReplyIndex,1);//removing record from list/index after deleting record from DB              
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
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        };

        axios
          .post(this.base_url + "/api/petition_replies", petitionReplyToUpdate, {
            headers,
          })
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
      if (true) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
        };
        this.new_petition_reply.petition_id = this.id;
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
                this.new_petition_reply = {};
                this.getPetitionReplyDetails();
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
  } 
}
</script>

<style>

</style>