<template>
  <main id="main">
    <page-header :title="page_title" :order_sheet="null" :petition="petition" />
    <section id="services" class="services section-bg">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-12">
            <form @submit.prevent="submitForm($event)">
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <file-upload
                      v-if="this.user.is_admin || this.user.is_lawyer"
                      @afterUpload="getEditableOrderSheet"
                      @disableOrderSheetBtn="saving = true"
                      type="App\Models\PetitonOrderSheet"
                      :attachmentable_id="order_sheet.id"
                      :petition_id="petition.id"
                      :fromOrderSheet="true"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <label>Order Sheet Date</label>
                    <InputMask
                      autofocus
                      mask="99/99/9999"
                      class="form-control"
                      type="text"
                      placeholder="dd/mm/yyyy"
                      v-model="order_sheet.order_sheet_date"
                    />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <label>Type</label>
                    <select
                      class="form-control"
                      v-model="order_sheet.order_sheet_type_id"
                    >
                      <option value="">--Select--</option>
                      <option
                        v-for="order_sheet_type in this.order_sheet_types"
                        :key="order_sheet_type.id"
                        :value="order_sheet_type.id"
                      >
                        {{ order_sheet_type.title }}
                      </option>
                    </select>
                  </div>
                  <!-- <div class="col-lg-4 col-md-4 col-sm-12">
                    <label>Next Hearing Date</label>
                    <InputMask
                      mask="99/99/9999"
                      class="form-control"
                      type="text"
                      placeholder="dd/mm/yyyy"
                      v-model="order_sheet.next_hearing_date"
                    />
                  </div> -->
                </div>
              </div>

              <div class="form-group">
                <button
                  :disabled="saving"
                  class="btn btn-success btn-sm mt-2"
                  style="margin-right: 3px"
                >
                  {{ btnTitle }}
                </button>
                <router-link
                  :style="saving ? 'cursor: not-allowed' : ''"
                  class="btn btn-secondary btn-sm mt-2"
                  :to="{
                    name: 'petition-order-sheets-index',
                    params: {
                      petition_id: this.$route.params.petition_id,
                      order_sheet_id: this.editable_order_sheet_id,
                    },
                  }"
                >
                  Back
                </router-link>
              </div>
            </form>
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <delete-attachment
              v-if="order_sheet.attachments"
              :order_sheet="order_sheet"
              @afterDelete="
                getEditableOrderSheet();
                getOrderSheetTypes();
              "
            />
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import deleteAttachment from "../petition-order-sheets/deleteAttachment.vue";
import { mapState } from "vuex";
import FileUpload from "../petition-index/FileUpload.vue";
import { ref } from "vue";
export default {
  components: { PageHeader, deleteAttachment, FileUpload },
  computed: mapState(["user"]),
  data() {
    return {
      editable_order_sheet_id: this.$route.params.editable_order_sheet_id,
      page_title: this.$route.params.editable_order_sheet_id
        ? "Edit Order Sheet"
        : "Add New Order Sheet",
      btnTitle: this.$route.params.editable_order_sheet_id ? "Update" : "Save",
      base_url: process.env.VUE_APP_SERVICE_URL,
      order_sheet: {
        petition_id: this.$route.params.petition_id,
        order_sheet_type_id: "",
        id: this.$route.params.editable_order_sheet_id
          ? this.$route.params.editable_order_sheet_id
          : this.order_sheet
          ? this.order_sheet.id
          : "", //this is the id from the browser
        //next_hearing_date: "",
      },
      petition: {},
      order_sheet_types: [],
      saving: false,
    };
  },

  created() {
    this.getEditableOrderSheet();
    this.getPetition();
    this.getOrderSheetTypes();
  },
  mounted() {
    document.title = this.page_title;
  },
  methods: {
    getEditableOrderSheet: function (id) {
      this.saving = false;
      if (id) {
        this.editable_order_sheet_id = id;
        // this.$router.replace({
        //   path:
        //     "/petition-order-sheets-edit/" +
        //     this.order_sheet.petition_id +
        //     "/" +
        //     id,
        // });
      }
      if (this.editable_order_sheet_id) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .get(
            this.base_url +
              "/api/petition_order_sheets/" +
              this.editable_order_sheet_id,

            {
              headers,
            }
          )
          .then(
            (response) => {
              if (response.status === 200) {
                console.log(
                  "editable ordersheet object: ",
                  response.data.record
                );
                this.order_sheet = response.data.record;
                this.order_sheet.order_sheet_type_id = this.order_sheet
                  .order_sheet_type_id
                  ? this.order_sheet.order_sheet_type_id
                  : "";
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
    submitForm: function (event) {
      if (true) {
        event.preventDefault();
        this.saving = true;
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(
            this.base_url + "/api/petition_order_sheets",
            this.order_sheet,
            {
              headers,
            }
          )
          .then(
            (response) => {
              if (response.status === 200) {
                this.order_sheet = response.data.petitionOrderSheet;

                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                this.saving = false;
                this.$router.push({
                  path:
                    "/petition-order-sheets-index/" +
                    this.order_sheet.petition_id +
                    "/" +
                    response.data.petitionOrderSheet.id,
                });
              }
              console.log(response);
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

    getPetition() {
      if (this.$route.params.petition_id) {
        var url =
          this.base_url + "/api/petitions/" + this.$route.params.petition_id;
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        axios
          .get(url, { headers })
          .then((response) => {
            this.petition = response.data.petition;
            this.opponents = [{}];
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
    getOrderSheetTypes() {
      let url = this.base_url + "/api/get_order_sheet_types";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let module = {
        module_id: 1,
      };

      axios
        .get(url, { headers, params: module })
        .then((response) => {
          this.order_sheet_types = response.data.orderSheetTypes;
          console.log(this.courts);
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

<style></style>
