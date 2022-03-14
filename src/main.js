import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import VueUploadComponent from 'vue-upload-component'
import store from './store'
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
//app.component("hello-world", HelloWorld);


createApp(App).use(store).use(router).use(Notifications).use('file-upload', VueUploadComponent).component('datepicker',Datepicker).mount('#app')

