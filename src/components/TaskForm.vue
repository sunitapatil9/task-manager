
<template>
    <div class="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4">
      <div class="w-full max-w-xl   bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h1 class="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6 cursor-pointer">New Task</h1>
  
        <form @submit.prevent="handleSubmit">
          <div class="flex items-center gap-2 mt-4"> 
            <label for="title" class="w-32 text-gray-700 dark:text-gray-300">Title: </label>
            <input v-model="task.title" id="title"  type="text" placeholder="Title..." required class="border-2 w-100 p-2 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
  
          <div class="flex items-center gap-2 mt-4">
            <label for="description" class="w-32 text-gray-700 dark:text-gray-300">Description: </label>
            <input v-model="task.description" id="description" type="text" placeholder="Description..." required class="border-2 w-100 p-2 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
  
          <div class="flex items-center gap-2 mt-4">
            <label for="category" class="w-32 text-gray-700 dark:text-gray-300">Category: </label>
            <select v-model="task.category" id="category" class="border-2 w-100 p-2 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600">
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Learning">Learning</option>
            </select>
          </div>
  
          <div class="flex items-center gap-2 mt-4">
            <label for="date" class="w-32 text-gray-700 dark:text-gray-300">Due Date: </label>
            <input v-model="task.dueDate" id="date" type="date" placeholder="Due Date" required class="border-2 w-100 p-2 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
  
          <div class="flex items-center gap-2 mt-4">
            <label for="priority" class="w-32 text-gray-700 dark:text-gray-300">Priority: </label>
            <select v-model="task.priority" id="priority" class="border-2 w-100 p-2 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
  
          <div class="flex items-center gap-2 mt-4">
            <label for="status" class="w-32 text-gray-700 ">Status: </label>
            <select v-model="task.status" id="status" class="border-2 w-100 p-2 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
  
          <div class="mt-4 text-center">
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer">
              {{ isEdit ? 'Update Task' : 'Add Task' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';
  import { Task } from '../store/store'; 
  import { onMounted } from 'vue';
  
  export default {
    name: 'TaskForm',
    setup() {
      const isEdit = ref(false);
      const task = ref<Task>({
        id: '',
        title: '',
        description: '',
        category: 'Work',
        dueDate: '',
        priority: 'Low',
        status: 'Pending',
      });
  
      const store = useStore(); 
      const router = useRouter(); 
      const route = useRoute();

      onMounted(() =>{
        const id  = route.params.id as string;
        console.log(id);
        if(id){
            const foundTask = store.state.tasks.find((t :Task) => t.id === id);
            console.log(foundTask);
            if(foundTask){
                task.value = { ...foundTask };
                isEdit.value = true;
            }
        }
      })
  
      // Handle form submission
      const handleSubmit = () => {
        if (isEdit.value) {
          store.dispatch('updateTask', task.value); 
        } else {
          store.dispatch('addTask', task.value); 
        }
        router.push('/tasks'); 
      };
  
      return {
        task,
        isEdit,
        handleSubmit,
      };
    },
  };
  </script>
  