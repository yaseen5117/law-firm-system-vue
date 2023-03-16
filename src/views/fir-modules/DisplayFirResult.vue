<template>
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main">
      <page-header
        :title="'FIR Reader | Search Results'"
        :isNotHeading="false"
        :hideBreadCrumbs="true"
      />
      <section id="services" class="services section-bg">
        <BlockUI :blocked="sectionSearchResults" :fullScreen="true">
          <div class="container-fluid" data-aos="fade-up">
            <div class="row">
              <!-- <fir-heading /> -->

              <div class="col-lg-9 col-md-12 col-sm-12">
                <!-- <h3 class="mt-2 mb-1 centre-align">
                  <b>Search Result</b>
                </h3> -->
                <div class="card" id="card" style="background-color: white">
                  <div class="container-fluid">
                    <!-- <h3 class="mt-4 mb-1 centre-align">
                      FIR Reader By Elawfirmpk
                    </h3> -->
                    <div class="table-responsive">
                      <table class="table table-bordered mt-4" v-if="isLoaded">
                        <thead>
                          <tr>
                            <th scope="col">Section</th>
                            <th scope="col">Offences</th>
                            <th scope="col">
                              Whether the police may arrest without warrant or
                              not
                            </th>
                            <th scope="col">
                              Whether a warrant or a summon shall ordinarily be
                              issued in the first instance.
                            </th>
                            <th scope="col">Whether bailable or not</th>
                            <th scope="col">Punishment</th>
                            <th scope="col">By what Court triable</th>
                            <th scope="col">Definition</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-for="(
                              sectionResults, baseIndex
                            ) in sectionSearchResults"
                            :key="baseIndex"
                          >
                            <tr
                              v-for="singleSectionResult in sectionResults"
                              :key="singleSectionResult.id"
                            >
                              <td scope="row">
                                {{ singleSectionResult.fir_no }}
                              </td>
                              <td>{{ singleSectionResult.title }}</td>
                              <td>{{ singleSectionResult.arrest_info }}</td>
                              <td>{{ singleSectionResult.warrent_info }}</td>
                              <td>{{ singleSectionResult.bailable_info }}</td>
                              <td>{{ singleSectionResult.punishment_info }}</td>
                              <td>{{ singleSectionResult.court_triable }}</td>
                              <td>{{ singleSectionResult.defination }}</td>
                            </tr>
                          </template>
                          <tr
                            v-if="noResultFound && isLoaded"
                            class="text-center"
                          >
                            <td colspan="8">
                              <span class="text-danger">
                                Records Not Found!
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="5">
                              Police Station:
                              <b>{{ search_item.police_station }}</b>
                            </td>
                            <td colspan="3">
                              FIR No:
                              <b>{{ search_item.fir_no }}</b> of Year:
                              <b>{{ search_item.year }}</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- <div>
                      <div v-if="noResultFound && isLoaded" class="text-center">
                        <span class="text-danger"> Records Not Found! </span>
                      </div>
                    </div> -->
                    <div class="mt-4 mb-4 centre-align" v-if="isLoaded">
                      <a
                        target="_blank"
                        href="https://wa.me/+923015011568"
                        data-action="share/whatsapp/share"
                        class="btn btn-success btn-sm"
                      >
                        Share on WhatsApp
                      </a>
                      <button
                        :disabled="noResultFound"
                        @click="downloadFirReaderResult()"
                        v-tooltip.top="'Download Search Result'"
                        class="btn btn-info btn-sm left-margin"
                        type="button"
                        download=""
                      >
                        <i class="fa fa-download"></i> Download PDF
                      </button>

                      <a
                        v-if="!this.user"
                        href="#contact"
                        class="btn btn-danger btn-sm left-margin"
                      >
                        Contact Us
                      </a>
                    </div>
                    <div v-if="!isLoaded" class="col-md-12 mt-2">
                      <p class="alert alert-warning">Loading....</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="container-fluid">
                        <router-link
                          class="btn btn-sm btn-secondary mb-3 mt-3"
                          :to="{
                            name: 'fir_reader',
                          }"
                          href="javascript:void"
                          style="margin-left: 2px"
                          v-tooltip.top="'Go To Previous Page'"
                        >
                          <i class="fa fa-arrow-left"></i>
                          Back
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-12 col-sm-12">
                <div class="margn-top">
                  <h5 class="centre-align">
                    <b>Video</b>
                  </h5>
                  <div class="row">
                    <div class="col-12">
                      <div
                        v-for="sectionResults in sectionSearchResults"
                        :key="sectionResults.id"
                      >
                        <div
                          v-for="singleSectionResult in sectionResults"
                          :key="singleSectionResult.id"
                        >
                          <iframe
                            v-if="singleSectionResult.link"
                            height="300"
                            :src="singleSectionResult.link"
                            title="YouTube video player"
                            frameborder="0"
                            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BlockUI>
      </section>
    </main>
  </BlockUI>
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import FirHeading from "./FirHeading.vue";
import { mapState } from "vuex";

export default {
  computed: mapState(["user"]),
  components: {
    PageHeader,
    FirHeading,
  },
  data() {
    return {
      noResultFound: null,
      base_url: process.env.VUE_APP_SERVICE_URL,
      filterSections: JSON.parse(localStorage.getItem("filterSections")),
      sectionData: JSON.parse(localStorage.getItem("sectionData")),
      sectionSearchResults: [],
      search_item: {},
      isLoaded: false,
      fir_reader_result_pdf_download_url: null,
    };
  },
  created() {
    this.getSectionSearchResult();
  },
  mounted() {
    document.getElementById("header");
    document.title = "FIR Reader | Search Results";
    console.log("filterSections: ", this.filterSections);
  },

  methods: {
    downloadFirReaderResult() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        responseType: "blob",
      };
      let url = this.base_url + "/api/download_fir_reader_result_pdf";
      axios
        .post(
          url,
          {
            filterSections: this.filterSections,
            sectionData: this.sectionData,
          },
          { headers }
        )
        .then((response) => {
          if (response.status == 200) {
            const link = document.createElement("a");
            link.href = response.data.file_path;
            link.download = "file.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            //window.open(response.data.file_path, "_blank");
          }
          this.$notify({
            type: "success",
            title: "File Downloaded SuccessFully",
          });
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    getSectionSearchResult() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/section_search_results";
      axios
        .post(
          url,
          {
            filterSections: this.filterSections,
            sectionData: this.sectionData,
          },
          { headers }
        )
        .then((response) => {
          this.sectionSearchResults = response.data.sectionSearchResults;
          this.fir_reader_result_pdf_download_url =
            response.data.fir_reader_result_pdf_download_url;
          this.search_item = response.data.search_item;

          this.noResultFound = response.data.noResultFound;

          this.isLoaded = true;
          console.log("Returning data: ", this.sectionSearchResults);
          //   localStorage.removeItem("filterSections");
        })
        .catch((error) => {
          this.isLoaded = true;
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

<style scoped>
#card {
  box-shadow: 0 0 11px rgba(15, 15, 15, 0.11);
}
#card:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}
.centre-align {
  text-align: center;
}
.left-margin {
  margin-left: 2px;
}
.margn-top {
  margin-top: 20px;
}
</style>
