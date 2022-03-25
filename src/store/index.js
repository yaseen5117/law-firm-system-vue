import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: {
      
    },
    headers: {},
    products: [],
    supportServices: [],
    servers: [],
    salesStatuses: [],
    customers: [],
    productsInBag: []
  },
  mutations: {
    authUser (state, user) {
      state.user = user;
    },
    loadProducts (state, products) {
      state.products = products;
    },

    loadServers (state, servers) {
      state.servers = servers;
    },
    
    loadSalesStatuses (state, salesStatuses) {
      state.salesStatuses = salesStatuses;
    },
    
    loadBag (state, products) {
      state.productsInBag = products;
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
    removeFromBag(state, productId) {
      var updatedBag = state.productsInBag.filter(item => productId != item.id);
      state.productsInBag = updatedBag;
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
  },
  actions: {


    authUser({ commit }) {
      var headers = { Authorization: `Bearer `+localStorage.getItem("lfms_user") };
      axios.get(process.env.VUE_APP_SERVICE_URL + '/api/user', {headers})
      .then(response => {
        console.log("Loged in user load from Database -->", response.data);
        commit('authUser', response.data);
      }).catch(error=>{
        commit('authUser', null);
      })
          
    },

    loadProducts({ commit })
    {
      var headers = { Authorization: `Bearer `+localStorage.getItem("rezo_customers_user") };
      axios.get(process.env.VUE_APP_SERVICE_URL + '/product', {headers})
      .then(response => {
        console.log("All products from Database -->", response.data.products)
        commit('loadProducts', response.data.products);
      })
    },
    
    loadServers({ commit })
    {
      var headers = { Authorization: `Bearer `+localStorage.getItem("rezo_customers_user") };
      axios.get(process.env.VUE_APP_SERVICE_URL + '/servers', {headers})
      .then(response => {
        console.log("All Servers from Database -->", response.data)
        commit('loadServers', response.data);
      })
    },
    
    loadSalesStatuses({ commit })
    {
      var headers = { Authorization: `Bearer `+localStorage.getItem("rezo_customers_user") };
      axios.get(process.env.VUE_APP_SERVICE_URL + '/sales_information', {headers})
      .then(response => {
        
        console.log("All Sales Info Statuses from Database -->", response.data)
        commit('loadSalesStatuses', response.data);
      })
    },
    

    loadBag({ commit }) {
      
      if (localStorage.getItem("productsInBag")) {
        commit('loadBag', JSON.parse(localStorage.getItem("productsInBag")));
      }
      
    },

    addToBag({ commit }, product) {
      commit('addToBag', product);
    },

    removeFromBag({ commit }, productId) {
      if (confirm('Are you sure you want to remove the item from bag?')) {
        commit('removeFromBag', productId);
      }
    },
    
  },
  modules: {
  }
})
