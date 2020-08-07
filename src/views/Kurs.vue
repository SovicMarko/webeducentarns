<template>
  <div class="home">

    <transition appear name="slide" mode="in-out">
      <side-nav 
        v-bind:spisak="preuzmiListuLekcija" 
        v-bind:admin="preuzmiAdminStatus" 
        class="fixed">
      </side-nav>
    </transition>

    <transition name="fade">
      <lekcija 
        v-if="prikazanaLekcija"
        v-bind:lekcija="preuzmiLekciju" 
        v-bind:admin="preuzmiAdminStatus">
      </lekcija>
    </transition>

    <transition appear name="slide" mode="in-out">
      <aside-links></aside-links>
    </transition>


    <AppFooter class="footer"/>
  </div>
</template>

<script>
import SideNav from '@/components/SideNav.vue'
import Lekcija from '@/components/Lekcija.vue'
import AppFooter from '@/components/AppFooter.vue'
import AsideLinks from '@/components/AsideLinks.vue'

export default {
  name: 'Kurs',
  
  data: function() {
      return {
        admin: false,

        myJson: [],
        spisakLekcija: [],

        prikazanaLekcija: true,
        izabranaLekcija: {},
        poslednjaLekcija: 0,
      }
  },
  components: {
    SideNav,
    Lekcija,
    AppFooter,
    AsideLinks
  },
  computed: {
    preuzmiAdminStatus : function() {
      return this.$store.state.adminPristup;
    },
    preuzmiListuLekcija : function() {
      return this.$store.state.listaLekcija
    },
    preuzmiLekciju : function() {
      return this.$store.state.izabranaLekcija
    }
  },
  methods: {
   
  },  
  created: function() {
    this.$store.dispatch('identifikujKurs', this.$route.params.kurs);
    this.$store.dispatch('identifikujLekciju', { 
      kurs: this.$route.params.kurs, 
      lekcija: this.$route.params.lekcija 
    })
  },
  watch: {
    $route (){  
        this.prikazanaLekcija = false;
        setTimeout(() => {
          this.prikazanaLekcija = true;
          this.$store.dispatch('identifikujLekciju', { 
            kurs: this.$route.params.kurs, 
            lekcija: this.$route.params.lekcija })
        }, 200); 
    }
  }
}
</script>

<style scoped>
  * {
    /* outline: 1px dashed green; */
  }
  .fixed {
    position: sticky;
    z-index: 1;
    width: 15%;
    top: 50px;
    height: 100vh;
    overflow: hidden;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 1s;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateX(-30%);
  }

  .footer {
    width: 65%;
  }

  @media only screen and (max-width: 1100px) {
    .fixed {
      position: relative;
      top: 0px;
      width: 100%;
    }
    .footer {
      width: 95%;
    }
  }
</style>
