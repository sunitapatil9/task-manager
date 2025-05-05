import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import Dashboard from '../Dashboard.vue'; 

describe('Dashboard.vue', () => {
  let store: any;

  beforeEach(() => {
    // Mocking Vuex store
    store = createStore({
      state: {
        tasks: [
          { id: 1, status: 'Pending' },
          { id: 2, status: 'In Progress' },
          { id: 3, status: 'Completed' },
          { id: 4, status: 'Completed' },
        ],
      },
      getters: {},
      actions: {},
      mutations: {},
    });
  });

  it('calculates the correct task statistics', async () => {
    const wrapper = mount(Dashboard, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.vm.total).toBe(4); 
    expect(wrapper.vm.completed).toBe(2); 
    expect(wrapper.vm.inprogress).toBe(1); 
    expect(wrapper.vm.pending).toBe(1);
    expect(wrapper.vm.precentCompleted).toBe('50.0'); 

    // Check rendered correctly or not
    expect(wrapper.text()).toContain('Pending : 1');
    expect(wrapper.text()).toContain('In Progress : 1');
    expect(wrapper.text()).toContain('Completed : 2');
    expect(wrapper.text()).toContain('Completion(percentage) : 50.0 %');
  });
});
