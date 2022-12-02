<template>
  <ConfirmPopup />
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main">
      <page-header
        :title="'Firs'"
        :petition="null"
        :hideCaseFiles="true"
        :showInvoices="false"
        :route_object="route_obj"
        :header_button="header_button"
        :header_button_text="header_button_text"
      />
      <section id="services" class="services section-bg">
        <BlockUI :blocked="firs" :fullScreen="true">
          <div class="container" data-aos="fade-up">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive">
                  <table class="table table-striped" v-if="isLoaded">
                    <thead>
                      <tr>
                        <th>Court</th>
                        <th>Status</th>
                        <th>Section</th>
                        <th>Arrest Info</th>
                        <!-- <th>Warrent Info</th>
                        <th>Bailable Info</th>
                        <th>Compoundable Info</th>
                        <th>Punishment Info</th> -->
                        <th class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(fir, fir_index) in firs" :key="fir_index">
                        <td>
                          {{ fir.court.title }}
                        </td>
                        <td>
                          {{ fir.status.title }}
                        </td>
                        <td>
                          {{ fir.section }}
                        </td>
                        <td>
                          {{ fir.arrest_info }}
                        </td>
                        <!-- <td>
                          {{ fir.warrent_info }}
                        </td>
                        <td>{{ fir.bailable_info }}</td>
                        <td>{{ fir.compoundable_info }}</td>
                        <td>{{ fir.punishment_info }}</td> -->
                        <td class="text-end">
                          <router-link
                            class="btn btn-sm btn-success action-btn"
                            :to="{
                              name: 'edit-fir',
                              params: { fir_id: fir.id },
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
                            @click="deleteFir($event, fir.id, fir_index)"
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
                  <!-- <Paginator v-show="pagination_info.total>0" v-model:first="pagination_info.from" v-model:rows="pagination_info.per_page" :totalRecords="pagination_info.total" @page="onPage($event)"></Paginator>

              <p v-show="pagination_info.total>0"><small>Showing from {{pagination_info.from}} to {{pagination_info.to}} of {{pagination_info.total}}</small></p> -->
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
import Editor from "primevue/editor";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: {
    PageHeader,
    Editor,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      firs: [],
      showDateType: false,
      excute: false,
      saving: false,
      route_obj: {
        name: "create-fir",
      },
      header_button: true,
      header_button_text: "Create Fir",
      base_url: process.env.VUE_APP_SERVICE_URL,
      isLoaded: false,
    };
  },
  created() {
    this.getFirs();
  },
  mounted() {
    document.title = "Fir";
  },
  methods: {
    getFirs() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/fir";
      axios
        .get(url, { headers })
        .then((response) => {
          this.firs = response.data.firs;
          this.isLoaded = true;
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    deleteFir(event, fir_id, fir_index) {
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
            .delete(this.base_url + "/api/fir/" + fir_id, {
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
                  this.firs.splice(fir_index, 1); //removing record from list/index after deleting record from DB
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
};
</script>

<style></style>
