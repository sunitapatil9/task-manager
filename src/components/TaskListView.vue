<script lang="ts">

import { useStore } from 'vuex';
import { computed } from 'vue';
import { ref } from 'vue';
import { watch } from 'vue';
import { debounce } from 'lodash'
import { Task } from '../store/store';
// import type { Task } from '../store/store';
 
export default {
    name : 'TaskListView',
    setup(){
        const store = useStore();
        const tasks = computed<Task[]>(() => store.state.tasks);

        const searchQuery = ref('');
        const debouncedSearch = ref('');
        const filterCategory = ref('');
        const filterStatus = ref('');
        const filterPriority = ref('');
        const sortBy = ref('');

        watch(searchQuery , (newVal) =>{
            updateSearch(newVal);
        })

        const updateSearch = debounce((value :string) =>{
            debouncedSearch.value = value;
        })

        const filteredtasks = computed<Task[]>(() =>{
            let filtered = tasks.value;
            if(debouncedSearch.value){
                filtered = filtered.filter(task  => task.title.toLowerCase().includes(debouncedSearch.value.toLocaleLowerCase()));
            }
            
            //filter category value
            if(filterCategory.value){
                filtered = filtered.filter(task => task.category === filterCategory.value);
            }
            if (filterStatus.value) {
                filtered = filtered.filter(task => task.status === filterStatus.value);
            }

            if (filterPriority.value) {
                filtered = filtered.filter(task => task.priority === filterPriority.value);
            }

            ///sorting
            if (sortBy.value === 'dueDate') {
                filtered.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
          } else if (sortBy.value === 'priority') {
                const priorityOrder = { Low: 1, Medium: 2, High: 3 };
                filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
            }
            return filtered;
        })
        //  console.log(filteredtasks.value.length);
        
        const deleteTask = (id : String) =>{
            console.log(id);
            store.dispatch('deletetask' , id);
        }
        return{
            tasks,
            deleteTask,
            searchQuery,
            debouncedSearch,
            filterCategory,
            filterStatus,
            filterPriority,
            filteredtasks,
            sortBy
        }
    }
}



</script>

<template>
    <div class="p-4">
      <!-- Header with Add Task button -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 class="text-xl font-bold">Task List</h1>
        <router-link to="/task/new">
          <button class="bg-gray-700 text-white px-4 py-2 rounded-md w-full md:w-auto cursor-pointer">
            Add Task
          </button>
        </router-link>
      </div>
  
      <!-- Filters -->
      <div class="flex flex-col md:flex-row flex-wrap gap-4 mb-6">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by title..."
          class="p-2 border rounded w-full md:w-1/5"
        />
  
        <select v-model="filterCategory" class="p-2 border rounded w-full md:w-1/5" data-testid="filter-category">
          <option value="">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Learning">Learning</option>
        </select>
  
        <select v-model="filterStatus" class="p-2 border rounded w-full md:w-1/5">
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
  
        <select v-model="filterPriority" class="p-2 border rounded w-full md:w-1/5">
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
  
        <select v-model="sortBy" class="p-2 border rounded w-full md:w-1/5">
          <option value="">Sort by</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
  
      <!-- Table with scroll on small screens -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border text-sm">
          <thead class="bg-gray-200 dark:bg-gray-700 text-left">
            <tr>
              <th class="border p-2">Title</th>
              <th class="border p-2">Description</th>
              <th class="border p-2">Category</th>
              <th class="border p-2">Due Date</th>
              <th class="border p-2">Priority</th>
              <th class="border p-2">Status</th>
              <th class="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody v-if="filteredtasks.length > 0">
            <tr v-for="task in filteredtasks" :key="task.id" class="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td class="border p-2">{{ task.title }}</td>
              <td class="border p-2">{{ task.description }}</td>
              <td class="border p-2">{{ task.category }}</td>
              <td class="border p-2">{{ task.dueDate }}</td>
              <td class="border p-2">{{ task.priority }}</td>
              <td class="border p-2">{{ task.status }}</td>
              <td class="border p-2 space-x-2">
                <router-link :to="`/task/${task.id}`">
                  <button class="bg-blue-600 text-white px-2 py-1 rounded cursor-pointer">Edit</button>
                </router-link>
                <button @click="deleteTask(task.id)" class="bg-red-600 text-white px-2 py-1 rounded cursor-pointer">Delete</button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="7" class="text-center p-4 text-gray-500">No records found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  