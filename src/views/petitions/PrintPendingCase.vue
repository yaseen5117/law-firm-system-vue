<template>
  <div class="row" id="modal">
    <div class="table-responsive">
      <div
        class="col-lg-12 col-md-12 col-sm-12 mt-4 mb-2"
        style="text-align: center"
      >
        <h2>Pending Cases | {{ this.globalGeneralSetting.site_name }}</h2>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12">
        <table class="table table-bordered" id="modal_table">
          <thead>
            <th>Library No.</th>
            <th>Title</th>
            <th>Case No.</th>
            <th>Court</th>
          </thead>
          <tbody>
            <tr
              v-for="(pendingCase, pendingCaseIndex) in pendingCases"
              :key="pendingCaseIndex"
            >
              <td>{{ pendingCase.pending_tag }}</td>
              <td>{{ pendingCase.title }}</td>
              <td>
                {{
                  pendingCase.type_abrivation != ""
                    ? "" + pendingCase.type_abrivation + ""
                    : ""
                }}&nbsp; {{ pendingCase.case_no }}/{{ pendingCase.year }}
              </td>
              <td v-if="pendingCase.court">{{ pendingCase.court.title }}</td>
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
  props: ["petitions"],

  data() {
    return {
      pendingCases: [],
      base_url: process.env.VUE_APP_SERVICE_URL,
    };
  },
  updated() {
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = originalContents;
    var printContents = document.getElementById("modal").innerHTML;

    document.body.innerHTML = printContents;
    window.print();
  },
  created() {
    this.getPendingCaseFiles();
  },
  methods: {
    closePrintPendingCasesModal() {
      this.$emit("close-modal-event");
    },
    async getPendingCaseFiles() {
      let url = this.base_url + "/api/get_pending_cases";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      await axios
        .get(url, {
          headers,
        })
        .then((response) => {
          this.pendingCases = response.data.pendingCases;
          console.log(response.data.pendingCases);
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
