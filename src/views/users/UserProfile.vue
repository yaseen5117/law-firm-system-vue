<template>
  <Dialog
    @hide="afterHideProfile()"
    :dismissableMask="true"
    :modal="true"
    :showHeader="false"
    v-model:visible="display"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '70vw' }"
  >
    <section style="" class="section-padding">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-4">
              <div class="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  class="rounded-circle img-fluid"
                  style="width: 150px"
                />
                <h5 class="my-3">{{ lawyer.user.name }}</h5>
                <p class="text-muted mb-1">
                  <span v-for="role in lawyer.user.roles" :key="role.id">
                    {{ role.name }}
                  </span>
                </p>
                <p class="text-muted mb-4" v-if="lawyer.user">
                  {{ lawyer.user.address ? lawyer.user.address + "," : "" }}
                  {{ lawyer.user.city ? lawyer.user.city + "," : "" }}
                  {{ lawyer.user.province }}
                </p>
                <!-- <div class="d-flex justify-content-center mb-2">
                  <button type="button" class="btn btn-primary">Follow</button>
                  <button type="button" class="btn btn-outline-primary ms-1">
                    Message
                  </button>
                </div> -->
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card mb-4">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-4">
                    <p class="mb-0">Full Name</p>
                  </div>
                  <div class="col-sm-8">
                    <p class="text-muted mb-0">{{ lawyer.user.name }}</p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-4">
                    <p class="mb-0">Email</p>
                  </div>
                  <div class="col-sm-8">
                    <p class="text-muted mb-0">{{ lawyer.user.email }}</p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-4">
                    <p class="mb-0">CNIC</p>
                  </div>
                  <div class="col-sm-8">
                    <p class="text-muted mb-0">{{ lawyer.user.cnic }}</p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-4">
                    <p class="mb-0">Phone</p>
                  </div>
                  <div class="col-sm-8">
                    <p class="text-muted mb-0">{{ lawyer.user.phone }}</p>
                  </div>
                </div>
                <hr />

                <div class="row">
                  <div class="col-sm-4">
                    <p class="mb-0">Company Name</p>
                  </div>
                  <div class="col-sm-8">
                    <p class="text-muted mb-0">
                      {{ lawyer.user.company_name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="card mb-4 mb-md-0">
                  <div class="card-body">
                    <p class="mb-4">Petitions Status</p>
                    <p class="mb-1" style="font-size: 0.77rem">
                      Total Petitions
                    </p>
                    <p>{{ lawyerTotalPetitions }}</p>
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-6">
                <div class="card mb-4 mb-md-0">
                  <div class="card-body">
                    <p class="mb-4">
                      <span class="text-primary font-italic me-1"
                        >assigment</span
                      >
                      Project Status
                    </p>
                    <p class="mb-1" style="font-size: 0.77rem">Web Design</p>
                    <div class="progress rounded" style="height: 5px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 80%"
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style="font-size: 0.77rem">
                      Website Markup
                    </p>
                    <div class="progress rounded" style="height: 5px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 72%"
                        aria-valuenow="72"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </Dialog>
</template>

<script>
export default {
  emits: ["afterHideProfileCard"],
  props: ["lawyer", "display", "lawyerTotalPetitions"],
  components: {},

  methods: {
    afterHideProfile() {
      this.$emit(
        "afterHideProfileCard",
        "make variable value false after hide"
      );
    },
  },
};
</script>

<style scoped>
.section-padding {
  padding: 40px 0 10px 0 !important;
}
</style>
