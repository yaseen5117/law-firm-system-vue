<template>
  <div class="row" id="modal">
    <div class="col-lg-12 col-md-12 col-sm-12 mt-4" style="text-align: center">
      <h2>{{ this.globalGeneralSetting.site_name }}</h2>
      <div class="card-body align-center case_heading">
        <petition-detail :petition="petition" />
      </div>
    </div>
    <div class="col-lg-12 col-md-12 col-sm-12" style="text-align: center">
      <div class="card-body align-center case_heading">
        <h4 style="text-transform: uppercase; font-weight: bold">
          Dates Of Hearing
        </h4>
      </div>
    </div>
    <div class="col-lg-12 col-md-12 col-sm-12">
      <!-- <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 border">
          <div class="row" style="text-align: left">
            <div class="col border border-bottom-1 border-dark">
              <strong>Sr. No.</strong>
            </div>
            <div class="col border border-bottom-1 border-dark">
              <strong>Date</strong>
            </div>
            <div class="col border border-bottom-1 border-dark">
              <strong>Type</strong>
            </div>
            <div class="col border border-bottom-1 border-dark">
              <strong>Sr. No.</strong>
            </div>
            <div class="col border border-bottom-1 border-dark">
              <strong>Date</strong>
            </div>
            <div class="col border border-bottom-1 border-dark">
              <strong>Type</strong>
            </div>
          </div>
        </div>
        <template
          v-for="(singleOrderSheet, orderSheetIndex) in orderSheets"
          :key="orderSheetIndex"
        >
          <div class="col-lg-6 col-md-6 col-sm-6" v->
            <div class="row">
              <div class="col border">
                {{ orderSheetIndex + 1 }}
              </div>
              <div class="col border">
                {{ singleOrderSheet.order_sheet_date }}
              </div>
              <div class="col border" v-if="singleOrderSheet.petition.type">
                {{ singleOrderSheet.petition.type.title }}
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="row">
                <div class="col border">
                  {{ orderSheetIndex + 1 }}
                </div>
                <div class="col border">
                  {{ singleOrderSheet.order_sheet_date }}
                </div>
                <div class="col border" v-if="singleOrderSheet.petition.type">
                  {{ singleOrderSheet.petition.type.title }}
                </div>
              </div>
            </div> 
        </template>
      </div> -->
      <table class="table table-bordered" id="modal_table">
        <thead>
          <th>Sr. No.</th>
          <th>Date</th>
          <th>Type</th>
        </thead>
        <tbody>
          <tr
            v-for="(singleOrderSheet, orderSheetIndex) in orderSheets"
            :key="orderSheetIndex"
          >
            <td>{{ orderSheetIndex + 1 }}</td>
            <td>
              {{ singleOrderSheet.order_sheet_date }}
            </td>
            <td v-if="singleOrderSheet.petition.type">
              {{ singleOrderSheet.petition.type.title }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import PetitionDetail from "../shared/PetitionDetail.vue";

export default {
  computed: mapState(["user", "globalGeneralSetting"]),
  components: {
    PetitionDetail,
  },
  data() {
    return {
      orderSheets: [],
      base_url: process.env.VUE_APP_SERVICE_URL,
      petition_id: this.$route.params.petition_id,
      petition: {},
    };
  },
  created() {
    this.getPetition();
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
    async getPetition() {
      let url = this.base_url + "/api/get_petition";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      await axios
        .get(url, {
          headers,
          params: { petition_id: this.petition_id },
        })
        .then((response) => {
          this.petition = response.data.petition;
          console.log(response.data.petition);
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
