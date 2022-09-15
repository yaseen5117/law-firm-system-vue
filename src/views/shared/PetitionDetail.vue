<template>
  <h6>
    <u
      >BEFORE THE
      {{ petition.court ? petition.court.title : "Court NA" }}
    </u>
  </h6>
  <p>
    <strong v-tooltip.top="petition.type ? petition.type.title : ''">{{
      petition.petition_standard_title
    }}</strong>
  </p>
  <p class="line_height">{{ petition.petitioner_names }}</p>
  <p>VERSUS</p>
  <p class="line_height">{{ petition.opponent_names }}</p>
  <!-- <p class="line_height">
                {{ petition.title }}
              </p> -->
  <p v-if="showIndex">
    <u><strong>INDEX</strong></u>
  </p>
</template>

<script>
export default {
  props: ["petition", "showIndex"],
};
</script>

<style></style>
