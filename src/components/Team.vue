<template>
    <div class="team pa-4 pt-0">
        <h1 class="headline grey--text ma-3 ma-sm-8 ml-sm-12">
            Team
        </h1>

        <v-container class="mt-sm-16 mt-3">
            <v-layout row wrap >
                <v-flex xs12 sm6 mg4 lg3 v-for="(member, i) in Members" :key="i" >
                    <v-card class="text-xs-center pa-3 ma-6 ma-sm-3">
                        <v-responsive class="pt-4" >
                            <v-avatar height="100" width="100" class="grey lighten-2">
                                <img :src="member.avatar">
                            </v-avatar>
                        </v-responsive>
                        <v-card-title class=" grey--text" style="display: block">
                            {{member.title}}
                        </v-card-title>
                        <v-card-subtitle class="grey--text">
                           {{member.role}}
                        </v-card-subtitle>
                        <v-card-actions >
                            <v-btn text color="grey" left>
                                <v-icon left>
                                    message
                                </v-icon>
                                <span>
                                    Message
                                </span>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'Team',
    data(){
        return {
            Members : [
                {
                    title: "Onkar Telange",
                    role: "Web Developer",
                    avatar: "/avatar-1.png"
                },
                {
                    title: "Rayu",
                    role: "Web Developer",
                    avatar: "/avatar-2.png"
                },
                {
                    title: "Chun Li",
                    role: "Web Designer",
                    avatar: "/avatar-5.png"
                },
                {
                    title: "Goken",
                    role: "Sales Guru",
                    avatar: "/avatar-4.png"
                }
            ]
        }
    }
}
</script>

<style scoped>
    .text-xs-center{
        text-align: center;
    }
</style>