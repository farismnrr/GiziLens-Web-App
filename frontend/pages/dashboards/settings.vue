<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useNutritionStore } from "~/stores/nutrition";
import { showToast } from "~/plugins/toast";
definePageMeta({ layout: "dashboard" });
useHead({ title: "Settings · GiziLens" });
const store = useNutritionStore();
const form = reactive({ ...store.preferences });
onMounted(() => {
    store.hydrate();
    Object.assign(form, store.preferences);
});
const save = () => {
    store.updatePreferences({ ...form });
    showToast("Your preferences have been saved.");
};
const logout = async () => {
    store.signOut();
    await navigateTo("/login");
};
</script>
<template>
    <div class="page-heading">
        <div>
            <span class="eyebrow">FIND YOUR OWN BALANCE</span>
            <h1>Settings<span class="hello-dot">.</span></h1>
            <p>Your goals. Your preferences. Your pace.</p>
        </div>
        <NuxtLink to="/dashboards/profile" class="button secondary"
            ><AppIcon name="user" />Edit profile</NuxtLink
        >
    </div>
    <form class="settings-grid" @submit.prevent="save">
        <section class="card form-card">
            <div class="card-heading">
                <div>
                    <h2>Daily nutrition goals</h2>
                    <p>Set the targets that work for your routine.</p>
                </div>
                <AppIcon name="target" />
            </div>
            <label
                >Energy goal (kcal)<input
                    v-model.number="form.calories"
                    type="number"
                    min="500"
                    max="5000"
                    step="50"
                    required
            /></label>
            <div class="form-grid">
                <label
                    >Protein (g)<input
                        v-model.number="form.protein"
                        type="number"
                        min="1"
                        max="1000"
                        required /></label
                ><label
                    >Carbohydrates (g)<input
                        v-model.number="form.carbs"
                        type="number"
                        min="1"
                        max="1000"
                        required /></label
                ><label
                    >Fat (g)<input
                        v-model.number="form.fat"
                        type="number"
                        min="1"
                        max="1000"
                        required /></label
                ><label
                    >Water (glasses)<input
                        v-model.number="form.water"
                        type="number"
                        min="1"
                        max="20"
                        required
                /></label>
            </div>
            <p class="field-hint">One glass = 250 ml.</p>
        </section>
        <section class="card form-card">
            <div class="card-heading">
                <div>
                    <h2>Make it feel like you</h2>
                    <p>A few small preferences for your day.</p>
                </div>
                <AppIcon name="settings" />
            </div>
            <label
                >Display energy in<select v-model="form.energyUnit">
                    <option value="kcal">Kilocalories (kcal)</option>
                    <option value="kJ">Kilojoules (kJ)</option>
                </select></label
            >
            <div class="preference-row">
                <div>
                    <strong>Daily check-in</strong>
                    <p>Show a reminder in your overview.</p>
                </div>
                <button
                    type="button"
                    class="switch"
                    :class="{ on: form.reminder }"
                    role="switch"
                    aria-label="Daily check-in"
                    :aria-checked="form.reminder"
                    @click="form.reminder = !form.reminder"
                >
                    <span></span>
                </button>
            </div>
            <label v-if="form.reminder"
                >Check-in time<input v-model="form.reminderTime" type="time" required
            /></label>
            <div class="account-settings">
                <span class="account-badge"><i></i>Personal account</span
                ><button type="button" class="logout-link" @click="logout">
                    <AppIcon name="logout" />Log out
                </button>
            </div>
        </section>
        <div class="settings-footer">
            <span>Updates apply across your workspace.</span
            ><button type="submit" class="button primary">
                <AppIcon name="check" />Save preferences
            </button>
        </div>
    </form>
</template>
