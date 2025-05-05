import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import TaskListView from "../components/TaskListView.vue"
import TaskForm from "../components/TaskForm.vue"
import Calender from '../components/Calender.vue'
import Login from '../components/Login.vue'
import { auth } from '../firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

const routes =[
    {
        path :'/',
        name :'LoginPage',
        component : Login
    },
    {
        path :'/dashboard',
        name :'Dashboard',
        component : Dashboard
    },
    {
        path :'/tasks',
        name : 'TaskListView',
        component : TaskListView,
    },
    {
        path : '/task/new',
        name : 'TaskForm',
        component : TaskForm,
    },
    {
        path :'/task/:id?',
        name : 'EditTask',
        component : TaskForm,
        props :true
    },
    {
        path : '/calendar',
        name: "Calender",
        component : Calender
    }
];


const router = createRouter({
    history : createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    onAuthStateChanged(auth, (user) => {
      const isAuthenticated = user !== null;
      if (to.name === 'LoginPage' && isAuthenticated) {
        next('/dashboard');
      } else {
        next();
      }
    });
  });

export default router;