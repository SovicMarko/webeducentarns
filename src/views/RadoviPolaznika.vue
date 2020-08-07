<template>
<div class="radovi">
    <div class="container">
        <h1 class="page-header">Radovi polaznika</h1>
        <div class="row">
                <a href="https://jovanak93.github.io/moler021/" target="_blank">
                    <div class="col col-sm-6 col-md-6 col-lg-6">
                        <div class="sajt">
                            <img src="https://firebasestorage.googleapis.com/v0/b/webeducentarns.appspot.com/o/slike%2Fradovi%2FKolarski.png?alt=media&token=5acbe44f-3a9b-495c-a253-13caf0fb8b30">
                            <div>Jovana Kolarski</div>
                        </div>
                    </div>
                </a>

                
                <a href="https://aleksandra-jakonic.github.io/osnovni-zavrsni_projekat/" target="_blank">
                    <div class="col col-sm-6 col-md-6 col-lg-6">
                        <div class="sajt mb-5">
                            <img src="https://firebasestorage.googleapis.com/v0/b/webeducentarns.appspot.com/o/slike%2Fradovi%2FĐorić.png?alt=media&token=9335e06c-a2c6-495b-b9b8-f3ee55644535">
                            <div>Aleksandra Đorić</div>
                        </div>
                    </div>
                </a>
            
                <a href="https://darkomrsa.github.io/Geologist-Service/" target="_blank">
                    <div class="col col-sm-6 col-md-6 col-lg-6">
                        <div class="sajt">
                            <img src="https://firebasestorage.googleapis.com/v0/b/webeducentarns.appspot.com/o/slike%2Fradovi%2FMrša.png?alt=media&token=7795bf8b-037c-4ad4-8543-8980867b7998">
                            <div>Darko Mrša</div>
                        </div>
                    </div>
                </a>

                <a href="https://bekicans.github.io/Litlle-Space-Art-Studio/Html/index.html" target="_blank">
                    <div class="col col-sm-6 col-md-6 col-lg-6">
                        <div class="sajt">
                            <img src="https://firebasestorage.googleapis.com/v0/b/webeducentarns.appspot.com/o/slike%2Fradovi%2FSavić.png?alt=media&token=6795e10b-8496-4cd9-b0c1-3a8c2bece1f6">
                            <div>Ivana Savić</div>
                        </div>
                    </div>
                </a>
        </div>
        <app-footer></app-footer>
    </div>
    
</div>
  
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'
export default {
    components: {
        AppFooter
    }
}
</script>

<style scoped>
    * {
        /* outline: 1px dashed red; */
    }

    .radovi {
        /* padding-bottom: 50px; */
    }
    img {
        width: 100%;
    }

    .sajt {
        transition: all 0.4s;
        position: relative;
        border: 1px solid gainsboro;
       
        /* outline: 1px solid red; */
    }

    .sajt:hover {
        transform: scale(1.1);
      
        -webkit-box-shadow: 2px 3px 11px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 2px 3px 11px 0px rgba(0,0,0,0.75);
        box-shadow: 2px 3px 11px 0px rgba(0,0,0,0.75);
    }

    .sajt:hover img {
          /* border: 1px solid gainsboro; */
    }

    .sajt:hover div {
        opacity: 1;
    }

    .sajt div {
        position: absolute;
        bottom: 0px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        text-transform: uppercase;
        font-size: 25px;
        /* width: inherit; */
        width: 100%;
        color: white;
        opacity: 0;
        transition: opacity 1s;
        background-color: rgba(26, 41, 71, 0.6);
    
    }
    .col {
        padding: 30px;
    }

    .radovi {
        animation: animacija 1s 
    }

    @keyframes animacija {
        from {
            opacity: 0;
        } 
        to {
            opacity: 1;
        }
    }

    @media only screen and (max-width: 768px) {
        .sajt div {
            opacity: 1;
            font-size: 16px;
        }
    }
</style>