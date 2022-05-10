<template>
  <Sidebar
    v-model:visible="visibleRight"
    position="right"
    class="p-sidebar-sm"
    :dismissable="false"
    :modal="false"
  >
    <div @show="!editView">
      <ul class="list-group">
        <router-link
          v-for="index_data_single in module_index_data"
          :key="index_data_single"
          :class="module_id == index_data_single.id ? 'active' : ''"
          class="list-group-item"
          :to="{
            name: 'standard-index-details',
            params: {
              module_id: index_data_single.id,
              module_type: module_type,
            },
          }"
          >{{ index_data_single.annexure }}</router-link
        >
      </ul>
    </div>
  </Sidebar>
  <div class="sidebarindexswitch">
    <button
      v-tooltip="'Show Annexsures'"
      class="btn sidebar-btn"
      @click="visibleRight = true"
    >
      <i class="fa fa-angle-left"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: ["module_index_data"],
  data() {
    return {
      module_type: this.$route.params.module_type,
      module_id: this.$route.params.module_id,
      visibleRight: true,
      editView: false,
    };
  },
};
</script>

<style>
</style>