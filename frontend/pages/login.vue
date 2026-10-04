<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { INITIAL_PROFILE } from "~/data/nutrition";
import { useNutritionStore } from "~/stores/nutrition";
import { useAuth } from "~/composables/Auth/useAuth";
import type { ValidationErrors } from "~/models/error";
definePageMeta({ layout: "auth" });
useHead({ title: "Log in · GiziLens" });
const auth = useAuth();
const form = reactive({ email: INITIAL_PROFILE.email, password: "GiziLens2026" });
const errors = ref<ValidationErrors>({});
const busy = ref(false);
const showPassword = ref(false);
onMounted(() => {
    const store = useNutritionStore();
    store.hydrate();
    if (store.signedIn) navigateTo("/dashboards");
});
const submit = async () => {
    busy.value = true;
    errors.value = {};
    try {
        const result = await auth.loginUser(form);
        if (!result.success) errors.value = result.validationErrors || {};
        else await navigateTo("/dashboards");
    } finally {
        busy.value = false;
    }
};
</script>
<template>
    <NuxtLink to="/" class="auth-back"><AppIcon name="left" :size="15" />Back to home</NuxtLink
    ><span class="eyebrow">YOUR NEXT GOOD HABIT</span>
    <h1>Welcome back.</h1>
    <p class="auth-intro">
        A fresh day. A little more balance.<br />Let’s pick up where you left off.
    </p>
    <form novalidate @submit.prevent="submit">
        <label
            >Email address<input
                v-model="form.email"
                aria-label="Email address"
                type="email"
                autocomplete="email"
                maxlength="100"
                :aria-invalid="!!errors.email"
                :aria-describedby="errors.email ? 'login-email-error' : undefined"
            /><span v-if="errors.email" id="login-email-error" class="form-error" role="alert">{{
                errors.email
            }}</span></label
        ><label
            >Password
            <div class="password-field">
                <input
                    v-model="form.password"
                    aria-label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="current-password"
                    :aria-invalid="!!errors.password"
                    :aria-describedby="errors.password ? 'login-password-error' : undefined"
                /><button
                    type="button"
                    class="icon-button"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    :aria-pressed="showPassword"
                    @click="showPassword = !showPassword"
                >
                    <AppIcon name="eye" :size="19" />
                </button>
            </div>
            <span
                v-if="errors.password"
                id="login-password-error"
                class="form-error"
                role="alert"
                >{{ errors.password }}</span
            ></label
        ><button type="submit" class="button primary full" :disabled="busy">
            {{ busy ? "Logging in…" : "Log in" }}<AppIcon name="right" :size="17" />
        </button>
    </form>
    <p class="auth-switch">
        New to GiziLens? <NuxtLink to="/register">Create an account</NuxtLink>
    </p>
    <div class="auth-divider">
        <NuxtLink to="/dashboards" class="text-link"
            >Go to your workspace<AppIcon name="right" :size="15"
        /></NuxtLink>
    </div>
</template>
