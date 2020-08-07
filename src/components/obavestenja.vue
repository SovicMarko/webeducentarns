<template>
  <div id='obavestenja'>
       <div v-for="(obavestenje,index) in listaObavestenja" 
           v-bind:key='index' > 
           <div v-html="obavestenje.sadrzaj"></div>
           <div v-if="admin"> 
            <div class="btn-group">
                <button class="btn btn-default" 
                    v-on:click="izmenaObavestenja(obavestenje)">
                    <span class="glyphicon glyphicon-pencil"></span></button> 
                <button class="btn btn-default"
                     v-on:click='brisanjeObavestenja(obavestenje.id)'>
                    <span class="glyphicon glyphicon-trash"></span>
                </button>
                <div class="btn btn-default">{{obavestenje.pozicija}}</div>
            </div>
        </div>
     </div>
      
    
  </div>
</template>

<script>


export default {
    name: 'Obavestenja',
    props: {
        admin : Boolean
    },
    data : function() {
        return {
           
        }
        
    },
    computed : {
        listaObavestenja: function() {
            return this.$store.state.listaObavestenja
        }
    },
    methods : {
        brisanjeObavestenja: function (id) {
            this.$store.dispatch("brisanjeObavestenja", id)
        },
        izmenaObavestenja: function(obavestenje) {
            this.$emit('izmenaObavestenja', obavestenje)
        }

    },
    beforeCreate: function ()  {
        this.$store.dispatch("listaObavestenja")
    }
}
</script>

<style>

</style>