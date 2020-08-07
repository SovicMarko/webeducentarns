<template>
<div class="row">
 <form action="" class="col col-md-4 col-md-offset-4">
        <div class="form-group">
            <label for="usr">Name:</label>
            <input type="text" class="form-control" id="usr">
        </div>
        <div class="form-group">
            <label for="email">Name:</label>
            <input type="text" class="form-control" id="email">
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="pwd-1">
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="pwd-2">
        </div>

        <button type="submit" v-on:click='registruj' class="btn btn-success">Potvrdi</button>
    </form>

</div>
   
</template>

<script>
export default {
    name : "Registracija"
}
</script>

<style>

</style>