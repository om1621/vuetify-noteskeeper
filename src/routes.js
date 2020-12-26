import Dashboard from './components/Dashboard.vue';
import Notes from './components/Notes.vue';
import Team from './components/Team.vue';

export default [
    {
        path: '/',
        component: Dashboard
    },
    {
        path: '/notes',
        component: Notes
    },
    {
        path: '/team',
        component: Team
    }
]