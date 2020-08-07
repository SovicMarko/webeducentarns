<template>

  <h1>{{ ime }}</h1>

</template>

<script>
    export default {
        name: "primer",
        data: function () {
            return {
                ime : "Marko"
            }
        }
    }
</script>

<style scoped>
    h1 {
        color: red;
    }
</style>


