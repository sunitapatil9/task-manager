import { mount } from '@vue/test-utils'
import Header from '../Header.vue'
import { nextTick } from 'vue'

// Mock router-link to avoid real navigation in test
vi.mock('vue-router', async () => {
  const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn()
    }),
    RouterLink: {
      template: '<a><slot /></a>'
    }
  }
})

describe('Header.vue', () => {
  beforeEach(() => {
    document.documentElement.className = '' // Reset dark/light mode
    localStorage.clear() // Clear theme setting
  })

  it('applies dark theme on toggle click', async () => {
    const wrapper = mount(Header)

    const button = wrapper.find('button') // first button is the toggleDarkMode
    await button.trigger('click')
    await nextTick()

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(wrapper.vm.isDarkMode).toBe(true)
  })

  it('applies light theme after clicking dark mode twice', async () => {
    const wrapper = mount(Header)

    const button = wrapper.find('button')
    await button.trigger('click') // dark
    await nextTick()
    await button.trigger('click') // back to light
    await nextTick()

    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
    expect(wrapper.vm.isDarkMode).toBe(false)
  })

  it('renders mobile menu when toggleMobileMenu is triggered', async () => {
    const wrapper = mount(Header)
    const toggleButton = wrapper.findAll('button')[1] // second button is hamburger menu
    await toggleButton.trigger('click')
    await nextTick()

    expect(wrapper.html()).toContain('Dashboard')
    expect(wrapper.html()).toContain('Tasks')
  })
})
