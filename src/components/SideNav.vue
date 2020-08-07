<template>
        <div>
            <div class="side-nav" v-bind:class="{ zakacena: jeZakacena, prikazana: stanjePrikazaLekcija }">
              <ul>

                <router-link v-bind:to="{ path: '/' +$route.params.kurs + '/' +item.naziv}" v-for="item in spisak" v-bind:key="item.id"  v-on:click="ukloniRspns">
                  <li v-bind:class="{'aktivna-lekcija' : ($route.params.lekcija == item.naziv)}"> <span v-show="admin">{{item.pozicija}}</span> {{item.naziv}} 
                    <div v-show="admin" class="admin-opcije"> 
                      <span  class="glyphicon glyphicon-trash"  v-on:click="brisanjeLekcije(item.naziv)"> </span>
                      <span  class="glyphicon glyphicon-pencil" v-on:click="pripremaIzmene(item.naziv, item.id, item.pozicija)"></span>
                    </div>
                  </li>
                </router-link>

                <div class="input-group" v-show="admin">
                  <input type="text" class="form-control naziv-lekcije" placeholder="Unesite novu stranicu" v-model="novaLekcija">
                  <input type="text" class="form-control br-lekcije"    placeholder="br" v-model="brLekcije">
                  <div class="input-group-btn">
                    <button class="btn btn-primary" type="submit" v-on:click="potvrda">
                      <i class="glyphicon glyphicon-plus"></i>
                    </button>
                  </div>
                </div>
              </ul>
            </div>
        </div>
</template>









<script>
export default {
  name: 'SideNav',
  props: {
    spisak: Array,
    admin: Boolean
  },
  data: function() {
    return {
      jeZakacena: false,
      jePrikazana: true,
      novaLekcija: "",
      brLekcije: "",
      izmena: false,
      idIzmene: 0
    }
  },
  computed: {
    stanjePrikazaLekcija : function() {
      return this.$store.state.prikazanaListaLekcija;
    },
    proveraSirine : function() {
      if (window.innerWidth > 1100) return true
      else return false;
    }
    
  },
  methods: {
    scroll: function() {
      if (window.scrollY > 80 && window.innerWidth > 1100) {
        this.jeZakacena = true;
      } else this.jeZakacena = false;
    },
    ukloniRspns: function () {
      this.$store.commit('promenaPrikazaLekcija');
    },
    potvrda: function(){
      if (this.izmena) {
        this.$store.dispatch("izmenaNazivaLekcije", 
              { 
                naziv : this.novaLekcija, 
                pozicija: this.brLekcije, 
                id: this.idIzmene,
                kurs: this.$route.params.kurs
              });
      }
      else {
        this.$store.dispatch("kreiranjeLekcije", 
              { 
                naziv : this.novaLekcija, 
                pozicija: this.brLekcije, 
                kurs: this.$route.params.kurs})
      }
      this.reset();
    },
    pripremaIzmene: function(naziv, id, pozicija){
      this.novaLekcija = naziv;
      this.izmena = true;
      this.idIzmene = id;
      this.brLekcije = pozicija;
    },
    brisanjeLekcije: function(naziv){
      this.$store.dispatch('brisanjeLekcije',
            { 
              lekcija: naziv, 
              kurs: this.$route.params.kurs
            });
    },
    reset: function() {
      this.novaLekcija = "";
      this.brLekcije = "";
      this.izmena = false;
      this.idIzmene = 0;
    }
  },
  created: function () {
    window.addEventListener('scroll', this.scroll);
  },
   watch:{
    $route (){

    }
  } 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a, a:hover {
    text-decoration: none;
    color: inherit;
  }
  .side-nav {
    height: 100vh;
    overflow: hidden;
    width: 100%;
    z-index: 0;
    background-color: #ededfd;
    animation: sa-leva 1s;
  }

  .side-nav ul{
    top: 40px;
    position: sticky;
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    padding-top: 0px;
    overflow: auto;
    overflow-x: scroll;
    height: 100%;
  }

  .input-group {
    margin-bottom: 100px;
  }
  
  .side-nav ul::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .4);
      -box-shadow: inset 0 0 6px rgba(0, 0, 0, .4);
      background-color: #CFCFCF
  }
  .side-nav ul::-webkit-scrollbar {
      width: 10px;
      background-color: #F5F5F5
  }
  .side-nav ul::-webkit-scrollbar-thumb {
      background-color: #2C3E50
  }

  .side-nav ul li {
      min-height: 30px;
      font-size: 16px;
      line-height: 30px;
      background-color: #ededfd;
      padding-left: 20px;
      padding-top: 5px;
      padding-bottom: 5px;
      border-bottom: 1px solid gainsboro;
      cursor: pointer;
      transition: background-color 0.5s;
      position: relative;
  }

  .admin-opcije {
    position: absolute;
    right: 0px;
    top: 0px;
    background-color: #ededfd;
    height: 100%;
    transition: background-color 0.5s;
  }

  .aktivna-lekcija {
      background-color:  #294d86 !important;
      color: white;
  }
  .aktivna-lekcija .admin-opcije {
    background-color:  #294d86 !important;
      color: white;
  }
  .side-nav ul li:hover {
      background-color: #1a2947aa;
      color: white;
  }

  .side-nav ul li:hover .admin-opcije {
     background-color: #1a2947;
      color: white;
  }
  .zakacena {
    position: fixed !important;
    top: 50px;
    width: 15%;
  }


  .naziv-lekcije {
    width: 85%;
  }
  .br-lekcije {
    width: 15%;
  }
  .glyphicon-trash, .glyphicon-pencil {
    float: right;
    margin: 10px 5px;
  }



  @media only screen and (max-width : 1640px) {
      .side-nav ul li {
        min-height: 30px;
        font-size: 15px;
        line-height: 30px;
        background-color: #ededfd;
        padding-left: 20px;
        padding-top: 3px;
        padding-bottom: 1px;
        border-bottom: 1px solid gainsboro;
        cursor: pointer;
        transition: background-color 0.5s;
        position: relative;
    }
  }


  @media only screen and (max-width : 1100px) {
    .side-nav {
      display: none;
      height: auto;
    }
    .prikazana {
      display: block !important;
    }
    .side-nav ul{
      background-color: #ededfd;
      width: 100%;
      top: 0px;
      position: absolute;
      margin: 0px;
      padding: 0px;
      overflow: auto;
      overflow-x: hidden;
      height: auto;
    }

    .side-nav li {
      width: 100%;
    }

  }
</style>
