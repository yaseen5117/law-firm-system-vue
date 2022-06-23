<template>
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main" class="margintop85">
      <page-header :title="page_title" :hideBreadCrumbs="true" />
      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg mt-3">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <div class="table-responsive">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <table class="table table-hover" v-if="isLoaded">
                  <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th width="10%">Actions</th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(contact_request, row_index) in contact_requests"
                      :key="contact_request.id"
                    >
                      <td>
                        {{ contact_request.name }}
                      </td>
                      <td>
                        {{ contact_request.email }}
                      </td>
                      <td>
                        {{ contact_request.subject }}
                      </td>
                      <td>
                        {{ contact_request.message }}
                      </td>
                      <td>
                        {{ contact_request.created_at }}
                      </td>

                      <td width="15%">
                        <a
                          class="btn btn-sm btn-danger action-btn"
                          @click="
                            deleteContactRequest(contact_request.id, row_index)
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
                    <tr v-if="contact_requests.length == 0">
                      <td colspan="5" class="alert alert-warning text-center">
                        No Records found.
                      </td>
                    </tr>
                  </tbody>
                </table>

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
      page_title: "Contact Requests",
      contact_requests: [],
      saving: false,
      isLoaded: false,
    };
  },
  created() {
    this.getContactRequest();
  },
  methods: {
    async getContactRequest() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/get_contact_requests", { headers })
        .then((response) => {
          this.contact_requests = response.data.contact_requests;
          this.isLoaded = true;
        })
        .catch((error) => {
          console.log(error.response.data.error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    deleteContactRequest(contactRequestId, row_index) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(
            this.base_url + "/api/delete_contact_request/" + contactRequestId,
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
                this.contact_requests.splice(row_index, 1); //removing record from list/index after deleting record from DB
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
  },
  mounted() {
    console.log("Contact Request List Component Mounted");
  },
};
</script>

<style>
</style>
