<script setup lang="ts">
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import IconLinkedIn from '@/components/icons/IconLinkedIn.vue'
import IconGitHub from '@/components/icons/IconGitHub.vue'
import IconGlobe from '@/components/icons/IconGlobe.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconLink from '@/components/icons/IconLink.vue'

interface Props {
  title: string
  subtitle: string
  url: string
  icon: 'linkedin' | 'github' | 'globe' | 'mail' | 'link'
}

defineProps<Props>()
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="group flex items-center justify-between w-full p-3.5 rounded-[20px] bg-surface border border-line hover:border-text/30 active:scale-[0.99] transition-all focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 min-h-[68px]"
  >
    <div class="flex items-center gap-3.5 min-w-0">
      <div
        class="flex items-center justify-center w-12 h-12 min-w-[48px] min-h-[48px] rounded-[14px] bg-[#111111] text-white shrink-0"
        aria-hidden="true"
      >
        <IconLinkedIn v-if="icon === 'linkedin'" />
        <IconGitHub v-else-if="icon === 'github'" />
        <IconGlobe v-else-if="icon === 'globe'" />
        <IconMail v-else-if="icon === 'mail'" class="w-5 h-5 text-white" />
        <IconLink v-else class="w-5 h-5 text-white" />
      </div>

      <div class="flex flex-col text-left truncate">
        <span class="text-sm font-semibold text-text truncate">
          {{ title }}
        </span>
        <span class="text-xs text-muted truncate mt-0.5">
          {{ subtitle }}
        </span>
      </div>
    </div>

    <div class="shrink-0 pl-2">
      <IconChevronRight
        class="transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </div>
  </a>
</template>
