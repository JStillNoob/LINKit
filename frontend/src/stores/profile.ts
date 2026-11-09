import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ProfileData, ThemeName, ProfileMode, ExchangeContactInput } from '@/types/profile'

const INITIAL_PROFILE: ProfileData = {
  id: 'usr_placeholder_01',
  name: 'Alex Rivera',
  headline: 'Product Designer | Frontend Engineer',
  avatarUrl: '',
  avatarInitials: 'AR',
  isVerified: true,
  phone: '+15550192834',
  email: 'alex.rivera@example.com',
  website: 'https://example.com',
  personalLinks: [
    {
      id: 'pl-1',
      title: 'Portfolio',
      subtitle: 'Check my work',
      url: 'https://example.com/portfolio',
      icon: 'globe',
    },
    {
      id: 'pl-2',
      title: 'GitHub',
      subtitle: 'See my projects',
      url: 'https://github.com/example-placeholder',
      icon: 'github',
    },
    {
      id: 'pl-3',
      title: 'Email',
      subtitle: 'Send me a message',
      url: 'mailto:alex.rivera@example.com',
      icon: 'mail',
    },
  ],
  businessLinks: [
    {
      id: 'bl-1',
      title: 'LinkedIn',
      subtitle: 'Connect with me',
      url: 'https://linkedin.com/in/example-placeholder',
      icon: 'linkedin',
    },
    {
      id: 'bl-2',
      title: 'GitHub',
      subtitle: 'See my projects',
      url: 'https://github.com/example-placeholder',
      icon: 'github',
    },
    {
      id: 'bl-3',
      title: 'Portfolio',
      subtitle: 'Check my work',
      url: 'https://example.com/portfolio',
      icon: 'globe',
    },
    {
      id: 'bl-4',
      title: 'Email',
      subtitle: 'Send me a message',
      url: 'mailto:contact@example.com',
      icon: 'mail',
    },
  ],
}

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<ProfileData>(INITIAL_PROFILE)
  const currentTheme = ref<ThemeName>('professional')
  const profileMode = ref<ProfileMode>('business')
  const isExchangeModalOpen = ref(false)
  const isQrModalOpen = ref(false)
  const exchangeSuccess = ref(false)
  const status = ref<'idle' | 'loading' | 'success' | 'error'>('success')
  const errorMessage = ref<string>('')

  const activeLinks = computed(() => {
    return profileMode.value === 'personal'
      ? profile.value.personalLinks
      : profile.value.businessLinks
  })

  function setTheme(theme: ThemeName) {
    currentTheme.value = theme
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }

  function setProfileMode(mode: ProfileMode) {
    profileMode.value = mode
  }

  function openExchangeModal() {
    exchangeSuccess.value = false
    isExchangeModalOpen.value = true
  }

  function closeExchangeModal() {
    isExchangeModalOpen.value = false
  }

  function openQrModal() {
    isQrModalOpen.value = true
  }

  function closeQrModal() {
    isQrModalOpen.value = false
  }

  function submitContactExchange(input: ExchangeContactInput): boolean {
    if (!input.name.trim() || !input.email.trim()) {
      return false
    }
    exchangeSuccess.value = true
    return true
  }

  function simulateState(nextState: 'idle' | 'loading' | 'success' | 'error') {
    status.value = nextState
    if (nextState === 'error') {
      errorMessage.value = 'Unable to load profile data. Please verify network connection.'
    } else {
      errorMessage.value = ''
    }
  }

  return {
    profile,
    currentTheme,
    profileMode,
    activeLinks,
    isExchangeModalOpen,
    isQrModalOpen,
    exchangeSuccess,
    status,
    errorMessage,
    setTheme,
    setProfileMode,
    openExchangeModal,
    closeExchangeModal,
    openQrModal,
    closeQrModal,
    submitContactExchange,
    simulateState,
  }
})
