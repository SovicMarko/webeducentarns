<template>
  <main>
    <div class="inner">
        <div id="container" v-bind:style="{ marginLeft: margina + 'px'}">
            <h1>{{lekcija.naziv}}</h1>
            <hr>    
            <div class="prikaz-odeljka" v-for="(odeljak, index) in lekcija.sadrzaj" v-bind:key="index">
              <div v-if="odeljak.tip == 'iframe'" class="kod iframe" v-html="odeljak.sadrzaj"></div>
              
              <div v-else-if="odeljak.tip == 'slika'" class="slika" v-html="odeljak.sadrzaj"></div>
              <code v-else-if="odeljak[0] == 'moj-kod'" class="moj-kod">{{odeljak[1]}}</code>
              <div v-else v-html="odeljak.sadrzaj" class="pasus"></div>

               <div class="menage text-center" v-show="admin">
                <div class="btn-group">
                  <button class="btn btn-default" v-on:click="pripremaIzmene(odeljak.sadrzaj, odeljak.id, odeljak.pozicija)"><span class="glyphicon glyphicon-pencil"></span></button> 
                  <button class="btn btn-default" v-on:click="brisanje(odeljak.id)"><span class="glyphicon glyphicon-trash"></span></button>
                  <div class="btn btn-default">{{odeljak.pozicija}}</div>
                  <button class="btn btn-default" disabled><span class="glyphicon glyphicon-plus" v-on:click="brisanje(odeljak)"></span></button> 
                </div>
              </div>

            </div>
            
            <div v-show="admin" class="forma">
              <div class="preview" v-if="zaUnos.length > 0 || imageURL.length > 0">
                <i>preview</i>
                <hr>
                <div v-if="tipPasusa == 'tekst'" v-html="zaUnos" class="pasus"></div>
                <div v-else-if="tipPasusa == 'iframe'" class="kod" v-html="zaUnos"></div>
                <img v-bind:src="imageURL" alt="" srcset="">
                <hr>
              </div>
              <textarea v-model="zaUnos" class="form-control" v-bind:style="'font-size:'+fontUnosa+'px'"></textarea>
              <label class="radio-inline"><input type="radio" name="optradio" v-model='tipPasusa' value='tekst'>tekst</label>
              <label class="radio-inline"><input type="radio" name="optradio" v-model='tipPasusa' value='iframe' >iframe</label>
              <input type="text" class="form-control" v-model="pozicijaSekcije" value="pozicija"> 
              <label for="unos-slike" class="btn btn-default"> Unos slike 
                <input  id="unos-slike" type="file" accept="image/*" v-on:change="unetaSlika">
              </label>
              
              <!-- 
                Dugmad za povećavanje i smanjivanje fonta 
                unutar textarea polja
               -->
              <button class="btn btn-default" 
                 v-on:click="fontUnosa--"
                 v-on:dblclick="fontUnosa-=5" 
                 > f - 
              </button>

              <input type="text" class="form-control font-unosa" 
                 v-model="fontUnosa" >

              <button class="btn btn-default" 
                 v-on:click="fontUnosa++"
                 v-on:dblclick="fontUnosa+=5" 
                 > f + 
              </button>
         
              

              <button v-on:click="potvrdi" class="btn btn-primary dugme-potvrdi">Potvrdi</button>
              <button v-on:click="reset" class="btn btn-default">Otkaži</button>
            </div>
        </div>
    </div>
  </main>
  
</template>

<script>


export default {
  name: 'Lekcija',
  
  props: {
    lekcija: Object,
    admin: Boolean
  },
  components: {

  },
  data: function() {
    return {
      naziv: "",
      show: true,
      sadrzaj: [],
      isloading : false,
      margina : 0,
      zaUnos: "",
      fontUnosa: 14,
      tipPasusa: 'tekst',
      izmena: false,
      idIzmene: 0,
      pozicijaSekcije: 0,
      imageURL : "",
      image: null

    }
  },
  computed: {

  },
  methods: {
		potvrdi: function(){
      if (this.izmena) {
          this.$store.dispatch("izmenaLekcije", 
            {
              sadrzaj : this.zaUnos, 
              tip : this.tipPasusa, 
              id : this.idIzmene, 
              pozicija: this.pozicijaSekcije,
              kurs: this.$route.params.kurs,
              lekcija: this.$route.params.lekcija
            });
      }
      else {
         this.$store.dispatch('upisULekciju', 
          {
            sadrzaj : this.zaUnos, 
            tip : this.tipPasusa, 
            pozicija: this.pozicijaSekcije,
            kurs: this.$route.params.kurs,
            lekcija: this.$route.params.lekcija,
            slika: this.image
          });
      }
     
      this.reset();
    },
    reset : function() {
      this.izmena = false;
      this.tipPasusa = 'tekst';
      this.idIzmene = 0;
      this.zaUnos = "";
      this.imageURL = "";
      this.image = null;
    },
    brisanje: function(dokumentID){
      if (window.confirm("Potvrdite brisanje")) {
          this.$store.dispatch("brisanjeIzLekcije", 
            {
              kurs : this.$route.params.kurs,
              lekcija : this.$route.params.lekcija,
              dokument : dokumentID
            }
          );
      }
    },
    pripremaIzmene: function(data, id, pozicija) {
      this.zaUnos = data;
      this.izmena = true;
      this.idIzmene = id;
      this.pozicijaSekcije = pozicija;
    },
    unetaSlika: function(event) {
      const files = event.target.files;
      let fileName = files[0].name;
      if (fileName.lastIndexOf('.') <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageURL = fileReader.result;
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0];
    }
  },
  created(){
      setTimeout(function () {
          this.isloading = true;
      }.bind(this), 2000)
  },
  beforeDestroy() { },
  beforeUpdate() {
    setTimeout(() => {
       this.show = true;
     }, 1000);
  },
  updated: function () {
    // alert("Pozdrav");
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been re-rendered
      
    })
  },
  watch:{
    $route (){
        this.show = false;
         setTimeout(() => {
        this.show = true;
      }, 100);
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
      
  main {
      width: 68%;
      margin-left: 16%;
      top: 130px;
      min-height: calc(90vh - 80px);
      overflow: hidden;
      font-size: 18px;
      margin-top: -100vh;
  }

  #container {
      top: 0px;
      padding: 10px 30px;
      width: 100%;
      display: inline-block;
      vertical-align: top;
      position: relative;
      line-height: 30px; 
  }
  
  .kod {
    background-image: url("https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif");
    background-repeat: no-repeat;
    background-position: center;
    margin-bottom: 15px;
    width: 90%;
    margin: auto;
    -webkit-box-shadow: inset 1px 0px 15px 4px rgba(26,41,71,0.75);
    -moz-box-shadow: inset 1px 0px 15px 4px rgba(26,41,71,0.75);
    box-shadow: inset 1px 0px 15px 4px rgba(26,41,71,0.75);

  }
  .kod::after {
    content: "";
    display: block;
    margin-top: -10px;
    height: 1px;
    background-color: #1a2947;
  }
  .moj-kod {
    margin-bottom: 10px !important;
  }

  .slika {
    text-align: center;
  }
  a.inner-link {
    color: lightskyblue !important;
  }

  img {
    max-width: 100%;
  }

  textarea {
    width: 100%;
    margin-bottom: 20px;
    height: 200px;

  }

  .prikaz-odeljka > div {
    animation: fade-in 0.8s;
   
  }

   @keyframes fade-in {
      from {
        opacity: 0;
      } to {
        opacity: 1;
      }
    }

  .menage {
    text-align: center;
    margin-bottom: 10px;
  }
  .btn-default .glyphicon-trash { color: #a94442 }
  .btn-default .glyphicon-pencil {color: #8a6d3b }
  .btn-default .glyphicon-plus {  color: #31708f }

  .forma textarea {
    background-color: #eee;
    font-size: 20px;
  }

  .forma button {
    vertical-align: top;
    
  }
  .forma input[type="text"] {
    vertical-align: top;
    width: 80px;
  }

 .radio-inline {
    line-height: 22px;
    padding-right: 10px;
    vertical-align: middle;
  }

  label[for="unos-slike"],
  .dugme-potvrdi {
    margin-left: 20px;
    margin-right: 20px;
  }

  .font-unosa {
    width: 50px !important;
  }

  .forma input[type="file"] {
    display: inline;
    vertical-align: middle;
    margin-left: 20px;
    display: none;
  }
  
  .form-control {
    display: inline;
  }

  @media only screen and (max-width: 1440px) {
    main {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 1100px) {
    main {
      width: 100%;
      margin-left: 0px;
      /* min-height: calc(90vh - 80px); */
      min-height: 100vh;
    }
  }
</style>
