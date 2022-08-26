<template>
  <Dialog
    modal="true"
    dismissableMask="true"
    header="Pending Cases"
    closable="false"
    closeOnEscape="true"
    @hide="closePrintPendingCasesModal()"
    v-model:visible="pendingCaseModal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '90vw' }"
  >
    <div class="row" id="modal">
      <div class="table-responsive">
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
                :key="pendingCase.id"
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
    <template #footer>
      <a
        class="btn btn-grey action-btn"
        style="margin-right: 2px"
        v-tooltip.top="'Close'"
        @click="closePrintPendingCasesModal()"
        ><i class="fa fa-times"></i> Close</a
      >
      <a
        class="btn btn-primary action-btn"
        style="margin-right: 2px"
        v-tooltip.top="'Print Pending Cases'"
        @click="printPendingCases()"
        ><i class="fa fa-print"></i> Print</a
      >

      <a
        v-tooltip.top="'Download Pending Cases'"
        class="btn btn-warning action-btn"
        :href="download_url"
        download=""
        ><i class="fa fa-download"></i> Download PDF</a
      >
    </template>
  </Dialog>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

export default {
  computed: mapState(["user"]),
  props: ["pendingCaseModal", "petitions"],
  components: {
    Button,
    Dialog,
  },
  data() {
    return {
      pendingCases: [],
      base_url: process.env.VUE_APP_SERVICE_URL,
      download_url: "",
      pageTitle: true,
    };
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
          this.download_url = response.data.url;
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
    printPendingCases() {
      // var mywindow = window.open("", "PRINT", "height=780,width=1920");
      // mywindow.document.write(
      //   "<html><head><title>" + document.title + "</title>"
      // );
      // mywindow.document.write("</head><body>");

      // mywindow.document.write("<h1>" + document.title + "</h1>");
      // mywindow.document.write(
      //   "<div class='row' id='modal'><div class='table-responsive'><div class='col-lg-12 col-md-12 col-sm-12'><table class='table table-bordered'>" +
      //     document.getElementById("modal").innerHTML +
      //     "</table></div></div></div>"
      // );

      // mywindow.document.getElementById("modal_table").style.border =
      //   "1px solid black";
      // mywindow.document.getElementById("modal_table").style.textAlign = "left";

      // mywindow.document.write("</body></html>");

      // mywindow.document.getElementById("modal").innerHTML;
      // mywindow.document.body.innerHTML;

      // mywindow.document.close(); // necessary for IE >= 10
      // mywindow.focus(); // necessary for IE >= 10*/
      // mywindow.print();
      // mywindow.document.close();

      var printContents = document.getElementById("modal").innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = "sssss" + printContents;

      window.document.close(); // necessary for IE >= 10
      window.focus(); // necessary for IE >= 10*/
      window.print();

      document.body.innerHTML = originalContents;
      window.document.close();
    },
  },
};
</script>

<style>
.abc {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 3px solid purple;
}
</style>
