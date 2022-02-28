<template>
  <section id="breadcrumbs" class="breadcrumbs">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <h2 v-if="title">{{ title }}</h2>
          
        
        <ol v-if="!hideBreadCrumbs" style="font-size:12px">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/petitions">Case Files</router-link></li>
          <li>Case Details</li>
        </ol>
      </div>
    </div>
    <div class="container">
        <div style="font-size:12px" v-if="petition">( 
            <span><strong>Case Title:</strong> {{petition? petition.title :'Loading'}},</span>
            <span><strong>Case #:</strong> {{petition ?petition.writ_number :''}},</span>
            <span><strong>Client Name:</strong> {{petition.petitioner_names}}</span>
            <span><strong>Court:</strong> {{petition? petition.court.title:''}}</span> )
          </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["title", "petition","hideBreadCrumbs"],
};
</script>

<style>
</style>