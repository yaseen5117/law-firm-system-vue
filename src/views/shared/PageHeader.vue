<template>
<Transition name="slide-fade">

  <section id="breadcrumbs" class="breadcrumbs" v-if="!hide">
    <div class="container" >
      <div class="d-flex justify-content-between align-items-center">
        <h4 v-if="title">{{ title }}</h4>
          
        
        <ol v-if="!hideBreadCrumbs" style="font-size:12px">
          <li><router-link to="/dashboard">Home</router-link></li>
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
</Transition>
</template>

<script>
export default {
  props: ["title", "petition","hideBreadCrumbs",'hide'],
};
</script>

<style>
</style>