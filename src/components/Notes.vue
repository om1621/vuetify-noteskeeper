<template>
    <div class="notes pa-4 pt-0">
        <h1 class="headline grey--text ma-3 ma-sm-8 ml-sm-12">
            Notes 
        </h1>

        <v-container class="mt-sm-16 mt-3">
            <v-expansion-panels>
                <v-expansion-panel v-for="(project, i) in myProjects" :key="i">
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
import db from '../fb'
export default {
    name: 'Notes',
    data(){
        return {
            projects: []
        }
    },
    computed:{
        myProjects: function() {
            return this.projects.filter((project) => project.person === "Onkar Telange")  
        }
    },
    created(){
        db.collection('projects').onSnapshot(res => {
            const changes = res.docChanges();

            changes.forEach(change => {
                if(change.type === 'added'){
                    this.projects.push({
                        ...change.doc.data(),
                        id: change.doc.id
                    });
                }
            })
        });
    }
}
</script>