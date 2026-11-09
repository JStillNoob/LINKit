<script setup lang="ts">
interface Props {
  withTagline?: boolean
}

withDefaults(defineProps<Props>(), {
  withTagline: true,
})
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center">
    <div class="flex items-center gap-2.5">
      <!-- Outlined phone + NFC waves mark -->
      <svg
        class="w-6 h-6 text-text"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <!-- Outlined smartphone -->
        <rect
          x="2.5"
          y="2.5"
          width="13"
          height="23"
          rx="3"
          stroke="currentColor"
          stroke-width="2"
        />
        <!-- Top speaker bar -->
        <line
          x1="6.5"
          y1="5.5"
          x2="11.5"
          y2="5.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <!-- Bottom home indicator dot -->
        <circle cx="9" cy="22" r="1" fill="currentColor" />
        <!-- NFC wave inner -->
        <path
          d="M18.5 9.5C20 11 21 13 21 15.5C21 18 20 20 18.5 21.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
        <!-- NFC wave outer -->
        <path
          d="M22 6.5C24.5 9 26 12 26 15.5C26 19 24.5 22 22 24.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>

      <!-- Heavy "LINK" + Light "it" Wordmark -->
      <span class="text-2xl tracking-tight text-text leading-none select-none">
        <strong class="font-black">LINK</strong><span class="font-light">it</span>
      </span>
    </div>

    <p
      v-if="withTagline"
      class="text-[11px] uppercase tracking-[0.25em] text-muted font-light mt-1.5"
    >
      Tap. Link. Connect.
    </p>
  </div>
</template>
