<template>
    <div class="auth-layout">
        <aside class="auth-story">
            <NuxtLink to="/" class="brand light"
                ><span class="brand-mark"><AppIcon name="leaf" :size="24" /></span>GiziLens<span
                    class="brand-dot"
                    >.</span
                ></NuxtLink
            >
            <div class="auth-story-copy">
                <span class="eyebrow">MAKE ROOM FOR BETTER HABITS</span>
                <h1>A healthier you<br />starts with clarity.</h1>
                <p>
                    Get to know your food. Find your balance.<br />Build a routine that feels like
                    you.
                </p>
                <div class="auth-preview">
                    <span class="food-symbol green"><AppIcon name="leaf" :size="30" /></span>
                    <div>
                        <strong>Good food. Better days.</strong
                        ><span>Mindful choices, meaningful progress.</span>
                    </div>
                    <AppIcon name="check" />
                </div>
            </div>
            <div class="auth-story-foot">
                <span>YOUR EVERYDAY NUTRITION COMPANION</span><AppIcon name="heart" :size="18" />
            </div>
        </aside>
        <main class="auth-main" id="main-content">
            <NuxtLink to="/" class="brand auth-mobile-brand"
                ><span class="brand-mark"><AppIcon name="leaf" :size="24" /></span>GiziLens<span
                    class="brand-dot"
                    >.</span
                ></NuxtLink
            >
            <div class="auth-form-wrap"><slot /></div>
            <p class="auth-foot">A little more awareness. A little more balance.</p>
        </main>
    </div>
</template>
