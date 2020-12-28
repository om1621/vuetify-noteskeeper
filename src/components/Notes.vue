<template>
    <div class="notes pa-4 pt-0">
        <h1 class="headline grey--text ma-3 ma-sm-8 ml-sm-12" v-bind:class="{'text-center': !loggedIn}">
            {{heading}}
        </h1>

        <v-container class="mt-sm-16 mt-3 d-none" v-bind:class="{'d-block': loggedIn}">
            <v-expansion-panels> 
                <v-expansion-panel v-for="(project, i) in projects" :key="i">
                    <v-expansion-panel-header>
                        {{project.title}}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="grey--text">
                        {{project.content}}
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
    </div>
</template>

<script>
import {db, auth} from '../fb'
export default {
    name: 'Notes',
    data(){
        return {
            projects: [],
            loggedIn: false,
            heading: ''
        }
    },
    created(){

        auth.onAuthStateChanged(user => {
            if(user){
                this.loggedIn = true;
                this.heading = "My Projects"

                 db.collection('projects').onSnapshot(res => {
                    const changes = res.docChanges();

                    changes.forEach(change => {
                        if(change.type === 'added' && change.doc.data().userId === user.uid){
                            this.projects.push({
                                ...change.doc.data(),
                                id: change.doc.id
                            });
                        }
                    })
                });
            }
            else{
                this.loggedIn = false;
                this.heading = 'Log in/Sign up to see your own projects'
            }
        })
       
    }
}
</script>