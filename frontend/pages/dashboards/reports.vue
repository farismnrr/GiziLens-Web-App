<script setup lang="ts">
import { computed, ref } from "vue";
import { useNutritionStore } from "~/stores/nutrition";
import { dateKey, shiftDate } from "~/data/nutrition";
import { showToast } from "~/plugins/toast";
definePageMeta({ layout: "dashboard" });
useHead({ title: "Insights · GiziLens" });
const store = useNutritionStore();
const period = ref(7);
const days = computed(() =>
    Array.from({ length: period.value }, (_, index) => {
        const date = shiftDate(dateKey(), index - period.value + 1);
        return {
            date,
            ...store.totals(date),
            meals: store.entries(date).length,
            water: store.water[date] || 0
        };
    })
);
const loggedDays = computed(() => days.value.filter(day => day.meals > 0));
const average = computed(() =>
    loggedDays.value.length
        ? Math.round(
              loggedDays.value.reduce((sum, day) => sum + day.calories, 0) / loggedDays.value.length
          )
        : 0
);
const averageProtein = computed(() =>
    loggedDays.value.length
        ? Math.round(
              loggedDays.value.reduce((sum, day) => sum + day.protein, 0) / loggedDays.value.length
          )
        : 0
);
const entries = computed(() => days.value.reduce((sum, day) => sum + day.meals, 0));
const exportReport = () => {
    const rows = [
        [
            "Date",
            "Meals",
            `Energy (${store.preferences.energyUnit})`,
            "Protein (g)",
            "Carbs (g)",
            "Fat (g)",
            "Water (glasses)"
        ],
        ...days.value.map(day => [
            day.date,
            day.meals,
            store.energy(day.calories),
            Math.round(day.protein),
            Math.round(day.carbs),
            Math.round(day.fat),
            day.water
        ])
    ];
    const blob = new Blob([rows.map(row => row.join(",")).join("\n")], {
        type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `GiziLens-nutrition-${dateKey()}-${period.value}days.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("Your nutrition report is ready.");
};
</script>
<template>
    <div class="page-heading">
        <div>
            <span class="eyebrow">SEE THE BIGGER PICTURE</span>
            <h1>Your insights<span class="hello-dot">.</span></h1>
            <p>Small choices add up. Here’s your progress over time.</p>
        </div>
        <button class="button secondary" @click="exportReport">
            <AppIcon name="download" />Export report
        </button>
    </div>
    <div class="section-toolbar">
        <h2>Nutrition at a glance</h2>
        <div class="segmented" aria-label="Report period">
            <button
                :class="{ active: period === 7 }"
                :aria-pressed="period === 7"
                @click="period = 7"
            >
                7 days</button
            ><button
                :class="{ active: period === 30 }"
                :aria-pressed="period === 30"
                @click="period = 30"
            >
                30 days
            </button>
        </div>
    </div>
    <div class="report-metrics">
        <section class="card report-metric">
            <span class="subtle-icon"><AppIcon name="flame" /></span><span>Average energy</span
            ><strong
                >{{ store.energy(average).toLocaleString()
                }}<small>{{ store.preferences.energyUnit }} / logged day</small></strong
            >
        </section>
        <section class="card report-metric">
            <span class="subtle-icon purple"><AppIcon name="leaf" /></span
            ><span>Average protein</span
            ><strong>{{ averageProtein }}<small>g / logged day</small></strong>
        </section>
        <section class="card report-metric">
            <span class="subtle-icon amber"><AppIcon name="book" /></span><span>Meals recorded</span
            ><strong
                >{{ entries }}<small>over {{ period }} days</small></strong
            >
        </section>
        <section class="card report-metric">
            <span class="subtle-icon"><AppIcon name="check" /></span><span>Days of consistency</span
            ><strong
                >{{ loggedDays.length }}<small>of {{ period }} days</small></strong
            >
        </section>
    </div>
    <section class="card report-chart">
        <div class="card-heading">
            <div>
                <h3>Your energy, day by day</h3>
                <p>{{ days[0]?.date }} — {{ dateKey() }}</p>
            </div>
            <span class="chart-legend"><i class="legend-dot teal"></i>Energy intake</span>
        </div>
        <WeekChart
            :values="days.map(day => ({ date: day.date, value: store.energy(day.calories) }))"
            :goal="store.energy(store.preferences.calories)"
            :unit="store.preferences.energyUnit"
        />
    </section>
    <section class="card report-table">
        <div class="card-heading">
            <div>
                <h3>The daily details</h3>
                <p>Everything you’ve logged, in one place.</p>
            </div>
        </div>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Daily nutrition table">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Meals</th>
                        <th scope="col">Energy ({{ store.preferences.energyUnit }})</th>
                        <th scope="col">Protein</th>
                        <th scope="col">Carbs</th>
                        <th scope="col">Fat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="day in [...days].reverse()" :key="day.date">
                        <th scope="row">
                            {{
                                new Date(`${day.date}T12:00:00`).toLocaleDateString("en", {
                                    day: "numeric",
                                    month: "short"
                                })
                            }}
                        </th>
                        <td>{{ day.meals }}</td>
                        <td>{{ store.energy(day.calories).toLocaleString() }}</td>
                        <td>{{ Math.round(day.protein) }} g</td>
                        <td>{{ Math.round(day.carbs) }} g</td>
                        <td>{{ Math.round(day.fat) }} g</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
