
 <template>
    <div class="p-4">
      <!-- Section: Overall Statistics -->
      <h1 class="text-2xl mb-4 font-semibold">Dashboard Overview</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white dark:bg-gray-800 dark:text-white p-4 rounded shadow">Pending: {{ pending }}</div>
        <div class="bg-white dark:bg-gray-800 dark:text-white p-4 rounded shadow">In Progress: {{ inProgress }}</div>
        <div class="bg-white dark:bg-gray-800 dark:text-white p-4 rounded shadow">Completed: {{ completed }}</div>
        <div class="bg-white dark:bg-gray-800 dark:text-white p-4 rounded shadow">
          Completion (%): {{ percentCompleted }}%
        </div>
      </div>
  
      <!-- Section: Calendar Overview -->
      <h2 class="text-xl font-semibold mb-4">Tasks by Calendar Date</h2>
      <div
        v-for="(tasksOnDate, date) in groupedByDate"
        :key="date"
        class="mb-6 bg-white dark:bg-gray-800 dark:text-white rounded-lg p-4 shadow"
      >
        <h3 class="text-lg font-bold mb-2 border-b pb-2">{{ date }}</h3>
        <ul class="list-disc ml-6 space-y-1 text-sm">
          <li>Pending: {{ tasksOnDate.filter(task => task.status === 'Pending').length }}</li>
          <li>In Progress: {{ tasksOnDate.filter(task => task.status === 'In Progress').length }}</li>
          <li>Completed: {{ tasksOnDate.filter(task => task.status === 'Completed').length }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { Task } from '../store/store';
  
  export default {
    name: 'Dashboard',
    setup() {
      const store = useStore();
  
      const tasks = computed<Task[]>(() => store.state.tasks);
  
      const total = computed(() => tasks.value.length);
      const pending = computed(() => tasks.value.filter(t => t.status === 'Pending').length);
      const inProgress = computed(() => tasks.value.filter(t => t.status === 'In Progress').length);
      const completed = computed(() => tasks.value.filter(t => t.status === 'Completed').length);
      const percentCompleted = computed(() =>
        total.value ? ((completed.value / total.value) * 100).toFixed(1) : '0'
      );
  
      // Group tasks by dueDate
      const groupedByDate = computed(() => {
        const grouped: Record<string, Task[]> = {};
        tasks.value.forEach(task => {
          const date = task.dueDate || 'No Due Date';
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(task);
        });
        return grouped;
      });
  
      return {
        total,
        pending,
        inProgress,
        completed,
        percentCompleted,
        groupedByDate
      };
    }
  };
  </script>

  
