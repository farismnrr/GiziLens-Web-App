export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack";

export interface Food {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

export interface MealEntry {
    id: string;
    foodId: string;
    meal: MealType;
    date: string;
    time: string;
    servings: number;
}

export interface Preferences {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
    energyUnit: "kcal" | "kJ";
    reminder: boolean;
    reminderTime: string;
}
