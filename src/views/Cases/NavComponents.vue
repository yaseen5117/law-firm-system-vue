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
            <button
              class="nav-link active"
              onclick="document.location='case_details'"
              id="retition"
              data-bs-toggle="tab"             
            >
              Petition
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              onclick="document.location='replies.html'"
              id="replies"
              data-bs-toggle="tab"             
            >
              Replies
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"             
            >
              Order Sheets
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"              
            >
              Prayers
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"              
            >
              CM’s
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
             
            >
              Naqal Forms
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              
            >
              Talbana
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              
            >
              Case Laws
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              
            >
              Extra Docs
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              
            >
              Oral Arguments
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
             
            >
              Synopsis
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              
            >
              Judgment
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
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

export default {

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

section {
  padding: 40px 0 !important;
  overflow: hidden !important;
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