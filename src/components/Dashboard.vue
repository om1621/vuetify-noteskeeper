<template>
    <div class="dashboard pa-4 pt-0">
        <h1 class="headline grey--text ma-3 ma-sm-8 ml-sm-12">
            Dashboard
        </h1>

        <v-container class="mt-sm-16 mt-3">

            <v-layout row wrap >
                <v-tooltip top>
                    <template v-slot:activator="{on, attrs}">
                         <v-btn slot="activator" text color="grey" class="ma-3 pa-2" @click="sortBy('title')" v-bind="attrs" v-on="on">
                            <v-icon left>
                                folder
                            </v-icon>
                            <span class="text-lowercase" >
                                by project name
                            </span>
                        </v-btn>
                    </template>
                    <span>
                        Sorts projects by project name
                    </span>
                </v-tooltip>

                 <v-tooltip top>
                    <template v-slot:activator="{on, attrs}">
                         <v-btn slot="activator" text color="grey" class="ma-3 pa-2" @click="sortBy('dueDate')" v-bind="attrs" v-on="on">
                            <v-icon left>
                                 date_range
                            </v-icon>
                            <span class="text-lowercase" >
                                by due Date
                            </span>
                        </v-btn>
                    </template>
                    <span>
                        Sorts projects by dueDate
                    </span>
                </v-tooltip>
            </v-layout>

            <v-card>
                <v-layout row wrap class="grey--text" v-for="(project, i) in projects" :key="i" :class="`ma-0 project-card ${project.status}`">
                    <v-flex xs12 md6 class="pa-3" >
                        <span class="caption">
                            Project Name
                        </span>
                        <p class="subtitle-1 mb-0">
                            {{project.title}}
                        </p>
                    </v-flex>
                    <v-flex xs4 md2 class="pa-3" >
                        <span class="caption">
                            Due Date 
                        </span>
                        <p class="subtitle-1 mb-0">
                            {{project.dueDate}}
                        </p>
                    </v-flex>
                    <v-flex xs4 md2 class="pa-3" >
                        <span class="caption">
                            Person
                        </span>
                        <p class="subtitle-1 mb-0">
                            {{project.person}}
                        </p>
                    </v-flex>
                    <v-flex xs4 md2 class="pa-3" >
                        <span class="caption">
                            Status
                        </span>
                        <br>
                            <v-chip  small flat :class="`white--text mt-2 chips ${project.status}`">
                                {{project.status}}
                            </v-chip>
                    </v-flex>
                    <v-flex xs12>
                         <v-divider></v-divider>
                    </v-flex>
                </v-layout>
            </v-card>
             
        </v-container>
    </div>
</template>

<script>
import db from '../fb';

export default {
    name: 'Dashboard',
    data(){
       return {
           projects: [
               

           ]
       }
    },
    methods: {
        sortBy: function(param) {
            this.projects = this.projects.sort((a, b) => a[param].toLowerCase() < b[param].toLowerCase() ? -1 : 1);
            
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

<style scoped>

.project-card.completed{
    border-left: 4px solid teal;
}

.project-card.ongoing{
    border-left: 4px solid orange;
}

.project-card.pending{
    border-left: 4px solid rgb(255, 80, 80);
}

.chips.completed{
    background-color: teal !important;
}

.chips.ongoing{
    background-color: orange !important;
}

.chips.pending{
    background-color: rgb(255, 80, 80) !important;
}

</style>