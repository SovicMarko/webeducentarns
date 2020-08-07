<template>
  <div id='admin'>
      
      <div class="row">
          <div class="col col-xs-12 col-md-8">
              <!-- {{adminListaObuka}} -->
              <div v-for="obuka in adminListaObuka"  v-bind:key="obuka.sifraObuke"
                        class="table-responsive panel panel-primary">
                <AdminTable v-bind:obuka="obuka" v-on:izmenaKorisnika="izmenaKorisnika"></AdminTable> 
            </div>

            
          </div>
          <div class="col col-xs-12 col-md-4">
              <div v-bind:class="{jeZakacena : jeZakacena}">
               <form class="panel panel-primary">

                    <div class="panel panel-success">
                        <h3 class="mt-10"> 
                            <span v-if="izmena"> Izmena </span>
                            <span v-else> Unos </span> 
                            korisnika</h3></div>

                    <div class="form-group">
                        <label for="user">User ID:</label>
                        <input type="text" class="form-control" id="text" v-model="korisnik.id">
                    </div>

                     <div class="form-group">
                        <label for="user">Email:</label>
                        <input type="text" class="form-control" id="text" v-model="korisnik.email">
                    </div>

                    <hr>

                    <div class="form-group">
                        <label for="ime">Ime:</label>
                        <input type="text" class="form-control" id="ime" v-model="korisnik.ime">
                    </div>
                
                    
                    <div class="form-group">
                        <label for="ime">Prezime:</label>
                        <input type="text" class="form-control" id="prezime" v-model="korisnik.prezime">
                    </div>


                    <div class="form-group">
                        <label for="sel1">Kurs</label>
                        <div class="dropdown">
                            <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Šifra obuke: {{korisnik.kurs}}
                            <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li v-for="(obuka,index) in adminListaObuka" v-on:click="izborKursa(obuka.sifraObuke, obuka.nivo)" v-bind:key="index" v-bind:value="obuka.sifraObuke">
                                    {{obuka.sifraObuke}} ({{obuka.nivo}})
                                </li>
                                
                               
                            </ul>
                        </div>
                    </div>


                    <div v-if="korisnik.nivo == 'osnovni'" class="form-group">
                        <label>Bodovi</label><br>

                        <table >
                            <tr>
                                <td>HTML</td>
                                <th><input type="text" class="ocene form-control" v-model="korisnik.ocene[0]"></th> 
                                
                                
                            </tr>
                            <tr>
                                <td>CSS</td>
                                <th><input type="text" class="ocene form-control" v-model="korisnik.ocene[1]"></th>
                                
                            </tr>
                            <tr>
                                <td>JS</td>
                                <th><input type="text" class="ocene form-control" v-model="korisnik.ocene[2]"></th>
                                
                            </tr>
                            <tr>
                                <td>Projekat</td>
                                <th><input type="text" class="ocene form-control" v-model="korisnik.ocene[3]"></th>
                            </tr>
                        </table>
                    </div>

                     <div v-else-if="korisnik.nivo == 'napredni'" class="form-group">
                        <label>Bodovi</label><br>
                        <table >
                            <tr>
                                <td>JavaScript | jQuery</td>
                                <th><input type="text" class="ocene form-control" v-model="korisnik.ocene[0]"></th> 
                              
                                
                            </tr>
                            <tr>
                                <td>Bootstrap | Vue.js</td>
                                <th><input type="text" class="ocene form-control" v-model="korisnik.ocene[1]"></th>
                                
                            </tr>
                            <tr>
                                <td>Projekat</td>
                                <th><input type="text" class="ocene form-control" v-model="korisnik.ocene[2]"></th>
                            </tr>
                        </table>

                    </div>

                    <div class="form-group">
                        <label for="prisustvo">Prisustvo:</label>
                        <input type="text" class="form-control" id="prisustvo" v-model="korisnik.prisustvo">
                        <button class="btn btn-success" v-on:click="korisnik.prisustvo++">+</button>
                    </div>


                    <div class="form-group mt-25">
                        <button type="button" class="btn btn-primary" v-on:click="registracijaKorisnika"> 
                            <span v-if='izmena'> Izmeni </span>
                            <span v-else> Unesi </span>  
                        </button>
                        
                        <button type="button" class="btn btn-danger odustani" v-on:click="restartForme"> Odustani </button>
                    </div>
                    


                </form>
                </div>
          </div>
      </div>
     
  </div>
</template>

<script>
import AdminTable from '@/components/Admin/admin-table.vue'

export default {
    name: 'Admin',
    components : {
        AdminTable
    },
    data: function(){
        return {
            izmena : false,
            korisnik: {
                id: '',
                email : '',
                ime: '',
                kurs: 'XX-XX-XX', // VE-20-01
                nivo: '', // osnovni
                prezime: '',
                oblasti: [],
                ocene: [],
                prisustvo : 0
            },
            jeZakacena : false
        }
    },
    computed: {
        adminListaObuka: function() {
            return this.$store.state.admin_ListaObuka;
        }
    },
    methods: {
        registracijaKorisnika: function () {
          
                this.$store.dispatch("registracijaKorisnika", {
                                id : this.korisnik.id,
                                email : this.korisnik.email,
                                ime: this.korisnik.ime,
                                prezime: this.korisnik.prezime,
                                kurs: this.korisnik.kurs,
                                nivo: this.korisnik.nivo,
                                oblasti : this.korisnik.oblasti,
                                ocene : this.korisnik.ocene,
                                prisustvo: this.korisnik.prisustvo
                            });
            this.restartForme();
        },
        restartForme: function(){
            this.izmena = false;
            this.korisnik = {
                id: '', ime: '', prezime: '',kurs: '', nivo: '',
            }
        },
        izborKursa: function (kurs, nivo) {
            this.korisnik.kurs = kurs;
            this.korisnik.nivo = nivo;
            if (this.korisnik.nivo == 'osnovni') {
                this.korisnik.oblasti = ['HTML','CSS','JavaScript','Projekat'];
                this.korisnik.ocene = [0,0,0,0];
            } else {
                this.korisnik.oblasti = ['JavaScript | jQuery','Bootstrap | Vue.js', 'Projekat'];
                this.korisnik.ocene = [0,0,0];
            }
        },
        izmenaKorisnika : function (id) {
            this.izmena = true;
            this.adminListaObuka.forEach(obuka => {
                obuka.polaznici.forEach(polaznik => {
                    if (polaznik.id == id) {
                        this.korisnik.id  = polaznik.id,
                        this.korisnik.email = polaznik.email,
                        this.korisnik.ime  = polaznik.ime,
                        this.korisnik.prezime  = polaznik.prezime,              
                        this.korisnik.kurs  = polaznik.kurs,             
                        this.korisnik.nivo  = polaznik.nivo,
                        this.korisnik.oblasti  = polaznik.oblasti,
                        this.korisnik.ocene = polaznik.ocene
                        this.korisnik.prisustvo = polaznik.prisustvo
                    }
                })
            });
        },
        scroll: function() {
            window.console.log("AAA");
            if (window.scrollY > 80 && window.innerWidth > 1100) {
                this.jeZakacena = true;
                } else this.jeZakacena = false;
        }
        

    },
    created: function () {
            window.addEventListener('scroll', this.scroll);
    }
}
</script>

<style scoped>
    #admin {
        padding: 30px 50px;
    }

    #prisustvo {
        width: 50px;
        display: inline;
        margin: 0px 10px;
        vertical-align: middle;
    }
    .jeZakacena {
        position: fixed;
        top: 80px;
        width: 30.5%;
        transition: width 0.3s;
    }
    .panel-success {
        padding: 10px 20px;
    }

    .form-group {
        padding: 0px 5%;
    }

    .dropdown-menu li {
        height: 30px !important;
        line-height: 30px !important;
        padding-left: 20px;
        cursor: pointer;
    }
    .dropdown-menu li:hover {
        background-color: gainsboro;
    }
    .ocene {
        width: 50px;
        display: inline;
        margin: 0px 10px;
    }

    .odustani {
        margin-left: 20px;
    }

    .slide-enter-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
    }

    .slide-leave-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }

    .slide-enter-to, .slide-leave {
        max-height: 100px;
        overflow: hidden;
    }

    .slide-enter, .slide-leave-to {
        overflow: hidden;
        max-height: 0;
    }
</style>