<script setup lang="ts">
withDefaults(defineProps<{ size?: number; bare?: boolean }>(), { size: 37, bare: false });
</script>

<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        class="brand-symbol"
    >
        <rect v-if="!bare" width="64" height="64" rx="19" class="brand-symbol-bg" />
        <path
            d="M45.5 18.5A19.1 19.1 0 1 0 51.1 32H38"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="brand-symbol-ring"
        />
        <path d="M24 32C22 23 29 17 39 17C39 26 32 34 24 32Z" class="brand-symbol-leaf" />
    </svg>
</template>
