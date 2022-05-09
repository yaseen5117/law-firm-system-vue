<template>
  <Sidebar
    v-model:visible="visibleLeft"
    class="p-sidebar-sm"
    :dismissable="false"
    :modal="false"
  >
    <div v-show="!horizontalView && !editView">
      <ul class="list-group">
        <li
          v-for="(
            attachment, index_attachment
          ) in petition_index_details.attachments"
          :key="attachment"
          :class="activePage == index_attachment + 1 ? 'active' : ''"
          class="list-group-item"
          @click="scrollIntoView(index_attachment + 1)"
          style="cursor: pointer"
        >
          {{ index_attachment + 1 }}
        </li>
      </ul>
    </div>
  </Sidebar>

  <div class="sidebarswitch">
    <button
      v-tooltip="'Show Page Numbers'"
      class="btn sidebar-btn"
      @click="visibleLeft = true"
    >
      <i class="fa fa-angle-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: ["petition_index_details"],
  data() {
    return {
      visibleLeft: false,
      horizontalView: false, //it will show vertical images by default
      editView: false,
      activePage: null,
    };
  },
  methods: {
    scrollIntoView(id) {
      const yOffset = -200;
      const element = document.getElementById("image-container-" + id);
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      //document.getElementById("image-container-" + id).style.border="solid 1px red"
      this.activePage = id;
    },
  },
};
</script>

<style>
</style>