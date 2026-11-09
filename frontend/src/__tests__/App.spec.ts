import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import router from '../router'
import App from '../App.vue'

describe('App and Router', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    await router.push('/')
    await router.isReady()
  })

  it('renders real full-screen mobile profile on root / route', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })
    await router.isReady()

    // Real profile view has no fake status bar or device frame
    expect(wrapper.text()).not.toContain('9:41')
    expect(wrapper.text()).toContain('Save Contact')
    expect(wrapper.text()).toContain('Alex Rivera')
  })

  it('renders design preview route /preview with device frame and theme bar', async () => {
    await router.push('/preview')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('9:41')
    expect(wrapper.find('aside[aria-label="Theme selector and preview controls"]').exists()).toBe(
      true,
    )
    expect(wrapper.text()).toContain('LINK')
  })

  it('renders real profile route /:username directly', async () => {
    await router.push('/alex')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).not.toContain('9:41')
    expect(wrapper.text()).toContain('Save Contact')
  })
})
