<script setup lang="ts">
import { computed, ref } from "vue";
import { useNutritionStore } from "~/stores/nutrition";
import { dateKey, shiftDate } from "~/data/nutrition";
import type { MealEntry } from "~/models/nutrition";
import { showToast } from "~/plugins/toast";
definePageMeta({ layout: "dashboard" });
useHead({ title: "Overview · GiziLens" });
const store = useNutritionStore();
const date = ref(dateKey());
const totals = computed(() => store.totals(date.value));
const water = computed(() => store.water[date.value] || 0);
const editorOpen = ref(false);
const editing = ref<MealEntry | null>(null);
const deleting = ref<MealEntry | null>(null);
const dayTitle = computed(() =>
    date.value === dateKey()
        ? "Today"
        : new Date(`${date.value}T12:00:00`).toLocaleDateString("en", {
              month: "short",
              day: "numeric"
          })
);
const week = computed(() =>
    Array.from({ length: 7 }, (_, index) => {
        const key = shiftDate(date.value, index - 6);
        return { date: key, value: store.energy(store.totals(key).calories) };
    })
);
const macros = computed(() => [
    {
        name: "Protein",
        value: totals.value.protein,
        goal: store.preferences.protein,
        color: "purple"
    },
    { name: "Carbs", value: totals.value.carbs, goal: store.preferences.carbs, color: "amber" },
    { name: "Fat", value: totals.value.fat, goal: store.preferences.fat, color: "rose" }
]);
const edit = (entry: MealEntry | null = null) => {
    editing.value = entry;
    editorOpen.value = true;
};
const remove = () => {
    if (deleting.value) store.removeMeal(deleting.value.id);
    deleting.value = null;
    showToast("Meal removed from your journal.");
};
</script>

<template>
    <div class="page-heading">
        <div>
            <span class="eyebrow">A LITTLE BETTER, EVERY DAY</span>
            <h1>Hello, {{ store.profile.first_name }}<span class="hello-dot">.</span></h1>
            <p>Here’s how your nutrition is shaping up.</p>
        </div>
        <button class="button primary" @click="edit()"><AppIcon name="plus" />Add a meal</button>
    </div>
    <div class="section-toolbar">
        <h2>Your daily balance</h2>
        <div class="date-control">
            <button
                class="icon-button"
                aria-label="Previous day"
                @click="date = shiftDate(date, -1)"
            >
                <AppIcon name="left" :size="17" /></button
            ><span
                >{{ dayTitle
                }}<small>{{
                    new Date(`${date}T12:00:00`).toLocaleDateString("en", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    })
                }}</small></span
            ><button
                class="icon-button"
                aria-label="Next day"
                :disabled="date >= dateKey()"
                @click="date = shiftDate(date, 1)"
            >
                <AppIcon name="chevron" :size="17" />
            </button>
        </div>
    </div>
    <div class="balance-grid">
        <section class="card calorie-card">
            <div class="card-heading">
                <h3>Energy intake</h3>
                <span class="subtle-icon"><AppIcon name="flame" /></span>
            </div>
            <div class="calorie-content">
                <EnergyRing
                    :value="store.energy(totals.calories)"
                    :goal="store.energy(store.preferences.calories)"
                    :unit="store.preferences.energyUnit"
                />
                <div class="energy-summary">
                    <span
                        ><i class="legend-dot teal"></i>Daily goal<strong
                            >{{ store.energy(store.preferences.calories).toLocaleString() }}
                            <small>{{ store.preferences.energyUnit }}</small></strong
                        ></span
                    ><span
                        ><i class="legend-dot muted"></i
                        >{{
                            totals.calories > store.preferences.calories
                                ? "Above goal"
                                : "Remaining"
                        }}<strong
                            >{{
                                store
                                    .energy(Math.abs(store.preferences.calories - totals.calories))
                                    .toLocaleString()
                            }}
                            <small>{{ store.preferences.energyUnit }}</small></strong
                        ></span
                    ><NuxtLink to="/dashboards/settings" class="text-link"
                        >Adjust your goals<AppIcon name="right" :size="15"
                    /></NuxtLink>
                </div>
            </div>
        </section>
        <section class="card macro-card">
            <div class="card-heading">
                <h3>Macronutrients</h3>
                <span class="subtle-icon"><AppIcon name="leaf" /></span>
            </div>
            <div v-for="macro in macros" :key="macro.name" class="macro-row">
                <div>
                    <span><i class="legend-dot" :class="macro.color"></i>{{ macro.name }}</span
                    ><strong
                        >{{ Math.round(macro.value) }}<small> / {{ macro.goal }} g</small></strong
                    >
                </div>
                <div class="progress-track">
                    <div
                        :class="macro.color"
                        :style="{ width: `${Math.min(100, (macro.value / macro.goal) * 100)}%` }"
                    ></div>
                </div>
            </div>
            <p class="card-caption">A balanced plate makes a difference.</p>
        </section>
        <section class="card water-card">
            <div class="card-heading">
                <h3>Stay hydrated</h3>
                <AppIcon name="drop" />
            </div>
            <div class="water-total">
                <strong>{{ water }}</strong
                ><span
                    >/ {{ store.preferences.water }} glasses<small
                        >{{ (water * 0.25).toFixed(2) }} liters today</small
                    ></span
                >
            </div>
            <div class="water-glasses" aria-hidden="true">
                <AppIcon
                    v-for="index in Math.min(store.preferences.water, 12)"
                    :key="index"
                    name="cup"
                    :size="22"
                    :class="{ filled: index <= water }"
                />
            </div>
            <div class="water-buttons">
                <button
                    class="button water-minus"
                    :disabled="water === 0"
                    aria-label="Remove a glass of water"
                    @click="store.addWater(date, -1)"
                >
                    <AppIcon name="minus" :size="18" /></button
                ><button class="button" :disabled="water >= 30" @click="store.addWater(date, 1)">
                    <AppIcon name="plus" :size="18" />Log a glass
                </button>
            </div>
        </section>
    </div>
    <div class="dashboard-lower-grid">
        <section class="card meals-card">
            <div class="card-heading">
                <div>
                    <h3>{{ dayTitle }}’s meals</h3>
                    <p>{{ store.entries(date).length }} meals logged. Every choice counts.</p>
                </div>
                <NuxtLink to="/dashboards/journal" class="text-link"
                    >View journal<AppIcon name="right" :size="15"
                /></NuxtLink>
            </div>
            <MealRow
                v-for="entry in store.entries(date)"
                :key="entry.id"
                :entry="entry"
                @edit="edit"
                @remove="deleting = $event"
            />
            <div v-if="!store.entries(date).length" class="empty-state">
                <AppIcon name="bowl" :size="40" />
                <h3>A fresh start</h3>
                <p>Add your first meal to see your daily balance.</p>
            </div>
            <button class="add-meal-link" @click="edit()">
                <AppIcon name="plus" :size="18" />Add another meal
            </button>
        </section>
        <div class="overview-side">
            <section class="card">
                <div class="card-heading">
                    <div>
                        <h3>Your week at a glance</h3>
                        <p>Energy intake over the last 7 days</p>
                    </div>
                </div>
                <WeekChart
                    :values="week"
                    :goal="store.energy(store.preferences.calories)"
                    :unit="store.preferences.energyUnit"
                /><NuxtLink to="/dashboards/reports" class="text-link chart-link"
                    >Explore your insights<AppIcon name="right" :size="15"
                /></NuxtLink>
            </section>
            <section class="daily-note">
                <span class="note-icon"><AppIcon name="spark" :size="22" /></span>
                <div>
                    <span class="eyebrow">A MOMENT OF MINDFULNESS</span>
                    <h3>Progress is a practice.</h3>
                    <p>Make space for the foods you love and the habits that make you feel good.</p>
                </div>
            </section>
        </div>
    </div>
    <div v-if="store.preferences.reminder" class="reminder-note">
        <AppIcon name="bell" :size="17" /><span
            >Your daily check-in is set for {{ store.preferences.reminderTime }}.</span
        ><NuxtLink to="/dashboards/settings">Manage</NuxtLink>
    </div>
    <MealEditor :open="editorOpen" :date="date" :entry="editing" @close="editorOpen = false" />
    <AppDialog :open="!!deleting" title="Remove this meal?" @close="deleting = null"
        ><p class="dialog-message">
            {{ deleting ? store.food(deleting.foodId).name : "" }} will be removed from your journal
            and daily totals.
        </p>
        <div class="dialog-actions">
            <button class="button secondary" @click="deleting = null">Keep meal</button
            ><button class="button danger" @click="remove">Remove meal</button>
        </div></AppDialog
    >
</template>
