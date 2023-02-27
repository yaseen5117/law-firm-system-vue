<template>
  <ConfirmPopup />
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main" class="margintop85">
      <page-header
        :title="page_title"
        :showFirReader="true"
        :hideCaseFiles="true"
        :route_object="route_obj"
        :header_button="header_button"
        :header_button_text="header_button_text"
        :isStatute="true"
      />
      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg mt-3">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <Transition name="fade">
                <form class="row gy-2 gx-3 align-items-center mb-2">
                  <div class="col-lg-3 col-md-3 col-sm-6">
                    <input
                      v-on:keyup.enter="getFirSection()"
                      type="text"
                      v-model="filters.section"
                      class="form-control"
                      placeholder="Section"
                      aria-describedby="Title"
                    />
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6">
                    <input
                      v-on:keyup.enter="getFirSection()"
                      type="text"
                      v-model="filters.title"
                      class="form-control"
                      placeholder="Title/Offences"
                      aria-describedby="Title"
                    />
                  </div>

                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <Dropdown
                      @change="getFirSection()"
                      class="p-inputtext-sm"
                      v-model="filters.statute_id"
                      :options="statutes"
                      optionLabel="title"
                      optionValue="id"
                      placeholder="Select a Statute"
                      :filter="true"
                      appendTo="self"
                      filterPlaceholder="Find by Title"
                    />
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-12">
                    <button
                      type="button"
                      class="btn btn-success btn-sm mr-right"
                      @click="getFirSection()"
                    >
                      Search
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="reset()"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </Transition>
            </div>
            <hr />
            <div class="table-responsive">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <table class="table table-hover" v-if="isLoaded">
                  <thead>
                    <th>Section</th>
                    <th>Offences</th>
                    <th>Statute</th>
                    <th>Created By</th>
                    <th>Created At</th>
                    <th width="10%">Actions</th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(fir_section, row_index) in fir_sections"
                      :key="fir_section.id"
                    >
                      <td>
                        {{ fir_section.fir_no }}
                      </td>
                      <td v-tooltip.top="fir_section.title">
                        {{ fir_section.title.substring(0, 50)
                        }}{{ fir_section.title.length > 50 ? "..." : "" }}
                      </td>
                      <td>
                        {{
                          fir_section.statute ? fir_section.statute.title : ""
                        }}
                      </td>
                      <td>
                        {{ fir_section.user ? fir_section.user.name : "" }}
                      </td>
                      <td>
                        {{ formateDate(fir_section.created_at) }}
                      </td>
                      <td width="">
                        <button
                          class="btn btn-sm btn-primary action-btn"
                          type="button"
                          @click="showSectionDetailModal(fir_section)"
                          v-tooltip.top="'View Detail'"
                        >
                          View Detail
                        </button>
                        <router-link
                          v-if="this.user.is_admin"
                          class="btn btn-sm btn-success action-btn"
                          :to="{
                            name: 'edit-fir-section',
                            params: { fir_section_id: fir_section.id },
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
                            deleteFirSection($event, fir_section.id, row_index)
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
                  </tbody>
                </table>
                <div
                  v-if="fir_sections.length == 0 && isLoaded"
                  class="col-md-12"
                >
                  <p class="alert alert-warning">No Records found.</p>
                </div>
                <div v-if="!isLoaded" class="col-md-12">
                  <p class="alert alert-warning">Loading....</p>
                </div>
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-3">
                      <p
                        v-show="
                          isLoaded && fir_section_pagination_info.total > 0
                        "
                      >
                        <small
                          >Showing from
                          {{ fir_section_pagination_info.from }} to
                          {{ fir_section_pagination_info.to }} of
                          {{ fir_section_pagination_info.total }}</small
                        >
                      </p>
                    </div>
                    <div class="col-md-6">
                      <Paginator
                        v-show="
                          isLoaded && fir_section_pagination_info.total > 0
                        "
                        v-model:first="fir_section_pagination_info.from"
                        v-model:rows="fir_section_pagination_info.per_page"
                        :totalRecords="fir_section_pagination_info.total"
                        @page="onPage($event)"
                      ></Paginator>
                    </div>
                    <div class="col-md-12">
                      <!-- loader here -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End Services Section -->
      <single-section-detail-modal
        :sectionDetail="sectionDetail"
        :showSectionDetailModal="sectionDetailModal"
        @close-modal="closeSectionDetailModal"
      />
    </main>
    <!-- End #main -->
  </BlockUI>
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader";
import moment from "moment";
import SingleSectionDetailModal from "./SingleSectionDetailModal.vue";

import { mapState } from "vuex";

export default {
  computed: mapState(["user"]),
  components: {
    PageHeader,
    SingleSectionDetailModal,
  },

  data() {
    return {
      sectionDetailModal: false,
      sectionDetail: {},
      filters: {},
      base_url: process.env.VUE_APP_SERVICE_URL,
      page_title: "FIR Sections",
      fir_sections: [],
      saving: false,
      route_obj: {
        name: "create-fir-section",
      },
      header_button: true,
      header_button_text: "New FIR Section",
      isLoaded: false,
      statutes: [],
      fir_section_pagination_info: Array,
    };
  },

  created() {
    this.getFirSection();
    this.getStatuses();
  },
  methods: {
    onPage(event) {
      var new_page_no = event.page + 1; //adding 1 because event.page returns index of page # clicked.

      this.filters.page = new_page_no;
      this.getFirSection();
    },
    showSectionDetailModal(fir_section) {
      this.sectionDetailModal = true;
      this.sectionDetail = fir_section;
    },
    closeSectionDetailModal(fir_section) {
      this.sectionDetailModal = false;
    },
    formateDate(date) {
      if (date) {
        return moment(String(date)).format("DD/MM/YYYY"); //for  time hh:mm
      }
    },
    getStatuses() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/statutes";
      axios
        .get(url, { headers })
        .then((response) => {
          this.statutes = response.data.statutes;
          console.log(this.statutes);
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
    getFirSection() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/fir_sections", {
          headers,
          params: this.filters,
        })
        .then((response) => {
          this.fir_sections = response.data.fir_sections.data;
          this.fir_section_pagination_info = response.data.fir_sections;
          this.isLoaded = true;
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

    deleteFirSection(event, caseId, row_index) {
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
            .delete(this.base_url + "/api/fir_sections/" + caseId, {
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
                  this.fir_sections.splice(row_index, 1); //removing record from list/index after deleting record from DB
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
    reset() {
      this.filters = {};
      this.getFirSection();
    },
  },
  mounted() {
    document.getElementById("header");
    document.title = "FIR Sections List";
    console.log("FIR Sections List Component Mounted");
  },
  // watch: {
  //   filters: {
  //     deep: true,
  //     handler() {
  //       if (!this.awaitingSearch) {
  //         setTimeout(() => {
  //           this.getFirSection();
  //           this.awaitingSearch = false;
  //         }, 0);
  //       }
  //       this.awaitingSearch = true;
  //     },
  //   },
  // },
};
</script>

<style scoped>
.mr-right {
  margin-right: 2px;
}
</style>
