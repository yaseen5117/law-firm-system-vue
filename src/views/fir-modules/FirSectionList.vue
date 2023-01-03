<template>
  <ConfirmPopup />
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main" class="margintop85">
      <page-header
        :title="page_title"
        :hideBreadCrumbs="true"
        :showInvoices="false"
        :route_object="route_obj"
        :header_button="header_button"
        :header_button_text="header_button_text"
      />
      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg mt-3">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <div class="table-responsive">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <table class="table table-hover" v-if="isLoaded">
                  <thead>
                    <th>Section</th>
                    <th>Offences</th>
                    <th>
                      Whether the police may arrest without warrant or not
                    </th>
                    <th>
                      Whether a warrant or a summon shall ordinarily be issued
                      in the first instance.
                    </th>
                    <th>Whether bailable or not</th>
                    <th>Punishment</th>
                    <th>By what Court triable</th>
                    <th>Defination</th>
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
                      <td>{{ fir_section.title }}</td>
                      <td>{{ fir_section.arrest_info }}</td>
                      <td>{{ fir_section.warrent_info }}</td>
                      <td>{{ fir_section.bailable_info }}</td>
                      <td>{{ fir_section.punishment_info }}</td>
                      <td></td>
                      <td>{{ fir_section.defination }}</td>

                      <td width="">
                        <router-link
                          class="btn btn-sm btn-success action-btn"
                          :to="{
                            name: 'edit-fir-section',
                            params: { fir_section_id: fir_section.id },
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
                            deleteFirSection($event, fir_section.id, row_index)
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
                <div
                  v-if="fir_sections.length == 0 && isLoaded"
                  class="col-md-12"
                >
                  <p class="alert alert-warning">No Records found.</p>
                </div>
                <div v-if="!isLoaded" class="col-md-12">
                  <p class="alert alert-warning">Loading....</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End Services Section -->
    </main>
    <!-- End #main -->
  </BlockUI>
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader";

export default {
  components: {
    PageHeader,
  },

  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      page_title: "Fir Sections",
      fir_sections: [],
      saving: false,
      route_obj: {
        name: "create-fir-section",
      },
      header_button: true,
      header_button_text: "New Fir Section",
      isLoaded: false,
    };
  },

  created() {
    this.getPetitionTypes();
  },
  methods: {
    getPetitionTypes() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/fir_sections", {
          headers,
        })
        .then((response) => {
          this.fir_sections = response.data.fir_sections;
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
  },
  mounted() {
    document.getElementById("header");
    document.title = "Fir Sections";
    console.log("Fir Sections List Component Mounted");
  },
};
</script>

<style></style>
