<template>
  <button
    style="margin-right: 2px"
    @click="confirmToDelete($event)"
    class="btn btn-sm btn-green action-btn"
    v-if="
      nextHearingOrderSheet &&
      nextHearingOrderSheet.order_sheet_date &&
      hearingDate
    "
    v-tooltip.top="'Click To Change/Remove'"
  >
    Next Hearing Date: {{ nextHearingOrderSheet.order_sheet_date }}
  </button>
  <!-- && !nextHearingOrderSheet.order_sheet_date -->
  <button
    v-tooltip.top="'Add Hearing Date'"
    v-if="!insertHearingDate && !nextHearingOrderSheet.order_sheet_date"
    @click="openHearingDateInsertField()"
    class="btn btn-sm btn-dark action-btn"
  >
    Add Hearing Date
  </button>
  <button class="btn" v-if="insertHearingDate">
    <div class="p-inputgroup">
      <Calendar
        @date-select="addHearingDate()"
        placeholder="dd/mm/yy"
        class="p-calendar p-inputtext-sm"
        v-on:keyup.enter="addHearingDate()"
        v-model="order_sheet_date"
        dateFormat="dd/mm/yy"
        :touchUI="true"
      />
      <!-- <input
        class="form-control form-control-sm"
        v-on:keyup.enter="addHearingDate(petition_detail)"
        v-model="pending_tag"
        placeholder="Insert 'Pending' Tag"
      /> -->
      <button
        v-tooltip.top="'Save'"
        @click="addHearingDate()"
        class="btn btn-success btn-sm action-btn"
      >
        <i class="fa fa-check" aria-hidden="true"></i>
      </button>
      <button
        v-tooltip.top="'Cancel'"
        @click="colseInsertField()"
        class="btn btn-danger btn-sm action-btn"
      >
        <i class="fa fa-close" aria-hidden="true"></i>
      </button>
    </div>
  </button>
</template>

<script>
import axios from "axios";

export default {
  props: ["petition", "petition_detail"],
  components: {},
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      id: this.$route.params.id,
      hearingDate: true,
      insertHearingDate: false,
      nextHearingOrderSheet: {},
      order_sheet_date: "",
    };
  },
  created() {
    this.getNextOderSheet();
  },
  methods: {
    getNextOderSheet() {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        axios
          .post(
            this.base_url + "/api/get_next_hearing_ordersheet",
            {
              petition_id: this.id,
            },
            { headers }
          )
          .then((response) => {
            if (response.data.nextHearingOrderSheet) {
              this.nextHearingOrderSheet = response.data.nextHearingOrderSheet;
              console.log(response.data.nextHearingOrderSheet);
            } else {
              this.order_sheet_date = "";
            }
          })
          .catch((error) => {
            console.log(error);
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.message,
            });
          });
      }
    },
    addHearingDate() {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        this.insertHearingDate = false;
        this.hearingDate = true;

        axios
          .post(
            this.base_url + "/api/add_hearing_date",
            {
              id: this.nextHearingOrderSheet.id,
              order_sheet_date: this.order_sheet_date,
              petition_id: this.id,
            },
            { headers }
          )
          .then((response) => {
            this.getNextOderSheet();
            this.$notify({
              type: "success",
              title: "Success",
              text: "Hearing Date Added Successfully!",
            });
            this.order_sheet_date = null;
          })
          .catch((error) => {
            console.log(error);
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.message,
            });
          });
      }
    },
    colseInsertField() {
      this.insertHearingDate = false;
      this.showEditTagBtn = true;
      this.hearingDate = true;
      this.order_sheet_date = "";
    },
    confirmToDelete(event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Do you want to Remove/Change Hearing Date?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Delete",
        acceptClass: "p-button-danger",
        rejectClass: "p-button-primary",
        rejectLabel: "Edit",
        accept: () => {
          this.removeHearingDate();
        },
        reject: () => {
          this.editHearingDate();
          this.$confirm.close();
        },
      });
    },
    removeHearingDate() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      this.insertHearingDate = false;
      this.hearingDate = false;

      let order_sheet_date = this.nextHearingOrderSheet.order_sheet_date;
      this.nextHearingOrderSheet.order_sheet_date = "";

      axios
        .post(
          this.base_url + "/api/remove_hearing_date",
          {
            order_sheet_date: order_sheet_date,
            petition_id: this.id,
          },
          { headers }
        )
        .then((response) => {
          this.$notify({
            type: "success",
            title: "Success",
            text: "Hearing Date & Calendar Event Remove Successfully!",
          });
          this.order_sheet_date = "";
          this.nextHearingOrderSheet = {};
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
    editHearingDate() {
      this.insertHearingDate = true;
      this.hearingDate = false;
      this.order_sheet_date = this.nextHearingOrderSheet.order_sheet_date;
    },
    openHearingDateInsertField() {
      this.insertHearingDate = true;
    },
  },
};
</script>

<style></style>
