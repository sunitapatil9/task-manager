import { createStore } from "vuex";
import { v4 as uuid } from 'uuid';

export interface Task {
    id?:String,
    title:String,
    description?:String,
    category? :'Work' | 'Personal' | 'Learning',
    dueDate? : String,
    priority?: 'Low '| 'Medium' | 'High',
    status?: 'Pending' | 'In Progress' | 'Completed'
}
interface State {
    tasks : Task[];
}

const savedTask = localStorage.getItem("tasks");
const state :State = {
    tasks : savedTask ? JSON.parse(savedTask) :[]
}

const store  = createStore({
    state,
    mutations:{
        ADD_TASK (state, task :Task) {
            state.tasks.push(task);
            localStorage.setItem("tasks",JSON.stringify(state.tasks));
        },
        UPDATE_TASK(state, updateTask :Task){
            const index = state.tasks.findIndex(task => task.id === updateTask.id );
            if(index !== -1){
                // state.tasks[index] = {...updateTask};
                state.tasks[index] = updateTask;
                localStorage.setItem("tasks",JSON.stringify(state.tasks));
            }
        },
        DELETE_TASK(state,id){
            state.tasks = state.tasks.filter(task => task.id !== id);
            localStorage.setItem("tasks",JSON.stringify(state.tasks));
        }
    },
    actions :{
        addTask({commit},taskData:Task){
            const task:Task ={...taskData, id:uuid()}
            commit('ADD_TASK' , task);
        },
        updateTask({commit} , updateTask :Task){
            console.log("update task");
            commit('UPDATE_TASK' , updateTask);
        },
        deletetask({commit} , id){
            commit('DELETE_TASK' , id);
        }
    }
})

export default store;
