<template>
<Transition name="slide-fade">

  <section id="breadcrumbs" class="breadcrumbs" v-if="!hide">
    <div class="container" >
      <div class="d-flex justify-content-between align-items-center">
        <h4 v-if="title">{{ title }}</h4>
          
        <template v-if="!hideBreadCrumbs">

          <ol  style="font-size:12px">
            <li><router-link to="/dashboard">Home</router-link></li>
            <li><router-link to="/petitions">Case Files</router-link></li>
            <li v-if="petition"><router-link :to="{
                                  name: 'case-detail',
                                  params: { id: petition?petition.id:'#' },
                                }">Case File ({{petition.case_no}})</router-link></li>
            
          </ol>
        </template>
      </div>
    </div>
    <div class="container">
        <div style="font-size:12px" v-if="petition">( 
            <span><strong>Case Title:</strong> {{petition? petition.title :'Loading'}},</span>
            <span><strong>&nbsp;Case #:</strong> {{petition ?petition.writ_number :''}},</span>
            <span><strong>&nbsp;Client Name:</strong> {{petition.petitioner_names}},</span>
            <span><strong>&nbsp;Court:</strong> {{petition && petition.court? petition.court.title:''}}</span> )
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