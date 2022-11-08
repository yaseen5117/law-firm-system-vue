<template>
  <ConfirmPopup></ConfirmPopup>
  <button
    v-if="showDeleteBtn"
    class="btn btn-sm btn-danger"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Delete"
    @click="deleteAll($event)"
  >
    Delete Selected
  </button>
  <table class="table table-bordered">
    <thead>
      <th v-if="order_sheet.attachments.length > 0">
        <input
          class="margin-left-checkbox"
          type="checkbox"
          v-model="selectedAllToDelete"
          @click="selectAllToDelete()"
        />
        Select all
      </th>
      <th>Attachments</th>
    </thead>
    <tbody>
      <tr v-for="attachment in order_sheet.attachments" :key="attachment">
        <td v-if="order_sheet.attachments.length > 0">
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
            v-if="
              attachment.mime_type == 'image/png' ||
              attachment.mime_type == 'image/jpeg' ||
              attachment.mime_type == 'image/jpg' ||
              attachment.mime_type == 'jpg'
            "
            style="width: 150px"
            :src="
              this.base_url +
              '/storage/attachments/petitions/' +
              order_sheet.petition_id +
              '/PetitonOrderSheet/' +
              order_sheet.id +
              '/' +
              attachment.file_name
            "
          />
          <a
            :class="activePage == attachment.id ? 'active-img' : ''"
            v-else
            :href="
              this.base_url +
              '/storage/attachments/petitions/' +
              order_sheet.petition_id +
              '/PetitonOrderSheet/' +
              order_sheet.id +
              '/' +
              attachment.file_name
            "
            target="_blank"
            ><u><span>Click to Open: </span>{{ attachment.title }}</u></a
          >
        </td>
      </tr>
      <not-found-message :index_details="order_sheet" />
    </tbody>
  </table>
</template>
<script>
import axios from "axios";
import NotFoundMessage from "../shared/NotFoundMessage.vue";

export default {
  emits: ["afterDelete"],
  props: ["order_sheet"],
  components: {
    NotFoundMessage,
  },
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
    deleteAll(event) {
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
            .post(
              this.base_url + "/api/delete_selected",
              { id: this.selected },
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
                  this.showDeleteBtn = false;
                  this.$emit(
                    "afterDelete",
                    "Reloading the Data of attachments"
                  );
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
<style></style>
