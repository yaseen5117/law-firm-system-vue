import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import VueUploadComponent from 'vue-upload-component'
import store from './store'
//app.component("hello-world", HelloWorld);


createApp(App).use(store).use(router).use(Notifications).use('file-uploadxx', VueUploadComponent).mount('#app')

