<script setup lang="ts">
import { computed, ref } from "vue";
import { useNutritionStore } from "~/stores/nutrition";
import { dateKey, MEAL_TYPES } from "~/data/nutrition";
import type { MealEntry } from "~/models/nutrition";
import { showToast } from "~/plugins/toast";
definePageMeta({ layout: "dashboard" });
useHead({ title: "Food journal · GiziLens" });
const store = useNutritionStore();
const date = ref(dateKey());
const query = ref("");
const filter = ref("All meals");
const open = ref(false);
const editing = ref<MealEntry | null>(null);
const deleting = ref<MealEntry | null>(null);
const entries = computed(() =>
    store
        .entries(date.value)
        .filter(
            entry =>
                (filter.value === "All meals" || entry.meal === filter.value) &&
                store.food(entry.foodId).name.toLowerCase().includes(query.value.toLowerCase())
        )
);
const groups = computed(() =>
    MEAL_TYPES.map(type => ({
        type,
        entries: entries.value.filter(entry => entry.meal === type)
    })).filter(group => group.entries.length)
);
const edit = (entry: MealEntry | null = null) => {
    editing.value = entry;
    open.value = true;
};
const remove = () => {
    if (deleting.value) store.removeMeal(deleting.value.id);
    deleting.value = null;
    showToast("Meal removed.");
};
</script>
<template>
    <div class="page-heading">
        <div>
            <span class="eyebrow">GET TO KNOW YOUR PLATE</span>
            <h1>Food journal<span class="hello-dot">.</span></h1>
            <p>Keep a little record of what fuels your day.</p>
        </div>
        <button class="button primary" @click="edit()"><AppIcon name="plus" />Add a meal</button>
    </div>
    <section class="journal-summary">
        <div>
            <span class="eyebrow">DAILY TOTAL</span
            ><strong
                >{{ store.energy(store.totals(date).calories).toLocaleString()
                }}<small> {{ store.preferences.energyUnit }}</small></strong
            >
        </div>
        <div>
            <span>Protein</span
            ><strong>{{ Math.round(store.totals(date).protein) }}<small> g</small></strong>
        </div>
        <div>
            <span>Carbs</span
            ><strong>{{ Math.round(store.totals(date).carbs) }}<small> g</small></strong>
        </div>
        <div>
            <span>Fat</span
            ><strong>{{ Math.round(store.totals(date).fat) }}<small> g</small></strong>
        </div>
    </section>
    <section class="card journal-card">
        <div class="journal-filters">
            <label class="search-box"
                ><AppIcon name="search" /><input
                    v-model="query"
                    aria-label="Search journal"
                    placeholder="Search your meals" /></label
            ><label class="visually-labelled"
                ><span>Date</span
                ><input
                    v-model="date"
                    type="date"
                    :max="dateKey()"
                    aria-label="Journal date" /></label
            ><label class="visually-labelled"
                ><span>Meal</span
                ><select v-model="filter" aria-label="Meal filter">
                    <option>All meals</option>
                    <option v-for="type in MEAL_TYPES" :key="type">{{ type }}</option>
                </select></label
            >
        </div>
        <div v-for="group in groups" :key="group.type" class="journal-group">
            <div class="journal-group-heading">
                <h2>{{ group.type }}</h2>
                <span
                    >{{ group.entries.length }} item{{
                        group.entries.length === 1 ? "" : "s"
                    }}</span
                >
            </div>
            <MealRow
                v-for="entry in group.entries"
                :key="entry.id"
                :entry="entry"
                @edit="edit"
                @remove="deleting = $event"
            />
        </div>
        <div v-if="!entries.length" class="empty-state">
            <AppIcon name="search" :size="38" />
            <h2>
                {{ query || filter !== "All meals" ? "No matching meals" : "Your page is waiting" }}
            </h2>
            <p>
                {{
                    query || filter !== "All meals"
                        ? "Try another search or choose a different meal."
                        : "Start with one meal. The rest follows."
                }}
            </p>
            <button
                class="button secondary"
                @click="
                    query = '';
                    filter = 'All meals';
                "
            >
                Clear filters
            </button>
        </div>
    </section>
    <MealEditor :open="open" :entry="editing" :date="date" @close="open = false" />
    <AppDialog :open="!!deleting" title="Remove this meal?" @close="deleting = null"
        ><p class="dialog-message">
            This meal will be removed from your journal. Your daily balance and insights will update
            automatically.
        </p>
        <div class="dialog-actions">
            <button class="button secondary" @click="deleting = null">Keep meal</button
            ><button class="button danger" @click="remove">Remove meal</button>
        </div></AppDialog
    >
</template>
