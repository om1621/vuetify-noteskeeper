<template>
    <nav>

       <v-snackbar v-model="snackbar" :timeout="4000" top color="teal">
           <span class="subtitle-1">Project Added Successfully</span>
           <v-btn text color="white" class="ml-4" @click="snackbar = false">
               Close
           </v-btn>
       </v-snackbar>

       <v-toolbar app flat>
           <v-app-bar-nav-icon v-on:click="toggleDrawer" class="grey--text" ></v-app-bar-nav-icon>

           <v-toolbar-title class="text-uppercase grey--text">
               <span class="font-weight-light">Note</span>
               <span>Keeper</span>
           </v-toolbar-title>

           <v-spacer></v-spacer>

            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }" >
                    <v-btn class="d-none" slot="activator" text color="grey" v-bind="attrs" v-on="on" v-bind:class="{'d-md-block': loggedIn}">
                        <v-icon left>
                            expand_more
                        </v-icon>
                        <span>
                            Menu
                        </span>
                    </v-btn>
                </template>
                 <v-list class="py-0">
                        <v-list-item v-for="(link, i) in links" :key="i" router :to="link.route" >
                            <v-list-item-title>
                                {{link.text}}
                            </v-list-item-title>
                        </v-list-item>
                </v-list>
            </v-menu>
            <v-btn text color="grey" router to="/sign-up" class="d-none" v-bind:class="{'d-inline-flex': !loggedIn}" >
               <v-icon left>login</v-icon>
               <span>Sign Up</span>
            </v-btn>
            <v-btn text color="grey" router to="/log-in" class="d-none" v-bind:class="{'d-inline-flex': !loggedIn}" >
               <v-icon left>login</v-icon>
               <span>Log In</span>
            </v-btn>
            <v-btn @click="logout" text color="grey" class="d-none" v-bind:class="{'d-inline-flex': loggedIn}">
               <span>Sign Out</span>
               <v-icon right>exit_to_app</v-icon>
            </v-btn>
       </v-toolbar>

       <v-navigation-drawer v-model="drawer" color="teal" app> 

           <v-layout row class=" mt-16 d-none" v-bind:class="{'d-block': loggedIn}"> 
               <v-flex xs8 offset-2 class="align-center text-center">
                   <v-avatar width="100" height="100">
                       <img src="/avatar-1.png" alt="">
                   </v-avatar>
                   <p class="mt-6 subtitile-1 white--text text-capitalize">
                       {{name}}
                   </p>
                    <div class="mb-4">
                        <Popup @showSnackbar="snackbar = true" v-bind:user="name" v-bind:uid="uid" />
                    </div>
                   
               </v-flex>
           </v-layout>

           <v-list>
                   <v-list-item v-for = "(link, i) in links" :key="i" router :to="link.route" class="pl-3" >
                       <v-list-item-icon>
                           <v-icon class="white--text"> {{link.icon}}</v-icon>
                       </v-list-item-icon>
                       <v-list-item-content>
                           <v-list-item-title class="white--text">
                               {{link.text}}
                           </v-list-item-title>
                       </v-list-item-content>
                   </v-list-item>
           </v-list>

           <v-row class="mt-3">
               <v-col class="text-center" sm=6 offset-sm="3" >
                   <v-btn @click="drawer = !drawer" class="white teal--text" >
                        BACK
                   </v-btn>
               </v-col>
           </v-row>

           
       </v-navigation-drawer>
    </nav>
</template>

<script>
import Popup from './Popup.vue'
import {auth, db} from '../fb'

export default {
    name: 'Navbar',
    components: {
        Popup
    },
    data(){
        return {
            name: '',
            uid: '',
            drawer: false,
            links: [{
                icon: 'dashboard', 
                text: 'Dashboard',
                route: '/'
            },
            {
                icon: 'note', 
                text: 'My Projects',
                route: '/projects'
            },
            {
                icon: 'people', 
                text: 'Team',
                route: '/team'
            }],
            snackbar: false,
            loggedIn: false

        }
    },
    methods:{
        toggleDrawer: function(){
            this.drawer = !this.drawer;
        },

        logout: function(){
            auth.signOut().then(() => {
                console.log("user logged out")
            }).catch(err => {
                console.log(err.message);
            })
        }
    },
    created(){

        auth.onAuthStateChanged(user => {
            if(user){
                this.loggedIn = true;
                this.uid = user.uid;
                db.collection('users').doc(user.uid).get().then(res => {
                    if(res.exists){
                        this.name = res.data().name;
                    }
                    else{
                        console.log("No document found");
                    }
                })
            }
            else{
                this.loggedIn = false;
            }
        })
    }
}
</script>

