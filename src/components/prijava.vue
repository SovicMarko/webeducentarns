<template>
    <form class="forma">
        <div class="form-group">
            <label for="usr">
                <span v-if="greskaMail" class="prikaz-greske text-danger">{{ greskaMail }}</span>
                <span v-else class="prikaz-naziva-polja">Vaš email:</span>
            </label>
            <input type="text" id="usr" v-model="email" v-on:click="resetGreske" v-on:change="resetGreske"
                   v-bind:class="{'form-control' : true, 'input-greska' : greskaMail }">
        </div>
        <div class="form-group">
            <label for="pwd">
                <span v-if="greskaLozinka" class="prikaz-greske text-danger">{{ greskaLozinka }}</span>
                <span v-else class="prikaz-naziva-polja">Vaša lozinka:</span>
            </label>
            <input type="password" id="pwd" v-model="sifra" v-on:click="resetGreske" v-on:change="resetGreske"
                   v-bind:class="{'form-control' : true, 'input-greska' : greskaLozinka }">
        </div>

        <button type='submit' 
             class="btn btn-primary dugme-potvrdi"
             v-on:click="prijava"
             v-bind:disabled= "dugmeIskljuceno">PRIJAVA</button>
    </form>
</template>

<script>
import firebase from 'firebase'

export default {
    name : "Prijava",
    data: function () {
        return {
            email : '',
            sifra : '',
            dugmeIskljuceno : false,
            greskaMail : false,
            greskaLozinka : false
        }
    },
    computed : {
        duzinaMail : function () {
            return this.email.length;
        },
        duzinaLozinka : function() {
            return this.sifra.length;  
        }
    },
    methods : {
        resetGreske : function() {
            this.greskaMail = this.greskaLozinka = false;
        },

        prijava :function(e) {
            if (this.email == '') { this.greskaMail = "Email adresa nije uneta" }
            if (this.sifra == '') { this.greskaLozinka = "Lozinka nije uneta" }
            if (!this.greskaMail && !this.greskaLozinka) {
                firebase.auth().signInWithEmailAndPassword(this.email, this.sifra)
                .then(
                    user => {
                        this.$store.commit('prijavaKorisnika');
                        this.$store.dispatch('proveraAdminStatusa', user.user);
                    },
                    err => {
                        switch (err.code) 
                        {
                            case "auth/invalid-email":
                                this.greskaMail = "Email adresa nije pravilno uneta";
                                break;
                            case "auth/user-not-found":
                                this.greskaMail = "Email adresa nije pronađena";
                                break;
                            case "auth/wrong-password":
                                this.greskaLozinka = "Lozinka nije ispravna";
                                break;
                            default:
                                window.alert(err);
                                break;
                        }
                    }
                )
                e.preventDefault();
            }
            
        }
    },
    watch: {
        duzinaMail: function () {
            this.resetGreske();
        },
        duzinaLozinka: function () {
            this.resetGreske();
        }
    }

}
</script>

<style scoped>
    form {
        margin: auto;
        margin-top: 50px;
        width: 300px;
        padding-bottom: 100px;
        
    }
    label {
        font-weight: normal;
        font-size: 17px;
    }

    input {
        height: 40px;
        border-radius: 0px;
        font-size: 16px;
        background-color: rgb(232, 240, 254);
        transition: all 1s;
    }
    .dugme-potvrdi {
        display: block;
        width: 100%;
        margin: auto;
        margin-top: 30px; 
        background-color: #294d86;
        height: 40px;
        border-radius: 0px;
        font-size: 16px;
        letter-spacing: 1.5px;
        transition: all 0.5s;
       
    }

    .dugme-potvrdi:hover {
        background-color: #1a2947;
    }

    .prikaz-naziva-polja {
        animation: animacija-naziv-polja 1s;
    }

    .prikaz-greske {
        animation: animacija-greska 1s;
    }

    @keyframes animacija-greska {
        from {
            margin-left: 70px;
            opacity: 0;
        }
        to {
            margin-left: 0px;
            opacity: 1;
        }
    }

    @keyframes animacija-naziv-polja {
         from {
            margin-left: 100px;
            opacity: 0;
        }
        to {
            margin-left: 0px;
            opacity: 1;
        }
    }

    .input-greska {
        border: 1px solid #d9534f;
        background-color: #ffc0cb26;
    }



/* RESPONSIVE */

    @media only screen and (max-width: 340px) {
         form {
            width: 85%;
         }
    }
    
</style>