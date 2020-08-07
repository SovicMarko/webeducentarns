<template>
  <footer>
    <div class="footer">
        <div class="row">
          <div class="col col-xs-12 col-sm-3">
            <ul class="list-group">
              <li v-on:click='promenaKursa' class="list-group-item">
                  <router-link to="/HTML/Uvod u HTML">HTML</router-link></li>
              <li v-on:click='promenaKursa' class="list-group-item">
                  <router-link to="/CSS/Uvod u CSS">CSS</router-link></li>
              <li v-on:click='promenaKursa' class="list-group-item">
                  <router-link to="/JavaScript/Uvod u JavaScript">JavaScript</router-link></li>
              <li v-on:click='promenaKursa' class="list-group-item">
                <a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/webeducentarns.appspot.com/o/dokumenti%2FPrirucnik-osnovni-kurs.pdf?alt=media&token=c4778a34-c115-4406-b751-f926d351d396">Priručnik za osnovni kurs</a></li>
            </ul>
          </div>
          <div class="col col-xs-12 col-sm-3">
            <ul class="list-group">
              <li v-on:click='promenaKursa' class="list-group-item">
                <router-link to="/jQuery/Uvod u jQuery">jQuery</router-link></li>
              <li v-on:click='promenaKursa' class="list-group-item">
                <router-link to="/izrada">Bootstrap</router-link></li>
              <li v-on:click='promenaKursa' class="list-group-item">
                <router-link to="/izrada">Vue.js</router-link></li> 
              <li v-on:click='promenaKursa' class="list-group-item">
                <router-link to="/izrada">Priručnik za napredni kurs</router-link></li>
            </ul>
          </div>
          <div class="col col-xs-12 col-sm-3">
            <ul class="list-group">
              <li v-on:click='promenaKursa' class="list-group-item">
                <router-link to="/izrada">Principi dizajna</router-link></li>
              <li v-on:click='promenaKursa' class="list-group-item">
                <router-link to="/izrada">Kontrola verzija</router-link></li>
              <li v-on:click='promenaKursa' class="list-group-item">
                <router-link to="/izrada">Završni projekat</router-link></li> 
            </ul>
          </div>
          <div class="col col-xs-12 col-sm-3">
            <ul class="list-group">
              <li v-on:click='promenaKursa' class="list-group-item">
                <router-link to="/radovi">Radovi polaznika</router-link></li>
              <li v-on:click='promenaKursa' class="list-group-item">
                <router-link to="/izrada">Informacije o obuci</router-link></li>
              <li v-on:click='promenaKursa' class="list-group-item">
                <router-link to="/izrada">Informacije o predavaču</router-link></li> 
            </ul>
          </div>
        </div>
    </div>

    <div class="text-center ">
      <hr>
      Web programiranje i dizajn - Edukativni centar | 2020 | Developed by <a target="_blank" href="https://sovicmarko.github.io/#/">Marko Šović</a>
    </div>
     
    
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  props: {
    
  },
  data: function() {
    return {
      
    }
  },
  computed: {

  },
  methods: {
   promenaKursa: function () {
      // this.toggleMenu();
      this.$store.dispatch('identifikujKurs', this.$route.params.kurs);
      this.$store.dispatch('identifikujLekciju',{kurs: this.$route.params.kurs, lekcija: this.$route.params.lekcija});
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    footer {
      color: gainsboro;
        background-color: #1a2947;
        margin: auto;
        margin-top: 50px;
        padding: 20px 20px 20px;
        margin-bottom: 30px;
    }

    footer ul {
      background-color: inherit;
    }

    li {
      border: 0px;
      background-color: inherit;
      color: gainsboro;
    }

    li a {
      color: inherit;
    }

     @media only screen and (max-width: 1100px) {
        footer {
          width: 95%;
          height: auto;
        }
     }

</style>
