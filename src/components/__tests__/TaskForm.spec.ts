import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import TaskForm from '../TaskForm.vue';
import { useStore } from 'vuex';
import { createRouter, createMemoryHistory } from 'vue-router';

vi.mock('vuex');

const mockDispatch = vi.fn();

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/tasks', name: 'Tasks',component: TaskForm, }]
});

beforeEach(() => {
  mockDispatch.mockReset();
  (useStore as any).mockReturnValue({
    state: {
      tasks: []
    },
    dispatch: mockDispatch
  });
});

describe('TaskForm.vue', () => {
  it('submits new task and navigates to /tasks', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(TaskForm, {
      global: {
        plugins: [router]
      }
    });

    await wrapper.find('#title').setValue('Test Title');
    await wrapper.find('#description').setValue('Test Description');
    await wrapper.find('#category').setValue('Work');
    await wrapper.find('#date').setValue('2025-05-10');
    await wrapper.find('#priority').setValue('High');
    await wrapper.find('#status').setValue('In Progress');

    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(mockDispatch).toHaveBeenCalledWith('addTask', expect.objectContaining({
      title: 'Test Title',
      description: 'Test Description',
      category: 'Work',
      dueDate: '2025-05-10',
      priority: 'High',
      status: 'In Progress'
    }));

    expect(router.currentRoute.value.fullPath).toBe('/tasks');
  });
});
