<template>
<main id="main" class="margintop85">  
      <page-header :title="page_title" :hideBreadCrumbs="true" />       
    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg mt-3">
      <div class="container" data-aos="fade-up">
        <DataTable :value="opinions" :paginator="true" :rows="10"
            dataKey="id" :rowHover="true" v-model:filters="filters" filterDisplay="menu" :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            :globalFilterFields="['client_id','reference_no','issuance_date','subject']" responsiveLayout="scroll">
            <template #header>
                 <div class="flex justify-content-center align-items-center">                    
                     <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                 </div>
            </template>
            <template #empty>
                No customers found.
            </template>
            <template #loading>
                Loading customers data. Please wait.
            </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="client_id" header="Client" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.client_id}}
                </template>                
            </Column> 
            <Column field="reference_no" header="Reference No." sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.reference_no}}
                </template>                
            </Column>  
            <Column field="subject" header="Subject" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.subject}}
                </template>                
            </Column> 
            <Column field="issuance_date" header="Date Of Issuance" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.issuance_date}}
                </template>                
            </Column>  
            <Column field="Action" header="Action" style="min-width: 14rem">
                <template #body="{data}">
                 
                    <Button @click="deleteOpinion(data.id)" icon="pi pi-times" label="Delete" class="p-button-danger p-button-outlined"></Button>
                </template>                
            </Column>    
          
        </DataTable> 
      </div>
    </section>
</main>
 
</template>

<script>
import axios from "axios";
import PageHeader from "../shared/PageHeader.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
//Data table
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';                     //optional for row
import Button from 'primevue/button';
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import InputText from 'primevue/inputtext';
import ConfirmPopup from 'primevue/confirmpopup';

export default {
  components: { PageHeader,DataTable, Column, ColumnGroup, Row, Button, InputText },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
        page_title: 'Opinions',      
        base_url: process.env.VUE_APP_SERVICE_URL, 
        saving: false,        
        opinions: [],
        filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                //'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                'reference_no': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                'subject': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                'issuance_date': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},       
           },
    };
  },  
  created() { 
    this.getOpinionIndex();
  }, 
  methods: {
      getOpinionIndex() {
       var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };
      axios
        .get(
          this.base_url + "/api/opinions",
          {headers}
        )
        .then((response) => {
          this.opinions = response.data.opinions;          
          console.log(this.opinions);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteOpinion(opinionId) {       
            if (confirm("Do you really want to delete?")) {
              var headers = {
          Authorization:
            `Bearer ` + localStorage.getItem("lfms_user"),
        };

        axios
          .delete(this.base_url + "/api/opinions/"+ opinionId, {
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
                //this.getCaseDetails()
                //this.index_data.splice(row_index, 1); //removing record from list/index after deleting record from DB
              }
            },
            (error) => {
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
  }
};
</script>

<style> 
</style>