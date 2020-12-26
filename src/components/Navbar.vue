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
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="hidden-xs-only" slot="activator" text color="grey" v-bind="attrs" v-on="on">
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
           <v-btn text color="grey" >
               <span>Sign Out</span>
               <v-icon right>exit_to_app</v-icon>
           </v-btn>
       </v-toolbar>

       <v-navigation-drawer v-model="drawer" color="teal" app> 

           <v-layout row class="mt-16"> 
               <v-flex xs8 offset-2 class="align-center text-center">
                   <v-avatar width="100" height="100">
                       <img src="/avatar-1.png" alt="">
                   </v-avatar>
                   <p class="mt-6 subtitile-1 white--text">
                       Onkar Telange
                   </p>
                    <div class="mb-4">
                        <Popup @showSnackbar="snackbar = true" />
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

export default {
    name: 'Navbar',
    components: {
        Popup
    },
    data(){
        return {
            drawer: false,
            links: [{
                icon: 'dashboard', 
                text: 'Dashboard',
                route: '/'
            },
            {
                icon: 'note', 
                text: 'Notes',
                route: '/notes'
            },
            {
                icon: 'people', 
                text: 'Team',
                route: '/team'
            }],
            snackbar: false

        }
    },
    methods:{
        toggleDrawer: function(){
            this.drawer = !this.drawer;
        }
    }
}
</script>