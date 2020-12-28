<template>
    <v-dialog max-width="600" v-model="dialog">
        <template v-slot:activator="{on, attrs}">
            <v-btn v-bind="attrs" v-on="on" class="blue darken-1 white--text" >
                Add New Project
            </v-btn>
        </template>
        <v-card class="py-6 px-4">
            <h2 class=" text-center grey--text">Add New Project</h2>
            <v-form ref="form" v-model="valid">
                <v-text-field v-model="title" label="title" prepend-icon="message" :rules="inputRules" ></v-text-field>
                <v-textarea v-model="content" label="info" prepend-icon="info" :rules="inputRules"></v-textarea>
                <v-menu>
                    <template v-slot:activator="{on, attrs}" >
                        <v-text-field :value="formatedDate" label="Due date" prepend-icon="date_range" v-bind="attrs" v-on="on" :rules="inputRules"> </v-text-field>
                    </template>
                    <v-date-picker v-model="due" ></v-date-picker>
                </v-menu>
                <v-select v-model="select" :items="states" item-text="state" item-value="state" label="Select" prepend-icon="query_builder" return-object></v-select>
                <v-btn @click="test" class="teal white--text" :loading="loading">
                    Add Project
                </v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
import {format, parseISO} from 'date-fns'
import {db} from '../fb'
export default {
    name: "Popup",
    props: ['user', 'uid'],
    data(){
        return{
            title: "",
            content: "",
            due: null,
            select: {state: 'completed'},
            states: [{state: 'completed'},
                     {state: 'ongoing'},
                     {state: 'pending'}
            ],
            inputRules: [
                v => v.length >= 5 || "Minimum valid length is 5 characters"
            ],
            valid: true,
            loading: false,
            dialog: false
        }
    },
    methods: {
        test: function() {
           
                if(this.$refs.form.validate()){

                 const project = {
                    title: this.title,
                    content: this.content,
                    dueDate: format(parseISO(this.due), 'do MMM yyyy'),
                    userId: this.uid,
                    person: this.user,
                    status: this.select.state
                }

                db.collection("projects").add(project).then(() => {
                    this.loading = false;
                    this.dialog = false;
                    this.$emit("showSnackbar");
                });
            }
           
        }
    },
    computed: {
        formatedDate(){
            return this.due ? format(parseISO(this.due), 'do MMM yyyy') : '';
        }
    }
}
</script>