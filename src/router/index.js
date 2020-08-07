import Vue from 'vue'
import VueRouter from 'vue-router'

import Kurs from '../views/Kurs.vue'
import Home from '../views/Home.vue'
import Predavac from '../views/Predavac.vue'
import Registracija from "../views/registracija.vue";
import Admin from "../views/Admin.vue";
import Izrada from "../views/Izrada.vue";
import RadoviPolaznika from "../views/RadoviPolaznika.vue";


import firebase from "firebase";
import db from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'pocetna',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/izrada',
    name: 'izrada',
    component: Izrada,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/predavac',
    name: 'predavac',
    component: Predavac,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/registracija',
    name: 'registracija',
    component: Registracija
  },
  {
    path: '/radovi',
    name: 'radovi',
    component: RadoviPolaznika,
    meta: {
      requiresAuth : true
    }
  },
  {
    path: '/:kurs',
    name: 'kurs',
    component: Kurs,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:kurs/:lekcija',
    name: 'lekcija',
    component: Kurs,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]



const router = new VueRouter({
  routes,
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})

router.beforeEach((to,from,next) => {
  if(to.matched.some(record => record.meta.requiresAdmin)) { 
    let user = firebase.auth().currentUser;
    
    db.collection('podaciKorisnika').doc(user.uid).get()
    .then(function(doc) {
      if (doc.data().admin) { next(); } 
      else { next({ path: '/', query: { redirect: to.fullPath }})}
    })

  }
  else if(to.matched.some(record => record.meta.requiresAuth)) {
    let user = firebase.auth().currentUser;

    if(!user){ next({ path: '/', query: { redirect: to.fullPath } })} 
    else { next(); }
  }
  else { next(); }
})

export default router

