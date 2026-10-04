<script setup lang="ts">
useHead({ title: "GiziLens · A little clarity for a healthier you", htmlAttrs: { lang: "en" } });
const features = [
    {
        icon: "bowl",
        title: "Know what fuels you",
        text: "Keep your meals in one place. See the energy and nutrients behind your everyday choices."
    },
    {
        icon: "target",
        title: "Find your balance",
        text: "Make your goals feel personal, from your daily nutrition to that extra glass of water."
    },
    {
        icon: "chart",
        title: "See your progress",
        text: "Turn your daily habits into a clearer picture. Notice the patterns and celebrate the small wins."
    }
];
const steps = [
    {
        title: "Make it yours",
        text: "Set your goals and create a space for the habits you want to build."
    },
    {
        title: "Record your day",
        text: "Add your meals and keep track of your water. A few moments is all it takes."
    },
    {
        title: "Keep moving forward",
        text: "Explore your insights, find your rhythm, and come back tomorrow."
    }
];
</script>
<template>
    <div class="landing">
        <div class="landing-shell">
            <header class="landing-header">
                <NuxtLink to="/" class="brand" aria-label="GiziLens home"
                    ><span class="brand-mark"><AppIcon name="leaf" :size="24" /></span>GiziLens<span
                        class="brand-dot"
                        >.</span
                    ></NuxtLink
                >
                <nav aria-label="About GiziLens">
                    <a href="#features">Why GiziLens</a><a href="#how-it-works">How it works</a>
                </nav>
                <div class="header-actions">
                    <NuxtLink to="/login" class="text-link">Log in</NuxtLink
                    ><NuxtLink to="/register" class="button primary"
                        >Get started<AppIcon name="right" :size="16"
                    /></NuxtLink>
                </div>
            </header>
            <main id="main-content">
                <section class="landing-hero">
                    <div class="hero-copy">
                        <span class="eyebrow">YOUR EVERYDAY NUTRITION COMPANION</span>
                        <h1>Eat well.<br />Understand <span>why.</span></h1>
                        <p>
                            A little clarity goes a long way. Get to know your food, find your
                            balance, and build habits that feel good.
                        </p>
                        <div class="hero-actions">
                            <NuxtLink to="/dashboards" class="button primary"
                                >Explore your dashboard<AppIcon name="right" :size="18" /></NuxtLink
                            ><a href="#how-it-works" class="button secondary">How it works</a>
                        </div>
                        <div class="hero-trust">
                            <span class="trust-check"
                                ><AppIcon name="check" :size="14" />Built around your day</span
                            ><span class="trust-check"
                                ><AppIcon name="check" :size="14" />One meal at a time</span
                            >
                        </div>
                    </div>
                    <div class="hero-visual">
                        <div class="hero-orbit"></div>
                        <FoodPlate />
                        <div class="floating-card meal">
                            <span class="food-symbol green"
                                ><AppIcon name="bowl" :size="23"
                            /></span>
                            <div>
                                <strong>A plate full of possibilities</strong>
                                <p>Fresh, balanced, and all yours.</p>
                            </div>
                        </div>
                        <span class="hero-mini-tag"
                            ><AppIcon name="leaf" :size="14" />A little more balance</span
                        >
                        <div class="floating-card balance">
                            <AppIcon name="check" :size="23" />
                            <div>
                                <strong>Everyday choices. Lasting habits.</strong>
                                <p>Start where you are. Grow from there.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="landing-strip">
                    <span><AppIcon name="bowl" :size="19" />Mindful meals</span
                    ><span><AppIcon name="drop" :size="19" />Better hydration</span
                    ><span><AppIcon name="target" :size="19" />Personal goals</span
                    ><span><AppIcon name="chart" :size="19" />Meaningful insights</span>
                </div>
                <section id="features" class="landing-section">
                    <div class="landing-section-head">
                        <span class="eyebrow">LESS GUESSWORK. MORE AWARENESS.</span>
                        <h2>Your wellbeing,<br />a little more in focus.</h2>
                        <p>
                            You don’t need to change everything at once. Start by understanding the
                            choices you already make.
                        </p>
                    </div>
                    <div class="feature-grid">
                        <article
                            v-for="feature in features"
                            :key="feature.title"
                            class="feature-card"
                        >
                            <span class="note-icon"
                                ><AppIcon :name="feature.icon" :size="24"
                            /></span>
                            <h3>{{ feature.title }}</h3>
                            <p>{{ feature.text }}</p>
                        </article>
                    </div>
                </section>
                <section id="how-it-works" class="landing-section steps-section">
                    <div class="landing-section-head">
                        <span class="eyebrow">A SIMPLE DAILY RHYTHM</span>
                        <h2>Good habits start small.</h2>
                        <p>A calmer way to keep your nutrition in view.</p>
                    </div>
                    <div class="feature-grid">
                        <article
                            v-for="(step, index) in steps"
                            :key="step.title"
                            class="feature-card"
                        >
                            <span class="step-number">0{{ index + 1 }}</span>
                            <h3>{{ step.title }}</h3>
                            <p>{{ step.text }}</p>
                        </article>
                    </div>
                </section>
                <section class="landing-cta">
                    <div>
                        <h2>Make room for a healthier you.</h2>
                        <p>Your next good habit starts with a little awareness.</p>
                    </div>
                    <NuxtLink to="/dashboards" class="button light"
                        >Open your workspace<AppIcon name="right" :size="18"
                    /></NuxtLink>
                </section>
            </main>
            <footer class="landing-footer">
                <NuxtLink to="/" class="brand"
                    ><span class="brand-mark"><AppIcon name="leaf" :size="20" /></span>GiziLens<span
                        class="brand-dot"
                        >.</span
                    ></NuxtLink
                ><span>© {{ new Date().getFullYear() }} GiziLens. A little better, every day.</span>
                <nav aria-label="Footer navigation">
                    <NuxtLink to="/login">Log in</NuxtLink
                    ><NuxtLink to="/register">Create account</NuxtLink>
                </nav>
            </footer>
        </div>
    </div>
</template>
