<script setup lang="ts">
import ProfileContent from '@/components/profile/ProfileContent.vue'
import ProfileThemeDrawer from '@/components/profile/ProfileThemeDrawer.vue'

interface Props {
  username?: string
}

defineProps<Props>()
</script>

<template>
  <div class="min-h-screen bg-bg flex justify-center text-text">
    <!-- Real Mobile Web Profile: No device frame, no fake status bar -->
    <div
      class="w-full max-w-md bg-surface min-h-screen shadow-md flex flex-col relative overflow-x-hidden"
    >
      <ProfileContent />

      <!-- Minimal floating theme switcher for live theme testing -->
      <ProfileThemeDrawer />
    </div>
  </div>
</template>
