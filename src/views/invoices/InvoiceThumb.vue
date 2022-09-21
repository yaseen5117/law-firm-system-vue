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
    <span v-if="isSamplePleading" style="font-size: 15px">
      <i class="fa fa-external-link"></i>
      Click to Download
    </span>
    <span v-else>
      <span
        v-if="
          !(
            invoice.attachment.mime_type == 'image/jpeg' ||
            invoice.attachment.mime_type == 'image/jpg' ||
            invoice.attachment.mime_type == 'image/png'
          )
        "
      >
        <i class="fa fa-external-link"></i>
        Click to Download
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
    </span>
  </a>
</template>

<script>
export default {
  props: ["invoice", "base_url", "folder_name", "isSamplePleading"],
  data() {
    return {};
  },
};
</script>

<style></style>
