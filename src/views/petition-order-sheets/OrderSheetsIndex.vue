<template>
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <page-header 
    :title="'Order Sheets'" 
    :petition="petition" 
    :hide="removePageHeader ? true : false"
    />     
    <!-- End Breadcrumbs -->
    <section
      id="services"
      class="services section-bg"
      :class="removePageHeader ? '' : ''"
    >
    <nav-components activeNavPill = 'order_sheet' :petition_id="petition.id"  />
      <div class="container mt-2" data-aos="fade-up">
        <div class="row mb-4">
          <div class="col-12">
              <!-- v-if="!removePageHeader" -->
             <button v-if="removePageHeader" @click="pageHeader()" class="btn btn-success btn-sm" style="margin-right: 2px" for="flexSwitchCheckDefault"
                ><i class="fa fa-eye"></i> Show Header</button
              >
              <button v-if="!removePageHeader" @click="pageHeader()" class="btn btn-success btn-sm" style="margin-right: 2px" for="flexSwitchCheckDefault"
                ><i class="fa fa-eye-slash"></i> Hide Header</button
              >
           
            <router-link              
              class="btn btn-primary btn-sm"
              :to="{
                name: 'petition-order-sheets-save',
                params: { petition_id: petition.id },
              }"
            >
              Add New Order Sheet
            </router-link>

            <div class="mt-4" v-if="orderSheetsActive">
              <div v-if="!removePageHeader" class="mb-4">
                <p><strong>Title: </strong>{{ orderSheetsActive.title }}
                <strong>Description: </strong
                >{{ orderSheetsActive.description }}
                <strong>Order Sheet Date: </strong
                >{{ orderSheetsActive.order_sheet_date }}
                <router-link
                    class="btn btn-success btn-sm  action-btn"
                    :to="{
                      name: 'petition-order-sheets-edit',
                      params: { petition_id: petition.id ,  editable_order_sheet_id: orderSheetsActive.id },
                    }"
                  >
                    Edit
                  </router-link>
                </p>
  
                <file-upload
                  @afterUpload="getOrderSheet"
                  type="App\Models\PetitonOrderSheet"
                  :attachmentable_id="orderSheetsActive.id"
                />
              </div>
              
              <div >
                <div
                  class="row mb-2 text-center"
                  :id="'image-container-' + attachment.id"
                  v-for="attachment in orderSheetsActive.attachments"
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
                        '/storage/attachments/' +
                        attachment.attachmentable_id +
                        '/' +
                        attachment.file_name
                      "
                    />
                    <a :class="activePage == attachment.id ? 'active-img' : ''"
                    v-if="attachment.mime_type == 'application/pdf'" :href="this.base_url +
                      '/storage/attachments/' 
                      +                     
                      attachment.attachmentable_id +
                      '/' +
                      attachment.file_name" target="_blank"><u><span>Click to Open: </span>{{ attachment.title }}</u></a> 
                    <hr class="mt-4 mb-4" style="border: solid 3px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Sidebar v-model:visible="visibleLeft" class="p-sidebar-sm" position="right" :dismissable="false" :modal="false">
      <ul class="list-group">
        <router-link
          v-for="orderSheet in orderSheets"
          :key="orderSheet"
          :class="order_sheet_id == orderSheet.id ? 'active' : ''"
          class="list-group-item"
          :to="{
            name: 'petition-order-sheets-index',
            params: { order_sheet_id: orderSheet.id, petition_id: orderSheet.petition_id },
          }"
          >{{ orderSheet.order_sheet_date }}</router-link
        >
      </ul>
    </Sidebar>

    <div class="fixed-annexsures">
      
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
      visibleLeft: true,
      showImgCard: false,
      editView: false,
      base_url: process.env.VUE_APP_SERVICE_URL,
      orderSheets: [],
      orderSheetsActive: {},
      petition: {},
      petition_index: [],
      petition_index_details: {},
      order_sheet_id: this.$route.params.order_sheet_id, //this is the id from the browser
      petition_id: this.$route.params.petition_id, //this is the id from the browser
      horizontalView: false, //it will show vertical images by default
      activePage: null,
      removePageHeader: true,
      visibleRight:true,      
           
    };
  },
  created() {
    this.getOrderSheets();
  },
  mounted(){
    document.getElementById("header").style.display = "none";
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
    getOrderSheets() {
      axios
        .get(
          this.base_url +
            "/api/petition_order_sheets?petition_id=" +
            this.petition_id
        )
        .then((response) => {
          this.orderSheets = response.data.records;
          this.petition = response.data.records.petition;

          this.getCaseDetails();
          this.getOrderSheet();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getOrderSheet() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };

      axios
        .post(
          this.base_url + "/api/petition_order_sheets/by_petition",
          {
            petition_id: this.petition_id,
            id: this.order_sheet_id,
          },
          {
            headers,
          }
        )
        .then((response) => {
          this.orderSheetsActive = response.data.record;

          this.getCaseDetails();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCaseDetails() {
       var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
      axios
        .get(this.base_url + "/api/petitions/" + this.petition_id, {headers})
        .then((response) => {
          this.petition = response.data.petition;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editPetitionAttachment(attachmentToUpdate) {
      if (true) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
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
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
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
                //this.getOrderSheets()
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
  },
};
</script>

<style> 
</style>