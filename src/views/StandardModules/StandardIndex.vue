<template>
  <ConfirmPopup />
  <main id="main">
    <page-header :title="page_title" :petition="petition" />
    <nav-components :activeNavPill="module_type" :petition_id="petition.id" />
    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg mt-3">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="table-responsive">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <table class="table table-striped">
                <thead>
                  <th>Description of Documents</th>
                  <th>Date</th>
                  <th>Annexure</th>
                  <th>Page</th>
                  <th
                    width="10%"
                    v-if="this.user.is_admin || this.user.is_lawyer"
                  >
                    Actions
                  </th>
                  <th
                    v-if="this.user.is_admin || this.user.is_lawyer"
                    :class="ShowOnOralArgument ? '' : 'display'"
                  >
                    Image Upload
                  </th>
                </thead>
                <tbody>
                  <tr
                    v-for="(index_data_single, row_index) in index_data"
                    :key="index_data_single.id"
                    class="draggable"
                    draggable="true"
                    @dragstart="startDrag($event, row_index)"
                    @drop="onDrop($event, row_index)"
                    @dragenter.prevent
                    @dragover.prevent
                  >
                    <td>
                      <input
                        v-show="index_data_single.editMode"
                        class="form-control"
                        v-model="index_data_single.document_description"
                        v-on:keyup.enter="editStandardIndex(index_data_single)"
                      />

                      <router-link
                        v-show="!index_data_single.editMode"
                        :to="{
                          name: 'standard-index-details',
                          params: {
                            module_id: index_data_single.id,
                            module_type: module_type,
                          },
                        }"
                        >{{ index_data_single.document_description }}
                      </router-link>
                    </td>
                    <td>
                      <InputMask
                        mask="99/99/9999"
                        class="form-control"
                        type="text"
                        placeholder="dd/mm/yyyy"
                        v-model="index_data_single.date"
                        v-on:keyup.enter="editStandardIndex(index_data_single)"
                        v-show="index_data_single.editMode"
                      />

                      <span v-show="!index_data_single.editMode">{{
                        index_data_single.date
                      }}</span>
                    </td>
                    <td>
                      <input
                        v-show="index_data_single.editMode"
                        class="form-control"
                        v-model="index_data_single.annexure"
                        v-on:keyup.enter="editStandardIndex(index_data_single)"
                      />
                      <span v-show="!index_data_single.editMode">{{
                        index_data_single.annexure
                      }}</span>
                    </td>
                    <td>
                      <input
                        v-show="index_data_single.editMode"
                        class="form-control"
                        v-model="index_data_single.page_info"
                        v-on:keyup.enter="editStandardIndex(index_data_single)"
                      />
                      <span v-show="!index_data_single.editMode">{{
                        index_data_single.page_info
                      }}</span>
                    </td>
                    <td
                      width="17%"
                      v-if="this.user.is_admin || this.user.is_lawyer"
                    >
                      <button
                        class="btn btn-sm btn-warning action-btn"
                        v-show="!index_data_single.editMode"
                        @click="downloadSingleIndex(index_data_single.id)"
                        href="javascript:void"
                        v-tooltip.top="'Download PDF'"
                      >
                        Download
                  </button>
                      <a
                        class="btn btn-sm btn-primary action-btn"
                        v-show="!index_data_single.editMode"
                        @click="index_data_single.editMode = true"
                        href="javascript:void"
                        style="margin-left: 2px"
                        v-tooltip.top="'Edit'"
                      >
                        Edit
                        <!-- <i class="fa fa-edit"></i> -->
                      </a>
                      <a
                        v-show="index_data_single.editMode"
                        class="btn btn-sm btn-warning action-btn"
                        @click="editStandardIndex(index_data_single)"
                        href="javascript:void"
                        style="margin-left: 2px"
                        v-tooltip.top="'Update'"
                      >
                        Update
                        <!-- <i class="fa fa-save"></i> -->
                      </a>

                      <a
                        v-show="index_data_single.editMode"
                        @click="index_data_single.editMode = false"
                        class="btn btn-sm btn-info action-btn"
                        href="javascript:void"
                        style="margin-left: 2px"
                        v-tooltip.top="'Cancel'"
                      >
                        Cancel
                        <!-- <i class="fa fa-remove"></i> -->
                      </a>

                      <a
                        class="btn btn-sm btn-danger action-btn"
                        v-show="!index_data_single.editMode"
                        @click="
                          deleteStandardIndex(
                            $event,
                            index_data_single.id,
                            row_index
                          )
                        "
                        href="javascript:void"
                        style="margin-left: 2px"
                        v-tooltip.top="'Delete'"
                      >
                        Delete
                        <!-- <i class="fa fa-trash-o"></i> -->
                      </a>
                    </td>
                    <td
                      v-if="this.user.is_admin || this.user.is_lawyer"
                      :class="ShowOnOralArgument ? '' : 'display'"
                    >
                      <file-upload
                        @afterUpload="getModuleIndexDetails"
                        :type="model_type"
                        :attachmentable_id="index_data_single.id"
                        :compactInlineView="compactInlineView"
                        class="mt-1"
                        :petition_id="petition.id"
                      />
                    </td>
                  </tr>
                  <tr v-if="this.user.is_admin || this.user.is_lawyer">
                    <td>
                      <input
                        class="form-control"
                        v-model="new_standard_index.document_description"
                        v-on:keyup.enter="submitPetitionIndex()"
                        ref="documentDescription"
                      />
                    </td>
                    <td>
                      <InputMask
                        mask="99/99/9999"
                        class="form-control"
                        type="text"
                        placeholder="dd/mm/yyyy"
                        v-model="new_standard_index.date"
                        v-on:keyup.enter="submitPetitionIndex()"
                      />
                    </td>
                    <td>
                      <input
                        class="form-control"
                        v-model="new_standard_index.annexure"
                        v-on:keyup.enter="submitPetitionIndex()"
                      />
                    </td>
                    <td>
                      <input
                        class="form-control"
                        v-model="new_standard_index.page_info"
                        v-on:keyup.enter="submitPetitionIndex()"
                      />
                    </td>
                    <td colspan="2">
                      <button
                        :disabled="saving"
                        @click="submitPetitionIndex()"
                        v-tooltip.top="'Save'"
                        class="btn btn-sm btn-success action-btn"
                      >
                        Save
                        <!-- <i class="fa fa-save"></i> -->
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Services Section -->
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";
import NavComponents from "../Cases/NavComponents.vue";
import PageHeader from "../shared/PageHeader.vue";
import FileUpload from "../petition-index/FileUpload.vue";
import { mapState } from "vuex";

export default {
  components: {
    NavComponents,
    PageHeader,
    FileUpload,
  },
  computed: mapState(["user"]),
  data() {
    return {
      base_url: process.env.VUE_APP_SERVICE_URL,
      page_title: "...",
      petition: {},
      module_type: this.$route.params.module_type,
      petition_id: this.$route.params.petition_id,
      new_standard_index: {},
      index_data: [],
      compactInlineView: "",
      ShowOnOralArgument: "",
      model_type: "",
      saving: false,
    };
  },
  created() {
    this.getCaseDetails();
    this.getModuleIndex();
  },
  methods: {
    //Drag and Drop Functionality for All Standard Modules(OralArgument,CaseLaw,ExtraDocument,Judgement)
    startDrag(event, index) {
      console.log(index);
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("index_id", index);
    },

    onDrop(event, newIndex) {
      var old_index = event.dataTransfer.getData("index_id");
      this.index_data = this.array_move(this.index_data, old_index, newIndex);
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .post(
          this.base_url + "/api/standard_index_data/update_display_order",
          {
            index_data: this.index_data,
            model_type: this.model_type,
          },
          { headers }
        )
        .then((response) => {})
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    //Drag and Drop Functionality
    getCaseDetails() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(this.base_url + "/api/petitions/" + this.petition_id, { headers })
        .then((response) => {
          this.petition = response.data.petition;

          console.log(this.petition);
        })
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },
    getModuleIndex() {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };
      axios
        .get(
          this.base_url + "/api/" + this.module_type + "/" + this.petition_id,
          { headers }
        )
        .then((response) => {
          this.index_data = response.data.index_data;
          this.page_title = response.data.page_title;
          this.compactInlineView = response.data.compactInlineView;
          this.ShowOnOralArgument = response.data.ShowOnOralArgument;
          this.model_type = response.data.model_type;
          console.log(this.index_data);
        })
        .catch((error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: "Something went wrong!",
            text: error.response.data.message,
          });
        });
    },

    submitPetitionIndex() {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };
        this.saving = true;
        this.new_standard_index.petition_id = this.petition_id;
        axios
          .post(
            this.base_url + "/api/" + this.module_type,
            this.new_standard_index,
            {
              headers,
            }
          )
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                this.saving = false;
                this.new_standard_index = {};
                setTimeout(() => {
                  this.$refs.documentDescription.focus();
                }, 0);
                this.getModuleIndex();
              }
            },
            (error) => {
              this.saving = false;
              console.log(error.response.data);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.message,
              });
            }
          );
      }
    },
    editStandardIndex(standardIndexToUpdate) {
      if (true) {
        var headers = {
          Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .post(
            this.base_url + "/api/" + this.module_type,
            standardIndexToUpdate,
            {
              headers,
            }
          )
          .then(
            (response) => {
              if (response.status === 200) {
                this.$notify({
                  type: "success",
                  title: "Success",
                  text: "Saved Successfully!",
                });
                standardIndexToUpdate.editMode = false;
              }
            },
            (error) => {
              console.log(error.response.data);
              this.$notify({
                type: "error",
                title: "Something went wrong!",
                text: error.response.data.message,
              });
            }
          );
      }
    },
    deleteStandardIndex(event, moduleId, row_index) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Do you want to Delete?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Delete",
        acceptClass: "p-button-danger",
        rejectClass: "p-button-primary",
        rejectLabel: "Cancel",
        accept: () => {
          var headers = {
            Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
          };

          axios
            .delete(
              this.base_url + "/api/" + this.module_type + "/" + moduleId,
              {
                headers,
              }
            )
            .then(
              (response) => {
                if (response.status === 200) {
                  this.$notify({
                    type: "success",
                    title: "Success",
                    text: "Deleted Successfully!",
                  });
                  //this.getCaseDetails()
                  this.index_data.splice(row_index, 1); //removing record from list/index after deleting record from DB
                }
              },
              (error) => {
                console.log(error.response.data);
                this.$notify({
                  type: "error",
                  title: "Something went wrong!",
                  text: error.response.data.message,
                });
              }
            );
        },
        reject: () => {
          this.$confirm.close();
        },
      });
    },
    async downloadSingleIndex(index_id) {
      var headers = {
        Authorization: `Bearer ` + localStorage.getItem("lfms_user"),
      };

      await axios
        .post(
          this.base_url + "/api/download_single_petition_index_pdf",
          { id: index_id, model: this.module_type },
          {
            headers,
          }
        )
        .then(
          (response) => {
            if (response.status === 200) {
              console.log("response: ", response);
              const link = document.createElement("a");
              link.href = response.data.file_path;
              link.target = "_blank"; // This will open the link in a new tab
              //link.download = "Petition_index.pdf"; // Set a suggested file name

              // Trigger a click event on the link to initiate the download
              link.click();

              // Clean up the link element
              document.body.removeChild(link);

              this.$notify({
                type: "success",
                title: "File Downloaded SuccessFully",
              });
            }
          },
          (error) => {
            console.log(error.response.data);
            this.$notify({
              type: "error",
              title: "Something went wrong!",
              text: error.response.data.message,
            });
          }
        );
    },
  },
  mounted() {
    console.log("Case Details Component Mounted");
  },
  updated() {
    document.title = this.page_title;
  },
};
</script>

<style></style>
