<script setup lang="ts">
import { onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'
import ExchangeModal from '@/components/profile/ExchangeModal.vue'
import QrModal from '@/components/profile/QrModal.vue'

const store = useProfileStore()

onMounted(() => {
  store.setTheme('professional')
})
</script>

<template>
  <div class="min-h-screen bg-bg text-text transition-colors duration-200">
    <router-view />
    <!-- Global accessible modals -->
    <ExchangeModal />
    <QrModal />
  </div>
</template>
