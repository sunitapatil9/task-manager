import { mount } from '@vue/test-utils'
import Dashboard from '../Dashboard.vue'
import { createStore } from 'vuex'

// Mocking Vuex store
const store = createStore({
  state: {
    tasks: [
      { status: 'Pending', dueDate: '2025-05-01' },
      { status: 'In Progress', dueDate: '2025-05-02' },
      { status: 'Completed', dueDate: '2025-05-03' }
    ]
  }
})

describe('Dashboard.vue', () => {
  it('calculates the correct task statistics', async () => {
    const wrapper = mount(Dashboard, {
      global: {
        plugins: [store]
      }
    })

    // Wait for any DOM updates
    await wrapper.vm.$nextTick()

    // Get the text content for the stats
    const pendingText = wrapper.findAll('.bg-white.dark\\:bg-gray-800.dark\\:text-white')[0].text()
    const inProgressText = wrapper.findAll('.bg-white.dark\\:bg-gray-800.dark\\:text-white')[1].text()
    const completedText = wrapper.findAll('.bg-white.dark\\:bg-gray-800.dark\\:text-white')[2].text()
    const percentCompletedText = wrapper.findAll('.bg-white.dark\\:bg-gray-800.dark\\:text-white')[3].text()

    // Assert the statistics are correct
    expect(pendingText).toContain('Pending: 1')
    expect(inProgressText).toContain('In Progress: 1')
    expect(completedText).toContain('Completed: 1')
    expect(percentCompletedText).toContain('Completion (%): 33.3')
  })
})
