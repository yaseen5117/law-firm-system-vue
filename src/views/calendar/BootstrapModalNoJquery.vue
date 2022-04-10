<template>
  <!-- The Modal -->
  <div class="bootstrap-modal-no-jquery">
    <div class="modal" id="myModal" style="    background: #2c49646b;">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">{{title}} Event</h4>
            <button
            @click="closeModal"
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <form @submit.prevent="saveChanges" action="">
              <div class="form-group">
                <label for="">Date</label>
                <InputMask
                    :class="'form-control'"
                      v-model="petition_hearing_event.hearing_date"
                      v-on:keyup.enter="submitPetitionIndex()"
                      mask="99/99/9999"
                      aria-placeholder=""
                      placeholder="dd/mm/yyyy "
                    />
                
              </div>

              <div class="form-group form-group-dropdown">
                
                <label for="">Case</label>
                <Dropdown v-model="petition_hearing_event.petition_id" 
                
                :options=2"petitions" 
                optionLabel="case_no" 
                class="form-control"
                optionValue="id" 
                placeholder="Select a Case" 
                :filter="true" 
                :showClear="true" 
                appendTo="self"
                required
                filterPlaceholder="Find by Case No "
                v-bind:class="{                   
                  'error-boarder': v$.petition_hearing_event.petition_id.$error,
                }"
                @blur="v$.petition_hearing_event.petition_id.$touch"
                />
                <span
                    v-if="v$.petition_hearing_event.petition_id.$error"
                    class="errorMessage"
                >Case field is required.
                </span>
               
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
            <!-- <button @click="gotoLink('petitions/'+petition_hearing_event.petition_id)"  >Open Case File</button> -->
            <button type="button" :disabled="saving_event" class="float-lg-left btn btn-danger btn-sm " v-show="petition_hearing_event.id" @click="deleteEvent(petition_hearing_event.id)">Delete Event</button>

            <button type="button" :disabled="saving_event" class="btn btn-primary btn-sm" @click="saveChanges">
              {{title}} Event
            </button>
            <button type="button"  :disabled="saving_event" class="btn btn-secondary btn-sm" @click="closeModal">
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
import moment from 'moment';
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  props: ["selected_date","eventToUpdateProp","title"],
  setup() {
      return {
        v$: useVuelidate(),
      };
    },
  data(){
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      title : this.title,
      petition_hearing_event:{
        hearing_date:this.eventToUpdateProp && this.eventToUpdateProp.extendedProps? this.dateTime(this.eventToUpdateProp.extendedProps.hearing_date) :this.selected_date,
        petition_id:this.eventToUpdateProp && this.eventToUpdateProp.extendedProps? this.eventToUpdateProp.extendedProps.petition_id : "",
        hearing_summary:this.eventToUpdateProp && this.eventToUpdateProp.extendedProps? this.eventToUpdateProp.extendedProps.hearing_summary : "",
        id:this.eventToUpdateProp ? this.eventToUpdateProp.id : null,
        
      },
      petitions:  [],
      saving_event: false,
    }
  },
  validations() {
    return {      
        petition_hearing_event: {
          petition_id: { required },  
        }       
    };
  },
  watch: {
    eventToUpdateProp: function(newVal, oldVal) { // watch it
          console.log('Prop changed: ', newVal, ' | was: ', oldVal)
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
      this.saving_event = true;
      this.savePetitionHearing();
    },


    deleteEvent(id) {
      
      if (confirm("Do you really want to delete?")) {
        this.saving_event = true;
        var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .delete(this.base_url + "/api/petition_hearing/" + id, {
            headers,
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Deleted Successfully!",
                });
                //this.getUsers()
                this.closeModal();
                this.$emit("triggerGetEvents");
              }
            },
            (error) => {
              this.saving_event = false;
              console.log(error.response.data.error);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.error,
              });
            }
          );
      }
    },

    
    dateTime(value) {
      return moment(value).format('DD-MM-YYYY');
    },

    savePetitionHearing() {
      this.v$.$validate();
      if (!this.v$.$error) { 
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
          this.saving_event = false;
          this.closeModal();
          this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Event saved Successfully!",
                });
          
        })
        .catch((error) => {
          console.log(error);
          this.saving_event = false;
        });
      }else{
        this.saving_event = false;
      }
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
            this.petition_hearing_event.petition_id = this.eventToUpdateProp && this.eventToUpdateProp.extendedProps? this.eventToUpdateProp.extendedProps.petition_id : "";                             
          })
          .catch((error) => {
            this.saving_event = false;
            console.log(error);
          });      
    },
    gotoLink(path) {
      alert(path)
      this.$router.push({ path: path  });
    }

    
  },
};
</script>

<style scoped>
/* Override default value of 'none' */
.modal {
  display: block;
}
.error-boarder {
  border: 1px solid red;
}
</style>