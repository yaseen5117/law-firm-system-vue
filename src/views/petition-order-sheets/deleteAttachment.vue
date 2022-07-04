<template>
  <button
    v-if="showDeleteBtn"
    class="btn btn-sm btn-danger"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Delete"
    @click="deleteAll()"
  >
    Delete Selected
  </button>
  <table class="table table-bordered">
    <thead>
      <th>
        <input
          class="margin-left-checkbox"
          type="checkbox"
          v-model="selectedAllToDelete"
          @click="selectAllToDelete()"
        />
        Select all
      </th>
      <th>Image</th>
    </thead>
    <tbody>
      <tr v-for="attachment in order_sheet.attachments" :key="attachment">
        <td>
          <div class="checkbox">
            <input
              type="checkbox"
              :value="attachment.id"
              v-model="selected"
              @change="updateCheckall()"
            />
          </div>
        </td>
        <td>
          <img
            :class="activePage == attachment.id ? 'active-img' : ''"
            style="width: 80px"
            :src="
              this.base_url +
              '/storage/attachments/' +
              this.$route.params.editable_order_sheet_id +
              '/' +
              attachment.file_name
            "
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import axios from "axios";

export default {
  emits: ["afterDelete"],
  props: ["order_sheet"],
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      showDeleteBtn: false,
      selected: [],
      selectedAllToDelete: false,
    };
  },
  methods: {
    //select all to delete all
    selectAllToDelete() {
      this.selected = [];
      if (!this.selectedAllToDelete) {
        this.showDeleteBtn = true;
        for (let i in this.order_sheet.attachments) {
          this.selected.push(this.order_sheet.attachments[i].id);
        }
      } else {
        this.showDeleteBtn = false;
      }
    },
    //delete all selected
    deleteAll() {
      if (confirm("Do you really want to delete?")) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(this.base_url + "/api/delete_selected", this.selected, {
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
                this.showDeleteBtn = false;
                this.$emit("afterDelete", "Reloading the Data of attachments");
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
    updateCheckall: function () {
      if (this.order_sheet.attachments.length == this.selected.length) {
        this.selectedAllToDelete = true;
        this.showDeleteBtn = true;
      } else if (!this.selected.length) {
        this.showDeleteBtn = false;
        this.selectedAllToDelete = false;
      } else {
        this.showDeleteBtn = true;
        this.selectedAllToDelete = false;
      }
    },
  },
};
</script>
<style>
</style>