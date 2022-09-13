<template>
  <ConfirmPopup />
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main">
      <page-header
        :title="'Sample Pleadings'"
        :petition="null"
        :hideCaseFiles="true"
        :showInvoices="false"
        :route_object="route_obj"
        :header_button="header_button"
        :header_button_text="header_button_text"
      />
      <section id="services" class="services section-bg">
        <BlockUI :blocked="invoices" :fullScreen="true">
          <div class="container" data-aos="fade-up">
            <div class="row">
              <div class="col-12 mb-2">
                <Transition name="fade">
                  <form class="row gy-2 gx-3 align-items-center expense">
                    <div class="col-lg-3 col-md-3 col-sm-6">
                      <input
                        type="text"
                        id="title"
                        v-model="filters.title"
                        class="form-control"
                        placeholder="Title"
                        aria-describedby="title"
                      />
                    </div>

                    <div class="col-lg-3 col-md-3 col-sm-12">
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="reset()"
                        :disabled="saving"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </Transition>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div
                    class="col-sm-12 col-md-6 col-lg-6 col-12 d-flex align-self-stretch"
                    v-for="(
                      samplePleading, sample_pleading_index
                    ) in samplePleadings"
                    :key="sample_pleading_index"
                  >
                    <div
                      class="card listing-cards shadow-sm mb-4"
                      style="width: 100%"
                    >
                      <div class="text-end">
                        <InvoiceThumb
                          v-show="samplePleading.attachment"
                          folder_name="sample-pleadings"
                          :base_url="base_url"
                          :invoice="samplePleading"
                          :isSamplePleading="true"
                        />
                      </div>
                      <div
                        class="card-body"
                        @click="goToDetails(samplePleading.id)"
                      >
                        <div class="row">
                          <p class="card-title" style="margin-bottom: 0px">
                            <strong>{{ samplePleading.title }}</strong>
                          </p>

                          <div class="col-md-12">
                            <p
                              class="card-text"
                              v-html="
                                (samplePleading.plain_content &&
                                  samplePleading.plain_content.length) > 50
                                  ? samplePleading.plain_content.substring(
                                      0,
                                      49
                                    ) + '...'
                                  : samplePleading.plain_content
                              "
                            ></p>
                          </div>
                        </div>
                      </div>
                      <div class="card-footer">
                        <div class="mt-auto">
                          <div class="pull-right">
                            <router-link
                              style="margin-right: 2px"
                              target="_blank"
                              :to="{
                                name: 'preview-html',
                                params: {
                                  page_slug: samplePleading.slug,
                                  page_type: 'sample-pleading',
                                },
                              }"
                              class="btn btn-success btn-sm action-btn"
                              role="button"
                              v-tooltip.top="'View'"
                              >Preview
                            </router-link>

                            <router-link
                              v-if="this.user.is_admin"
                              class="btn btn-sm btn-primary action-btn"
                              :to="{
                                name: 'edit-sample-pleading',
                                params: {
                                  sample_pleading_id: samplePleading.id,
                                },
                              }"
                              href="javascript:void"
                              style="margin-left: 2px"
                              v-tooltip.top="'Edit'"
                            >
                              Edit
                            </router-link>

                            <a
                              v-if="this.user.is_admin"
                              class="btn btn-sm btn-danger action-btn"
                              @click="
                                deleteSamplePleading(
                                  $event,
                                  samplePleading.id,
                                  sample_pleading_index
                                )
                              "
                              href="javascript:void"
                              style="margin-left: 2px"
                              v-tooltip.top="'Delete'"
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="samplePleadings.length == 0 && isLoaded"
                    class="col-md-12"
                  >
                    <p class="alert alert-warning">No Records found.</p>
                  </div>
                </div>

                <div v-if="!isLoaded" class="col-md-12">
                  <p class="alert alert-warning">Loading....</p>
                </div>
              </div>
            </div>
          </div>
        </BlockUI>
      </section>
    </main>
    <!-- End #main -->
  </BlockUI>
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import InvoiceThumb from "../invoices/InvoiceThumb.vue";
import { mapState } from "vuex";

export default {
  computed: mapState(["user"]),
  components: {
    PageHeader,
    InvoiceThumb,
  },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      categories: [],
      saving: false,
      route_obj: {
        name: "create-sample-pleading",
      },
      header_button: true,
      header_button_text: "Create Sample Pleading",
      base_url: process.env.VUE_APP_SERVICE_URL,
      filters: {},
      isLoaded: false,
      samplePleadings: [],
    };
  },
  validations() {
    return {
      client: {
        id: { required },
      },
    };
  },
  created() {
    this.getSamplePleadings();
  },
  mounted() {
    document.getElementById("header");
    document.title = "Sample Pleadings";
  },
  methods: {
    getSamplePleadings() {
      this.isLoaded = false;
      let url = this.base_url + "/api/sample_pleadings";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(url, {
          headers,
          params: this.filters,
        })
        .then((response) => {
          console.log(response);
          this.samplePleadings = response.data.sample_pleadings;
          this.isLoaded = true;
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
          console.log(error);
        });
    },
    deleteSamplePleading(event, sample_pleading_id, sample_pleading_index) {
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
              this.base_url + "/api/sample_pleadings/" + sample_pleading_id,
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
                  this.samplePleadings.splice(sample_pleading_index, 1); //removing record from list/index after deleting record from DB
                }
              },
              (error) => {
                console.log(error.response.data.error);
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
    reset() {
      this.saving = true;
      this.filters = {};
      this.saving = false;
    },
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.getSamplePleadings();
            this.awaitingSearch = false;
          }, 4000); // 1 sec delay
        }
        this.awaitingSearch = true;
      },
    },
  },
};
</script>

<style></style>
