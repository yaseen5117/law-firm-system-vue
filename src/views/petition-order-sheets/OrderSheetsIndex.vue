<template>
  <ConfirmPopup></ConfirmPopup>
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
      <nav-components activeNavPill="order_sheet" :petition_id="petition_id" />
      <div class="container mt-2" data-aos="fade-up">
        <div class="row mb-4">
          <div class="col-12">
            <!-- v-if="!removePageHeader" -->
            <button
              v-if="removePageHeader"
              @click="pageHeader()"
              class="btn btn-success btn-sm mobile-margin-top"
              style="margin-right: 2px"
              for="flexSwitchCheckDefault"
            >
              <i class="fa fa-eye"></i> Show Header
            </button>
            <button
              v-if="!removePageHeader"
              @click="pageHeader()"
              class="btn btn-success btn-sm mobile-margin-top"
              style="margin-right: 2px"
              for="flexSwitchCheckDefault"
            >
              <i class="fa fa-eye-slash"></i> Hide Header
            </button>

            <router-link
              v-if="this.user.is_admin || this.user.is_lawyer"
              style="margin-right: 2px"
              class="btn btn-primary btn-sm mobile-margin-top"
              :to="{
                name: 'petition-order-sheets-save',
                params: { petition_id: petition_id },
              }"
            >
              Add New Order Sheet
            </router-link>
            <router-link
              style="margin-right: 2px"
              v-if="(this.user.is_admin || this.user.is_lawyer) && orderSheetsActive"
              class="btn btn-success btn-sm mobile-margin-top"
              :to="{
                name: 'petition-order-sheets-edit',
                params: {
                  petition_id: petition.id,
                  editable_order_sheet_id: orderSheetsActive.id,
                },
              }"
              v-tooltip.top="'Edit'"
            >
              Edit
            </router-link>
            <a
              v-if="this.user.is_admin && orderSheetsActive"
              class="btn btn-danger btn-sm mobile-margin-top"
              @click="deletePetitionOrderSheet($event, orderSheetsActive.id)"
              v-tooltip.top="'Delete'"
            >
              Delete
            </a>
            <a
              class="btn btn-grey btn-sm mobile-margin-top"
              style="margin-left: 2px"
              v-tooltip.top="'Print Order Sheets'"
              @click="printOrderSheets()"
              ><i class="fa fa-print"></i> Print</a
            >
          </div>
          <div>
            <div class="mt-4" v-if="orderSheetsActive">
              <not-found-message :index_details="orderSheetsActive" />
              <div
                v-if="
                  orderSheetsActive &&
                  orderSheetsActive.attachments &&
                  orderSheetsActive.attachments.length > 0
                "
              >
                <div
                  class="row mb-2 text-center"
                  :id="'image-container-' + attachment.id"
                  v-for="attachment in orderSheetsActive.attachments"
                  :key="attachment"
                >
                  <div class="col-12">
                    <img
                      v-if="
                        attachment.mime_type == 'image/png' ||
                        attachment.mime_type == 'image/jpeg' ||
                        attachment.mime_type == 'image/jpg' ||
                        attachment.mime_type == 'jpg'
                      "
                      :class="activePage == attachment.id ? 'active-img' : ''"
                      class="img-fluid"
                      style="width: 90%"
                      :src="
                        this.base_url +
                        '/storage/attachments/petitions/' +
                        petition.id +
                        '/PetitonOrderSheet/' +
                        attachment.attachmentable_id +
                        '/' +
                        attachment.file_name
                      "
                    />
                    <a
                      :class="activePage == attachment.id ? 'active-img' : ''"
                      v-else
                      :href="
                        this.base_url +
                        '/storage/attachments/petitions/' +
                        petition.id +
                        '/PetitonOrderSheet/' +
                        attachment.attachmentable_id +
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
            </div>
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12 text-center">
                <router-link
                  v-tooltip.top="'Previous'"
                  style="margin-right: 3px"
                  v-if="previous_index_id"
                  class="btn btn-success ml-3 mr-2"
                  :to="{
                    name: 'petition-order-sheets-index',
                    params: {
                      order_sheet_id: previous_index_id,
                      petition_id: petition_id,
                    },
                  }"
                  ><i class="fa fa-angle-up fa-2x btn-round"></i
                ></router-link>

                <router-link
                  v-tooltip.top="'Next'"
                  style="margin-right: 3px"
                  v-if="next_index_id"
                  class="btn btn-success ml-3"
                  :to="{
                    name: 'petition-order-sheets-index',
                    params: {
                      order_sheet_id: next_index_id,
                      petition_id: petition_id,
                    },
                  }"
                  ><i class="fa fa-angle-down fa-2x btn-round"></i
                ></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Sidebar
      v-if="orderSheets && orderSheetsActive"
      v-model:visible="visibleLeft"
      class="p-sidebar-md p-side-bar-ordersheet"
      position="right"
      :fullscreen="false"
      :dismissable="true"
      :modal="false"
    >
      <ul class="list-group">
        <router-link
          v-for="orderSheet in orderSheets"
          :key="orderSheet"
          :class="orderSheetsActive.id == orderSheet.id ? 'active' : ''"
          class="list-group-item"
          :to="{
            name: 'petition-order-sheets-index',
            params: {
              order_sheet_id: orderSheet.id,
              petition_id: orderSheet.petition_id,
            },
          }"
          >{{
            orderSheet.order_sheet_types
              ? orderSheet.order_sheet_types.title
              : ""
          }}<br />
          {{ orderSheet.order_sheet_date }}
        </router-link>
      </ul>
    </Sidebar>
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
import { mapState } from "vuex";
import NotFoundMessage from "../shared/NotFoundMessage.vue";

export default {
  computed: mapState(["user"]),
  components: {
    PageHeader,
    Carousel,
    Slide,
    Pagination,
    Navigation,
    FileUpload,
    NavComponents,
    NotFoundMessage,
  },
  data() {
    return {
      next_index_id: null,
      previous_index_id: null,
      visibleLeft: true,
      showImgCard: false,
      editView: false,
      base_url: process.env.VUE_APP_SERVICE_URL,
      orderSheets: [],
      orderSheetsActive: {},
      petition: {},
      petition_index: [],
      petition_index_details: {},
      order_sheet_id: this.$route.params.order_sheet_id,
      petition_id: this.$route.params.petition_id,
      horizontalView: false, //it will show vertical images by default
      activePage: null,
      removePageHeader: true,
      visibleRight: true,
    };
  },
  created() {
    this.getOrderSheets();
  },
  mounted() {
    document.getElementById("header").style.display = "none";
  },
  updated() {
    if (this.orderSheetsActive) {
      document.title =
        this.orderSheetsActive.order_sheet_types.title + " | Order Sheet";
    } else {
      document.title = "Order Sheet";
    }
  },
  methods: {
    pageHeader() {
      this.removePageHeader = !this.removePageHeader;
      if (this.removePageHeader) {
        document.getElementById("header").style.display = "none";
      } else {
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
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(
          this.base_url +
            "/api/petition_order_sheets?petition_id=" +
            this.petition_id,
          { headers }
        )
        .then((response) => {
          this.orderSheets = response.data.records;

          this.getOrderSheet();
        })
        .catch((error) => {
          console.log(error.response.data);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
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
          this.previous_index_id = response.data.previous_index_id;
          this.next_index_id = response.data.next_index_id;
          this.petition = response.data.record.petition;
        })
        .catch((error) => {
          console.log(error.response.data);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },

    getCaseDetails() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/petitions/" + this.petition_id, { headers })
        .then((response) => {
          this.petition = response.data.petition;
        })
        .catch((error) => {
          console.log(error.response.data);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
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
    deletePetitionOrderSheet(event, orderSheetId) {
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
              this.base_url + "/api/petition_order_sheets/" + orderSheetId,
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
                    text: "Deleted Successfully!",
                  });
                  this.$router.push({
                    path: "/petition-order-sheets-index/" + this.petition_id,
                  });
                  this.getOrderSheets();
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
    printOrderSheets() {
      let routeData = this.$router.resolve({
        name: "print-order-sheets",
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>

<style>
.p-side-bar-ordersheet {
  width: 130px !important;
}
@media only screen and (max-width: 600px) {
  .mobile-margin-top {
    margin-top: 2px;
  }
}
</style>
