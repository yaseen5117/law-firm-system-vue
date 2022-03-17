import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import Home from '../views/Home.vue'
import CaseFile from '../views/CaseFile.vue'
import CaseDetail from '../views/CaseDetail'
import PetitionIndexDetails from '../views/petition-index/PetitionIndexDetails'
import CreatePetition from '../views/petitions/CreatePetition'
import Login from '../views/Auth/Login'

import PetitionReply from '../views/petition-replies/PetitionReply'
import PetitionReplyDetails from '../views/petition-replies/PetitionReplyDetails'

import UsersList from '../views/users/UsersList'
import PetitionsCalendar from '../views/calendar/PetitionsCalendar'

import PetitionOrderSheetCreateUpdate from '../views/petition-order-sheets/CreateUpdate'
import OrderSheetIndex from '../views/petition-order-sheets/OrderSheetsIndex'

import PetitionTalbanaCreateUpdate from '../views/petition-talbana/CreateUpdate'
import TalbanaIndex from '../views/petition-talbana/TalbanaIndex'

import CreateUser from '../views/users/CreateUser'
import PetitionReplyParent from '../views/petition-replies/PetitionReplyParent'

import StandardIndex from '../views/StandardModules/StandardIndex'
import StandardIndexDetails from '../views/StandardModules/StandardIndexDetails'
 


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
    component: DashBoard,
    meta: { 
      auth: true ,
    },
  },      
  {
    path: '/petitions',
    name: 'Petitions',    
    component: CaseFile,
    meta: { 
      auth: true ,
    },
  },

  {
    path: '/petitions/create',
    name: 'create-petition',    
    component: CreatePetition,
    meta: { 
      auth: true ,
    },
  },

  {
    path: '/petitions/edit/:id',
    name: 'edit-petition',    
    component: CreatePetition,
    meta: { 
      auth: true ,
    },
  },

  {
    path: '/petitions/:id',
    name: 'case-detail',    
    component: CaseDetail,
    meta: { 
      auth: true ,
    },
  },

  {
    path: '/petition-index-details/:id',
    name: 'petition-index-details',    
    component: PetitionIndexDetails,
    meta: { 
      auth: true ,
    },
  },

  {
    path: '/petition-replies/:id',
    name: 'petition-replies',    
    component: PetitionReply,
    meta: { 
      auth: true ,
    },
  },
  //petition reply routes
  {
    path: '/petition-reply-details/:id',
    name: 'petition-reply-details',    
    component: PetitionReplyDetails,
    meta: { 
      auth: true ,
    },
  },

  ////////////////Order Sheets/////////////
  {
    path: '/petition-order-sheets-index/:petition_id/:order_sheet_id?',
    name: 'petition-order-sheets-index',    
    component: OrderSheetIndex,
    meta: { 
      auth: true ,
    },
  },
  {
    path: '/petition-order-sheets-save/:petition_id',
    name: 'petition-order-sheets-save',    
    component: PetitionOrderSheetCreateUpdate,
    meta: { 
      auth: true ,
    },
  },
  ////////////////Order Sheets/////////////

  //////////////// TALBANA ROUTES /////////////
  {
    path: '/petition-talbana-index/:petition_id/:talbana_id?',
    name: 'petition-talbana-index',    
    component: TalbanaIndex,
    meta: { 
      auth: true ,
    },
  },
  {
    path: '/petition-talbana-save/:petition_id',
    name: 'petition-talbana-save',    
    component: PetitionTalbanaCreateUpdate,
    meta: { 
      auth: true ,
    },
  },
  //////////////// TALBANA ROUTES /////////////

  
  ////////////////Standard Modules for Same Pages/////////////
  {
    path: '/standard-index/:petition_id/:module_type',
    name: 'standard-index',    
    component: StandardIndex,
    meta: { 
      auth: true ,
    },
  },
  {
    path: '/standard-index-details/:module_id/:module_type',
    name: 'standard-index-details',    
    component: StandardIndexDetails,
    meta: { 
      auth: true ,
    },
  },

  ////////////////Standard Modules for Same Pages/////////////



  {
    path: '/petition-reply-parents/:id',
    name: 'petition-reply-parents',    
    component: PetitionReplyParent,
    meta: { 
      auth: true ,
    },
  },

  {
    path: '/petitions-calendar',
    name: 'petitions-calendar',
    component: PetitionsCalendar,
    meta: { 
      auth: true ,
    },
  },
  //users list
  {
    path: '/users',
    name: 'users-list',
    component: UsersList,
    meta: { 
      auth: true ,
    },
  },
  {
    path: '/users/create',
    name: 'create-user',    
    component: CreateUser,
    meta: { 
      auth: true ,
    },
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {
  document.querySelector("#navbar").classList.remove("navbar-mobile");
  var isloggedin= localStorage.getItem("lfms_user");
  if (to.matched.some(record => record.meta.auth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isloggedin) {
      next({ name: 'Login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router
