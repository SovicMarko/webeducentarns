<template>
    <aside v-bind:class="{zakacen : zakacen}">
        <router-link to="/radovi"><div  class="kartica">
            <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
            <div class="tekst">RADOVI POLAZNIKA</div>
        </div></router-link>
        <router-link to="/izrada"><div class="kartica">
            <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
            <div class="tekst">Informacije o obuci</div>
        </div></router-link>
        <router-link to="/izrada"><div class="kartica">
            <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
            <div class="tekst">Informacije o predavaču</div>
        </div></router-link>
        <a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/webeducentarns.appspot.com/o/dokumenti%2FPrirucnik-osnovni-kurs.pdf?alt=media&token=c4778a34-c115-4406-b751-f926d351d396">
            <div class="kartica"><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span>
                <div class="tekst">Priručnik za osnovni kurs</div>
            </div>
        </a>
        <router-link to="/izrada"><div class="kartica"><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span>
            <div class="tekst">Priručnik za napredni kurs</div>
        </div></router-link>
  
    </aside>
    
</template>



<script>


export default {
    name: "AsideLinks",
    data: function() {
        return {
            zakacen: false
        }
    },
    methods: {
        scroll: function () {
            if (window.scrollY > 80 && window.innerWidth > 1100) {
                this.zakacen = true;
            } else {
                this.zakacen = false;
            }
        },
    },
    created: function () {
        window.addEventListener('scroll', this.scroll);
    }
}
</script>



<style scoped>
    * {
        /* outline: 1px dashed green; */
    }
   
    aside {
        width: 15%;
        position: absolute;
        top: 0px;
        padding-top: 130px;
        right: 0px;
        height: 120vh;
        text-align: left;
        background-color: #294d86;
        animation: sa-desna 1s;
        
    }

    @keyframes sa-desna {
        from {
            right: -15%;
        }
        to {
            right: 0%;
        }
    }
    span {
        margin-right: 20px;
    }
    .zakacen {
        padding-top: 50px;
        position: fixed !important;
    }

    a {
        text-decoration: none;
    }

    .tekst, span {
        vertical-align: middle;
    }

    .tekst {
        width: 80%;
        display: inline-block;
        padding: 0px;
    }

    aside .kartica {
        width: 100%;
        font-size: 16px;
        text-align: left;
        margin: auto;
        padding: 20px 20px;
        border: 3px solid #294d86;
        background-color: #294d86;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    aside .kartica:hover {
        color: #ededfd;
        background-color: #1a2947;
    }
    aside img {
        width: 70%;
        right: 10%;
        position: absolute;
        bottom: 10px;

    }
    .sakriveni {
        margin-top: -50px;
    }

    @media only screen and (max-width : 1640px) {
      aside .kartica {
        padding: 15px 15px;      
      }
      aside .kartica .tekst{
        font-size: 14px;  
      }
    }

    @media only screen and (max-width : 1440px) {
      aside .kartica {
        padding: 10px 10px;      
      }
      aside .kartica .tekst{
        font-size: 13px;  
      }
      span {
        font-size: 14px;
        margin-right: 15px;
      }
    }
    
    @media only screen and (max-width: 1100px) {
        aside {
            display: none;
        }
    }

     @media only screen and (max-width: 1520px) {
          .tekst {
              width: 70%;
          }
     }
</style>

