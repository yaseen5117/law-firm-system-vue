import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import VueUploadComponent from 'vue-upload-component'
import store from './store'
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Tooltip from 'primevue/tooltip';
import InputMask from 'primevue/inputmask';
import AutoComplete from "primevue/autocomplete";
import Calendar from "primevue/calendar";
import Dropdown from 'primevue/dropdown';
import Image from 'primevue/image';
import BlockUI from 'primevue/blockui';
import Sidebar from 'primevue/sidebar';
import ConfirmationService from 'primevue/confirmationservice';
import Dialog from 'primevue/dialog';





//app.component("hello-world", HelloWorld);


createApp(App)
.use(store)
.use(router)
.use(PrimeVue)
.use(Notifications)
.use(ConfirmationService)
.use('file-upload', VueUploadComponent)
.directive('tooltip', Tooltip)
.component('AutoComplete',AutoComplete)
.component('Image',Image)
.component('Dropdown',Dropdown)
.component('datepicker',Datepicker)
.component('BlockUI',BlockUI)
.component('InputMask',InputMask)
.component('Calendar',Calendar)
.component('Sidebar',Sidebar)
.component('Dialog',Dialog)
.mount('#app')

