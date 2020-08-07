<template>
    <div class="home">
        
        <Prijava v-if="!prijavljenKorisnik" class="login-forma"></Prijava>

        <!-- 
            ONO STO VIDI ADMINISTRATOR
         -->

        <div v-else-if="preuzmiAdminStatus"> 
           
           <!-- lINK ZA ADMIN PANEL -->
           <div class="container">
                <div class='panel panel-primary mt-20'>
                    <p><router-link to="/admin" > Amin panel</router-link></p>
                </div>
           </div>
          
            
            <div class="container">
                <div class="row mt-50">

                    <div class="col col-md-6">
                        <div class="panel panel-primary korisnik-kartica">
                            OBAVEŠTENJA
                        </div>

                        <Obavestenja v-bind:admin='true' v-on:izmenaObavestenja="izmenaObavestenja"></Obavestenja>
                        <div class="obavestenje-preview" v-html="novoObavestenje">
                           
                        </div>

                        <!-- Unos novog obavestenja -->
                        <div class="forma-obavestenje">
                            <div class="form-group">
                                  <label for="obavestenje">Novo obavestenje:</label>
                                  <textarea class="form-control" v-model='novoObavestenje' placeholder="Unos obavestenja"></textarea>
                            </div>

                            <hr>
                            
                            <input type="text" v-model='pozicija' class="form-control pozicija"> 
                            <div v-on:click="unosObavestenja" class="btn btn-primary">Potvrdi</div>
                            <div v-on:click="brisanjeForme" class="btn btn-default">Otkazi</div>
                        </div> 
                    </div>

                    <div class="col col-md-6"></div>

                </div>
            </div>


        </div>

        <!-- 
            ONO STO VIDI KORISNIK

         -->
        <div v-else-if="!preuzmiAdminStatus" class='korisnik-vju'>
            <!-- Korisnik -->
            
            <div class="container">
                <div class="row mt-50">
                    <div class="col col-md-6">
                        <div class="panel panel-primary korisnik-kartica">
                            OBAVEŠTENJA
                        </div>
                        <Obavestenja v-bind:admin='false'></Obavestenja>

                    </div>


                    <div class="col col-md-6">
                        <div class="panel panel-primary korisnik-kartica">
                            <!-- <small>ime i prezime</small> -->
                            <h1 class="mt-1">{{korisnik.prezime}} {{korisnik.ime}} <small>{{korisnik.email}}</small></h1>
                            <h3 class="light-blue"></h3>
                            <h4> Kurs: {{korisnik.kurs}}</h4>
                            <br><br>
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th v-for="(oblast,index) in korisnik.oblasti" v-bind:key="index">{{oblast}}</th>
                                            <th>Ukupno</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th v-for="(ocena,index) in korisnik.ocene" v-bind:key="index">{{ocena}} / 
                                                <span v-if="korisnik.nivo == 'osnovni'"> 25 </span>
                                                
                                                <span v-if="korisnik.nivo == 'napredni' && index == 2"> 30 </span>
                                                <span v-else-if="korisnik.nivo == 'napredni'"> 35 </span>
                                            </th>
                                            <th>{{korisnikZbirOcena}} </th>
                                        </tr>
                                    </tbody>
                                </table>
                                <br>
                                <div class="alert alert-warning">
                                    <b>Prisustvo:</b> {{korisnik.prisustvo}} / 16
                                </div>
                               
                            </div>
                         
                            <div class="row">

                               
                               
                            </div>
                            
                        </div>
                    </div>

                </div>


            </div>

        </div>

       
    </div>
</template>


<script>

import Prijava from '@/components/prijava.vue'
import Obavestenja from '@/components/obavestenja.vue'


    export default {
        
        name: "Home",
        components: {
            Prijava,
            Obavestenja
        },
        data: function() {
            return {
                admin : true,
                idObavestenja : null,
                novoObavestenje: '',
                pozicija: 0,
            }
        },
        computed : {
            adminListaKorisnika: function () {
                return this.$store.state.adminListaKorisnika;
            },
            prijavljenKorisnik : function() {
                return this.$store.state.korisnikPrijavljen;
            },
            preuzmiAdminStatus : function() {
                return this.$store.state.adminPristup;
            },
            korisnik: function() {
                return this.$store.state.aktivniKorisnik;
            },
            korisnikZbirOcena : function() {
                var zbir = 0;
                var ocena = "";
                this.korisnik.ocene.forEach(element => {
                    zbir += Number(element);
                });
                if (zbir < 61)      ocena = "F";
                else if (zbir < 71) ocena = "D";
                else if (zbir < 81) ocena = "C";
                else if (zbir < 91) ocena = "B";
                else                ocena = "A";
                return zbir + " / 100 | " + ocena;
            },
            preuzmiVreme : function() {
                let d = new Date()
                return `${d.getFullYear()}/0${d.getMonth()+1}/0${d.getDate()}`;
            },
        },
        methods: {
            prikaziKorisnika : function() {
                window.console.log(this.korisnik())
            },

            unosObavestenja: function() {
                this.$store.dispatch("unosObavestenja",{
                    id : this.idObavestenja,
                    pozicija: this.pozicija,
                    sadrzaj: this.novoObavestenje
                })
                this.$store.dispatch("listaObavestenja");
                this.brisanjeForme();
            },
            izmenaObavestenja: function(data) {
                window.console.log('ziv');
                this.novoObavestenje = data.sadrzaj;
                this.pozicija = data.pozicija;
             
            },
            brisanjeForme: function(){
                this.pozicija = 0;
                this.novoObavestenje = '';
                this.idObavestenja = null;
            }
        },
        created: function () {
        },
         
    }

</script>



<style lang="css" scoped>
    * {

       overflow: hidden;
    }
  
    .korisnik-kartica {
        padding: 20px;
        border-radius: 0px;
    }

    .light-blue {
        color: #294d86;
    }

    .korisnik-vju {
        animation: korisnik-anime 2s;
    }

    .pozicija {
        width: 50px;
        display: inline;
    }

    @keyframes korisnik-anime {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .forma-obavestenje textarea{
    
    }


</style>