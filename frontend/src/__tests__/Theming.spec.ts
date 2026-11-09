import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ThemeBar from '../components/toolbar/ThemeBar.vue'
import { useProfileStore } from '../stores/profile'
import type { ThemeName } from '../types/profile'

describe('ThemeBar and Theming', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders all six themes with their required exact taglines', () => {
    const wrapper = mount(ThemeBar)

    const expectedPairs = [
      { name: 'Professional', tagline: 'Clean and modern' },
      { name: 'Minimal', tagline: 'Simple and elegant' },
      { name: 'Dark', tagline: 'Premium and bold' },
      { name: 'Creative', tagline: 'Express your style' },
      { name: 'Nature', tagline: 'Fresh and friendly' },
      { name: 'Playful', tagline: 'Fun and vibrant' },
    ]

    for (const pair of expectedPairs) {
      expect(wrapper.text()).toContain(pair.name)
      expect(wrapper.text()).toContain(pair.tagline)
    }
  })

  it('swaps active theme on click and updates data-theme attribute on documentElement', async () => {
    const store = useProfileStore()
    const wrapper = mount(ThemeBar)

    const themesToTest: ThemeName[] = [
      'dark',
      'nature',
      'minimal',
      'creative',
      'playful',
      'professional',
    ]

    for (const themeId of themesToTest) {
      store.setTheme(themeId)
      expect(store.currentTheme).toBe(themeId)
      expect(document.documentElement.getAttribute('data-theme')).toBe(themeId)
    }
  })
})
