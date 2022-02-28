import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import Home from '../views/Home.vue'
import CaseFile from '../views/CaseFile.vue'
import CaseDetail from '../views/CaseDetail'
import PetitionIndexDetails from '../views/petition-index/PetitionIndexDetails'
import CreatePetition from '../views/petitions/CreatePetition'
import Login from '../views/Auth/Login'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }, 
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard
  },      
  {
    path: '/petitions',
    name: 'Petitions',    
    component: CaseFile
  },

  {
    path: '/petitions/create',
    name: 'create-petition',    
    component: CreatePetition
  },

  {
    path: '/petitions/edit/:id',
    name: 'edit-petition',    
    component: CreatePetition
  },

  {
    path: '/petitions/:id',
    name: 'case-detail',    
    component: CaseDetail
  },

  {
    path: '/petition-index-details/:id',
    name: 'petition-index-details',    
    component: PetitionIndexDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
