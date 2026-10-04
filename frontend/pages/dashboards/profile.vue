<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useNutritionStore } from "~/stores/nutrition";
import { showToast } from "~/plugins/toast";
definePageMeta({ layout: "dashboard" });
useHead({ title: "Your profile · GiziLens" });
const store = useNutritionStore();
const form = reactive({ ...store.profile });
const error = ref("");
onMounted(() => {
    store.hydrate();
    Object.assign(form, store.profile);
});
const save = () => {
    error.value = "";
    if (
        !form.first_name.trim() ||
        !form.last_name.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
        error.value = "Add your name and a valid email address.";
        return;
    }
    store.updateProfile({
        ...form,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim().toLowerCase()
    });
    showToast("Your profile has been updated.");
};
</script>
<template>
    <div class="page-heading">
        <div>
            <span class="eyebrow">MAKE IT YOURS</span>
            <h1>Your profile<span class="hello-dot">.</span></h1>
            <p>A little about the person behind the progress.</p>
        </div>
    </div>
    <div class="profile-grid">
        <section class="card profile-overview">
            <img src="/avatar.svg" alt="Your profile" />
            <h2>{{ store.fullName }}</h2>
            <p>{{ store.profile.email }}</p>
            <span class="account-badge"><i></i>Personal account</span
            ><NuxtLink to="/dashboards/settings" class="text-link"
                >Manage your goals<AppIcon name="right" :size="16"
            /></NuxtLink>
        </section>
        <section class="card form-card">
            <div class="card-heading">
                <div>
                    <h2>Personal details</h2>
                    <p>Keep your information up to date.</p>
                </div>
                <AppIcon name="user" />
            </div>
            <form @submit.prevent="save">
                <div class="form-grid">
                    <label
                        >First name<input
                            v-model="form.first_name"
                            autocomplete="given-name"
                            required
                            maxlength="40" /></label
                    ><label
                        >Last name<input
                            v-model="form.last_name"
                            autocomplete="family-name"
                            required
                            maxlength="40"
                    /></label>
                </div>
                <label
                    >Email address<input
                        v-model="form.email"
                        type="email"
                        autocomplete="email"
                        required
                        maxlength="100"
                /></label>
                <p v-if="error" class="form-error" role="alert">{{ error }}</p>
                <div class="form-footer">
                    <button
                        type="button"
                        class="button secondary"
                        @click="
                            Object.assign(form, store.profile);
                            error = '';
                        "
                    >
                        Cancel changes</button
                    ><button type="submit" class="button primary">
                        <AppIcon name="check" />Save profile
                    </button>
                </div>
            </form>
        </section>
    </div>
</template>
