import { mount } from '@vue/test-utils';
import TaskListView from '../TaskListView.vue';
import { createStore } from 'vuex';
import { nextTick } from 'vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock tasks data
const mockTasks = [
  {
    id: '1',
    title: 'Test Task One',
    description: 'Description 1',
    category: 'Work',
    dueDate: '2025-05-10',
    priority: 'High',
    status: 'Pending'
  },
  {
    id: '2',
    title: 'Another Task',
    description: 'Description 2',
    category: 'Personal',
    dueDate: '2025-05-05',
    priority: 'Low',
    status: 'Completed'
  }
];

describe('TaskListView.vue', () => {
  let store: any;
  let dispatchMock: any;

  beforeEach(() => {
    dispatchMock = vi.fn();
    store = createStore({
      state: {
        tasks: mockTasks
      },
      actions: {
        deletetask: dispatchMock
      }
    });
  });

  it('renders tasks from the store', () => {
    const wrapper = mount(TaskListView, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': { template: '<a><slot /></a>' } 
        }
      }
    });

    expect(wrapper.text()).toContain('Test Task One');
    expect(wrapper.text()).toContain('Another Task');
  });

  it('filters tasks by search query', async () => {
    const wrapper = mount(TaskListView, {
      global: { 
        plugins: [store],
        stubs: { 'router-link': true } 
      }
    });

    const input = wrapper.find('input[type="text"]');
    await input.setValue('Another');
    await nextTick();
    await new Promise((r) => setTimeout(r, 400)); 

    expect(wrapper.text()).toContain('Another Task');
    expect(wrapper.text()).not.toContain('Test Task One');
  });

  it('filters tasks by category', async () => {
    const wrapper = mount(TaskListView, {
      global: { 
        plugins: [store],
        stubs: { 'router-link': true } 
      }
    });
  
    const categorySelect = wrapper.find('[data-testid="filter-category"]');
    expect(categorySelect.exists()).toBe(true);
    await categorySelect.setValue('Personal');

    
    await nextTick();
  
    expect(wrapper.text()).toContain('Another Task');
    expect(wrapper.text()).not.toContain('Test Task One');
  });

  it('dispatches delete action when delete button is clicked', async () => {
    const wrapper = mount(TaskListView, {
      global: { 
        plugins: [store],
        stubs: { 'router-link': true } // router-link
      }
    });

    const deleteButtons = wrapper.findAll('button');
    const deleteButton = deleteButtons.find((btn) => btn.text() === 'Delete');

    await deleteButton?.trigger('click');

    expect(dispatchMock).toHaveBeenCalledWith(expect.anything(), '1');
  });

  it('shows "No records found" when there are no matching tasks', async () => {
    const wrapper = mount(TaskListView, {
      global: { 
        plugins: [store],
        stubs: { 'router-link': true }
      }
    });

    const input = wrapper.find('input[type="text"]');
    await input.setValue('nonexistent');
    await nextTick();
    await new Promise((r) => setTimeout(r, 400));

    expect(wrapper.text()).toContain('No records found');
  });
});
