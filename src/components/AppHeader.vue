<template>
  <div>
    <nav class="navbar navbar-inverse" >
          <div class="container-fluid" v-if="stanjeKorisnika">
              <div class="menu" v-on:click="toggleMenu">
                <span class="glyphicon glyphicon-menu-hamburger"></span>
              </div>
              <div v-bind:class='{menushow : menushow}'>
                 <ul class="nav navbar-nav">
                  <li v-on:click="toggleMenu"><router-link to="/">Početna</router-link></li>
                  <li v-on:click="promenaKursa"><router-link to="/HTML/Uvod u HTML">HTML</router-link></li>
                  <li v-on:click="promenaKursa"><router-link to="/CSS/Uvod u CSS">CSS</router-link></li>
                  <li v-on:click="promenaKursa"><router-link to="/JavaScript/Uvod u JavaScript">JavaScript</router-link></li>
                  <li v-on:click="promenaKursa"><router-link to="/jQuery/Uvod u jQuery">jQuery</router-link></li>
                  <li><router-link to="/izrada">Bootstrap</router-link></li>
                  <li><router-link to="/izrada">Vue.js</router-link></li>
                </ul>
                <ul class="nav navbar-nav navbar-right desno">
                    <li><router-link to="/izrada">Principi dizajna</router-link></li>
                    <li><router-link to="/izrada">Kontrola verzija</router-link></li>
                    <li><router-link to="/izrada">Završni projekat</router-link></li>
                </ul>
                
              </div>
              <div class="menu menu-right" v-on:click="toggleLekcije">
               
                <span class="glyphicon glyphicon-list"></span>
              </div>
          </div>
          
      </nav>
  </div>
  
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'AppHeader',
  props: {
    msg: String
  },
  data: function() {
    return {
      // korisnikPrijavljen: false,
      menushow : true
    }
  },
  computed: {
    stanjePrikazaLekcija : function() {
      return this.$store.state.prikazanaListaLekcija;
    },
    stanjeKorisnika : function(){
      return this.$store.state.korisnikPrijavljen;
    }
  },
  methods: {
    toggleMenu : function () {
      this.menushow = !this.menushow;
      if (this.stanjePrikazaLekcija) {
        this.$store.commit('promenaPrikazaLekcija');
      }
    
    },
    toggleLekcije : function() {
      if (this.menushow == false) {
        this.menushow = true;
      }
      this.$store.commit('promenaPrikazaLekcija');
    },
    promenaKursa: function () {
      this.toggleMenu();
      this.$store.dispatch('identifikujKurs', this.$route.params.kurs);
      this.$store.dispatch('identifikujLekciju',{kurs: this.$route.params.kurs, lekcija: this.$route.params.lekcija});
    }

  },
  watch: {
  
  },
  created() {
    if(firebase.auth().currentUser) {
      this.korisnikPrijavljen = true;
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    * {
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently */
    }
    .navbar {
      position: relative;
    }

    a {
      color: inherit;
      text-decoraton: none;
      display: block;
      width: 100%;
    }

    .menu {
      position: relative;
      color: rgba(223, 223, 223, 1);
      font-size: 30px;
      line-height: 100%;
      height: 50px;
      padding: 8px;
      display: none;
      width: 50px;
    }

    .menu-right {
      position: absolute;
      right: 10px;
      top: 0px;
      
    }
    .desno {
      margin-right: 5px;
    }

    li {
      font-size: 17px;
    }

    li:hover {
      background-color:#2C3E50 ;
    }

    .menu:hover {
      cursor: pointer;
      color: white;
    }

    @media only screen and (max-width: 1100px) {
      .navbar-nav {
        flex-direction: column;
      }
      .nav {
        float: none;
      }
      .navbar-right, .navbar-nav li{
        display: block;
        float: none !important;
       
      }
      .menu {
        display: block;
      }
      .menushow {
        display: none;
      }
      .menu-right {
          right: 8px;
        }
      .menu-right .glyphicon {
          width: 28px;
          top: 1px;
          font-size: 28px;
          overflow: hidden;
        }
    }

    @media only screen and (max-width: 420px) {
       
        
    }
    
</style>
