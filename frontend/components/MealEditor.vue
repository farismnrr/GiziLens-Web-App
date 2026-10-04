<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { FOODS, MEAL_TYPES, dateKey } from "~/data/nutrition";
import { useNutritionStore } from "~/stores/nutrition";
import type { MealEntry, MealType } from "~/models/nutrition";
import { showToast } from "~/plugins/toast";
const props = defineProps<{ open: boolean; date?: string; entry?: MealEntry | null }>();
const emit = defineEmits<{ close: []; saved: [] }>();
const store = useNutritionStore();
const search = ref("");
const foodId = ref(FOODS[0].id);
const servings = ref(1);
const meal = ref<MealType>("Lunch");
const date = ref(dateKey());
const time = ref("12:30");
const selected = computed(() => store.food(foodId.value));
const filtered = computed(() =>
    FOODS.filter(food =>
        `${food.name} ${food.description}`.toLowerCase().includes(search.value.toLowerCase())
    )
);
watch(
    () => props.open,
    open => {
        if (!open) return;
        search.value = "";
        foodId.value = props.entry?.foodId || FOODS[0].id;
        servings.value = props.entry?.servings || 1;
        meal.value = props.entry?.meal || "Lunch";
        date.value = props.entry?.date || props.date || dateKey();
        time.value = props.entry?.time || "12:30";
    }
);
const save = () => {
    store.saveMeal({
        id: props.entry?.id,
        foodId: foodId.value,
        servings: Number(servings.value),
        meal: meal.value,
        date: date.value,
        time: time.value
    });
    showToast(props.entry ? "Meal updated." : "Meal added to your journal.");
    emit("saved");
    emit("close");
};
</script>

<template>
    <AppDialog :open="open" :title="entry ? 'Edit your meal' : 'Add a meal'" @close="emit('close')">
        <form @submit.prevent="save">
            <label class="search-box"
                ><AppIcon name="search" /><input
                    v-model="search"
                    placeholder="Search foods or ingredients"
                    aria-label="Search foods"
            /></label>
            <div class="food-picker" role="group" aria-label="Choose a food">
                <button
                    v-for="food in filtered"
                    :key="food.id"
                    type="button"
                    class="food-option"
                    :class="{ selected: foodId === food.id }"
                    :aria-pressed="foodId === food.id"
                    @click="foodId = food.id"
                >
                    <span class="food-symbol" :class="food.color"
                        ><AppIcon :name="food.icon" :size="24" /></span
                    ><span class="food-option-copy"
                        ><strong>{{ food.name }}</strong
                        ><small>{{ food.description }}</small></span
                    ><AppIcon v-if="foodId === food.id" name="check" />
                </button>
                <p v-if="!filtered.length" class="empty-search">
                    No foods found. Try “chicken”, “rice”, or “yogurt”.
                </p>
            </div>
            <div class="selected-nutrition">
                <strong>{{ selected.name }}</strong
                ><span
                    >{{ store.energy(selected.calories * servings) }}
                    {{ store.preferences.energyUnit }} ·
                    {{ Math.round(selected.protein * servings) }}g protein</span
                >
            </div>
            <div class="form-grid">
                <label
                    >Meal<select v-model="meal">
                        <option v-for="type in MEAL_TYPES" :key="type">{{ type }}</option>
                    </select></label
                >
                <label
                    >Servings<input
                        v-model.number="servings"
                        type="number"
                        min="0.25"
                        max="10"
                        step="0.25"
                        required
                /></label>
                <label>Date<input v-model="date" type="date" :max="dateKey()" required /></label>
                <label>Time<input v-model="time" type="time" required /></label>
            </div>
            <div class="dialog-actions">
                <button type="button" class="button secondary" @click="emit('close')">Cancel</button
                ><button class="button primary" type="submit">
                    <AppIcon name="check" />{{ entry ? "Save changes" : "Add to journal" }}
                </button>
            </div>
        </form>
    </AppDialog>
</template>
