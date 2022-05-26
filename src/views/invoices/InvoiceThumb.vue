<template>
 
  <a style="margin: 5px" v-if="invoice.attachment" :href="base_url +
                      '/storage/attachments/'+folder_name+'/' + invoice.id +'/'+ invoice.attachment.file_name" target="_blank">
                <img class="img img-thumbnail " width="90" v-if="invoice.attachment" :src=" this.base_url +
                '/storage/attachments/'+folder_name+'/' + invoice.id +'/'+ invoice.attachment.file_name" alt="Image not found">
                </a>
</template>

<script>
export default {
    props:["invoice","base_url",'folder_name'],
    data(){
        return {

        }
    }
}
</script>

<style>

</style>