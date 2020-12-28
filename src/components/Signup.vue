<template>
    <div class="sign-up py-3">
        <v-snackbar v-model="snackbar" :timeout="5000" top color="red">
           <span class="subtitle-1">Email Already Exists!</span>
           <v-btn text color="white" class="ml-4" @click="snackbar = false" style="float: right">
               Close
           </v-btn>
       </v-snackbar>
        <v-container class="px-1">
             <v-card class="py-10">
                <h2 class="headline grey--text text-center" > Sign Up</h2>
                <v-form ref="signUpForm" class="mt-8 px-5 px-sm-5 text-center">
                    <v-text-field v-model="name" type="text" label="Name" prepend-icon="person" :rules="rules"> </v-text-field>
                    <v-text-field v-model="email" type="text" label="Email" prepend-icon="email" :rules="emailRules"> </v-text-field>
                    <v-text-field v-model="password" type="password" label="Password" prepend-icon="lock" :rules="passwordRules"> </v-text-field>
                    <v-btn @click="signUp" class="teal white--text mt-2" :loading="loading">
                        <v-icon left>
                            login
                        </v-icon>
                        <span>
                            Sign Up
                        </span>
                    </v-btn>
                </v-form>
            </v-card>
        </v-container>   
    </div>
</template>

<script>
import {db, auth} from '../fb';
export default {
    name: 'Signup',
    data(){
        return{
            name: '',
            email: '',
            password: '',
            rules: [
                v => v.length >= 4 || "Minimum valid length is 4 characters"
            ],
            emailRules: [
                v => !!v || "Email is required",
                 v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => v.length >= 6 || "Password should be atleast 6 characters long"
            ],
            loading: false,
            snackbar: false
        }
    },
    methods: {
        signUp: function() {

            if(this.$refs.signUpForm.validate()){

                this.loading = true;
                auth.createUserWithEmailAndPassword(this.email, this.password).then((res) => {
                    return db.collection("users").doc(res.user.uid).set({
                        name: this.name
                    });
                   
                }).then(() => {
                    this.$router.push('/');
                    this.loading = false;
                }).catch(err => {
                    console.log(err.message);
                    this.loading = false;
                    this.snackbar = true;
                }) 
            }
           
        }
    }
}
</script>

<style scoped>
    .sign-up{
        max-width: 720px;
        margin: 0 auto;
    }
</style>