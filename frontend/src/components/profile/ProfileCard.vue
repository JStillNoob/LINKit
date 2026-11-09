<script setup lang="ts">
import ProfileContent from './ProfileContent.vue'
</script>

<template>
  <div
    class="w-full max-w-[390px] mx-auto bg-surface rounded-[42px] border-4 border-line/80 shadow-2xl overflow-hidden text-text flex flex-col relative select-none"
  >
    <!-- Status Bar (Phone device mockup frame) -->
    <header
      class="w-full px-7 pt-3.5 pb-2 flex items-center justify-between text-xs font-semibold text-text z-20"
    >
      <span class="tracking-tight">9:41</span>
      <!-- Dynamic Island mockup pill -->
      <div class="w-24 h-5 bg-black rounded-full shadow-inner" aria-hidden="true"></div>
      <div class="flex items-center gap-1.5" aria-hidden="true">
        <!-- Cellular bars -->
        <svg class="w-4 h-3.5 fill-current" viewBox="0 0 17 12">
          <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
          <rect x="4.5" y="5.5" width="2.5" height="6.5" rx="0.5" />
          <rect x="9" y="3" width="2.5" height="9" rx="0.5" />
          <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" />
        </svg>
        <!-- Wifi icon -->
        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 16 12">
          <path
            d="M8 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-4.24-2.83a6 6 0 0 1 8.48 0l-1.41 1.41a4 4 0 0 0-5.66 0L3.76 6.67zM.93 3.84a10 10 0 0 1 14.14 0L13.66 5.25a8 8 0 0 0-11.32 0L.93 3.84z"
          />
        </svg>
        <!-- Battery icon -->
        <div class="w-5 h-2.5 rounded-sm border border-current p-0.5 flex items-center">
          <div class="w-full h-full bg-current rounded-xs"></div>
        </div>
      </div>
    </header>

    <!-- Embedded Profile Content -->
    <ProfileContent />
  </div>
</template>
