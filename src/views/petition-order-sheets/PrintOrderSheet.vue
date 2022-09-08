<template>
  <div class="row" id="modal">
    <div class="table-responsive">
      <div
        class="col-lg-12 col-md-12 col-sm-12 mt-4 mb-2"
        style="text-align: center"
      >
        <h2>Order Sheets | {{ this.globalGeneralSetting.site_name }}</h2>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12">
        <table class="table table-bordered" id="modal_table">
          <thead>
            <th>Case No.</th>
            <th>Order Sheet Date</th>
            <th>Order Sheet Type</th>
          </thead>
          <tbody>
            <tr
              v-for="(singleOrderSheet, orderSheetIndex) in orderSheets"
              :key="orderSheetIndex"
            >
              <td v-if="singleOrderSheet.petition">
                {{ singleOrderSheet.petition.petition_standard_title }}
              </td>
              <td>{{ singleOrderSheet.order_sheet_date }}</td>
              <td v-if="singleOrderSheet.order_sheet_types">
                {{ singleOrderSheet.order_sheet_types.title }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  computed: mapState(["user", "globalGeneralSetting"]),

  data() {
    return {
      orderSheets: [],
      base_url: process.env.VUE_APP_SERVICE_URL,
      petition_id: this.$route.params.petition_id,
    };
  },
  created() {
    this.getOrderSheets();
  },
  methods: {
    printContents() {
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = originalContents;
      var printContents = document.getElementById("modal").innerHTML;

      document.body.innerHTML = printContents;
      window.print();
    },
    closePrintPendingCasesModal() {
      this.$emit("close-modal-event");
    },
    async getOrderSheets() {
      let url = this.base_url + "/api/petition_order_sheets";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      await axios
        .get(url, {
          headers,
          params: { petition_id: this.petition_id },
        })
        .then((response) => {
          this.orderSheets = response.data.records;
          console.log(response.data.records);
          setTimeout(this.printContents, 1500);
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
  },
};
</script>

<style></style>
