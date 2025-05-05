<template>
    <nav class="p-4 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">
      <div>
        <button
          @click="toggleDarkMode"
          class="border p-2 bg-gray-600 text-white rounded-md mr-4 cursor-pointer"
        >
          {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
        </button>
      </div>

      <div class="text-xl font-semibold text-gray-800 dark:text-white">
        <router-link to="/dashboard">Task Manager</router-link>
      </div>

      <div class="hidden md:flex space-x-6">
        <router-link to="/dashboard" class="px-2 py-1 hover:underline text-gray-800 dark:text-white">Dashboard</router-link>
        <router-link to="/tasks" class="px-2 py-1 hover:underline text-gray-800 dark:text-white">Tasks</router-link>
        <button class="px-3 py-1 bg-gray-500 text-white rounded-md cursor-pointer" @click="logout">Logout</button>
      </div>

      <div class="md:hidden flex items-center">
        <button @click="toggleMobileMenu" class="text-gray-800 dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </nav>
  
    <div v-if="isMobileMenuOpen" class="md:hidden bg-gray-100 dark:bg-gray-800 p-4 space-y-4">
      <router-link to="/dashboard" class="block text-gray-800 dark:text-white hover:underline">Dashboard</router-link>
      <router-link to="/tasks" class="block text-gray-800 dark:text-white hover:underline">Tasks</router-link>
      <button class="w-full bg-gray-500 text-white p-2 rounded-md" @click="logout">Logout</button>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import { signOut } from 'firebase/auth'; 
  import { auth } from '../firebase';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const isDarkMode = ref(false);
      const router = useRouter();
      const isMobileMenuOpen = ref(false);
  
      const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value;
        const html = document.documentElement;
        if (isDarkMode.value) {
          html.classList.add('dark');
          localStorage.theme = 'dark';
        } else {
          html.classList.remove('dark');
          localStorage.theme = 'light';
        }
      };
  
      const logout = async () => {
        try {
          await signOut(auth);
          router.push('/');
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };
  
      const toggleMobileMenu = () => {
        isMobileMenuOpen.value = !isMobileMenuOpen.value;
      };
  
      return {
        toggleDarkMode,
        isDarkMode,
        logout,
        toggleMobileMenu,
        isMobileMenuOpen
      };
    },
  };
  </script>
  
  