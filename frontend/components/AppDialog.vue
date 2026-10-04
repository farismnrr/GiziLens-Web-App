<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
const props = defineProps<{ open: boolean; title: string }>();
const emit = defineEmits<{ close: [] }>();
const dialog = ref<HTMLDialogElement>();
const sync = () => {
    if (props.open && !dialog.value?.open) dialog.value?.showModal();
    else if (!props.open && dialog.value?.open) dialog.value.close();
    document.body.style.overflow = props.open ? "hidden" : "";
};
watch(() => props.open, sync);
onMounted(sync);
onBeforeUnmount(() => {
    document.body.style.overflow = "";
});
const dismissOutside = (event: MouseEvent) => {
    const element = dialog.value;
    if (!element || event.target !== element) return;
    const bounds = element.getBoundingClientRect();
    if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
    )
        emit("close");
};
</script>

<template>
    <dialog
        ref="dialog"
        class="app-dialog"
        :aria-label="title"
        @cancel.prevent="emit('close')"
        @click="dismissOutside"
    >
        <div class="dialog-heading">
            <div>
                <span class="eyebrow">YOUR NUTRITION JOURNEY</span>
                <h2>{{ title }}</h2>
            </div>
            <button class="icon-button" aria-label="Close dialog" @click="emit('close')">
                <AppIcon name="close" />
            </button>
        </div>
        <slot />
    </dialog>
</template>
