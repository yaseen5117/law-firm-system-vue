<template>
  <!-- ======= tab using nav component ======= -->

  <div class="container mrgn-top">
    <div class="row">
      <div class="col-12">
        <ul class="nav nav-tabs">
          <li class="nav-item" role="presentation">
            <router-link
              class="nav-link"
              :class="activeNavPill ==module_type ? 'active' : ''"
              :to="{
                name: 'case-detail',
                params: { id: petition_id },
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
                params: { id: petition_id },
              }"
              id="replies"
            >
              Replies
            </router-link>
          </li>
          <li class="nav-item" role="presentation">
            <router-link
              class="nav-link"
              :class="activeNavPill == 'order_sheet' ? 'active' : ''"
              :to="{
                name: 'petition-order-sheets-index',
                params: { petition_id: petition_id },
              }"
              id="replies"
            >
              Order Sheets
            </router-link>
          </li>
          <li class="nav-item" role="presentation">
            <router-link
              class="nav-link"
              :class="activeNavPill == 'oral_arguments' ? 'active' : ''"
              :to="{
                name: 'standard-index',
                params: {
                  petition_id: petition_id,
                  module_type: 'oral_arguments',
                },
              }"
              id="replies"
            >
              Oral Arguments
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
              >Others</a
            >
            <ul class="dropdown-menu" style="position: relative !important;">
              <li>
                <router-link
                  class="dropdown-item"
                  :class="activeNavPill == 'naqal_forms' ? 'active' : ''"
                  id="naqal-form-tab"
                  :to="{
                    name: 'petition-naqal-forms-index',
                    params: { petition_id: petition_id },
                  }"
                  >
                  Naqal Forms
                  </router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :class="activeNavPill == 'talbana' ? 'active' : ''"
                  id="talbana"                  
                  :to="{
                    name: 'petition-talbana-index',
                    params: { petition_id: petition_id },
                  }"
                  >
                  Talbana
                  </router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :class="activeNavPill == 'case_laws' ? 'active' : ''"
                  id="case-law"                                    
                  :to="{
                    name: 'standard-index',
                    params: {
                      petition_id: petition_id,
                      module_type: 'case_laws',
                    },
                  }"                  
                  >
                  Case Laws
                  </router-link
                >
              </li>
              <!-- <li><hr class="dropdown-divider"></li> -->
              <li>
                <router-link
                  class="dropdown-item"
                  :class="activeNavPill == 'extra_documents' ? 'active' : ''"
                  id="extra-docs"
                  :to="{
                    name: 'standard-index',
                    params: {
                      petition_id: petition_id,
                      module_type: 'extra_documents',
                    },
                  }"    
                  >
                  Extra Doc
                  </router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :class="activeNavPill == 'petition_synopsis' ? 'active' : ''"
                  id="petition_synopsis"                  
                  :to="{
                    name: 'petition-synopsis-index',
                    params: { petition_id: petition_id },
                  }"
                  >
                  Synopsis
                  </router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :class="activeNavPill == 'judgements' ? 'active' : ''"
                  id="judgements"
                  :to="{
                    name: 'standard-index',
                    params: {
                      petition_id: petition_id,
                      module_type: 'judgements',
                    },
                  }"
                  >Judgment</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { integer } from "@vuelidate/validators";

export default {
  props: ["activeNavPill", "petition_id"],

  mounted() {},
};
</script>
<style>
h2 span {
  font-size: 16px;
}
.mrgn-top {
  margin-top: 15px;
}

.align-center {
  text-align: center;
}
</style>