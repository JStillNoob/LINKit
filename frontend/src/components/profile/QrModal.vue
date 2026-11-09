<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useProfileStore } from '@/stores/profile'
import IconClose from '@/components/icons/IconClose.vue'

const store = useProfileStore()

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && store.isQrModalOpen) {
    store.closeQrModal()
  }
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
    v-if="store.isQrModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    @click.self="store.closeQrModal"
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-dialog-title"
      class="w-full max-w-xs rounded-[28px] bg-surface border border-line p-6 shadow-2xl text-text text-center"
    >
      <div class="flex items-center justify-between pb-3 border-b border-line mb-4">
        <h2 id="qr-dialog-title" class="text-sm font-semibold text-text">Digital Card QR</h2>
        <button
          type="button"
          aria-label="Close QR code modal"
          @click="store.closeQrModal"
          class="flex items-center justify-center w-8 h-8 rounded-full bg-surface-subtle text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-accent"
        >
          <IconClose />
        </button>
      </div>

      <div class="p-4 bg-white rounded-2xl border border-line inline-block shadow-xs">
        <!-- Crisp SVG QR code representation -->
        <svg
          class="w-48 h-48 mx-auto"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Profile QR Code"
        >
          <!-- Corner Pos 1 -->
          <rect x="5" y="5" width="26" height="26" rx="4" fill="#111111" />
          <rect x="9" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
          <rect x="13" y="13" width="10" height="10" rx="1" fill="#111111" />

          <!-- Corner Pos 2 -->
          <rect x="69" y="5" width="26" height="26" rx="4" fill="#111111" />
          <rect x="73" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
          <rect x="77" y="13" width="10" height="10" rx="1" fill="#111111" />

          <!-- Corner Pos 3 -->
          <rect x="5" y="69" width="26" height="26" rx="4" fill="#111111" />
          <rect x="9" y="73" width="18" height="18" rx="2" fill="#FFFFFF" />
          <rect x="13" y="77" width="10" height="10" rx="1" fill="#111111" />

          <!-- Pattern elements -->
          <rect x="36" y="8" width="6" height="6" rx="1" fill="#111111" />
          <rect x="46" y="8" width="6" height="6" rx="1" fill="#111111" />
          <rect x="56" y="8" width="6" height="6" rx="1" fill="#111111" />

          <rect x="36" y="18" width="6" height="6" rx="1" fill="#111111" />
          <rect x="46" y="24" width="6" height="6" rx="1" fill="#111111" />
          <rect x="56" y="18" width="6" height="6" rx="1" fill="#111111" />

          <rect x="8" y="36" width="6" height="6" rx="1" fill="#111111" />
          <rect x="18" y="46" width="6" height="6" rx="1" fill="#111111" />
          <rect x="8" y="56" width="6" height="6" rx="1" fill="#111111" />

          <rect x="36" y="36" width="10" height="10" rx="2" fill="#111111" />
          <rect x="52" y="36" width="8" height="8" rx="1.5" fill="#111111" />
          <rect x="66" y="36" width="6" height="6" rx="1" fill="#111111" />
          <rect x="78" y="36" width="12" height="6" rx="1" fill="#111111" />

          <rect x="36" y="50" width="8" height="8" rx="1" fill="#111111" />
          <rect x="48" y="48" width="14" height="6" rx="1" fill="#111111" />
          <rect x="68" y="48" width="8" height="8" rx="1" fill="#111111" />
          <rect x="82" y="48" width="8" height="8" rx="1" fill="#111111" />

          <rect x="36" y="64" width="6" height="12" rx="1" fill="#111111" />
          <rect x="46" y="64" width="12" height="6" rx="1" fill="#111111" />
          <rect x="64" y="62" width="6" height="6" rx="1" fill="#111111" />
          <rect x="76" y="64" width="14" height="14" rx="2" fill="#111111" />

          <rect x="36" y="80" width="10" height="10" rx="2" fill="#111111" />
          <rect x="50" y="78" width="8" height="12" rx="1.5" fill="#111111" />
          <rect x="62" y="76" width="8" height="6" rx="1" fill="#111111" />
        </svg>
      </div>

      <div class="mt-4">
        <p class="text-sm font-semibold text-text">
          {{ store.profile.name }}
        </p>
        <p class="text-xs text-muted mt-0.5">Scan with phone camera to connect</p>
      </div>

      <button
        type="button"
        @click="store.closeQrModal"
        class="w-full mt-5 py-2.5 px-4 rounded-full bg-accent text-accent-contrast text-xs font-semibold hover:opacity-90 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-accent"
      >
        Close
      </button>
    </div>
  </div>
</template>
