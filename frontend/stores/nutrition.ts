import { defineStore } from "pinia";
import { DEFAULT_PREFERENCES, FOODS, INITIAL_PROFILE, dateKey, seedMeals } from "~/data/nutrition";
import type { MealEntry, Preferences } from "~/models/nutrition";
import type { User } from "~/models/user";

const STORAGE_KEY = "gizilens-showcase-v2";

const isUser = (value: unknown): value is User => {
    if (!value || typeof value !== "object") return false;
    const user = value as Partial<User>;
    return [user.first_name, user.last_name, user.email].every(
        field => typeof field === "string" && field.trim().length > 0
    );
};

const isMeal = (value: unknown): value is MealEntry => {
    if (!value || typeof value !== "object") return false;
    const entry = value as MealEntry;
    return (
        typeof entry.id === "string" &&
        FOODS.some(food => food.id === entry.foodId) &&
        ["Breakfast", "Lunch", "Dinner", "Snack"].includes(entry.meal) &&
        /^\d{4}-\d{2}-\d{2}$/.test(entry.date) &&
        /^\d{2}:\d{2}$/.test(entry.time) &&
        Number.isFinite(entry.servings) &&
        entry.servings > 0 &&
        entry.servings <= 10
    );
};

export const useNutritionStore = defineStore("nutrition", {
    state: () => ({
        profile: { ...INITIAL_PROFILE },
        profiles: [] as User[],
        signedIn: false,
        hydrated: false,
        meals: seedMeals(),
        water: { [dateKey()]: 5 } as Record<string, number>,
        preferences: { ...DEFAULT_PREFERENCES }
    }),
    getters: {
        food: () => (id: string) => FOODS.find(food => food.id === id) || FOODS[0],
        entries: state => (date: string) =>
            state.meals
                .filter(entry => entry.date === date)
                .sort((a, b) => a.time.localeCompare(b.time)),
        totals(): (date: string) => {
            calories: number;
            protein: number;
            carbs: number;
            fat: number;
        } {
            return (date: string) =>
                this.entries(date).reduce(
                    (total, entry) => {
                        const food = this.food(entry.foodId);
                        return {
                            calories: total.calories + food.calories * entry.servings,
                            protein: total.protein + food.protein * entry.servings,
                            carbs: total.carbs + food.carbs * entry.servings,
                            fat: total.fat + food.fat * entry.servings
                        };
                    },
                    { calories: 0, protein: 0, carbs: 0, fat: 0 }
                );
        },
        energy: state => (value: number) =>
            Math.round(state.preferences.energyUnit === "kJ" ? value * 4.184 : value),
        fullName: state => `${state.profile.first_name} ${state.profile.last_name}`
    },
    actions: {
        hydrate() {
            if (this.hydrated || !import.meta.client) return;
            this.hydrated = true;
            try {
                const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
                if (!saved || typeof saved !== "object") return;
                if (isUser(saved.profile))
                    this.profile = { ...saved.profile, photo: INITIAL_PROFILE.photo };
                this.signedIn = saved.signedIn === true;
                if (Array.isArray(saved.profiles))
                    this.profiles = saved.profiles
                        .filter(isUser)
                        .map((user: User) => ({ ...user, photo: INITIAL_PROFILE.photo }));
                if (Array.isArray(saved.meals)) this.meals = saved.meals.filter(isMeal);
                if (saved.water && typeof saved.water === "object") {
                    this.water = Object.fromEntries(
                        Object.entries(saved.water)
                            .filter(
                                ([key, value]) =>
                                    /^\d{4}-\d{2}-\d{2}$/.test(key) &&
                                    typeof value === "number" &&
                                    value >= 0 &&
                                    value <= 30
                            )
                            .map(([key, value]) => [key, Number(value)])
                    );
                }
                if (saved.preferences && typeof saved.preferences === "object") {
                    for (const key of ["calories", "protein", "carbs", "fat", "water"] as const) {
                        const value = saved.preferences[key];
                        const [min, max] =
                            key === "calories"
                                ? [500, 5000]
                                : key === "water"
                                  ? [1, 20]
                                  : [1, 1000];
                        if (typeof value === "number" && value >= min && value <= max)
                            this.preferences[key] = value;
                    }
                    if (["kcal", "kJ"].includes(saved.preferences.energyUnit))
                        this.preferences.energyUnit = saved.preferences.energyUnit;
                    if (typeof saved.preferences.reminder === "boolean")
                        this.preferences.reminder = saved.preferences.reminder;
                    if (
                        typeof saved.preferences.reminderTime === "string" &&
                        /^\d{2}:\d{2}$/.test(saved.preferences.reminderTime)
                    )
                        this.preferences.reminderTime = saved.preferences.reminderTime;
                }
            } catch {
                /* Keep the app usable when storage is unavailable. */
            }
        },
        persist() {
            if (!import.meta.client) return;
            try {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({
                        profile: this.profile,
                        profiles: this.profiles,
                        signedIn: this.signedIn,
                        meals: this.meals,
                        water: this.water,
                        preferences: this.preferences
                    })
                );
            } catch {
                /* State remains available for the current session. */
            }
        },
        signIn(email: string) {
            this.hydrate();
            this.profile = {
                ...(this.profiles.find(user => user.email === email) || INITIAL_PROFILE),
                email
            };
            this.signedIn = true;
            this.persist();
        },
        register(profile: User) {
            this.hydrate();
            this.profiles = [
                ...this.profiles.filter(user => user.email !== profile.email),
                profile
            ];
            this.persist();
        },
        signOut() {
            this.signedIn = false;
            this.persist();
        },
        updateProfile(profile: User) {
            const previousEmail = this.profile.email;
            this.profile = { ...profile, photo: INITIAL_PROFILE.photo };
            this.profiles = [
                ...this.profiles.filter(
                    user => user.email !== previousEmail && user.email !== profile.email
                ),
                this.profile
            ];
            this.persist();
        },
        saveMeal(entry: Omit<MealEntry, "id"> & { id?: string }) {
            const saved = {
                ...entry,
                id:
                    entry.id ||
                    (typeof crypto.randomUUID === "function"
                        ? crypto.randomUUID()
                        : `meal-${Date.now()}-${Math.random().toString(36).slice(2)}`)
            };
            const index = this.meals.findIndex(meal => meal.id === saved.id);
            if (index === -1) this.meals.push(saved);
            else this.meals[index] = saved;
            this.persist();
        },
        removeMeal(id: string) {
            this.meals = this.meals.filter(entry => entry.id !== id);
            this.persist();
        },
        addWater(date: string, amount: number) {
            this.water[date] = Math.min(30, Math.max(0, (this.water[date] || 0) + amount));
            this.persist();
        },
        updatePreferences(preferences: Preferences) {
            this.preferences = { ...preferences };
            this.persist();
        }
    }
});
