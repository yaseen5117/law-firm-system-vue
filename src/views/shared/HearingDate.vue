<template>
  <button
  @click="openHearingDateInsertField()"
    class="btn btn-sm btn-green action-btn"
    v-if="
      nextHearingOrderSheet &&
      nextHearingOrderSheet.order_sheet_date &&
      hearingDate &&
      !isShowIcon
    "
    v-tooltip.top="'Click To Change/Remove'"
  >
    Next Hearing Date: {{ nextHearingOrderSheet.order_sheet_date }}
  </button>
  <i
    class="fa fa-calendar"
    @click="openHearingDateInsertField()"
    v-if="
      nextHearingOrderSheet &&
      nextHearingOrderSheet.order_sheet_date &&
      hearingDate &&
      isShowIcon
    "
    v-tooltip.top="
      'Next Hearing Date: ' + nextHearingOrderSheet.order_sheet_date
    "
  ></i>
  <!-- && !nextHearingOrderSheet.order_sheet_date -->
  <button
    v-tooltip.top="'Add Hearing Date'"
    v-if="
      !insertHearingDate &&
      !nextHearingOrderSheet.order_sheet_date &&
      !isShowIcon
    "
    @click="openHearingDateInsertField()"
    class="btn btn-sm btn-success action-btn"
  >
    Add Hearing Date
  </button>
  <i
    @click="openHearingDateInsertField()"
    v-tooltip.top="
      nextHearingOrderSheet.order_sheet_date
        ? 'Hearing Date: ' + nextHearingOrderSheet.order_sheet_date
        : 'Add Hearing Date '
    "
    v-if="
      !insertHearingDate &&
      !nextHearingOrderSheet.order_sheet_date &&
      isShowIcon
    "
    class="fa fa-calendar"
  ></i>
  <button class="btn" v-if="insertHearingDate">
    <div class="p-inputgroup">
      <Calendar
        @date-select="addHearingDate()"
        placeholder="Click to enter date"
        class="p-calendar p-inputtext-sm"
        
        v-model="nextHearingOrderSheet.order_sheet_date"
        dateFormat="dd/mm/yy"
        :autoZIndex="true"
        :showButtonBar="true"
        :inline="true"
        :touchUI="true"
        @clear-click="clearDate()"
        :id="'calendar-'+id"
        
      />
      <!-- <input
        class="form-control form-control-sm"
        v-on:keyup.enter="addHearingDate(petition_detail)"
        v-model="pending_tag"
        placeholder="Insert 'Pending' Tag"
      /> -->
     
      <!-- <button
        v-tooltip.top="'Cancel'"
        @click="colseInsertField()"
        class="btn btn-danger btn-sm action-btn"
      >
        <i class="fa fa-close" aria-hidden="true"></i>
      </button> -->
    </div>
  </button>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  props: ["petition_id", "isShowIcon"],
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      id: this.$route.params.id ? this.$route.params.id : this.petition_id,
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

    clearDate(){
      this.insertHearingDate=false;
    },
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
