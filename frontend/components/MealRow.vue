<script setup lang="ts">
import { useNutritionStore } from "~/stores/nutrition";
import type { MealEntry } from "~/models/nutrition";
defineProps<{ entry: MealEntry }>();
const emit = defineEmits<{ edit: [entry: MealEntry]; remove: [entry: MealEntry] }>();
const store = useNutritionStore();
</script>

<template>
    <div class="meal-row">
        <span class="food-symbol" :class="store.food(entry.foodId).color"
            ><AppIcon :name="store.food(entry.foodId).icon" :size="26"
        /></span>
        <div class="meal-copy">
            <strong>{{ store.food(entry.foodId).name }}</strong
            ><span
                >{{ entry.meal }} <i>·</i> {{ entry.time }} <i>·</i> {{ entry.servings }} serving{{
                    entry.servings === 1 ? "" : "s"
                }}</span
            >
        </div>
        <div class="meal-energy">
            <strong>{{ store.energy(store.food(entry.foodId).calories * entry.servings) }}</strong
            ><small>{{ store.preferences.energyUnit }}</small>
        </div>
        <div class="meal-actions">
            <button
                class="icon-button"
                :aria-label="`Edit ${store.food(entry.foodId).name}`"
                @click="emit('edit', entry)"
            >
                <AppIcon name="edit" :size="17" /></button
            ><button
                class="icon-button danger-text"
                :aria-label="`Delete ${store.food(entry.foodId).name}`"
                @click="emit('remove', entry)"
            >
                <AppIcon name="trash" :size="17" />
            </button>
        </div>
    </div>
</template>
