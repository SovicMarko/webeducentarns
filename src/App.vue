<template>
  <div id="app">
    <header v-bind:class="{ stranicaPrijava : !prijavljenKorisnik }">
      <div id="header-main" >
          <router-link to="/">
            <div id="logo">
              <img src="img/logo-e-plavo1-belo.png" alt="" srcset="" class="image">
              <h3>Web programiranje i dizajn </h3> 
              <h4>Edukativni Centar</h4>
            </div>
          </router-link>
          <div id="right-menu" v-if="prijavljenKorisnik">
            <!-- <a href="" class="btn"><span class="glyphicon glyphicon-user"></span> Registracija</a>
            <a href="" class="btn"><span class="glyphicon glyphicon-log-in"></span> Prijava</a> -->
            <button  
              v-on:click="odjava" 
              class="btn btn-primary dugme-odjava">
              <span class="glyphicon glyphicon-log-out"></span> 
              <span class="text-odjava">Odjava</span>
            </button>
          </div>
         
      </div>
    </header>
    <app-header class="sticky"/>
    <!-- <transition name="moveUp"> -->
      <!-- <transition appear name="slide" mode="in-out"> -->
      <transition v-bind:name="vrstaTranzicije">
        <router-view/>
      </transition>
      <!-- </transition> -->
    <!-- </transition> -->
  </div>
</template>


<script>
    import AppHeader from './components/AppHeader.vue'
    import firebase from 'firebase'
    // import AsideLinks from './components/AsideLinks.vue'
   
    export default {
      name: 'app',
      data : function () {
        return {
            vrstaTranzicije : ''
        }
      },
      components: {
        AppHeader, 
      },
      computed: {
         prijavljenKorisnik : function() {
           return this.$store.state.korisnikPrijavljen;
         },
      },
      methods: {
        odjava: function() {
          let self = this;
          firebase
            .auth()
            .signOut()
            .then(function() { 
              self.$router.push('/');
              self.$store.commit('odjavaKorisnika');
              self.$store.commit('ukloniAdminPristup');
              self.$store.commit('podaciKorisnikaBrisanje');
              self.$store.commit('adminListaKorisnikaCiscenje');
            }).catch(function(error) {
              alert(error)
            })  
        }
      },
      created: function () {
      
      },
      watch: {
        $route (to, from){  
            if (to.name == "lekcija" && from.name == "pocetna") {
                this.vrstaTranzicije = "izlaz"
            } 
            else if (to.name == "pocetna" && from.name == "lekcija") {
              this.vrstaTranzicije = "ulazpocetne"
            } 
            else if (to.name == "radovi" && from.name == "lekcija" ) {
                  if(window.scrollY < 80) {
                    this.vrstaTranzicije = "slajdlevo";
                  }
                  else this.vrstaTranzicije = ""
            } 
            else if ((to.name == "lekcija" && from.name == "radovi") ||
                     (to.name == "pocetna" && from.name == "radovi")) {
              this.vrstaTranzicije = "slajddesno";
            }


            else if (to.name == "pocetna" && from.name == "radovi") {
              this.vrstaTranzicije = "ulazpocetne"
            }
            
            else {
              this.vrstaTranzicije = ""
            }            
        }
      }
    }
   
</script>

  
<style>

pre {
  width: 90%;
  margin: auto;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 0px;
  background-color: rgb(25, 34, 53);
  color: rgb(171, 178, 191);
}

.mc-tag {
  color: rgb(224,108,117);
}
.mc-atr {
  color: rgb(209, 154, 102);
}
.mc-val {
  color:rgb(152, 195, 121);
}

@media only screen and (max-width: 1440px) {
  pre {
    font-size: 16px;
  }
}

@media only screen and (max-width: 720px) {
  pre {
    width: 100%;
  }
}


.sticky {
    position: sticky;
    top: 0;
    z-index: 1000;
    -webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.55);
    -moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.55);
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.55);
  }
  html {
    scroll-behavior: smooth;
   
  }
  body {
    overflow-x: hidden;
  }
  * {
    /* outline: 1px dashed green; */
    box-sizing: border-box;
  } 

  header a, header a:hover, header a:active {
    text-decoration: none !important;
    color: inherit;
  }



  #logo {
    width: 370px;
    color: gainsboro;
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
    cursor: pointer;
     transition: all 1s;
  }

  #logo:hover {
    color: white;
  }

  .dugme-odjava {
    background-color: #294d86;
    margin: 5px 10px;
  }

  #header-main {
      padding: 0px 20px;
      padding-top: 1px;
      height: 80px;
      background-color: #1a2947;
      color: white;
      position: relative;
      z-index: 1;
       transition: all 1s;
  }

  #right-menu {
    color: gainsboro;
    width: 230px;
    position: absolute;
    top: 10px;
    right: 10px;
    text-align: right;
  }

  #right-menu a:hover {
    background-color: gainsboro;
  }

  p {
      font-size: 18px;
      margin: 5px 0px;
      text-align: justify;
      text-indent: 20px;
  }

  @media only screen and (max-width: 1440px) {
    p {
      font-size: 16px;
    }
  }
  code {
      color: crimson;
      background-color: #f1f1f1;
      font-size: 105%;
  }
  .navbar {
      background-color: #294d86;
      border-radius: 0px;
      border: 0px;
      position: sticky;
      top: 0px;
      left: 0px;
      z-index: 1;
      margin-bottom: 0px;
  }

  .navbar-inverse .navbar-nav>li>a {
      color: #f9f9b9;
  }

  
  

  header {
    text-align: left;
    transition: all 1s;
  }
  header img {
    float: left;
    width: 55px;
    margin-right: 20px;
     transition: all 1s;
  }
  header h3 {
    margin-top: 10px;
  }
  header h3, h4 {
    font-weight:lighter;
    transition: all 0.4s;
  }

  header .glyphicon {
    margin-right: 10px;
  }

  .stranicaPrijava {
    text-align: center ;
    
  }
  .stranicaPrijava #header-main {
    height: 330px;
     overflow: hidden;
  }

  .stranicaPrijava #logo {
    margin: auto;
    margin-top: 70px;
  }

  .stranicaPrijava #logo img {
    width: 100px;
    float: none;
  }

  .stranicaPrijava  h3 {
    margin-top: 30px;
    font-size: 30px;
  }
  .stranicaPrijava h4 {
    margin-top: 15px;
    font-size: 20px;
  }

  /* Main header Responsive*/
  @media only screen and (max-width: 515px) {
     header {
       color: white;
     }
     header  h3 {
        padding-top:5px ;
        font-size: 19px;
      }
      header h4 {
        font-size: 15px;
      }
  }


  @media only screen and (max-width: 460px) {
      #logo {
        width: 90%;
      }
      .dugme-odjava {
        /* font-size: 10px; */
      }
       header  h3 {
        padding-top:6px ;
        font-size: 17px;
      }
      header h4 {
        font-size: 13px;
      }
      
  }

  @media only screen and (max-width: 420px) {
    .text-odjava {
      display: none;
    }
    .dugme-odjava .glyphicon {
      margin-right: 0px;
    }
  }


  @media only screen and (max-width: 375px) {
    header img {
      margin-right: 15px;
    }
  }
  
  /* Stranica prijava RESPONSIVE */


  
  @media only screen and (max-width: 420px) {
      .stranicaPrijava #header-main {
        padding: 1px;
        height: 250px;
       
      }
      .stranicaPrijava #logo {
        width: 90%;
        margin-top: 7%;
      }
      .stranicaPrijava  h3 {
        margin-top: 7%;
        font-size: 25px;
      }
      .stranicaPrijava h4 {
        font-size: 20px;
      }
  }


 






  .slajddesno-leave-active,
  .slajddesno-enter-active,
  .slajdlevo-leave-active,
  .slajdlevo-enter-active {
    position: absolute;
    width: 100%;
    transition: all 1s;
  }

  .slajddesno-enter-active aside {
    top: -130px !important;
  }

  .slajdlevo-leave-active aside {
    top: -130px !important;
  }

  .slajddesno-enter {
    opacity: 0;
    transform: translateX(-100%);
    
  }
  .slajdlevo-enter {
    opacity: 0;
    left: 100%;
  }

  .slajddesno-enter-to,
  .slajdlevo-enter-to {
   opacity: 1;
   left: 7px;
  }

  .slajddesno-leave,
  .slajdlevo-leave {
     left: 7px;
  }


  .slajddesno-leave-to {
    opacity: 0;
    left: 100%;
  }

  .slajdlevo-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }

  /* .izlaz-enter-active, */
  .izlaz-leave-active {
    position: absolute;
    left: 100%;
    width: 100%;
    /* left: 7px; */
    /* left: 19%; */
    transition: all 1s;
  }

  /* .izlaz-enter, */
  .izlaz-leave-to {
    opacity: 0;
    
  }
  .izlaz {
    position: absolute;
    
  }

  .ulazpocetne-enter-active {
    position: absolute;
    width: 100%;
    /* left: 19%; */
    transition: all 1s;
  }
  .ulazpocetne-enter {
    opacity: 0;
    transform: translateY(-30%);
  }
/* 
  .moveUp-enter-active {
    animation: fadeIn 1s ease-in;
  } */
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  

  @media only screen and (max-width: 1100px) {
      .sticky {
        position: relative;
      }
    }
  
  /* @media only screen and (max-width: 680px) {
    #header-main h2 {
      font-size: 25px;
      line-height: 40px;
    }
  }

  @media only screen and (max-width: 470px) {
     #header-main h2 {
      font-size: 15px;
    }
  }

  @media only screen and (max-width: 370px) {
    #header-main h2 {
      font-size: 12px;
    }
  } */











  .mt-1  { margin-top:  1px; }
  .mt-5  { margin-top:  5px; }
  .mt-10 { margin-top: 10px; }
  .mt-15 { margin-top: 15px; }
  .mt-20 { margin-top: 20px; }
  .mt-25 { margin-top: 25px; }
  .mt-30 { margin-top: 30px; }
  .mt-40 { margin-top: 40px; }
  .mt-50 { margin-top: 50px; }


  .mb-5 { margin-bottom: 5px;}

  .image-responsive-50 {
    max-width: 50%;
  }

  @media only screen and (max-width: 720px) {
    .image-responsive-50 {
      max-width: 90%;
    }
  }

</style>
