<template>
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->     
    <page-header
      :title="petition_reply_details.document_description"
      :petition="petition"
      :hide="removePageHeader ? true : false"
    />
    <!-- End Breadcrumbs -->
    <section id="services" class="services section-bg"
    :class="removePageHeader ? 'margintop85' : ''"
    >
    <nav-components activeNavPill = 'reply' :petition_id="petition.id"  />
      <div class="container mt-4" data-aos="fade-up">

        <div class="row text-right mb-4">
          <div class="col-12 mb-1">
            <div class="form-check form-switch">
              <input
                @change="removePageHeader = !removePageHeader"
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label class="form-check-label" for="flexSwitchCheckDefault"
                >Toggle Header</label
              >
            </div>
          </div>
          <div v-if="!removePageHeader" class="col-12">

            <button
              v-show="!showImgCard"
              @click="showImgCard = true" 
              class="btn btn-success btn-sm mb-2"
              style="margin-right:2px"               
            >
              Upload New Image
            </button>
            <button
               v-show="showImgCard"
              @click="showImgCard = false"
 
              class="btn btn-primary btn-sm mb-2"
              style="margin-right:2px"               
            >
              Cancel Upload
            </button>

            <button
              v-show="!editView"
              @click="
                editView = true;
                horizontalView: true;
              "
              style="margin-right:2px"
              class="btn btn-primary btn-sm mb-2"
            >
              Edit
            </button>
            <button
              v-show="editView"
              @click="
                editView = false;
                horizontalView: false;
              "
              style="margin-right:2px"
              class="btn btn-success btn-sm mb-2"
            >
              Cancel
            </button>


          </div>
          <div class="col-lg-12 col-md-12 col-sm-12" v-show="showImgCard">
            <file-upload @afterUpload="getPetitionReplyDetails" type="App\Models\PetitionReply" :attachmentable_id="attachmentable_id"/></div>
        </div>

        <div class="row">
          <div class="col-12">           
            <div v-show="!horizontalView && !editView">
              <div
                class="row mb-2 text-center"
                :id="'image-container-' + attachment.id"
                v-for="attachment in petition_reply_details.attachments"
                :key="attachment"
              >
                <div class="col-12">
                  <img
                    v-if="attachment.mime_type != 'application/pdf'"
                    :class="activePage == attachment.id ? 'active-img' : ''"
                    class="img-fluid"
                    style="width: 90%"
                    :src="
                      this.base_url +
                      '/storage/attachments/' 
                      +                     
                      this.$route.params.id +
                      '/' +
                      attachment.file_name
                    "
                  />                         
                  <a :class="activePage == attachment.id ? 'active-img' : ''"
                   v-if="attachment.mime_type == 'application/pdf'" :href="this.base_url +
                      '/storage/attachments/' 
                      +                     
                      this.$route.params.id +
                      '/' +
                      attachment.file_name" target="_blank"><u><span>Click to Open: </span>{{ attachment.title }}</u></a>             
                  <hr class="mt-4 mb-4" style="border: solid 3px" />
                </div>
              </div>
            </div>

            <div v-show="editView">
              <div class="row">
                <div class="table-responsive">
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <button
                      v-if="showDeleteBtn"
                      class="btn btn-sm btn-danger"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Delete"
                      @click="deleteAll()"
                    >
                      Delete Selected
                    </button>
                  <table class="table table-bordered">
                    <thead>   
                      <th>
                          <input
                            class="margin-left-checkbox"
                            type="checkbox"
                            v-model="selectedAllToDelete"
                            @click="selectAllToDelete()"
                          />
                          Select all
                        </th>                   
                      <th>Image</th>
                      <th>Title</th>
                      <th>Display Order</th>
                      <th>Actions</th>
                    </thead>
                    <tbody>
                      <tr
                        @dblclick="attachment.editMode = false"                         
                        v-for="(attachment , attachmentReplyIndex) in petition_reply_details.attachments"
                        :key="attachment"
                      >
                       <td>
                            <div class="checkbox">
                              <input
                                type="checkbox"
                                :value="attachment.id"
                                v-model="selected"
                                @change="updateCheckall()"
                              />
                            </div>
                          </td>
                        <td>
                          <img
                            :class="
                              activePage == attachment.id ? 'active-img' : ''
                            "
                            style="width: 80px"
                            :src="
                              this.base_url +
                              '/storage/attachments/' +
                              '/' +
                              this.$route.params.id +
                              '/' +
                              attachment.file_name
                            "                            
                          />                          
                        </td>
                        <td>
                          <input
                            v-show="attachment.editMode"
                            class="form-control"
                            v-model="attachment.title"
                            v-on:keyup.enter="editPetitionReplyAttachment(attachment)"
                          />
                          <router-link
                            v-show="!attachment.editMode"
                            :to="{
                              name: 'petition-reply-details',
                              params: { id: attachment.id },
                            }"
                            >{{ attachment.title }}
                          </router-link>
                        </td> 

                        <td>
                          <input
                            v-show="attachment.editMode"
                            class="form-control"
                            v-model="attachment.display_order"
                            v-on:keyup.enter="editPetitionAttachment(attachment)"
                          />
                          <router-link
                            v-show="!attachment.editMode"
                            :to="{
                              name: 'petition-reply-details',
                              params: { id: attachment.id },
                            }"
                            >{{ attachment.display_order }}
                          </router-link>
                        </td>                          
                      <td width="15%">
                      <a
                      class="btn btn-sm btn-primary"
                      v-show="!attachment.editMode"
                      @click="attachment.editMode = true"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                    >
                      <i class="fa fa-edit"></i>
                    </a>
                    <a
                      v-show="attachment.editMode"
                      class="btn btn-sm btn-warning"
                      @click="editPetitionAttachment(attachment)"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Update"
                    >
                      <i class="fa fa-save"></i>
                    </a>
                   
                     <a
                      v-show="attachment.editMode"
                      @click="attachment.editMode=false"
                      class="btn btn-sm btn-info"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Cancel"
                    >
                      <i class="fa fa-remove"></i>
                    </a>

                    <a
                    class="btn btn-sm btn-danger"

                      v-show="!attachment.editMode"
                      @click="deletePetitionReplyAttachment(attachment.id,attachmentReplyIndex)"
                      href="javascript:void"
                      style="margin-left:2px"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"
                    >
                     <i class="fa fa-trash-o"></i>
                    </a>
                  </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-show="(!horizontalView &&  !editView)" class="fixed-page-numbers">
      <ul
        class="list-group"
      >
      <li 
        v-for="attachment in petition_reply_details.attachments"
        :key="attachment" :class="activePage == attachment.id ? 'active' : ''" class="list-group-item"
        @click="scrollIntoView(attachment.id)"
        style="cursor:pointer"
        >
          {{ attachment.id }}
        </li>
      </ul>
    </div>

    <div class="fixed-annexsures" @show="!editView">
      <div
        class="list-group"
        v-for="petition_reply_index_single in petition_reply_index"
        :key="petition_reply_index_single"
      >
        <router-link
          class="list-group-item"
          :class="id == petition_reply_index_single.id ? 'active' : ''"
          :to="{
            name: 'petition-reply-details',
            params: { id: petition_reply_index_single.id },
          }"
          >{{ petition_reply_index_single.annexure }}</router-link
        >
      </div>
      <!-- Prayers -->
      <!-- Stay Order -->
    </div>
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import NavComponents from "../Cases/NavComponents.vue";
import PageHeader from "../shared/PageHeader.vue";
import FileUpload from "../petition-index/FileUpload.vue";
export default {
  components: {
    PageHeader,
    Carousel,
    Slide,
    Pagination,
    Navigation,
    FileUpload,
    NavComponents,
  },
  data() {
    return {    
      showImgCard: false,
      editView: false,
      base_url: process.env.VUE_APP_SERVICE_URL,
      petition: {},
      petition_reply_index: [],
      petition_reply_details: {},
      attachmentable_id: this.$route.params.id,
      id: this.$route.params.id, //this is the id from the browser
      horizontalView: false, //it will show vertical images by default
      activePage: null,
      removePageHeader: false,
      selected: [],
      selectedAllToDelete: false,
      showDeleteBtn: false,
    };
  },
  created() {
    this.getPetitionReplyDetails();
  },
  methods: {
    scrollIntoView(id) {
      // document
      //   .getElementById("image-container-" + id)
      //   .scrollIntoView({ duration: 2000 });

      const yOffset = -200;
      const element = document.getElementById("image-container-" + id);
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      //document.getElementById("image-container-" + id).style.border="solid 1px red"
      this.activePage = id;
    },
    async getPetitionReplyDetails() {
      var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
      await axios
        .post(this.base_url + "/api/petition_reply_details/" + this.id, {headers})
        .then((response) => {
          this.petition_reply_details = response.data.petition_reply;
          this.petition = response.data.petition;           
          //console.log("petition",  response.data.petition.petition_reply_parent.petition);
          this.getPetitionReplyAnnexure(this.petition_reply_details.petition_reply_parent_id);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getPetitionReplyAnnexure(petition_reply_parent_id) {
      var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
      await axios
        .get(this.base_url + "/api/petition_replies/" + petition_reply_parent_id,{headers})
        .then((response) => {
          this.petition_reply_index = response.data.petition_replies;
           
          var arr = [];
          this.petition_reply_index.forEach((element) => {
            if (element.annexure) {
              arr.push(element);
            }
          });
          console.log("arr", arr);
          this.petition_reply_index = arr;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editPetitionReplyAttachment(attachmentToUpdate) {   
      if (true) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
    
        axios
          .put(this.base_url + "/api/attachments/"+attachmentToUpdate.id, attachmentToUpdate, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Updated Successfully!",
                });
                attachmentToUpdate.editMode = false;
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
    deletePetitionReplyAttachment(attachmentId,attachmentReplyIndex) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),           
        };
       
        axios
          .delete(this.base_url + "/api/attachments/"+attachmentId, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Deleted Successfully!",
                }); 
                //this.getPetitionReplyDetails()  
                this.petition_reply_details.attachments.splice(attachmentReplyIndex,1);//removing record from list/index after deleting record from DB              
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
    //select all to delete all
    selectAllToDelete() {      
      this.selected = [];
      if (!this.selectedAllToDelete) {
        this.showDeleteBtn = true;
        for (let i in this.petition_reply_details.attachments) {
          this.selected.push(this.petition_reply_details.attachments[i].id);
        }
      }else{
        this.showDeleteBtn = false;
      }
    },
    updateCheckall: function () {
      if (
        this.petition_reply_details.attachments.length == this.selected.length
      ) {        
        this.selectedAllToDelete = true;     
      }
      else if(!this.selected.length){
        this.showDeleteBtn = false;   
      }
       else {    
        this.showDeleteBtn = true;    
        this.selectedAllToDelete = false;
      }
    },
    deleteAll(){
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
  
        axios
          .post(this.base_url + "/api/delete_selected", this.selected, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Deleted Successfully!",
                });  
                this.showDeleteBtn = false;
                this.getPetitionReplyDetails(); //Reload all records from DB   
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
</style>