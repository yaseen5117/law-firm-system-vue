<template>
  <div
    class="text-center text-danger mt-3 mb-3"
    v-if="index_details.attachments.length == 0"
  >
    <p><strong>No attachments in this category.</strong></p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["user"]),
  props: ["index_details"],
};
</script>

<style></style>
