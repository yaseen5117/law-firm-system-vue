<template>
  <!-- The Modal -->
  <div class="bootstrap-modal-no-jquery">
    <div class="modal" id="myModal" style="    background: #2c49646b;">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Add Petition Hearing Event</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <form action="">
              <div class="form-group">
                <label for="">Date</label>
                <input
                  class="form-control"
                  type="text"
                  readonly
                  v-model="petition_hearing_event.hearing_date"
                />
              </div>

              <div class="form-group">
                <label for="">Petition</label>
                <select class="form-control" v-model="petition_hearing_event.petition_id" >
                  <option value="">--Select--</option>
                  <option v-for="petition in petitions"
                        :key="petition.id"
                        :value="petition.id"                         
                      >
                        {{ petition.case_no }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="">Notes</label>
                <textarea
                  class="form-control"
                  type="text"
                  v-model="petition_hearing_event.hearing_summary"
                ></textarea>
              </div>


            </form>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="saveChanges">
              Create Event
            </button>
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["selected_date"],
  data(){
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      petition_hearing_event:{
        hearing_date:this.selected_date,
        petition_id:"1",
        hearing_summary:"",
      },
      petitions: [],
    }
  },
  created() {      
      this.getPetitions();       
    },
  methods: {
    closeModal() {
      this.$emit("close-modal-event");
      
    },
    saveChanges() {
      this.savePetitionHearing();
    },

    savePetitionHearing() {
      let url = this.base_url + "/api/petition_hearing";
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .post(url, this.petition_hearing_event , {
          headers
          
        })
        .then((response) => {
          this.$emit("triggerGetEvents");
          this.closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPetitions() {       
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        var url = this.base_url + "/api/petitions";
        axios
          .get(url, { headers })
          .then((response) => {
            this.petitions = response.data.petitions;                                  
          })
          .catch((error) => {
            console.log(error);
          });      
    },

    
  },
};
</script>

<style scoped>
/* Override default value of 'none' */
.modal {
  display: block;
}
</style>