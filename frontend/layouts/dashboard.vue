<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useNutritionStore } from "~/stores/nutrition";
const store = useNutritionStore();
const route = useRoute();
const links = [
    { to: "/dashboards", label: "Overview", icon: "grid" },
    { to: "/dashboards/journal", label: "Food journal", icon: "book" },
    { to: "/dashboards/reports", label: "Insights", icon: "chart" },
    { to: "/dashboards/settings", label: "Settings", icon: "settings" }
];
const activeTitle = computed(
    () => links.find(link => link.to === route.path)?.label || "Your profile"
);
onMounted(() => store.hydrate());
const signOut = async () => {
    store.signOut();
    await navigateTo("/login");
};
</script>

<template>
    <div class="workspace">
        <aside class="sidebar">
            <NuxtLink to="/" class="brand" aria-label="GiziLens home"
                ><span class="brand-mark"><BrandMark /></span>GiziLens<span
                    class="brand-dot"
                    >.</span
                ></NuxtLink
            >
            <span class="nav-caption">WORKSPACE</span>
            <nav class="desktop-nav" aria-label="Main navigation">
                <NuxtLink
                    v-for="link in links"
                    :key="link.to"
                    :to="link.to"
                    :class="{ active: route.path === link.to }"
                    ><AppIcon :name="link.icon" />{{ link.label }}</NuxtLink
                >
            </nav>
            <div class="sidebar-note">
                <span class="note-icon"><AppIcon name="spark" :size="23" /></span
                ><strong>Small steps. Big change.</strong>
                <p>One balanced meal at a time.</p>
                <NuxtLink to="/dashboards/settings"
                    >Set your goals <AppIcon name="right" :size="16"
                /></NuxtLink>
            </div>
            <div class="sidebar-bottom">
                <button class="logout-link" @click="signOut">
                    <AppIcon name="logout" />Log out</button
                ><span>GiziLens © {{ new Date().getFullYear() }}</span>
            </div>
        </aside>
        <div class="workspace-body">
            <header class="workspace-header">
                <div class="header-breadcrumb">
                    <NuxtLink to="/" class="mobile-brand" aria-label="GiziLens home"
                        ><BrandMark :size="28" bare /></NuxtLink
                    ><span>Your workspace</span><AppIcon name="chevron" :size="14" /><strong>{{
                        activeTitle
                    }}</strong>
                </div>
                <NuxtLink
                    to="/dashboards/profile"
                    class="header-profile"
                    aria-label="Edit your profile"
                    ><span>{{ store.fullName }}<small>Personal account</small></span
                    ><img src="/avatar.svg" alt=""
                /></NuxtLink>
            </header>
            <main class="workspace-main" id="main-content"><slot /></main>
        </div>
        <nav class="mobile-nav" aria-label="Mobile navigation">
            <NuxtLink
                v-for="link in links"
                :key="link.to"
                :to="link.to"
                :class="{ active: route.path === link.to }"
                ><AppIcon :name="link.icon" :size="22" /><span>{{
                    link.label === "Food journal" ? "Journal" : link.label
                }}</span></NuxtLink
            >
        </nav>
    </div>
</template>
