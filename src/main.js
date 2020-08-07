import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase';
import './firebase.js';

Vue.config.productionTip = false

let app;

firebase.auth().onAuthStateChanged(user => {
  if(!app) {
    app = new Vue({
      router,
      store,
      created() {
        if (user) {
              this.$store.commit('prijavaKorisnika');
              this.$store.dispatch('proveraAdminStatusa', user);
          } else {
              // log('User is not logged in.');
        }
      },
      render: h => h(App)
    }).$mount('#app')
  }
})





