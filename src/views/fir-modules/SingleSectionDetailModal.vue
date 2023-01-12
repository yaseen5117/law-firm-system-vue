<template>
  <Dialog
    modal="true"
    dismissableMask="true"
    header="Section Detail"
    closable="false"
    closeOnEscape="true"
    @hide="closePrintPendingCasesModal()"
    v-model:visible="showSectionDetailModal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '90vw' }"
  >
    <div class="row" id="modal">
      <div class="table-responsive">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <table class="table table-bordered">
            <thead class="text-nowrap">
              <tr>
                <th>Statute</th>
                <th>Title</th>
                <th>Section</th>
                <th>Defination</th>
                <th>Link</th>
                <th>Arrest Info</th>
                <th>Warrent Info</th>
                <th>Bailable Info</th>
                <th>Compoundable Info</th>
                <th>Punishment Info</th>
                <th>Court Triable</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ sectionDetail.statute.title }}</td>
                <td>{{ sectionDetail.title }}</td>
                <td>{{ sectionDetail.fir_no }}</td>
                <td>{{ sectionDetail.defination }}</td>
                <td>{{ sectionDetail.link }}</td>
                <td>{{ sectionDetail.arrest_info }}</td>
                <td>{{ sectionDetail.warrent_info }}</td>
                <td>{{ sectionDetail.bailable_info }}</td>
                <td>{{ sectionDetail.compoundable_info }}</td>
                <td>{{ sectionDetail.punishment_info }}</td>
                <td>{{ sectionDetail.court_triable }}</td>
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
    </template>
  </Dialog>
</template>

<script>
export default {
  props: ["showSectionDetailModal", "sectionDetail"],

  data() {
    return {
      pageTitle: true,
    };
  },
  created() {},
  methods: {
    closePrintPendingCasesModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style></style>
