<template>
  <!-- ======= tab using nav component ======= -->

  <div class="container mrgn-top">
    <div class="row">
<div class="col-12">
<ul class="nav nav-tabs">
  <li class="nav-item" role="presentation">
            <router-link
              class="nav-link"
              :class="activeNavPill == 'petition' ? 'active' : ''"
              :to="{
                name: 'case-detail',
                params: { id: this.$route.params.id },
              }"
              id="petition"                           
            >
              Petitions
            </router-link>
          </li>
          <li class="nav-item" role="">
            <router-link
              class="nav-link"    
              :class="activeNavPill == 'reply' ? 'active' : ''"
              :to="{
                name: 'petition-reply-parents',
                params: { id: this.$route.params.id },
              }"                  
              id="replies"
                          
            >
              Replies
            </router-link>
          </li>
           <li class="nav-item" role="presentation">
            <router-link
              class="nav-link"    
              :class="activeNavPill == 'order-sheet' ? 'active' : ''"
              :to="{
                name: 'petition-order-sheets-index',
                params: { petition_id: this.$route.params.id },
              }"                  
              id="replies"
                          
            >
              Order Sheets
            </router-link>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              :class="activeNavPill == 'oral-orgue' ? 'active' : ''"
              id="pral-argument-tab"
              data-bs-toggle="tab"
              
            >
              Oral Arguments
            </button>
          </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Others</a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item"      
              :class="activeNavPill == 'naqal-form' ? 'active' : ''"
              id="naqal-form-tab"
              data-bs-toggle="tab" href="#">Naqal Forms</a>
      </li>
      <li>
        <a class="dropdown-item"
        :class="activeNavPill == 'talbana' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab" href="#">Talbana</a>
      </li>
      <li><a class="dropdown-item"
      :class="activeNavPill == 'case-law' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab" href="#">Case Laws</a></li>
      <!-- <li><hr class="dropdown-divider"></li> -->
      <li><a class="dropdown-item"
       :class="activeNavPill == 'ex-doc' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab" href="#">Extra Docs</a></li>
      <li><a class="dropdown-item"
      :class="activeNavPill == 'synopsis' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab" href="#">Synopsis</a></li>
      <li><a class="dropdown-item"
      :class="activeNavPill == 'judgement' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab" href="#">Judgment</a></li>    
    </ul>
  </li>   
</ul>
</div>
 
    </div>
  </div>
</template>

<script>
import { integer } from '@vuelidate/validators'; 
 
export default { 
 props: {
    activeNavPill: integer
  },   

  mounted(){ 
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', '../../../public/js/bootstrap-nav-paginator.js')
    document.head.appendChild(recaptchaScript)
  }

};
</script>
<style>


h2 span {
  font-size: 16px;
}
.mrgn-top{
  margin-top: 15px;
}

.align-center {
  text-align: center;
}

</style>