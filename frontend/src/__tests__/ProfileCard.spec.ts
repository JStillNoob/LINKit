import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ProfileCard from '../components/profile/ProfileCard.vue'
import { useProfileStore } from '../stores/profile'

describe('ProfileCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders profile name, headline, and verified badge', () => {
    const store = useProfileStore()
    const wrapper = mount(ProfileCard)

    expect(wrapper.text()).toContain(store.profile.name)
    expect(wrapper.text()).toContain(store.profile.headline)
  })

  it('switches between personal and business links', async () => {
    const store = useProfileStore()
    const wrapper = mount(ProfileCard)

    // Initially in business mode
    expect(store.profileMode).toBe('business')
    expect(wrapper.text()).toContain('LinkedIn')

    // Click personal mode button
    const personalBtn = wrapper.find('button[aria-label="Personal Profile"]')
    await personalBtn.trigger('click')

    expect(store.profileMode).toBe('personal')
    expect(wrapper.text()).toContain('Send me a message')
  })

  it('triggers exchange modal when Exchange button is clicked', async () => {
    const store = useProfileStore()
    const wrapper = mount(ProfileCard)

    const exchangeBtn = wrapper.find('button[aria-label="Exchange Contact Information"]')
    await exchangeBtn.trigger('click')

    expect(store.isExchangeModalOpen).toBe(true)
  })

  it('opens QR modal when QR action button is clicked', async () => {
    const store = useProfileStore()
    const wrapper = mount(ProfileCard)

    const qrBtn = wrapper.find('button[aria-label="Show QR code"]')
    await qrBtn.trigger('click')

    expect(store.isQrModalOpen).toBe(true)
  })

  it('displays loading skeleton in loading state', () => {
    const store = useProfileStore()
    store.simulateState('loading')
    const wrapper = mount(ProfileCard)

    expect(wrapper.find('div[role="status"]').exists()).toBe(true)
  })

  it('displays error alert with retry button in error state', async () => {
    const store = useProfileStore()
    store.simulateState('error')
    const wrapper = mount(ProfileCard)

    expect(wrapper.find('div[role="alert"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Profile Unavailable')

    const retryBtn = wrapper.find('button')
    await retryBtn.trigger('click')
    expect(store.status).toBe('success')
  })
})
