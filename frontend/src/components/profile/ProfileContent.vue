<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'
import { downloadVCard } from '@/utils/vcard'
import ActionButton from './ActionButton.vue'
import LinkRow from './LinkRow.vue'
import IconUser from '@/components/icons/IconUser.vue'
import IconBriefcase from '@/components/icons/IconBriefcase.vue'
import IconExchange from '@/components/icons/IconExchange.vue'
import IconVerified from '@/components/icons/IconVerified.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconLink from '@/components/icons/IconLink.vue'
import IconQr from '@/components/icons/IconQr.vue'
import IconDownload from '@/components/icons/IconDownload.vue'

const store = useProfileStore()

function handleSaveContact() {
  downloadVCard(store.profile)
}
</script>

<template>
  <div class="w-full flex flex-col text-text select-none">
    <!-- Loading State (R-27) -->
    <div v-if="store.status === 'loading'" class="p-8 space-y-6 animate-pulse" role="status">
      <div class="h-48 rounded-2xl bg-surface-subtle"></div>
      <div class="h-6 w-3/4 mx-auto rounded-md bg-surface-subtle"></div>
      <div class="h-4 w-1/2 mx-auto rounded-md bg-surface-subtle"></div>
      <div class="flex justify-center gap-4">
        <div class="w-12 h-12 rounded-full bg-surface-subtle"></div>
        <div class="w-12 h-12 rounded-full bg-surface-subtle"></div>
        <div class="w-12 h-12 rounded-full bg-surface-subtle"></div>
        <div class="w-12 h-12 rounded-full bg-surface-subtle"></div>
      </div>
      <div class="h-12 rounded-full bg-surface-subtle"></div>
      <span class="sr-only">Loading profile details...</span>
    </div>

    <!-- Error State (R-27) -->
    <div
      v-else-if="store.status === 'error'"
      class="p-8 text-center my-auto space-y-4"
      role="alert"
    >
      <div
        class="w-12 h-12 mx-auto rounded-full bg-surface-subtle flex items-center justify-center text-text"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke-width="2" />
          <line x1="12" y1="8" x2="12" y2="12" stroke-width="2" />
          <line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2" />
        </svg>
      </div>
      <h3 class="text-base font-semibold text-text">Profile Unavailable</h3>
      <p class="text-xs text-muted max-w-xs mx-auto">
        {{ store.errorMessage || 'Could not load profile at this time.' }}
      </p>
      <button
        type="button"
        @click="store.simulateState('success')"
        class="py-2.5 px-5 rounded-full bg-accent text-accent-contrast text-xs font-semibold hover:opacity-90 focus-visible:outline-2 focus-visible:outline-accent"
      >
        Retry
      </button>
    </div>

    <!-- Main Profile Content -->
    <div v-else class="flex flex-col flex-1">
      <!-- Full-bleed photo hero with overlay controls -->
      <div class="relative w-full h-[280px] overflow-hidden">
        <!-- Hero background: Light gray placeholder for Professional/other themes, dark gradient ONLY for Dark theme -->
        <div
          v-if="store.currentTheme === 'dark'"
          class="w-full h-full bg-gradient-to-b from-[#222222] via-[#1a1a1a] to-[#121212] flex items-center justify-center"
          role="img"
          aria-label="Profile cover illustration"
        >
          <svg class="w-36 h-36 text-white/20" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="38" r="22" opacity="0.6" />
            <path d="M15 88c0-19.33 15.67-35 35-35s35 15.67 35 35v6H15v-6z" opacity="0.8" />
          </svg>
        </div>

        <div
          v-else
          class="w-full h-full bg-[#EAEAEA] flex items-center justify-center"
          role="img"
          aria-label="Profile cover placeholder"
        >
          <!-- Elegant monochrome portrait silhouette placeholder -->
          <svg class="w-36 h-36 text-[#BDBDBD]" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="38" r="22" opacity="0.85" />
            <path d="M15 88c0-19.33 15.67-35 35-35s35 15.67 35 35v6H15v-6z" opacity="0.95" />
          </svg>
        </div>

        <!-- Top-left overlay: Personal / Business mode switcher -->
        <div
          class="absolute top-4 left-5 z-10 flex items-center p-1 rounded-full bg-surface/90 backdrop-blur-xs border border-line/60 shadow-sm"
          role="tablist"
          aria-label="Profile Mode"
        >
          <button
            type="button"
            role="tab"
            :aria-selected="store.profileMode === 'personal'"
            aria-label="Personal Profile"
            @click="store.setProfileMode('personal')"
            :class="[
              'flex items-center justify-center w-8 h-8 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-accent',
              store.profileMode === 'personal'
                ? 'bg-accent text-accent-contrast shadow-xs'
                : 'text-muted hover:text-text',
            ]"
          >
            <IconUser class="w-4 h-4" />
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="store.profileMode === 'business'"
            aria-label="Business Profile"
            @click="store.setProfileMode('business')"
            :class="[
              'flex items-center justify-center w-8 h-8 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-accent',
              store.profileMode === 'business'
                ? 'bg-accent text-accent-contrast shadow-xs'
                : 'text-muted hover:text-text',
            ]"
          >
            <IconBriefcase class="w-4 h-4" />
          </button>
        </div>

        <!-- Top-right overlay: Exchange pill button -->
        <div class="absolute top-4 right-5 z-10">
          <button
            type="button"
            aria-label="Exchange Contact Information"
            @click="store.openExchangeModal"
            class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface/90 backdrop-blur-xs border border-line/60 text-text text-xs font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-accent"
          >
            <IconExchange />
            <span>Exchange</span>
          </button>
        </div>
      </div>

      <!-- Overlapping Sheet (rounded-t-[32px] overlapping photo) -->
      <main
        class="relative -mt-10 flex-1 px-6 pt-5 pb-8 bg-surface rounded-t-[32px] border-t border-line/40 shadow-xs flex flex-col"
      >
        <!-- Identity Header -->
        <div class="text-center">
          <div class="inline-flex items-center justify-center">
            <h1 class="text-xl font-bold tracking-tight text-text">
              {{ store.profile.name }}
            </h1>
            <IconVerified v-if="store.profile.isVerified" />
          </div>
          <p class="text-xs text-muted font-normal mt-0.5">
            {{ store.profile.headline }}
          </p>
        </div>

        <!-- Quick Action Row (4 circular icon buttons) -->
        <section
          aria-label="Quick contact actions"
          class="flex items-center justify-center gap-4 mt-5"
        >
          <ActionButton
            v-if="store.profile.phone"
            :href="`tel:${store.profile.phone}`"
            label="Call contact"
          >
            <IconPhone />
          </ActionButton>

          <ActionButton
            v-if="store.profile.email"
            :href="`mailto:${store.profile.email}`"
            label="Email contact"
          >
            <IconMail />
          </ActionButton>

          <ActionButton
            v-if="store.profile.website"
            :href="store.profile.website"
            label="Open website"
          >
            <IconLink />
          </ActionButton>

          <ActionButton label="Show QR code" @click="store.openQrModal">
            <IconQr />
          </ActionButton>
        </section>

        <!-- Primary Action: Full-width Save Contact Pill -->
        <section aria-label="Primary contact action" class="mt-5">
          <button
            type="button"
            aria-label="Save contact"
            @click="handleSaveContact"
            class="w-full h-[50px] py-3.5 px-6 rounded-full bg-accent text-accent-contrast font-semibold text-sm flex items-center justify-center shadow-xs hover:opacity-90 active:scale-[0.99] transition-all focus-visible:outline-2 focus-visible:outline-accent"
          >
            <IconDownload />
            <span>Save Contact</span>
          </button>
        </section>

        <!-- Link List -->
        <section aria-label="Profile links" class="mt-5 flex-1 flex flex-col">
          <!-- Empty State (R-27) -->
          <div
            v-if="store.activeLinks.length === 0"
            class="p-6 text-center border border-dashed border-line rounded-[20px] bg-surface-subtle"
          >
            <p class="text-sm font-medium text-text">No links added yet</p>
            <p class="text-xs text-muted mt-1">Links for this profile mode will appear here.</p>
          </div>

          <div v-else class="space-y-3">
            <LinkRow
              v-for="link in store.activeLinks"
              :key="link.id"
              :title="link.title"
              :subtitle="link.subtitle"
              :url="link.url"
              :icon="link.icon"
            />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
