import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ExchangeModal from '../components/profile/ExchangeModal.vue'
import QrModal from '../components/profile/QrModal.vue'
import { useProfileStore } from '../stores/profile'

describe('ExchangeModal and QrModal', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders exchange modal when opened in store', async () => {
    const store = useProfileStore()
    const wrapper = mount(ExchangeModal)

    expect(wrapper.find('div[role="dialog"]').exists()).toBe(false)

    store.openExchangeModal()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('div[role="dialog"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Exchange Contact')
  })

  it('validates and submits contact exchange form', async () => {
    const store = useProfileStore()
    store.openExchangeModal()
    const wrapper = mount(ExchangeModal)

    await wrapper.find('input[type="text"]').setValue('Taylor Smith')
    await wrapper.find('input[type="email"]').setValue('taylor@example.com')
    await wrapper.find('form').trigger('submit.prevent')

    expect(store.exchangeSuccess).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Contact details shared')
  })

  it('renders QR code modal when open and can be closed', async () => {
    const store = useProfileStore()
    store.openQrModal()
    const wrapper = mount(QrModal)

    expect(wrapper.find('div[role="dialog"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Digital Card QR')
    expect(wrapper.find('svg[aria-label="Profile QR Code"]').exists()).toBe(true)

    await wrapper.find('button[aria-label="Close QR code modal"]').trigger('click')
    expect(store.isQrModalOpen).toBe(false)
  })
})
