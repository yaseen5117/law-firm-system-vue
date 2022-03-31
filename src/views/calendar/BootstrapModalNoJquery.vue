<template>
  <!-- The Modal -->
  <div class="bootstrap-modal-no-jquery">
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Modal Heading</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">{{ name }}</div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="saveChanges">
              Save changes
            </button>
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close-modal-event");
    },
    saveChanges() {
      this.closeModal();
    },
    getName(value) {
      console.log("called in modal");
      this.name = value;
    },

    updateMyVar(val) {
      console.log("called in modal");
      this.name = "vsdafsadfalue";
    },
  },
};
</script>

<style scoped>
/* Override default value of 'none' */
.modal {
  display: block;
}
</style>