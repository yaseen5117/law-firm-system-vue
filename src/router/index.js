import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import Home from '../views/Home.vue'
import CaseFile from '../views/CaseFile.vue'
import CaseDetail from '../views/CaseDetail'
import PetitionIndexDetails from '../views/petition-index/PetitionIndexDetails'
import CreatePetition from '../views/petitions/CreatePetition'
import Login from '../views/Auth/Login'
import SignUp from '../views/Auth/SignUp'

import PetitionReply from '../views/petition-replies/PetitionReply'
import PetitionReplyDetails from '../views/petition-replies/PetitionReplyDetails'

import UsersList from '../views/users/UsersList'
import PetitionsCalendar from '../views/calendar/PetitionsCalendar'

import PetitionOrderSheetCreateUpdate from '../views/petition-order-sheets/CreateUpdate'
import OrderSheetIndex from '../views/petition-order-sheets/OrderSheetsIndex'
import OrderSheetType from '../views/petition-order-sheets/OrderSheetType'

import PetitionTalbanaCreateUpdate from '../views/petition-talbana/CreateUpdate'
import TalbanaIndex from '../views/petition-talbana/TalbanaIndex'

import PetitionSynopsisCreateUpdate from '../views/petition-synopsis/CreateUpdate'
import SynopsisIndex from '../views/petition-synopsis/SynopsisIndex'

import PetitionNaqalFormCreateUpdate from '../views/petition-naqal-forms/CreateUpdate'
import NaqalFormIndex from '../views/petition-naqal-forms/NaqalFormIndex'

import CreateUser from '../views/users/CreateUser'
import PetitionReplyParent from '../views/petition-replies/PetitionReplyParent'

import StandardIndex from '../views/StandardModules/StandardIndex'
import StandardIndexDetails from '../views/StandardModules/StandardIndexDetails'
 
import GeneralCaseLawIndex from '../views/general-case-laws/GeneralCaseLawIndex'

import CourtList from '../views/courts/CourtList'

import ContactRequestList from '../views/contact-requests/ContactRequestList'

import PetitionTypes from '../views/petition-types/PetitionTypesList'

import ForgotPassword from '../views/Auth/ForgotPassword'

import OpinionIndex from '../views/opinions/OpinionIndex'

import CreateInvoice from '../views/invoices/CreateInvoice'
import Invoices from '../views/invoices/Invoices'

import ContractAndAgreementIndex from '../views/contract-and-agreement/ContractAndAgreementIndex'
import ContractAndAgreementCreateUpdate from '../views/contract-and-agreement/CreateUpdate'
import CreateUpdateLink from '../views/Links/CreateUpdateLink'
import LinkIndex from '../views/Links/LinkIndex'
import GeneralSettings from '../views/settings/GeneralSettings'


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      var isloggedin = localStorage.getItem("lfms_user");
      if (isloggedin) {
        next('/dashboard');
      } else {
        next();
      } 
    }
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
  {
    path: '/petition-order-sheets-edit/:petition_id/:editable_order_sheet_id',
    name: 'petition-order-sheets-edit',    
    component: PetitionOrderSheetCreateUpdate,
    meta: { 
      auth: true ,
    },
  },
  {
    path: '/order-sheet-types',
    name: 'order-sheet-types',    
    component: OrderSheetType,
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
  {
    path: '/petition-talbana-edit/:petition_id/:editable_talbana_id',
    name: 'petition-talbana-edit',    
    component: PetitionTalbanaCreateUpdate,
    meta: { 
      auth: true ,
    },
  },
  //////////////// TALBANA ROUTES /////////////

  //////////////// SYNOPSIS ROUTES /////////////
  {
    path: '/petition-synopsis-index/:petition_id/:synopsis_id?',
    name: 'petition-synopsis-index',    
    component: SynopsisIndex,
    meta: { 
      auth: true ,
    },
  },
  {
    path: '/petition-synopsis-save/:petition_id',
    name: 'petition-synopsis-save',    
    component: PetitionSynopsisCreateUpdate,
    meta: { 
      auth: true ,
    },
  },
  {
    path: '/petition-synopsis-edit/:petition_id/:editable_synopsis_id',
    name: 'petition-synopsis-edit',    
    component: PetitionSynopsisCreateUpdate,
    meta: { 
      auth: true ,
    },
  },
  //////////////// SYNOPSIS ROUTES /////////////

  //////////////// NAQAL FORMS ROUTES /////////////
  {
    path: '/petition-naqal-forms-index/:petition_id/:naqal_form_id?',
    name: 'petition-naqal-forms-index',    
    component: NaqalFormIndex,
    meta: { 
      auth: true ,
    },
  },
  {
    path: '/petition-naqal-forms-save/:petition_id',
    name: 'petition-naqal-forms-save',    
    component: PetitionNaqalFormCreateUpdate,
    meta: { 
      auth: true ,
    },
  },
  {
    path: '/petition-naqal-forms-edit/:petition_id/:editable_naqal_form_id',
    name: 'petition-naqal-forms-edit',    
    component: PetitionNaqalFormCreateUpdate,
    meta: { 
      auth: true ,
    },
  },
  //////////////// NAQAL FORMS ROUTES /////////////

  
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

////////////////GENERAL CASE LAW/////////////
{
  path: '/petition-general-case-law',
  name: 'petition-general-case-law',    
  component: GeneralCaseLawIndex,
  meta: { 
    auth: true ,
  },
}, 
////////////////GENERAL CASE LAW/////////////

//////////////// COURTS /////////////
{
  path: '/courts',
  name: 'courts',    
  component: CourtList,
  meta: { 
    auth: true ,
  },
}, 
//////////////// COURTS /////////////

//////////////// CONTACT REQUEST /////////////
{
  path: '/contact-requests',
  name: 'contact-requests',    
  component: ContactRequestList,
  meta: { 
    auth: true ,
  },
}, 
//////////////// CONTACT REQUEST /////////////

//////////////// PETITION TYPES /////////////
{
  path: '/petition-types',
  name: 'petition-types',    
  component: PetitionTypes,
  meta: { 
    auth: true ,
  },
}, 
//////////////// PETITION TYPES /////////////

//////////////// OPINIONS /////////////
{
  path: '/opinions',
  name: 'opinions',    
  component: OpinionIndex,
  meta: { 
    auth: true ,
  },
}, 
//////////////// OPINIONS /////////////

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
  //Invoices
  {
    path: '/create-invoice',
    name: 'create-invoice',
    component: CreateInvoice,
    meta: { 
      auth: true ,
    },
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: Invoices,
    meta: { 
      auth: true ,
    },
  },
  {
    path: '/invoices/edit/:invoice_id',
    name: 'edit-invoice',    
    component: CreateInvoice,
    meta: { 
      auth: true ,
    },
  },

  //invoices

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
  {
    path: '/users/edit/:id',
    name: 'edit-user',    
    component: CreateUser,
    meta: { 
      auth: true ,
    },
  },
  //Contracts and Agreements
  {
    path: '/contract-and-agreement',
    name: 'contract-and-agreement',
    component: ContractAndAgreementIndex,
    meta: { 
      auth: true ,
    },
  },  
  {
    path: '/create-contract-and_agreement',
    name: 'create-contract-and_agreement',
    component: ContractAndAgreementCreateUpdate,
    meta: { 
      auth: true ,
    },
  },
  {
    path: '/contract-and_agreement/edit/:contract_agreement_id',
    name: 'edit-contract-and_agreement',    
    component: ContractAndAgreementCreateUpdate,
    meta: { 
      auth: true ,
    },
  },
  //Contracts and Agreements

  //Links
  {
    path: '/links',
    name: 'links',
    component: LinkIndex,
    meta: { 
      auth: true ,
    },
  },
  {
    path: '/create-link',
    name: 'create-link',    
    component: CreateUpdateLink,
    meta: { 
      auth: true ,
    },
  },
  {
    path: '/link/edit/:link_id',
    name: 'edit-link',       
    component: CreateUpdateLink,
    meta: { 
      auth: true ,
    },
  },
  //Links

  //General settings
  {
    path: '/settings',
    name: 'settings',
    component: GeneralSettings,
    meta: { 
      auth: true ,
    },
  },
  //General settings
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {
  document.querySelector("#navbar").classList.remove("navbar-mobile");
  document.getElementById("header").style.display = "block";
  var isloggedin= localStorage.getItem("lfms_user");
  //isloggedin= isloggedin.id;
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
