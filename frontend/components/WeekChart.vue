<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
    values: { date: string; value: number }[];
    goal: number;
    unit: string;
}>();
const maximum = computed(() =>
    Math.max(props.goal * 1.15, ...props.values.map(day => day.value), 1)
);
const dayLabel = (date: string) =>
    new Date(`${date}T12:00:00`).toLocaleDateString("en", { weekday: "short" });
</script>
<template>
    <div
        class="week-chart"
        role="img"
        :aria-label="`Daily energy intake in ${unit}. Target ${goal}.`"
    >
        <div class="chart-scale">
            <span>{{ Math.round(maximum).toLocaleString() }}</span
            ><span>{{ Math.round(maximum / 2).toLocaleString() }}</span
            ><span>0</span>
        </div>
        <div class="chart-plot">
            <div class="chart-goal" :style="{ bottom: `${(goal / maximum) * 100}%` }">
                <span>Goal</span>
            </div>
            <div class="chart-bars">
                <div v-for="(day, index) in values" :key="day.date" class="chart-column">
                    <div
                        class="chart-bar"
                        :class="{ current: index === values.length - 1 }"
                        :style="{ height: `${Math.max(1, (day.value / maximum) * 100)}%` }"
                        :title="`${day.date}: ${Math.round(day.value)} ${unit}`"
                    ></div>
                    <span v-if="values.length <= 7 || index % 5 === 0">{{
                        values.length <= 7
                            ? dayLabel(day.date)
                            : new Date(`${day.date}T12:00:00`).getDate()
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
