<template>
  <div id="u-izradi">
    
      <h1>Stranica je trenutno u izradi</h1>
      <parallax-container class="image-container">
        <parallax-element :type="type" :parallaxStrength="-20" tag="img" src="img/plavo-plavo.png" />
      </parallax-container>
     
      <app-footer class="footer container"/>
  </div>
</template>

<script>
import ParallaxContainer from '../components/parallax-container.vue'
import ParallaxElement from '../components/parallax-element.vue'
import AppFooter from '@/components/AppFooter.vue'
export default {
    
    name: "Izrada",
    components: {
      ParallaxContainer,
      ParallaxElement,
      AppFooter
    },
    data : function () {
      return {
        type : "depth" // translation ,rotation, depth
      }
    }
    
}
</script>

<style scoped>
  #u-izradi {
    position: relative;
    padding: 1px;
  }

  h1 {
    margin-top: 80px;
    text-align: center;
    animation : animacija-naslov 1s;
  }
  @keyframes animacija-naslov {
    from  {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  img {
    width: 375px;
    display:block;
    margin: auto;
    opacity: 0.4;
    margin-top: 20px;
    animation: slika-animacija 2s;
  }
  
  @keyframes slika-animacija {
     from {
       width: 0px;
       height: 0px;
       transform: rotate(360deg);
     }
     to {
       /* width: 20%; */
       height: auto;
       transform: rotate(0deg);
     }
  }

  .image-container {
    position: absolute;
    top: 0px;
    width: 100%;
 
    padding-top: 150px;
  }

  .footer {
    margin-top: 60vh;
  }

  @media only screen and (max-width : 1440px) {
    .footer {
      margin-top: 450px;
    }
    img {
      margin-top: 40px;
      width: 300px;
    }
  }

  @media only screen and (max-width : 395px) {
    h1 {
      font-size: 2.4em;
      padding: 0px 20px;
    }
    img {
      margin-top: 40px;
      width: 300px;
    }
  }
</style>