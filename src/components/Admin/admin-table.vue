<template>
  <div>
        
            <div class="alert alert-success" v-on:click="show = !show">
                <h3>{{obuka.sifraObuke}} {{obuka.nivo}}</h3>
            </div>
        
         
                <table class="table" v-if="show">
                    <thead>
                        <tr>
                            <th>Prezime</th>
                            <th>Ime</th>
                            <th>Email</th>
                            <th>Obuka</th>

                            <template v-if="obuka.nivo == 'osnovni'">
                            <th>HTML</th>
                            <th>CSS</th>
                            <th>JavaScript</th>
                            
                            </template>

                            <template v-else>
                            <th>JavaScript | jQuery</th>
                            <th>Bootstrap | Vue.js</th>
                            
                            </template>
                            
                            <th>Projekat</th>
                            <th>Ukupno</th>
                            <th>Prisustvo</th>
                            <th></th>
                            <th></th>
                        </tr>
                        
                        
                    </thead>
                    <tbody>
                        <tr v-for="(korisnik,index) in obuka.polaznici" v-bind:key="index" >
                            <td>{{korisnik.prezime}}</td>
                            <td>{{korisnik.ime}}</td>
                            <td>{{korisnik.email}}</td>
                            <td>{{korisnik.kurs}}</td>
                        

                            <td v-for="(ocena, i) in korisnik.ocene" v-bind:key="i">{{ocena}}</td>
                              
                               
                           

                            <td><mark>{{zbirOcena(korisnik.ocene)}}</mark></td>
                            <td>{{korisnik.prisustvo}}</td>

                                 <td> 
                                    <div class="btn-group">
                                            <button v-on:click="izmenaKorisnika(korisnik.id)" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span></button> 
                                            <button class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button> 
                                    </div>
                            </td> 
                            
                        </tr>
                    </tbody>

                  

                </table>
                <div v-else  class="mail-lista alert alert-primary">
                    {{listaMailova()}}
                </div>

                
              
           
        </div>
</template>

<script>
export default {
    name : "AdminTable",
    props : {
        obuka : Object
    },
    data : function() {
        return {
            show : false
        }
    },
    computed : {
      
    },
    methods : {
        izmenaKorisnika : function(id) {
            window.console.log("ovde");
            this.$emit("izmenaKorisnika", id);
        },
        zbirOcena : function(ocene) {
            var zbir = 0;
            var ocena = "";
            ocene.forEach(o => {
                zbir += Number(o);
            });
            if (zbir < 61)      ocena = "F";
            else if (zbir < 71) ocena = "D";
            else if (zbir < 81) ocena = "C";
            else if (zbir < 91) ocena = "B";
            else                ocena = "A";
            return zbir + " | " + ocena;
        },
        listaMailova : function() {
            let spisak = '';
            this.obuka.polaznici.forEach(polaznik => {
                if (polaznik.email != undefined) {
                    spisak += polaznik.email + ', ';
                }
              
            });
            
            return spisak;
        }

    }
}
</script>

<style scoped>
   
</style>