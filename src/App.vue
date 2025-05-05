<script lang="ts">
import { ref, onMounted } from 'vue';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './components/Header.vue';

export default {
  components: {
    Header,
  },
  setup() {
    const isAuthenticated = ref(false);

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
          isAuthenticated.value = true;
        } else {
          isAuthenticated.value = false;
        }
      });
    });

    return {
      isAuthenticated,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
    <div v-if="isAuthenticated">
      <Header /> 
      <router-view />
    </div>

    <div v-else>
      <router-view />
    </div>
  </div>
</template>
