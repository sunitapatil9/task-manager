import { mount } from '@vue/test-utils';
import Calendar from '../Calender.vue';
import { createStore } from 'vuex';

// Mock Vuex store
const store = createStore({
  state: {
    tasks: [],
  },
});

describe('Calendar.vue', () => {
  it('renders the calendar overview correctly', () => {
    const wrapper = mount(Calendar, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.text()).toContain('Calendar Overview');
  });
});
