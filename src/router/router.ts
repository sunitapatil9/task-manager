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
        component : Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path :'/tasks',
        name : 'TaskListView',
        component : TaskListView,
        meta: { requiresAuth: true },
    },
    {
        path : '/task/new',
        name : 'TaskForm',
        component : TaskForm,
        meta: { requiresAuth: true },
    },
    {
        path :'/task/:id?',
        name : 'EditTask',
        component : TaskForm,
        props :true,
        meta: { requiresAuth: true },
    },
    {
        path : '/calendar',
        name: "Calender",
        component : Calender,
        meta: { requiresAuth: true },
    }
];


const router = createRouter({
    history : createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
    onAuthStateChanged(auth, (user) => {
      const isAuthenticated = user !== null;
  
      if (requiresAuth && !isAuthenticated) {
        // If the route requires authentication and the user is not authenticated
        next({ name: 'LoginPage' });
      } else if (isAuthenticated && to.name === 'LoginPage') {
        // If the user is already authenticated and tries to go to the login page
        // redirect them to their last visited page (e.g., /dashboard)
        next({ name: 'Dashboard' });
      } else {
        next(); // Allow navigation if the user is authenticated or the route doesn't require auth
      }
    });
  });  
  

export default router;