<template>
  <!-- ======= tab using nav component ======= -->

  <div class="container mrgn-top">
    <div class="row">
      <div class="col-12">       
        <ul 
          style="font-size:12.5px"
          class="nav nav-tabs nav-paginator"
          data-paginator-item-count="6"
          data-paginator-buttons-class="nav-link"
        >
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
              Petition
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
              :class="activeNavPill == 'prayer' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab"              
            >
              Prayer
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              :class="activeNavPill == 'cm' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab"              
            >
              CM’s
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              :class="activeNavPill == 'naqal-form' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab"
             
            >
              Naqal Forms
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              :class="activeNavPill == 'talbana' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab"
              
            >
              Talbana
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              :class="activeNavPill == 'case-law' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab"
              
            >
              Case Laws
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              :class="activeNavPill == 'ex-doc' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab"
              
            >
              Extra Docs
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              :class="activeNavPill == 'oral-orgue' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab"
              
            >
              Oral Arguments
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              :class="activeNavPill == 'synopsis' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab"
             
            >
              Synopsis
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              :class="activeNavPill == 'judgement' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab"
              
            >
              Judgment
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              :class="activeNavPill == 'other' ? 'active' : ''"
              id="contact-tab"
              data-bs-toggle="tab"
              
            >
            
              Others
            </button>
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
.nav-pills .nav-link {
  background-color: #f2f6f9;
  color: black;
  margin: 2px !important;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #0d6efd;
}



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