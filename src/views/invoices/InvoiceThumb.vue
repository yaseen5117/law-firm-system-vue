<template>
  <a
    style="margin: 5px"
    v-if="invoice.attachment"
    :href="
      base_url +
      '/storage/attachments/' +
      folder_name +
      '/' +
      invoice.id +
      '/' +
      invoice.attachment.file_name
    "
    target="_blank"
  >
    <span
      v-if="
        !(
          invoice.attachment.mime_type == 'image/jpeg' ||
          invoice.attachment.mime_type == 'image/jpg' ||
          invoice.attachment.mime_type == 'image/png'
        )
      "
    >
      Click to open
    </span>
    <img
      class="img img-thumbnail"
      width="90"
      v-if="
        invoice.attachment &&
        (invoice.attachment.mime_type == 'image/jpeg' ||
          invoice.attachment.mime_type == 'image/jpg' ||
          invoice.attachment.mime_type == 'image/png')
      "
      :src="
        this.base_url +
        '/storage/attachments/' +
        folder_name +
        '/' +
        invoice.id +
        '/' +
        invoice.attachment.file_name
      "
      alt="Click to Open In New Tab"
    />
  </a>
</template>

<script>
export default {
  props: ["invoice", "base_url", "folder_name"],
  data() {
    return {};
  },
};
</script>

<style></style>
