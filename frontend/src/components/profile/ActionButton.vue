<script setup lang="ts">
interface Props {
  label: string
  href?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <a
    v-if="props.href"
    :href="props.href"
    :aria-label="props.label"
    class="flex items-center justify-center w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-surface-subtle text-text hover:opacity-85 active:scale-95 transition-transform transition-opacity focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
  >
    <slot />
  </a>
  <button
    v-else
    type="button"
    :aria-label="props.label"
    @click="handleClick"
    class="flex items-center justify-center w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-surface-subtle text-text hover:opacity-85 active:scale-95 transition-transform transition-opacity focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 border-0"
  >
    <slot />
  </button>
</template>
