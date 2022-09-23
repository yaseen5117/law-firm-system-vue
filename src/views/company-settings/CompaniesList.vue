<template>
  <ConfirmPopup />
  <BlockUI
    :blocked="!isLoaded"
    :fullScreen="true"
    :autoZIndex="true"
    :baseZIndex="99999"
  >
    <main id="main" class="margintop85">
      <page-header
        :title="page_title"
        :hideBreadCrumbs="true"
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
                    <th>Company Name</th>
                    <th>Company Domain</th>
                    <th width="10%">Actions</th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(company, company_index) in companies"
                      :key="company.id"
                    >
                      <td>
                        {{ company.name }}
                      </td>
                      <td>
                        {{ company.domain }}
                      </td>

                      <td width="18%">
                        <router-link
                          class="btn btn-sm btn-success action-btn"
                          :to="{
                            name: 'add-new-company',
                            params: {
                              company_id: company.id,
                            },
                          }"
                          style="margin-left: 2px"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit"
                        >
                          Add Admin
                        </router-link>
                        <router-link
                          class="btn btn-sm btn-primary action-btn"
                          :to="{
                            name: 'edit-company',
                            params: {
                              company_id: company.id,
                            },
                          }"
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
                            deleteCompany($event, company.id, company_index)
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
                <div v-if="!isLoaded" class="col-md-12">
                  <p class="alert alert-warning">Loading....</p>
                </div>
                <div v-if="!companies.length && isLoaded" class="col-md-12">
                  <p class="alert alert-warning">No Records found.</p>
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
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: {
    PageHeader,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      isLoaded: false,
      base_url: process.env.VUE_APP_SERVICE_URL,
      page_title: "Companies",
      petition: {},
      header_button_text: "Create New Company",
      header_button: true,
      route_obj: {
        name: "create-company",
      },
      companies: [],
      saving: false,
    };
  },
  validations() {
    return {
      new_court: {
        title: { required },
      },
    };
  },
  created() {
    this.getCompanies();
  },
  methods: {
    getCompanies() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/companies", { headers })
        .then((response) => {
          this.isLoaded = true;
          console.log("company Data");
          console.log(response.data);
          this.companies = response.data.companies;
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
          this.isLoaded = true;
          console.log(error);
        });
    },

    deleteCompany(event, company_id, company_index) {
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
            .delete(this.base_url + "/api/companies/" + company_id, {
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
                  this.companies.splice(company_index, 1); //removing record from list/index after deleting record from DB
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
  },
  mounted() {
    document.title = "Companies";

    console.log("Court List Component Mounted");
  },
};
</script>

<style></style>
