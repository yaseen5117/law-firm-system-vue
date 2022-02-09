import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CaseFile from '../views/CaseFile.vue'
import CaseDetail from '../views/CaseDetail'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/case_files',
    name: 'CaseFile',    
    component: CaseFile
  },
  {
    path: '/case_details',
    name: 'CaseDetail',    
    component: CaseDetail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
