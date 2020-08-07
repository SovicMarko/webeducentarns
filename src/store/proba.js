import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'
import firebase from 'firebase'
import 'firebase/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {


    upisULekciju(kontekst, data) {
      db.collection('lekcije').doc(data.kurs).
      collection('lekcije').doc(data.lekcija).
         collection('sadrzaj').doc().set({
           tip : data.tip,
           sadrzaj : data.sadrzaj,
           pozicija : data.pozicija
       })
      .then(function() {
          window.console.log("Document successfully written!");
          kontekst.dispatch('identifikujLekciju', {kurs: data.kurs, lekcija : data.lekcija});
      })
      .catch(function(error) {
          window.console.error("Error writing document: ", error);
      });
  },

  
},
  modules: {}
})




