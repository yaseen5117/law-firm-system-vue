<template>
  <div class="testimonial-item">
    <p class="text-muted">
      <i class="bx bxs-quote-alt-left quote-icon-left"></i>
      <span v-show="!singleReview.showMoreOrLessTestimonial2">
        {{ singleReview.review.slice(0, 170)
        }}{{ singleReview.review.length > 170 ? "..." : "" }}
        <span
          v-if="
            !singleReview.showMoreOrLessTestimonial2 &&
            singleReview.review.length > 170
          "
          style="cursor: pointer; color: blue"
          @click="singleReview.showMoreOrLessTestimonial2 = true"
        >
          Show More
        </span>
      </span>
      <span v-show="singleReview.showMoreOrLessTestimonial2">
        {{ singleReview.review }}</span
      >
      <span
        v-show="singleReview.showMoreOrLessTestimonial2"
        style="cursor: pointer; color: blue"
        @click="singleReview.showMoreOrLessTestimonial2 = false"
      >
        Show Less
      </span>
      <i class="bx bxs-quote-alt-right quote-icon-right"></i>
    </p>
    <img
      :src="singleReview.image_src"
      class="testimonial-img rounded-circle shadow-1-strong text-center"
      alt=""
    />
    <h3>{{ singleReview.name }}</h3>
    <h4>{{ singleReview.designation }}</h4>
  </div>
</template>

<script>
export default {
  props: ["singleReview"],
  data() {
    return {
      showMoreOrLessTestimonial2: true,
    };
  },
};
</script>

<style></style>
