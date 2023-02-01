<template>
  <ConfirmPopup />
  <BlockUI :blocked="!isLoaded" :fullScreen="true">
    <main id="main">
      <page-header
        :title="'Links'"
        :petition="null"
        :hideCaseFiles="true"
        :showInvoices="false"
        :route_object="route_obj"
        :header_button="header_button"
        :header_button_text="header_button_text"
      />
      <section id="services" class="services section-bg">
        <BlockUI :blocked="links" :fullScreen="true">
          <div class="container" data-aos="fade-up">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive">
                  <table class="table table-striped" v-if="isLoaded">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Url</th>
                        <th>Description</th>
                        <th>Display Order</th>
                        <th class="text-end" v-if="this.user.is_admin">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(link, link_index) in links" :key="link_index">
                        <td>
                          {{ link.title }}
                        </td>

                        <td>
                          <a :href="link.url" target="_blank">
                            {{ link.url }}
                          </a>
                        </td>
                        <td>{{ link.description }}</td>
                        <td>{{ link.display_order }}</td>
                        <td class="text-end" v-if="this.user.is_admin">
                          <router-link
                            class="btn btn-sm btn-success action-btn"
                            :to="{
                              name: 'edit-link',
                              params: { link_id: link.id },
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
                            @click="deleteLink($event, link.id, link_index)"
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
import { mapState } from "vuex";

export default {
  computed: mapState(["user"]),
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
      links: [],
      showDateType: false,
      excute: false,
      saving: false,
      route_obj: {
        name: "create-link",
      },
      header_button: true,
      header_button_text: "Create link",
      base_url: process.env.VUE_APP_SERVICE_URL,
      isLoaded: false,
    };
  },
  created() {
    this.getLinks();
  },
  mounted() {
    document.getElementById("header");
    document.title = "Links";
  },
  methods: {
    getLinks() {
      this.isLoaded = false;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      let url = this.base_url + "/api/links";
      axios
        .get(url, { headers, params: this.filters })
        .then((response) => {
          this.links = response.data.links;
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
    deleteLink(event, link_id, link_index) {
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
            .delete(this.base_url + "/api/links/" + link_id, {
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
                  this.links.splice(link_index, 1); //removing record from list/index after deleting record from DB
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
