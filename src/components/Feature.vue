<template>
  <div class="icon-box mt-3" data-aos="fade-up" data-aos-delay="100">
    <i :class="singleFeature.icon"></i>
    <h4 @click="showFeatureRestrictedPopup()">{{ singleFeature.heading }}</h4>
    <p>{{ singleFeature.body_text }}</p>
  </div>
</template>

<script>
export default {
  props: ["singleFeature", "rowIndex"],
};
</script>

<style></style>
