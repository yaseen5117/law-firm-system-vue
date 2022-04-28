<template>

  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <page-header
      :title="petition_index_details.document_description"
      :petition="petition"
      :hide="removePageHeader ? true : false"
    />
    <!-- End Breadcrumbs -->
    <section
    
      id="services"
      class="services section-bg"
      :class="removePageHeader ? '' : ''"
    >
      <nav-components activeNavPill="petition" :petition_id="petition.id" />
      
      <div  class="container mt-4" data-aos="fade-up">
        <div class="row mb-2">
          <div class="col-12 mb-1">
            
              
              <button v-if="removePageHeader" @click="pageHeader()" class="btn btn-success btn-sm" for="flexSwitchCheckDefault"
                ><i class="fa fa-eye"></i> Show Header</button
              >
              <button v-if="!removePageHeader" @click="pageHeader()" class="btn btn-success btn-sm" for="flexSwitchCheckDefault"
                ><i class="fa fa-eye-slash"></i> Hide Header</button
              >
            
          </div>
          <div v-if="!removePageHeader" class="col-12">
            

            <button
              v-show="!showImgCard"
              @click="showImgCard = true"
              class="btn btn-success btn-sm mb-2"
              style="margin-right: 2px"
            >
              Upload New Image
            </button>
            <button
              v-show="showImgCard"
              @click="showImgCard = false"
              class="btn btn-primary btn-sm mb-2"
              style="margin-right: 2px"
            >
              Cancel Upload
            </button>

            <button
              v-show="!editView"
              @click="
                editView = true;
                horizontalView: true;
              "
              style="margin-right: 2px"
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
              style="margin-right: 2px"
              class="btn btn-success btn-sm mb-2"
            >
              Cancel
            </button>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12" v-show="showImgCard">
            <file-upload
              @afterUpload="getCaseDetails"
              type="App\Models\PetitionIndex"
              :attachmentable_id="id"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div v-show="!horizontalView && !editView">
              <div
                class="row mb-2 text-center"
                v-for="(attachment , index_attachment) in petition_index_details.attachments"
                :key="attachment"
                :id="'image-container-' + (index_attachment+1)"
              >
                <div class="col-12" >
                  <img
                    v-if="attachment.mime_type != 'application/pdf'"
                    :class="activePage == (index_attachment+1) ? 'active-img' : ''"
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

                  <a
                    :class="activePage == attachment.id ? 'active-img' : ''"
                    v-if="attachment.mime_type == 'application/pdf'"
                    :href="
                      this.base_url +
                      '/storage/attachments/' +
                      this.$route.params.id +
                      '/' +
                      attachment.file_name
                    "
                    target="_blank"
                    ><u
                      ><span>Click to Open: </span>{{ attachment.title }}</u
                    ></a
                  >
                  <hr class="mt-4 mb-4" style="border: solid 3px" />
                </div>
              </div>
            </div>
            <div class="row" >
                  <div class="col-lg-12 col-md-12 col-sm-12 text-center">
                      <router-link
                      v-tooltip.top="'Previous'"
                      style="margin-right:3px"
                        v-if="previous_index_id"
                        class="btn btn-success ml-3 mr-2"
                        :to="{
                          name: 'petition-index-details',
                          params: { id: previous_index_id },
                        }"
                        ><i class="fa fa-angle-up fa-2x btn-round"></i></router-link
                      >
                      
                      <router-link
                        v-tooltip.top="'Next'"
                        style="margin-right:3px"
                        v-if="next_index_id"
                        class="btn btn-success ml-3"
                        :to="{
                          name: 'petition-index-details',
                          params: { id: next_index_id },
                        }"
                        ><i class="fa fa-angle-down fa-2x btn-round"></i></router-link
                      >
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
                          Select All
                        </th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Display Order</th>
                        <th>Actions</th>
                      </thead>
                      <tbody>
                        <tr                           
                          v-for="(
                            attachment, attachmentIndex
                          ) in petition_index_details.attachments"
                          :key="attachment"
                        >
                          <td>
                            <div class="checkbox">
                              <input
                                type="checkbox"
                                :value="attachment.id"
                                v-model="selected_attachment_ids"
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
                              v-on:keyup.enter="
                                editPetitionAttachment(attachment)
                              "
                            />
                            <router-link
                              v-show="!attachment.editMode"
                              :to="{
                                name: 'petition-index-details',
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
                              v-on:keyup.enter="
                                editPetitionAttachment(attachment)
                              "
                            />
                            <router-link
                              v-show="!attachment.editMode"
                              :to="{
                                name: 'petition-index-details',
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
                              style="margin-left: 2px"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Edit"
                            >
                              Edit
                              <!-- <i class="fa fa-edit"></i> -->
                            </a>
                            <a
                              v-show="attachment.editMode"
                              class="btn btn-sm btn-warning"
                              @click="editPetitionAttachment(attachment)"
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
                              v-show="attachment.editMode"
                              @click="attachment.editMode = false"
                              class="btn btn-sm btn-info"
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
                              class="btn btn-sm btn-danger"
                              v-show="!attachment.editMode"
                              @click="
                                deletePetitionAttachment(
                                  attachment.id,
                                  attachmentIndex
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
    <Sidebar v-model:visible="visibleLeft" class="p-sidebar-sm" :dismissable="false" :modal="false">
      <div       
      v-show="!horizontalView && !editView"       
      
    >
      <ul class="list-group">
        <li
          v-for="( attachment , index_attachment) in petition_index_details.attachments"
          :key="attachment"
          :class="activePage == (index_attachment+1) ? 'active' : ''"
          class="list-group-item"
          @click="scrollIntoView(index_attachment+1)"
          style="cursor: pointer"
        >
          {{ index_attachment+1 }}
        </li>
      </ul>
    </div>
    </Sidebar>
    
    <div class="sidebarswitch">
      <button v-tooltip="'Show Page Numbers'" class="btn btn-success sidebar-btn" @click="visibleLeft = true" ><i class="fa fa-angle-right"></i></button>
    </div>

  <Sidebar  v-model:visible="visibleRight" position="right" class="p-sidebar-sm" :dismissable="false" :modal="false">
      <div       
      @show="!editView"       
      
    >
      <ul class="list-group">
        <router-link
          v-for="petition_index_single in petition_index"
          :key="petition_index_single"
          :class="id == petition_index_single.id ? 'active' : ''"
          class="list-group-item"
          :to="{
            name: 'petition-index-details',
            params: { id: petition_index_single.id },
          }"
          >{{ petition_index_single.annexure }}</router-link
        >
      </ul>
    </div>
    </Sidebar> 
     <div class="sidebarindexswitch">
      <button v-tooltip="'Show Page Index'" class="btn btn-success sidebar-btn" @click="visibleRight = true" ><i class="fa fa-angle-left"></i></button>
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
      next_index_id: null,
      previous_index_id: null,
      visibleLeft: false,
      visibleRight:true,
      showImgCard: false,
      editView: false,
      base_url: process.env.VUE_APP_SERVICE_URL,
      petition: {},
      petition_index: [],
      petition_index_details: {},
      id: this.$route.params.id, //this is the id from the browser
      horizontalView: false, //it will show vertical images by default
      activePage: null,
      removePageHeader: false,
      selected_attachment_ids: [],
      selectedAllToDelete: false,
      showDeleteBtn: false,
      isShowPageNumOnMobile: true,         
      blockPanel: false,
    };
  },
  created() {
    this.getCaseDetails();

    
  },
  mounted() {
    const myDiv = document.getElementById('services');
    console.log("myddiv",myDiv); 
    /* window.addEventListener('scroll', (e) => {  
        if ((window.innerHeight + window.scrollY) <= document.body.offsetHeight) {
          this.$router.push({ path: "/petition-index-details/"+this.previous_index_id });
        }   
    })  */
    /* window.addEventListener('scroll', (e) => {  
        if ((window.innerHeight + window.scrollY) == document.body.offsetHeight) {
          this.$router.push({ path: "/petition-index-details/"+this.next_index_id });
          //this.id = this.next_index_id;
          //this.getCaseDetails();
          //const yOffset = -200;
         
          
        }   
    })  */

    
  },
  methods: {
    pageHeader(){
      this.removePageHeader = !this.removePageHeader;
      if(this.removePageHeader){
        document.getElementById("header").style.display = "none";
      }else{
        document.getElementById("header").style.display = "block";
      }
      
    },
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
    async getCaseDetails() {
      this.blockPanel = true;
      
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      await axios
        .get(this.base_url + "/api/petitions_index/" + this.id, { headers })
        .then((response) => {
          
          
          this.petition_index_details = response.data.petition_index;
          this.petition = response.data.petition;
          this.next_index_id = response.data.next_index_id;
          this.previous_index_id = response.data.previous_index_id;
          
          window.scrollTo({ top: 200, behavior: "smooth" });
          this.getPetitionAnnexure(response.data.petition.id);
        })
        .catch((error) => {
          console.log(error);
          
        });
    },

    async getPetitionAnnexure(petition_id) {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      await axios
        .get(this.base_url + "/api/petitions/" + petition_id, { headers })
        .then((response) => {
          this.blockPanel =false
          this.petition_index = response.data.petition_details;
          var arr = [];
          this.petition_index.forEach((element) => {
            if (element.annexure) {
              arr.push(element);
            }
          });
          console.log("arr", arr);
          this.petition_index = arr;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editPetitionAttachment(attachmentToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .put(
            this.base_url + "/api/attachments/" + attachmentToUpdate.id,
            attachmentToUpdate,
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
    deletePetitionAttachment(petitionId, attachmentIndex) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .delete(this.base_url + "/api/attachments/" + petitionId, {
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
                //this.getCaseDetails()
                this.petition_index_details.attachments.splice(
                  attachmentIndex,
                  1
                ); //removing record from list/index after deleting record from DB
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
      this.selected_attachment_ids = [];
      if (!this.selectedAllToDelete) {        
        this.showDeleteBtn = true;
        for (let i in this.petition_index_details.attachments) {
          this.selected_attachment_ids.push(this.petition_index_details.attachments[i].id);
        }
      }else{         
        this.showDeleteBtn = false;
      }
    },
    updateCheckall: function () {
      if (
        this.petition_index_details.attachments.length == this.selected_attachment_ids.length
      ) {        
        this.selectedAllToDelete = true;  
            
      } else if(!this.selected_attachment_ids.length){
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
          .post(this.base_url + "/api/delete_selected", this.selected_attachment_ids, {
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
                this.getCaseDetails(); //Reload all records from DB   
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
    showPageNumbers(){               
      this.isShowPageNumOnMobile = !this.isShowPageNumOnMobile;
    },
    testScroll(){
      alert("vue scroll");
    }
  },
};
</script>

<style>
.p-sidebar-sm{
  width: 6rem!important;
}
</style>