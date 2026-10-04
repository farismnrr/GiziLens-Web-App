<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuth } from "~/composables/Auth/useAuth";
import type { ValidationErrors } from "~/models/error";
import { showToast } from "~/plugins/toast";
definePageMeta({ layout: "auth" });
useHead({ title: "Create an account · GiziLens" });
const auth = useAuth();
const form = reactive({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
});
const errors = ref<ValidationErrors>({});
const busy = ref(false);
const showPassword = ref(false);
const submit = async () => {
    busy.value = true;
    errors.value = {};
    try {
        const result = await auth.registerUser(form);
        if (!result.success) {
            errors.value = result.validationErrors || {};
            return;
        }
        await auth.loginUser(form);
        showToast("Welcome to GiziLens. Your workspace is ready.");
        await navigateTo("/dashboards");
    } finally {
        busy.value = false;
    }
};
</script>
<template>
    <NuxtLink to="/" class="auth-back"><AppIcon name="left" :size="15" />Back to home</NuxtLink
    ><span class="eyebrow">START WITH A LITTLE AWARENESS</span>
    <h1>Your journey starts here.</h1>
    <p class="auth-intro">Create your space for healthier everyday habits.</p>
    <form novalidate @submit.prevent="submit">
        <div class="form-grid">
            <label
                >First name<input
                    v-model="form.first_name"
                    aria-label="First name"
                    autocomplete="given-name"
                    maxlength="40"
                    :aria-invalid="!!errors.first_name"
                /><span v-if="errors.first_name" class="form-error" role="alert">{{
                    errors.first_name
                }}</span></label
            ><label
                >Last name<input
                    v-model="form.last_name"
                    aria-label="Last name"
                    autocomplete="family-name"
                    maxlength="40"
                    :aria-invalid="!!errors.last_name"
                /><span v-if="errors.last_name" class="form-error" role="alert">{{
                    errors.last_name
                }}</span></label
            >
        </div>
        <label
            >Email address<input
                v-model="form.email"
                aria-label="Email address"
                type="email"
                autocomplete="email"
                maxlength="100"
                :aria-invalid="!!errors.email"
            /><span v-if="errors.email" class="form-error" role="alert">{{
                errors.email
            }}</span></label
        ><label
            >Password
            <div class="password-field">
                <input
                    v-model="form.password"
                    aria-label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="new-password"
                    :aria-invalid="!!errors.password"
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
            <span v-if="errors.password" class="form-error" role="alert">{{ errors.password }}</span
            ><span v-else class="field-hint">Use at least 6 characters.</span></label
        ><label
            >Confirm password<input
                v-model="form.confirm_password"
                aria-label="Confirm password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                :aria-invalid="!!errors.confirm_password"
            /><span v-if="errors.confirm_password" class="form-error" role="alert">{{
                errors.confirm_password
            }}</span></label
        ><button type="submit" class="button primary full" :disabled="busy">
            {{ busy ? "Creating your account…" : "Create account"
            }}<AppIcon name="right" :size="17" />
        </button>
    </form>
    <p class="auth-switch">Already have an account? <NuxtLink to="/login">Log in</NuxtLink></p>
</template>
