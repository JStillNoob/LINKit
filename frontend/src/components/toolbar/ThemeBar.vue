<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'
import type { ThemeName } from '@/types/profile'

const store = useProfileStore()

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
</script>

<template>
  <aside
    aria-label="Theme selector and preview controls"
    class="w-full max-w-xl mx-auto p-4 rounded-3xl bg-surface border border-line shadow-xs"
  >
    <div class="flex items-center justify-between pb-3 border-b border-line mb-3">
      <div>
        <h2 class="text-xs font-bold uppercase tracking-wider text-text">Profile Themes</h2>
        <p class="text-[11px] text-muted">Semantic CSS variables swap instantly via data-theme</p>
      </div>

      <!-- State testing pills (R-27 verification) -->
      <div class="flex items-center gap-1.5" role="group" aria-label="Simulate UI state">
        <button
          type="button"
          @click="store.simulateState('success')"
          :class="[
            'px-2.5 py-1 rounded-full text-[11px] font-medium transition-all focus-visible:outline-2 focus-visible:outline-accent',
            store.status === 'success'
              ? 'bg-accent text-accent-contrast'
              : 'bg-surface-subtle text-muted hover:text-text',
          ]"
        >
          Normal
        </button>
        <button
          type="button"
          @click="store.simulateState('loading')"
          :class="[
            'px-2.5 py-1 rounded-full text-[11px] font-medium transition-all focus-visible:outline-2 focus-visible:outline-accent',
            store.status === 'loading'
              ? 'bg-accent text-accent-contrast'
              : 'bg-surface-subtle text-muted hover:text-text',
          ]"
        >
          Loading
        </button>
        <button
          type="button"
          @click="store.simulateState('error')"
          :class="[
            'px-2.5 py-1 rounded-full text-[11px] font-medium transition-all focus-visible:outline-2 focus-visible:outline-accent',
            store.status === 'error'
              ? 'bg-accent text-accent-contrast'
              : 'bg-surface-subtle text-muted hover:text-text',
          ]"
        >
          Error
        </button>
      </div>
    </div>

    <!-- Theme Strip -->
    <div class="grid grid-cols-3 sm:grid-cols-6 gap-2" role="radiogroup" aria-label="Select theme">
      <button
        v-for="theme in themes"
        :key="theme.id"
        type="button"
        role="radio"
        :aria-checked="store.currentTheme === theme.id"
        @click="store.setTheme(theme.id)"
        :class="[
          'flex flex-col items-center p-2.5 rounded-2xl border text-left transition-all focus-visible:outline-2 focus-visible:outline-accent',
          store.currentTheme === theme.id
            ? 'border-accent bg-surface-subtle shadow-xs'
            : 'border-line hover:border-text/30 bg-surface',
        ]"
      >
        <!-- Mini swatch -->
        <div
          class="w-7 h-7 rounded-full border border-line flex items-center justify-center mb-1.5 shadow-2xs"
          :style="{ backgroundColor: theme.previewBg }"
          aria-hidden="true"
        >
          <div
            class="w-3.5 h-3.5 rounded-full"
            :style="{ backgroundColor: theme.previewAccent }"
          ></div>
        </div>
        <span class="text-[11px] font-semibold text-text text-center leading-tight">
          {{ theme.name }}
        </span>
        <span class="text-[9px] text-muted text-center mt-0.5 leading-none">
          {{ theme.tagline }}
        </span>
      </button>
    </div>
  </aside>
</template>
