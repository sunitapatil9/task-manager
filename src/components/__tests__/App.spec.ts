import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Header from '../../App.vue'

describe('Header.vue', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    });

    it('renders Dark Mode button with correct label', async () => {
      const wrapper = mount(Header);

      // Initially, it should show "Dark Mode" if localStorage is empty or "light"
      expect(wrapper.text()).toContain('Dark Mode');
    });

    it('toggles Dark Mode and updates localStorage when button is clicked', async () => {
      const wrapper = mount(Header);

      // Initially, it should be light mode
      expect(wrapper.text()).toContain('Dark Mode');
      expect(localStorage.getItem('theme')).toBeNull();

      // Simulate button click to toggle dark mode
      await wrapper.find('button').trigger('click');

      // After the first click, it should switch to dark mode
      expect(wrapper.text()).toContain('Light Mode');
      expect(localStorage.getItem('theme')).toBe('dark');

      // Simulate button click again to toggle back to light mode
      await wrapper.find('button').trigger('click');

      // After the second click, it should switch back to light mode
      expect(wrapper.text()).toContain('Dark Mode');
      expect(localStorage.getItem('theme')).toBe('light');
    });

    it('applies dark theme on mounted if localStorage.theme is "dark"', () => {
      localStorage.setItem('theme', 'dark');
      const wrapper = mount(Header);

      // After mounting, it should add 'dark' class to document.documentElement
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('applies light theme on mounted if localStorage.theme is "light"', async () => {
      // Set localStorage to light mode
      localStorage.setItem('theme', 'light');
      
      // Mount the Header component
      const wrapper = mount(Header);

      // Wait for DOM updates to complete
      await nextTick(); // Ensure all DOM updates are applied

      // Check the localStorage value to ensure it's set correctly
      console.log(localStorage.getItem('theme')); // Should print 'light'

      // Check if 'dark' class is present or not on the document element
      const hasDarkClass = document.documentElement.classList.contains('dark');
      console.log('Has dark class after mounting:', hasDarkClass); // Debugging output

      // After mounting, it should not have 'dark' class
      expect(hasDarkClass).toBe(false);

      // Also ensure the button text says 'Dark Mode'
      expect(wrapper.text()).toContain('Dark Mode');
    });
});
