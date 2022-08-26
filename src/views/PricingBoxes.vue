<template>
  <div
            class="col-lg-4 col-md-5 mt-3 mt-md-0"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="box ">
              <h3>Feature</h3>
              
              <ul>
                <template v-for="planFree in plans_n_features" :key="planFree.id">
                  <li  v-html="planFree.feature_name"></li>
                </template>
                
              </ul>
            </div>
          </div>
          

          <div
            class="col-lg-2 col-md-5 mt-3 mt-md-0"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="box featured">
              <h3>Free</h3>
              
              <ul>
                <template v-for="planFree in plans_n_features" :key="planFree.id">
                  <li  v-html="planFree.free_plan==''?'&nbsp;':planFree.free_plan"></li>
                </template>
                
              </ul>
              <div class="btn-wrap">
                <a href="#" class="btn-buy">Call to Buy</a>
              </div>
            </div>
          </div>

          <div
            class="col-lg-2 col-md-5 mt-3 mt-md-0"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="box featured">
              <h3>Student</h3>
              
              <ul>
                <template v-for="planFree in plans_n_features" :key="planFree.id">
                  <li  v-html="planFree.student_plan==''?'&nbsp;':planFree.student_plan"></li>
                </template>
                
              </ul>
              <div class="btn-wrap">
                <a href="#" class="btn-buy">Call to Buy</a>
              </div>
            </div>
          </div>

          <div
            class="col-lg-2 col-md-5 mt-3 mt-md-0"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="box featured">
              <h3>Individual Lawyer </h3>
              
              <ul>
                <template v-for="planFree in plans_n_features" :key="planFree.id">
                  <li  v-html="planFree.individual_plan==''?'&nbsp;':planFree.individual_plan"></li>
                </template>
              </ul>
              <div class="btn-wrap">
                <a href="#" class="btn-buy">Call to Buy</a>
              </div>
            </div>
          </div>

          

          <div
            class="col-lg-2 col-md-5 mt-3 mt-md-0"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div class="box featured">
              <h3>Law Firm</h3>
              
              <ul>
                <template v-for="planFree in plans_n_features" :key="planFree.id">
                  <li  v-html="planFree.lawfirm_plan==''?'&nbsp;':planFree.lawfirm_plan"></li>
                </template>
              </ul>
              <div class="btn-wrap">
                <a href="#" class="btn-buy">Call to Buy</a>
              </div>
            </div>
          </div>
</template>

<script>
export default {

}
</script>

<style>

</style>