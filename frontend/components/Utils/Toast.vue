<script setup lang="ts">
withDefaults(defineProps<{ message: string; type?: string }>(), { type: "success" });
const emit = defineEmits<{ dismiss: [] }>();
</script>
<template>
    <div class="app-toast" :role="type === 'danger' ? 'alert' : 'status'">
        <AppIcon :name="type === 'danger' ? 'close' : 'check'" :size="20" /><span>{{
            message
        }}</span
        ><button class="icon-button" aria-label="Dismiss message" @click="emit('dismiss')">
            <AppIcon name="close" :size="17" />
        </button>
    </div>
</template>
