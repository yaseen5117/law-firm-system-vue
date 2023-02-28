<template>
  <ConfirmPopup />
  <BlockUI
    :blocked="!isLoaded"
    :fullScreen="true"
    :autoZIndex="true"
    :baseZIndex="99999"
  >
    <main id="main">
      <page-header
        title="Users"
        :showUsers="true"
        :hideCaseFiles="true"
        :route_object="route_obj"
        :header_button="header_button"
        :header_button_text="header_button_text"
      />

      <!-- ======= Services Section ======= -->
      <section id="services" class="services section-bg">
        <BlockUI :blocked="users" :fullScreen="true">
          <div class="container" data-aos="fade-up">
            <div class="row">
              <div class="col-12 mb-2">
                <Transition name="fade">
                  <form
                    v-if="showSearchForm"
                    class="row gy-2 gx-3 align-items-center"
                  >
                    <div class="col-lg-3 col-md-3 col-sm-6">
                      <input
                        type="text"
                        id="name"
                        v-model="filters.name"
                        class="form-control form-control-sm"
                        placeholder="Name"
                        aria-describedby="Name"
                      />
                    </div>

                    <div class="col-lg-3 col-md-3 col-sm-6">
                      <input
                        placeholder="Email"
                        v-model="filters.email"
                        type="email"
                        id="email"
                        class="form-control form-control-sm"
                        aria-describedby="Email"
                      />
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12">
                      <select
                        class="form-select form-select-sm"
                        aria-describedby="Role"
                        v-model="filters.role_id"
                      >
                        <option value="">--Roles--</option>
                        <option
                          class="text-capitalize"
                          v-for="role in roles"
                          :key="role.id"
                          :value="role.id"
                        >
                          {{ role.name }}
                        </option>
                      </select>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-12">
                      <select
                        class="form-select form-select-sm"
                        aria-describedby="Role"
                        v-model="filters.is_approved"
                      >
                        <option
                          class="text-capitalize"
                          v-for="status in statuses"
                          :key="status.id"
                          :value="status.id"
                        >
                          {{ status.name }}
                        </option>
                      </select>
                    </div>
                    <div class="col-lg-1 col-md-1 col-sm-12">
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
              <div class="col-lg-12 col-md-12 col-sm-12 mb-2">
                <!-- <router-link
              style="margin-right: 2px"
              class="btn btn-success btn-sm"
              :to="'/users/create'"
              >New User</router-link
            > -->

                <!-- <button
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
            </button> -->
              </div>
              <div class="table-responsive">
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <table class="table table-hover" v-if="isLoaded">
                    <thead>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Email</th>
                      <th width="15%">Status</th>
                      <th width="15%">Registered at</th>
                      <th width="20%">Actions</th>
                    </thead>
                    <tbody>
                      <tr v-for="(user, userIndex) in users" :key="user.id">
                        <td>
                          <input
                            v-show="user.editMode"
                            class="form-control"
                            v-model="user.name"
                            v-on:keyup.enter="editUser(user)"
                          />
                          <span v-show="!user.editMode">{{ user.name }} </span>
                        </td>
                        <td>
                          <span
                            class="text-capitalize"
                            v-for="role in user.roles"
                            :key="role"
                            >{{ role.name }}
                          </span>
                        </td>
                        <td>
                          <input
                            v-show="user.editMode"
                            class="form-control"
                            v-model="user.email"
                            v-on:keyup.enter="editUser(user)"
                          />
                          <span v-show="!user.editMode">{{ user.email }} </span>
                        </td>
                        <td>
                          <p :class="user.is_approved ? '' : ''" class="">
                            {{
                              user.is_approved ? "Approved" : "Pending Approval"
                            }}
                          </p>
                        </td>
                        <td>
                          <p>
                            {{ formateDate(user.created_at) }}
                          </p>
                        </td>
                        <td width="15%">
                          <button
                            :class="
                              user.is_approved ? 'btn-warning' : 'btn-success'
                            "
                            class="btn btn-sm action-btn"
                            @click="isApprovedToggle(user, !user.is_approved)"
                          >
                            {{ user.is_approved ? "Block" : "Approve" }}
                          </button>

                          <router-link
                            class="btn btn-sm btn-primary action-btn"
                            v-show="!user.editMode"
                            :to="{
                              name: 'edit-user',
                              params: { edit_user_id: user.id },
                            }"
                            href="javascript:void"
                            style="margin-left: 2px"
                            v-tooltip.top="'Edit'"
                          >
                            Edit
                            <!-- <i class="fa fa-edit"></i> -->
                          </router-link>
                          <a
                            v-show="user.editMode"
                            class="btn btn-sm btn-warning action-btn"
                            @click="editUser(user)"
                            href="javascript:void"
                            style="margin-left: 2px"
                            v-tooltip.top="'Update'"
                          >
                            Update
                            <!-- <i class="fa fa-save"></i> -->
                          </a>

                          <a
                            v-show="user.editMode"
                            @click="user.editMode = false"
                            class="btn btn-sm btn-info action-btn"
                            href="javascript:void"
                            style="margin-left: 2px"
                            v-tooltip.top="'Cancel'"
                          >
                            Cancel
                            <!-- <i class="fa fa-remove"></i> -->
                          </a>

                          <a
                            class="btn btn-sm btn-danger action-btn"
                            v-show="!user.editMode"
                            @click="deleteUser($event, user.id, userIndex)"
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
                  <div v-if="!isLoaded" class="col-md-12">
                    <p class="alert alert-warning">Loading....</p>
                  </div>
                  <div v-if="!users.length && isLoaded" class="col-md-12">
                    <p class="alert alert-warning">No Records found.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-3">
                    <p v-show="pagination_info.total > 0">
                      <small
                        >Showing from {{ pagination_info.from }} to
                        {{ pagination_info.to }} of
                        {{ pagination_info.total }}</small
                      >
                    </p>
                  </div>
                  <div class="col-md-6">
                    <Paginator
                      v-show="pagination_info.total > 0"
                      v-model:first="pagination_info.from"
                      v-model:rows="pagination_info.per_page"
                      :totalRecords="pagination_info.total"
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
        </BlockUI>
      </section>
      <!-- End Services Section -->
    </main>
    <!-- End #main -->
  </BlockUI>
</template>

<script>
import axios from "axios";
import moment from "moment";

import PageHeader from "../shared/PageHeader.vue";
export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      route_obj: {
        name: "create-user",
      },
      header_button: true,
      header_button_text: "New User",
      base_url: process.env.VUE_APP_SERVICE_URL,
      users: [],
      pagination_info: [],
      roles: [],
      id: this.$route.params.id, //this is the id from the browser
      new_petition_index: {},
      showSearchForm: true,
      filters: {
        role_id: "",
        is_approved: 2,
      },
      statuses: [
        {
          id: 2,
          name: "All",
        },
        {
          id: 1,
          name: "Approved",
        },
        {
          id: 0,
          name: "Pending Approval",
        },
      ],
      isLoaded: false,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    formateDate(date) {
      if (date) {
        return moment(String(date)).format("DD/MM/YYYY"); //for  time hh:mm
      }
    },
    isApprovedToggle(user, param) {
      user.is_approved = param;
      this.editUser(user);
    },
    onPage(event) {
      this.isLoaded = false;
      var new_page_no = event.page + 1; //adding 1 because event.page returns index of page # clicked.
      this.filters.page = new_page_no;
    },
    getUsers() {
      this.isLoaded = false;
      let url = this.base_url + "/api/users";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(url, {
          headers,
          params: this.filters,
        })
        .then((response) => {
          this.isLoaded = true;
          this.users = response.data.users.data;
          this.pagination_info = response.data.users;
          this.roles = response.data.roles;
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

    editUser(userToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/users", userToUpdate, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                console.log(response.data);
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                userToUpdate.editMode = false;
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
    deleteUser(event, userId, userIndex) {
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
            .delete(this.base_url + "/api/users/" + userId, {
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
                  //this.getUsers()
                  this.users.splice(userIndex, 1); //removing record from list/index after deleting record from DB
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
      this.isLoaded = false;
      this.filters = {
        role_id: "",
        is_approved: 2,
      };
      this.isLoaded = true;
    },
  },
  mounted() {
    console.log("User List Component Mounted");
    document.getElementById("header");
    document.title = "Users";
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.getUsers();
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
