<template>
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
                <div class="table-responsive">
                  <table class="table table-striped" v-if="isLoaded">
                    <thead>
                      <tr>
                        <!-- <th>Category</th> -->
                        <th>Title</th>
                        <th>Display Order</th>
                        <th>Attachment</th>
                        <th class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(
                          samplePleading, sample_pleading_index
                        ) in samplePleadings"
                        :key="sample_pleading_index"
                      >
                        <!-- <td>
                        <span v-if="samplePleading.category">
                          {{samplePleading.category.title}}
                        </span>                         
                      </td> -->
                        <td>{{ samplePleading.title }}</td>
                        <td>{{ samplePleading.display_order }}</td>
                        <td>
                          <InvoiceThumb
                            v-show="samplePleading.attachment"
                            folder_name="sample-pleadings"
                            :base_url="base_url"
                            :invoice="samplePleading"
                          />
                        </td>
                        <td class="text-end">
                          <router-link
                            class="btn btn-sm btn-success action-btn"
                            :to="{
                              name: 'edit-sample-pleading',
                              params: {
                                sample_pleading_id: samplePleading.id,
                              },
                            }"
                            href="javascript:void"
                            style="margin-left: 2px"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Edit"
                          >
                            Edit
                          </router-link>

                          <a
                            class="btn btn-sm btn-danger action-btn"
                            @click="
                              deleteSamplePleading(
                                samplePleading.id,
                                sample_pleading_index
                              )
                            "
                            href="javascript:void"
                            style="margin-left: 2px"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Delete"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default {
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
    deleteSamplePleading(sample_pleading_id, sample_pleading_index) {
      if (confirm("Do you really want to delmete?")) {
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
      }
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
          }, 1500); // 1 sec delay
        }
        this.awaitingSearch = true;
      },
    },
  },
};
</script>

<style></style>
