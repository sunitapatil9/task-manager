<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>
  
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
  
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>
  
          <div class="flex justify-center">
            <button
              type="submit"
              class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Log In
            </button>
          </div>
  
          <div v-if="error" class="mt-4 text-red-500 text-center">
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../firebase';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'LoginPage',
    setup() {
      const email = ref('');
      const password = ref('');
      const error = ref('');
      const router = useRouter();
  
      const handleLogin = async () => {
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          router.push('/dashboard');
        } catch (err) {
          error.value = 'Invalid email or password';
        }
      };
  
      return {
        email,
        password,
        error,
        handleLogin
      };
    }
  };
  </script>
  
  <style scoped>
  </style>
  