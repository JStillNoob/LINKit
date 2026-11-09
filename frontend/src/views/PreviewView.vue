<script setup lang="ts">
import BrandLogo from '@/components/common/BrandLogo.vue'
import ThemeBar from '@/components/toolbar/ThemeBar.vue'
import ProfileCard from '@/components/profile/ProfileCard.vue'
</script>

<template>
  <div
    class="min-h-screen bg-bg text-text transition-colors duration-200 flex flex-col justify-between py-6 px-4 sm:px-6"
  >
    <!-- Brand Header -->
    <header class="w-full max-w-xl mx-auto flex flex-col items-center justify-center mb-6">
      <BrandLogo />
    </header>

    <!-- Main Content Area -->
    <main class="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
      <!-- Theme Switcher Strip -->
      <ThemeBar />

      <!-- Direct Profile Route Link Pill -->
      <div class="text-center">
        <router-link
          to="/alex"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle border border-line text-xs text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-accent"
        >
          <span>View real full-screen profile route:</span>
          <span class="font-semibold text-text underline">/alex</span>
        </router-link>
      </div>

      <!-- Phone Frame Profile Showcase -->
      <ProfileCard />
    </main>

    <!-- Footer -->
    <footer
      class="w-full max-w-xl mx-auto text-center mt-8 pt-4 border-t border-line text-xs text-muted"
    >
      <p>LINKit digital identity platform. The profile is the product.</p>
    </footer>
  </div>
</template>
