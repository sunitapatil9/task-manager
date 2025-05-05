<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Task } from '../store/store';

const store = useStore();
const tasks = computed(() => store.state.tasks);

const groupedByDate = computed(() => {
  const grouped: Record<string, Task[]> = {};
  tasks.value.forEach(task => {
    const date = task.dueDate || 'No Date';
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(task);
  });
  return grouped;
});
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
  <h2 class="text-xl sm:text-2xl font-bold mb-4 text-center">Calendar Overview</h2>
  <div 
    v-for="(tasksOnDate, date) in groupedByDate" 
    :key="date" 
    class="mb-6 bg-white shadow-md dark:bg-gray-800 rounded-lg p-4 "
  >
    <h3 class="text-lg font-semibold mb-2 border-b pb-2">{{ date }}</h3>
    <ul class="list-disc ml-6">
      <li 
        v-for="task in tasksOnDate" 
        :key="task.id"
        class="text-sm sm:text-base"
      >
        <strong>{{ task.title }}</strong> - {{ task.status }} ({{ task.priority }})
      </li>
    </ul>
  </div>
</div>

</template>
