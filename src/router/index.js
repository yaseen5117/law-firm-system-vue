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
  {
    path: '/petition-reply-details/:id',
    name: 'petition-reply-details',    
    component: PetitionReplyDetails,
    meta: { 
      auth: true ,
    },
  }

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
