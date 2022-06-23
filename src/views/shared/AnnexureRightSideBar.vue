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
          v-if="petition"
          class="list-group-item"
          :to="{
            name: 'case-detail',
            params: { id: petition.id },
          }"
          >Index</router-link
        >

        <router-link
          v-for="petition_index_single in petition_index"
          :key="petition_index_single"
          :class="id == petition_index_single.id ? 'active' : ''"
          class="list-group-item"
          :to="{
            name: url,
            params: { id: petition_index_single.id },
          }"
          >{{ petition_index_single.annexure }}</router-link
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
  props: ["petition_index", "url", "petition"],
  data() {
    return {
      visibleRight: true,
      editView: false,
      id: this.$route.params.id, //this is the id from the browser
    };
  },
};
</script>

<style>
</style>