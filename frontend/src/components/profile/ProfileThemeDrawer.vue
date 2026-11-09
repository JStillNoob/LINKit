<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useProfileStore } from '@/stores/profile'
import type { ThemeName } from '@/types/profile'

const store = useProfileStore()
const isOpen = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)

interface ThemeOption {
  id: ThemeName
  name: string
  tagline: string
  previewBg: string
  previewAccent: string
}

const themes: ThemeOption[] = [
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'Clean and modern',
    previewBg: '#FFFFFF',
    previewAccent: '#111111',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    tagline: 'Simple and elegant',
    previewBg: '#FFFFFF',
    previewAccent: '#0A0A0A',
  },
  {
    id: 'dark',
    name: 'Dark',
    tagline: 'Premium and bold',
    previewBg: '#121212',
    previewAccent: '#FFFFFF',
  },
  {
    id: 'creative',
    name: 'Creative',
    tagline: 'Express your style',
    previewBg: '#F8F8F6',
    previewAccent: '#181816',
  },
  {
    id: 'nature',
    name: 'Nature',
    tagline: 'Fresh and friendly',
    previewBg: '#FAF9F6',
    previewAccent: '#1B1A17',
  },
  {
    id: 'playful',
    name: 'Playful',
    tagline: 'Fun and vibrant',
    previewBg: '#FFFFFF',
    previewAccent: '#0F172A',
  },
]

function toggle() {
  isOpen.value = !isOpen.value
}

function selectTheme(themeId: ThemeName) {
  store.setTheme(themeId)
}

function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div ref="containerRef" class="fixed bottom-5 right-5 z-40">
    <!-- Popover Menu -->
    <div
      v-if="isOpen"
      class="mb-2 p-3 w-64 rounded-2xl bg-surface border border-line shadow-2xl text-text space-y-2 animate-in fade-in zoom-in-95 duration-150"
      role="region"
      aria-label="Theme options"
    >
      <div class="flex items-center justify-between pb-1.5 border-b border-line">
        <span class="text-xs font-bold text-text uppercase tracking-wider">Themes</span>
        <span class="text-[10px] text-muted capitalize">{{ store.currentTheme }}</span>
      </div>

      <div class="grid grid-cols-2 gap-1.5" role="radiogroup" aria-label="Select theme">
        <button
          v-for="theme in themes"
          :key="theme.id"
          type="button"
          role="radio"
          :aria-checked="store.currentTheme === theme.id"
          @click="selectTheme(theme.id)"
          :class="[
            'flex items-center gap-2 p-2 rounded-xl text-left border transition-all focus-visible:outline-2 focus-visible:outline-accent',
            store.currentTheme === theme.id
              ? 'border-accent bg-surface-subtle font-semibold shadow-2xs'
              : 'border-transparent hover:bg-surface-subtle/60 text-muted hover:text-text',
          ]"
        >
          <div
            class="w-5 h-5 rounded-full border border-line flex items-center justify-center shrink-0"
            :style="{ backgroundColor: theme.previewBg }"
            aria-hidden="true"
          >
            <div
              class="w-2.5 h-2.5 rounded-full"
              :style="{ backgroundColor: theme.previewAccent }"
            ></div>
          </div>
          <div class="truncate">
            <span class="block text-xs leading-tight truncate">{{ theme.name }}</span>
            <span class="block text-[9px] text-muted leading-tight truncate">
              {{ theme.tagline }}
            </span>
          </div>
        </button>
      </div>
    </div>

    <!-- Floating Toggle Button -->
    <button
      type="button"
      @click="toggle"
      aria-label="Toggle theme picker"
      class="flex items-center gap-1.5 px-3 py-2 rounded-full bg-surface/90 backdrop-blur-md border border-line/80 text-text text-xs font-semibold shadow-lg hover:opacity-90 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-accent"
    >
      <!-- Palette icon -->
      <svg
        class="w-3.5 h-3.5 text-text"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path
          d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z"
        />
      </svg>
      <span class="capitalize">{{ store.currentTheme }}</span>
    </button>
  </div>
</template>
