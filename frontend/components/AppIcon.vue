<script setup lang="ts">
withDefaults(defineProps<{ name: string; size?: number }>(), { size: 20 });
const paths: Record<string, string> = {
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    book: "M4 3h14a2 2 0 0 1 2 2v16H6a2 2 0 0 1-2-2V3zM4 17h16M8 7h8M8 11h5",
    chart: "M4 3v18h17M8 16v-5M13 16V6M18 16v-8",
    settings:
        "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM9 3l-1 3-3 1-2 3 2 2-1 3 2 3 3-1 2 3h3l1-3 3-1 2-3-2-2 1-3-2-3-3 1-2-3H9z",
    user: "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21v-2a8 8 0 0 1 16 0v2",
    plus: "M12 5v14M5 12h14",
    close: "M6 6l12 12M6 18 18 6",
    right: "M5 12h14M13 6l6 6-6 6",
    left: "M15 5l-7 7 7 7",
    chevron: "M9 5l7 7-7 7",
    down: "M6 9l6 6 6-6",
    leaf: "M5 19C-1 8 10 3 21 3c0 12-5 19-13 15M3 21 16 8",
    drop: "M12 2S4 11 4 15a8 8 0 0 0 16 0c0-4-8-13-8-13z",
    flame: "M13 2c2 6 7 8 7 14a8 8 0 0 1-16 0c0-3 2-7 5-9 0 4 1 5 3 6 2-4 0-6 1-11z",
    bowl: "M3 11h18a9 9 0 0 1-18 0zM6 21h12M8 3v4M12 2v5M16 3v4",
    apple: "M12 6c-9-6-13 3-8 11 3 5 5 5 8 3 3 2 5 2 8-3 5-8 1-17-8-11zM12 6c0-4 2-5 5-5",
    fish: "M4 12C8 3 17 3 21 12c-4 9-13 9-17 0zM4 12 1 7v10zM16 10h.01",
    cup: "M4 4h12v12a5 5 0 0 1-10 0V4M16 6h2a3 3 0 0 1 0 6h-2M3 22h16",
    clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
    search: "M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM15 15l6 6",
    edit: "M14 5l5 5M3 21l5-1L21 7l-5-5L3 15v6z",
    trash: "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7",
    check: "M5 12l4 4L19 6",
    minus: "M5 12h14",
    download: "M12 3v12M6 9l6 6 6-6M4 16v5h16v-5",
    logout: "M9 4H4v16h5M9 12h12M17 8l4 4-4 4",
    target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 11v2",
    spark: "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z",
    bell: "M5 17h14l-2-3V8a5 5 0 0 0-10 0v6l-2 3zM10 21h4",
    menu: "M4 6h16M4 12h16M4 18h16",
    heart: "M12 21 3 12C-3 3 8-1 12 6 16-1 27 3 21 12l-9 9z",
    eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
};
</script>

<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        class="app-icon"
    >
        <path :d="paths[name] || paths.leaf" />
    </svg>
</template>
