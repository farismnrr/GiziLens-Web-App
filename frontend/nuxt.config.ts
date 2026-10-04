import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: false },
    ssr: false,
    css: ["~/assets/css/main.css"],
    app: {
        baseURL: "/",
        buildAssetsDir: "/assets/",
        head: {
            meta: [{ name: "theme-color", content: "#187b67" }],
            link: [{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" }]
        }
    },
    nitro: { preset: "bun" },
    postcss: { plugins: { tailwindcss: {}, autoprefixer: {} } },
    modules: ["@pinia/nuxt", "@vite-pwa/nuxt", "@nuxtjs/tailwindcss"],
    pwa: {
        registerType: "autoUpdate",
        injectRegister: "auto",
        strategies: "generateSW",
        includeAssets: ["favicon.ico", "logo.svg", "avatar.svg"],
        manifest: {
            name: "GiziLens",
            short_name: "GiziLens",
            theme_color: "#187b67",
            background_color: "#ffffff",
            display: "standalone",
            orientation: "portrait",
            scope: "/",
            start_url: "/",
            icons: [{ src: "/logo.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
            description: "Your everyday nutrition companion.",
            categories: ["health", "nutrition", "food"]
        },
        workbox: {
            navigateFallback: "/index.html",
            globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
            cleanupOutdatedCaches: true
        },
        client: { installPrompt: true },
        devOptions: { enabled: false }
    }
});
