<template>
  <main id="main">
    <page-header title="Users" />

    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-12 mb-2">
            <Transition name="fade">
              <form
                v-if="showSearchForm"
                class="row gy-2 gx-3 align-items-center"
              >
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <input
                    type="text"
                    id="name"
                    v-model="filters.name"
                    class="form-control form-control-sm"
                    placeholder="Name"
                    aria-describedby="Name"
                  />
                </div>

                <div class="col-lg-4 col-md-4 col-sm-4">
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
                    class="form-control form-control-sm"
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
            <router-link
              style="margin-right: 2px"
              class="btn btn-success btn-sm"
              :to="'/users/create'"
              >New User</router-link
            >

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
          <div class="table-responsive">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <table class="table table-striped">
                <thead>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>

                  <th width="20%">Actions</th>
                </thead>
                <tbody>
                  <tr
                    @dblclick="user.editMode = false"
                    v-for="(user, userIndex) in users"
                    :key="user.id"
                  >
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
                        v-for="(role, index) in user.roles"
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
                          params: { id: user.id },
                        }"
                        href="javascript:void"
                        style="margin-left: 2px"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Edit"
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
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Update"
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
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Cancel"
                      >
                        Cancel
                        <!-- <i class="fa fa-remove"></i> -->
                      </a>

                      <a
                        class="btn btn-sm btn-danger action-btn"
                        v-show="!user.editMode"
                        @click="deleteUser(user.id, userIndex)"
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
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Services Section -->
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";

import PageHeader from "../shared/PageHeader.vue";
export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      users: [],
      roles: [],
      id: this.$route.params.id, //this is the id from the browser
      new_petition_index: {},
      showSearchForm: true,
      filters: {
        role_id: "",
      },
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    isApprovedToggle(user, param) {
      user.is_approved = param;
      this.editUser(user);
    },

    getUsers() {
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
          this.users = response.data.users;
          this.roles = response.data.roles;
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.error,
          });
          console.log(error);
        });
    },

    editUser(userToUpdate) {
      if (true) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
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
              console.log(error.response.data.error);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.error,
              });
            }
          );
      }
    },
    deleteUser(userId, userIndex) {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("rezo_customers_user"),
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
              console.log(error.response.data.error);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.error,
              });
            }
          );
      }
    },
    reset() {
      this.filters = {
        role_id: "",
      };
      this.getUsers();
    },
  },
  mounted() {
    console.log("User List Component Mounted");
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        setTimeout(() => {
          this.getUsers();
        }, 300); // 1 sec delay
      },
    },
  },
};
</script>

<style>
.red {
  color: red;
}
@media screen and (max-width: 768px) {
  .case_heading .line-hight {
    font-size: 12px !important;
    line-height: normal !important;
  }
}
</style>
