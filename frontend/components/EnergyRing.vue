<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{ value: number; goal: number; unit?: string }>();
const progress = computed(() => Math.min(1, props.value / Math.max(props.goal, 1)));
</script>
<template>
    <div class="energy-ring" :aria-label="`${value} of ${goal} ${unit || 'kcal'}`" role="img">
        <svg viewBox="0 0 200 200" aria-hidden="true">
            <circle class="ring-track" cx="100" cy="100" r="82" />
            <circle
                class="ring-progress"
                cx="100"
                cy="100"
                r="82"
                :stroke-dasharray="`${progress * 515.22} 515.22`"
            />
        </svg>
        <div class="ring-label">
            <AppIcon name="flame" :size="23" /><strong>{{
                Math.round(value).toLocaleString()
            }}</strong
            ><span>{{ unit || "kcal" }} consumed</span>
        </div>
    </div>
</template>
