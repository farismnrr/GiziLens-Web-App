<script setup lang="ts">
defineProps<{ error: { statusCode?: number } }>();
</script>
<template>
    <main class="error-page">
        <span class="brand"
            ><span class="brand-mark"><AppIcon name="leaf" /></span>GiziLens<span class="brand-dot"
                >.</span
            ></span
        ><span class="eyebrow">LET’S GET YOU BACK ON TRACK</span>
        <h1>
            {{
                error.statusCode === 404
                    ? "This page has moved on."
                    : "A little pause in your journey."
            }}
        </h1>
        <p>
            {{
                error.statusCode === 404
                    ? "The page you’re looking for isn’t here. Your workspace is just a step away."
                    : "Please try again, or return to your workspace."
            }}
        </p>
        <button class="button primary" @click="clearError({ redirect: '/dashboards' })">
            Back to your workspace<AppIcon name="right" />
        </button>
    </main>
</template>
