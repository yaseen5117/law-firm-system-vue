<template>
  <ConfirmPopup />
  <BlockUI
    :blocked="blockPanel"
    :fullScreen="true"
    :autoZIndex="true"
    :baseZIndex="99999"
  >
    <main id="main">
      <page-header title="Opinions" :hideBreadCrumbs="true" />
      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <!-- search filters -->
            <div class="col-md-12 col-12">
              <Transition name="fade">
                <form v-if="showSearchForm" class="row mb-2">
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label for="">Client</label>
                    <select
                      class="form-control form-control-sm"
                      v-model="filters.client_id"
                    >
                      <option value="">--All--</option>
                      <option
                        v-for="client in clients"
                        :key="client.id"
                        :value="client.id"
                      >
                        {{ client.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label for="">Reference No</label>
                    <input
                      type="text"
                      v-model="filters.reference_no"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12">
                    <label for="">Subject</label>
                    <input
                      v-model="filters.subject"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>

                  <div class="col-lg-1 col-md-1 col-sm-12">
                    <button
                      type="button"
                      class="btn btn-danger btn-sm mt-lg-4 mt-md-4 mt"
                      @click="reset()"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </Transition>
            </div>
            <!-- search filters -->
            <div class="col-lg-12 col-md-12 col-sm-12 mb-3">
              <button
                class="btn btn-secondary btn-sm"
                v-if="showSearchForm"
                @click="showSearchForm = !showSearchForm"
              >
                Hide Filters
              </button>
              <button
                class="btn btn-warning btn-sm"
                v-else-if="!showSearchForm"
                @click="showSearchForm = !showSearchForm"
              >
                Show Filters
              </button>
            </div>
            <div>
              <div class="col-lg-12 col-md-12 col-sm-12">
                <table class="table table-striped">
                  <thead>
                    <th>Client</th>
                    <th>Reference No.</th>
                    <th>Subject</th>
                    <th>Date Of Issuance</th>
                    <th width="10%" v-if="this.user.is_admin">Actions</th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(opinion, opinionIndex) in opinions"
                      :key="opinion.id"
                    >
                      <td>
                        <Dropdown
                          v-show="opinion.editMode"
                          v-model="opinion.client_id"
                          :options="clients"
                          optionLabel="name"
                          class="form-control drop-down-height"
                          optionValue="id"
                          placeholder="Select a Client"
                          :filter="true"
                          :showClear="true"
                          appendTo="self"
                          filterPlaceholder="Find by Client Name"
                        />
                        <span v-if="opinion.user" v-show="!opinion.editMode">{{
                          opinion.user.name
                        }}</span>
                      </td>
                      <td>
                        <input
                          v-show="opinion.editMode"
                          class="form-control"
                          type="text"
                          v-model="opinion.reference_no"
                          v-on:keyup.enter="editOpinion(opinion)"
                        />
                        <span v-show="!opinion.editMode">{{
                          opinion.reference_no
                        }}</span>
                      </td>
                      <td>
                        <input
                          v-show="opinion.editMode"
                          class="form-control"
                          v-model="opinion.subject"
                          v-on:keyup.enter="editOpinion(opinion)"
                        />
                        <span v-show="!opinion.editMode">{{
                          opinion.subject
                        }}</span>
                      </td>
                      <td>
                        <InputMask
                          mask="99/99/9999"
                          v-show="opinion.editMode"
                          class="form-control"
                          v-model="opinion.issuance_date"
                          v-on:keyup.enter="editOpinion(opinion)"
                        />
                        <span v-show="!opinion.editMode">{{
                          opinion.issuance_date
                        }}</span>
                      </td>
                      <td width="15%" v-if="this.user.is_admin">
                        <a
                          class="btn btn-sm btn-primary action-btn"
                          v-show="!opinion.editMode"
                          @click="opinion.editMode = true"
                          href="javascript:void"
                          style="margin-left: 2px"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit"
                        >
                          Edit
                          <!-- <i class="fa fa-edit"></i> -->
                        </a>
                        <a
                          v-show="opinion.editMode"
                          class="btn btn-sm btn-warning action-btn"
                          @click="editOpinion(opinion)"
                          href="javascript:void"
                          style="margin-left: 2px"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Update"
                        >
                          Update
                          <!-- <i class="fa fa-save"></i> -->
                        </a>

                        <a
                          v-show="opinion.editMode"
                          @click="opinion.editMode = false"
                          class="btn btn-sm btn-info action-btn"
                          href="javascript:void"
                          style="margin-left: 2px"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Cancel"
                        >
                          Cancel
                          <!-- <i class="fa fa-remove"></i> -->
                        </a>

                        <a
                          class="btn btn-sm btn-danger action-btn"
                          v-show="!opinion.editMode"
                          @click="
                            deleteOpinion($event, opinion.id, opinionIndex)
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
                    <tr v-if="this.user.is_admin">
                      <td>
                        <Dropdown
                          v-model="new_opinion.client_id"
                          :options="clients"
                          optionLabel="name"
                          class="form-control drop-down-height"
                          optionValue="id"
                          placeholder="Select a Client"
                          :filter="true"
                          :showClear="true"
                          appendTo="self"
                          filterPlaceholder="Find by Client Name"
                        />
                      </td>
                      <td>
                        <input
                          class="form-control"
                          type="text"
                          v-model="new_opinion.reference_no"
                          v-on:keyup.enter="submitOpinion()"
                        />
                      </td>
                      <td>
                        <input
                          class="form-control"
                          v-model="new_opinion.subject"
                          v-on:keyup.enter="submitOpinion()"
                        />
                      </td>
                      <td>
                        <InputMask
                          class="form-control"
                          mask="99/99/9999"
                          placeholder="dd/mm/yyyy"
                          v-model="new_opinion.issuance_date"
                          v-on:keyup.enter="submitOpinion()"
                        />
                      </td>
                      <td>
                        <button
                          :disabled="saving"
                          @click="submitOpinion()"
                          class="btn btn-sm btn-success action-btn"
                        >
                          Save
                          <!-- <i class="fa fa-save"></i> -->
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
import PageHeader from "../shared/PageHeader.vue";
import NavComponents from "../Cases/NavComponents.vue";
import useVuelidate from "@vuelidate/core";
import { mapState } from "vuex";

export default {
  components: { PageHeader, NavComponents },
  computed: mapState(["user"]),
  data() {
    return {
      page_title: "Opinions",
      base_url: process.env.VUE_APP_SERVICE_URL,
      opinions: [],
      new_opinion: {},
      petition: {},
      clients: [],
      saving: false,
      showSearchForm: true,
      blockPanel: true,
      filters: {
        client_id: "",
      },
    };
  },

  created() {
    this.getOpinionsDetail();
    this.getClients();
  },
  mounted() {
    document.getElementById("header");
    document.title = "Opinions";
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.getOpinionsDetail();
            this.awaitingSearch = false;
          }, 4000); // 1 sec delay
        }
        this.awaitingSearch = true;
      },
    },
  },
  methods: {
    reset() {
      this.filters = {};
      this.getOpinionsDetail();
    },
    async getOpinionsDetail() {
      this.blockPanel = true;
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      await axios
        .get(this.base_url + "/api/opinions", {
          headers,
          params: this.filters,
        })
        .then((response) => {
          this.blockPanel = false;
          this.opinions = response.data.opinions;
          //this.petition = response.data.petition;
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
    getClients() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/client_users", { headers })
        .then((response) => {
          this.clients = response.data.clients;
          console.log(this.clients);
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
    deleteOpinion(event, opinionId, opinionIndex) {
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
            .delete(this.base_url + "/api/opinions/" + opinionId, {
              headers,
            })
            .then(
              (response) => {
                console.log(response);
                if (response.status === 200) {
                  this.$notify({
                    type: "success",
                    title: "Success",
                    text: "Deleted Successfully!",
                  });
                  //this.getCaseDetails()
                  this.opinions.splice(opinionIndex, 1); //removing record from list/index after deleting record from DB
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
    editOpinion(OpinionToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/opinions", OpinionToUpdate, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Update Successfully!",
                });
                OpinionToUpdate.editMode = false;
                this.getOpinionsDetail();
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
      }
    },
    submitOpinion() {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;
        axios
          .post(this.base_url + "/api/opinions", this.new_opinion, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                this.saving = false;
                this.new_opinion = {};
                // setTimeout(() => {
                //   this.v$.$reset();
                // }, 0);
                this.getOpinionsDetail();
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
  },
};
</script>

<style></style>
