<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useProfileStore } from '@/stores/profile'
import IconClose from '@/components/icons/IconClose.vue'

const store = useProfileStore()

const name = ref('')
const email = ref('')
const phone = ref('')
const notes = ref('')
const nameInputRef = ref<HTMLInputElement | null>(null)

watch(
  () => store.isExchangeModalOpen,
  (isOpen) => {
    if (isOpen) {
      name.value = ''
      email.value = ''
      phone.value = ''
      notes.value = ''
      nextTick(() => {
        nameInputRef.value?.focus()
      })
    }
  },
)

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && store.isExchangeModalOpen) {
    store.closeExchangeModal()
  }
}

function handleSubmit() {
  if (!name.value.trim() || !email.value.trim()) return

  store.submitContactExchange({
    name: name.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    notes: notes.value.trim(),
  })
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div
    v-if="store.isExchangeModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    @click.self="store.closeExchangeModal"
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exchange-dialog-title"
      class="w-full max-w-sm rounded-[24px] bg-surface border border-line p-6 shadow-2xl text-text transition-all"
    >
      <div class="flex items-center justify-between pb-4 border-b border-line">
        <h2 id="exchange-dialog-title" class="text-base font-semibold text-text">
          Exchange Contact
        </h2>
        <button
          type="button"
          aria-label="Close exchange contact modal"
          @click="store.closeExchangeModal"
          class="flex items-center justify-center w-8 h-8 rounded-full bg-surface-subtle text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-accent"
        >
          <IconClose />
        </button>
      </div>

      <div v-if="store.exchangeSuccess" class="py-6 text-center space-y-3">
        <div
          class="w-12 h-12 mx-auto rounded-full bg-surface-subtle flex items-center justify-center text-text"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-6 h-6"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p class="text-sm font-medium text-text">Contact details shared</p>
        <p class="text-xs text-muted">
          Your information has been sent to {{ store.profile.name }}.
        </p>
        <button
          type="button"
          @click="store.closeExchangeModal"
          class="w-full mt-4 py-2.5 px-4 rounded-full bg-accent text-accent-contrast text-sm font-semibold hover:opacity-90 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-accent"
        >
          Done
        </button>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="mt-4 space-y-3.5">
        <div>
          <label for="exchange-name" class="block text-xs font-medium text-muted mb-1">
            Your Name *
          </label>
          <input
            id="exchange-name"
            ref="nameInputRef"
            v-model="name"
            type="text"
            required
            placeholder="Jane Doe"
            class="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-line text-text text-sm focus:outline-hidden focus:border-text placeholder:text-muted/60"
          />
        </div>

        <div>
          <label for="exchange-email" class="block text-xs font-medium text-muted mb-1">
            Your Email *
          </label>
          <input
            id="exchange-email"
            v-model="email"
            type="email"
            required
            placeholder="jane@example.com"
            class="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-line text-text text-sm focus:outline-hidden focus:border-text placeholder:text-muted/60"
          />
        </div>

        <div>
          <label for="exchange-phone" class="block text-xs font-medium text-muted mb-1">
            Phone Number
          </label>
          <input
            id="exchange-phone"
            v-model="phone"
            type="tel"
            placeholder="+1 555 010 9988"
            class="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-line text-text text-sm focus:outline-hidden focus:border-text placeholder:text-muted/60"
          />
        </div>

        <div>
          <label for="exchange-notes" class="block text-xs font-medium text-muted mb-1">
            Note (optional)
          </label>
          <textarea
            id="exchange-notes"
            v-model="notes"
            rows="2"
            placeholder="Nice meeting you at the conference"
            class="w-full px-3.5 py-2 rounded-xl bg-surface-subtle border border-line text-text text-sm focus:outline-hidden focus:border-text placeholder:text-muted/60 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full py-3 px-4 rounded-full bg-accent text-accent-contrast text-sm font-semibold hover:opacity-90 active:scale-[0.99] transition-all focus-visible:outline-2 focus-visible:outline-accent"
        >
          Send Details
        </button>
      </form>
    </div>
  </div>
</template>
