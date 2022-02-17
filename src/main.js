import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import VueUploadComponent from 'vue-upload-component'

createApp(App).use(router).use(Notifications).use('file-uploadxx', VueUploadComponent).mount('#app')

