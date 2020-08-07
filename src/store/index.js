import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'
import firebase from 'firebase'
import 'firebase/storage'

Vue.use(Vuex)

export default new Vuex.Store({





  state: {
    adminPristup: false,
    korisnikPrijavljen: false,

    aktivniKorisnik: { ocene: []},

    listaObavestenja : [],

    prikazanaListaLekcija: false,
    listaLekcija: [],
    izabranaLekcija : {},

    // admin_ListaKorisnika: [],
    admin_ListaObuka: [],
  },

  mutations: {

    promenaPrikazaLekcija (state) { 
      state.prikazanaListaLekcija = !state.prikazanaListaLekcija; 
    },

    ocistiSpisakLekcija(state) { state.listaLekcija = [] },

    popunjavanjeListeLekcija (state, objekat) {
      state.listaLekcija.push(objekat);
    },

    formiranjeIzabraneLekcije(state, objekat){
      state.izabranaLekcija = objekat;
    },

    prijavaKorisnika(state){
      state.korisnikPrijavljen = true;
    },

    

    adminListaKorisnikaDodaj(state, objekat) {
      state.admin_ListaObuka.forEach(obuka => {
        if(obuka.sifraObuke == objekat.kurs) {
          obuka.polaznici.push(objekat);
        }
      });

    },


    // ADMIN LISTA OBUKA
    adminListaObukaCiscenje(state) {
      state.admin_ListaObuka = []
    },

    adminListaObukaDodaj(state, objekat) {
      state.admin_ListaObuka.push(objekat);
    },



     
    podaciKorisnikaUnos(state, objekat){
      state.aktivniKorisnik = objekat;  
    },
    podaciKorisnikaBrisanje(state) {
      state.aktivniKorisnik = {};
    },

    odjavaKorisnika(state){
      state.korisnikPrijavljen = false;
    },
    dozvoliAdminPristup(state) {
      state.adminPristup = true;
    },
    ukloniAdminPristup(state) {
      state.adminPristup = false;
    },

    
    popunjavanjeListeObavestenja(state, objekat) {
      state.listaObavestenja.push(objekat);
    },
    ocistiListuObavestenja(state) { state.listaObavestenja = []}
  },



  actions: {
   
   
    // PROVERA ADMIN PRIVILEGIJA //

    proveraAdminStatusa(kontekst, user) {
      db.collection('podaciKorisnika').doc(user.uid).get()
        .then(function(doc) {


          // U slucaju da je administrator
          if (doc.data().admin) {
            
            kontekst.commit("dozvoliAdminPristup");

            // Popunjavanje liste obuka 
            db.collection('obuke').get()
            .then(function(querySnapshot) {
              kontekst.commit('adminListaObukaCiscenje')
              querySnapshot.forEach(doc => {
                kontekst.commit('adminListaObukaDodaj', {
                  sifraObuke : doc.id,
                  nivo: doc.data().nivo,
                  polaznici : []
                })
              })
            })
            .then(function() {
              // popunjavanje obuka korisnicima
              db.collection('podaciKorisnika').get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  kontekst.commit('adminListaKorisnikaDodaj', {
                    id : doc.id,
                    email : doc.data().email,
                    ime : doc.data().ime,
                    prezime : doc.data().prezime,
                    kurs : doc.data().kurs,
                    nivo: doc.data().nivo,
                    oblasti : doc.data().oblasti,
                    ocene: doc.data().ocene,
                    prisustvo : doc.data().prisustvo
                  })
                });
              })
            }); 
          } 
          
          // U slucaju obicnog korisnika
          else {
            kontekst.commit("ukloniAdminPristup");
            kontekst.commit("podaciKorisnikaUnos", {
              email : user.email,
              ime : doc.data().ime,
              prezime : doc.data().prezime,
              kurs : doc.data().kurs,
              nivo: doc.data().nivo,
              oblasti : doc.data().oblasti,
              ocene: doc.data().ocene,
              prisustvo : doc.data().prisustvo
            })
          }
        })
        .catch(function() {
          kontekst.commit("ukloniAdminPristup");
        })
    },

    // REGISTRACIJA KORISNIKA //

    registracijaKorisnika(kontekst, korisnik){
      window.console.log(kontekst);
      db.collection('podaciKorisnika').doc(korisnik.id)
      .set({
           email: korisnik.email,
           ime : korisnik.ime,
           prezime : korisnik.prezime,
           kurs : korisnik.kurs,
           oblasti : korisnik.oblasti,
           ocene : korisnik.ocene,
           nivo : korisnik.nivo,
           prisustvo : korisnik.prisustvo
       })
    },

    // LISTA OBAVESTENJA

    listaObavestenja(kontekst) {
      kontekst.commit('ocistiListuObavestenja');
      db.collection('obavestenja').get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          kontekst.commit('popunjavanjeListeObavestenja',{
            id : doc.id,
            sadrzaj: doc.data().sadrzaj,
            pozicija: doc.data().pozicija
          })
        })
      })
    },

    // UNOS OBAVESTENJA

    unosObavestenja(kontekst,data) {
      window.console.log(kontekst);
      if (data.id != null) {
        db.collection('obavestenja').doc(data.id).set({
          pozicija: data.pozicija,
          sadrzaj : data.sadrzaj
        })
      } else {
        db.collection('obavestenja').doc().set({
          pozicija: data.pozicija,
          sadrzaj : data.sadrzaj
        })
      }
     
    },

    // BRISANJE OBAVESTENJA

    brisanjeObavestenja(kontekst, id) { 
      db.collection('obavestenja').doc(id).delete().then(function() {
          kontekst.dispatch('listaObavestenja');
      }).catch(function(error) {
          window.console.error("Error removing document: ", error);
      });
    },

    


    // KURS NA OSNOVU RUTE
    
    identifikujKurs(kontekst, kurs) {
      if (kurs) {
        db.collection('lekcije').doc(kurs).collection('lekcije').orderBy("pozicija").get()
          .then(function(querySnapshot) {
            kontekst.commit('ocistiSpisakLekcija');
            querySnapshot.forEach(function(doc) {
                kontekst.commit('popunjavanjeListeLekcija', {
                  id: doc.id,
                  naziv: doc.id,
                  pozicija: doc.data().pozicija
                })
            });
          });
      }
    },

    identifikujLekciju(kontekst, podaci) {
      let tempO = {
        id : '',
        naziv : podaci.lekcija,
        sadrzaj : []
      };

      let kurs = podaci.kurs;
      let lekcija = podaci.lekcija;

      db.collection('lekcije').doc(kurs)
        .collection('lekcije').doc(lekcija)
        .collection("sadrzaj").orderBy("pozicija").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              let tempS = doc.data();
              tempS.id = doc.id;
              tempO.sadrzaj.push(tempS);
            });
        })
        .catch(function(error) { 
          window.console.error(error);
        });

      kontekst.commit('formiranjeIzabraneLekcije', tempO)
    },


    upisULekciju(kontekst, data) {

      let url = ""
      if (data.slika != null) {
        var storageRef = firebase.storage().ref('slike/' + data.slika.name);
        let uploadTask = storageRef.put(data.slika);
        
        uploadTask.on('state_changed', function() { 

        },function () {
          
        }, function () {

          uploadTask.snapshot.ref.getDownloadURL()
          .then( function (downloadURL) {
            url = downloadURL;
            db.collection('lekcije').doc(data.kurs).
              collection('lekcije').doc(data.lekcija).
                collection('sadrzaj').doc().set({
                  tip : "slika",
                  sadrzaj : `<img src=${url}>`,
                  pozicija : data.pozicija
              })
              .then(function() {
                  window.console.log("Document successfully written!");
                  kontekst.dispatch('identifikujLekciju', {kurs: data.kurs, lekcija : data.lekcija});
              })
              .catch(function(error) {
                  window.console.error("Error writing document: ", error);
              });
          })
        })
        

      // var imageRef = storageRef.child(data.slika.name);
      // storageRef.put(data.slika);
      
      // var storageRef = firebase.storage.ref(data.slika.name);
      // storageRef.put(data.slika);
      } else {
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
      }
      
      },


      izmenaLekcije(kontekst, data) {
        var sekcija = db.collection('lekcije').doc(data.kurs).
                         collection('lekcije').doc(data.lekcija).
                         collection('sadrzaj').doc(data.id)
     
        return sekcija.update({
            sadrzaj: data.sadrzaj,
            tip: data.tip,
            pozicija : data.pozicija
        })
        .then(function() {
            window.console.log("Document successfully updated!");
            kontekst.dispatch('identifikujLekciju', {kurs: data.kurs, lekcija : data.lekcija});
        })
        .catch(function(error) {
            window.console.error("Error updating document: ", error);
        });
      },

      
      brisanjeIzLekcije(kontekst, data) { 
        db.collection('lekcije').doc(data.kurs)
          .collection('lekcije').doc(data.lekcija)
          .collection('sadrzaj').doc(data.dokument).delete()
        .then(function() {
            window.console.log("Document successfully deleted!");
            kontekst.dispatch('identifikujLekciju', {kurs: data.kurs, lekcija : data.lekcija});
        })
        .catch(function(error) {
            window.console.error("Error removing document: ", error);
        });
      },


      kreiranjeLekcije(kontekst, data){
        db.collection("lekcije").doc(data.kurs).
           collection('lekcije').doc(data.naziv).set({
            pozicija : data.pozicija
        })
        .then(function() {
            window.console.log("Document successfully written!");
            kontekst.dispatch('identifikujKurs',  data.kurs );
        })
        .catch(function(error) {
            window.console.error("Error writing document: ", error);
        });
      },

      izmenaNazivaLekcije(kontekst, data){
        if (data.id == data.naziv) {
          db.collection("lekcije").doc(data.kurs).collection("lekcije").doc(data.id).update({pozicija : data.pozicija});
          kontekst.dispatch('identifikujKurs',  data.kurs );
        } else {
          db.collection("lekcije").doc(data.kurs).collection("lekcije").doc(data.id).collection("sadrzaj").get()
            .then(function(querySnapshot) {
              db.collection("lekcije").doc(data.kurs).collection("lekcije").doc(data.naziv).set({pozicija : data.pozicija});
              querySnapshot.forEach(function(doc) {
                db.collection("lekcije").doc(data.kurs).collection("lekcije").doc(data.naziv).collection("sadrzaj").doc().set(doc.data());
              });
              kontekst.dispatch('brisanjeLekcije', {lekcija: data.id, kurs: data.kurs})
            }); 
        }
      },


      brisanjeLekcije(kontekst, data){
      
        if(window.confirm(`Ovo će izbrisati čitavu lekciju ${data.lekcija}. Sigurno zelite da nastavite?`)) {
          db.collection("lekcije").doc(data.kurs).collection('lekcije').doc(data.lekcija).delete().then(function() {
              window.console.log("Document successfully deleted!");
              kontekst.dispatch('identifikujKurs',  data.kurs );
              
          }).catch(function(error) {
              window.console.error("Error removing document: ", error);
          });
        }
      }
  },

  modules: {

  }
})
