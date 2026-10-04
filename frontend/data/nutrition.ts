import type { Food, MealEntry, MealType, Preferences } from "~/models/nutrition";
import type { User } from "~/models/user";

export const INITIAL_PROFILE: User = {
    first_name: "Nadia",
    last_name: "Putri",
    email: "nadia.putri@example.com",
    photo: "/avatar.svg"
};

export const DEFAULT_PREFERENCES: Preferences = {
    calories: 2000,
    protein: 100,
    carbs: 250,
    fat: 65,
    water: 8,
    energyUnit: "kcal",
    reminder: true,
    reminderTime: "12:00"
};

export const MEAL_TYPES: MealType[] = ["Breakfast", "Lunch", "Dinner", "Snack"];

export const FOODS: Food[] = [
    {
        id: "oats",
        name: "Banana overnight oats",
        description: "Oats, banana, chia & almond milk · 1 bowl",
        icon: "bowl",
        color: "sand",
        calories: 340,
        protein: 12,
        carbs: 52,
        fat: 10
    },
    {
        id: "chicken",
        name: "Grilled chicken bowl",
        description: "Chicken breast, brown rice & vegetables · 1 bowl",
        icon: "bowl",
        color: "green",
        calories: 520,
        protein: 38,
        carbs: 58,
        fat: 15
    },
    {
        id: "yogurt",
        name: "Greek yogurt & berries",
        description: "Plain yogurt, strawberries & blueberries · 1 cup",
        icon: "bowl",
        color: "pink",
        calories: 180,
        protein: 15,
        carbs: 22,
        fat: 4
    },
    {
        id: "salmon",
        name: "Salmon with roasted vegetables",
        description: "Salmon fillet, broccoli & carrots · 1 plate",
        icon: "fish",
        color: "peach",
        calories: 460,
        protein: 35,
        carbs: 24,
        fat: 22
    },
    {
        id: "gado",
        name: "Gado-gado",
        description: "Vegetables, tofu, egg & peanut sauce · 1 plate",
        icon: "leaf",
        color: "green",
        calories: 390,
        protein: 18,
        carbs: 35,
        fat: 20
    },
    {
        id: "rice",
        name: "Nasi ayam panggang",
        description: "Rice, grilled chicken & cucumber · 1 plate",
        icon: "bowl",
        color: "sand",
        calories: 480,
        protein: 32,
        carbs: 60,
        fat: 12
    },
    {
        id: "avocado",
        name: "Avocado toast",
        description: "Sourdough, avocado & poached egg · 1 serving",
        icon: "leaf",
        color: "green",
        calories: 320,
        protein: 13,
        carbs: 30,
        fat: 17
    },
    {
        id: "banana",
        name: "Banana",
        description: "Fresh banana · 1 medium fruit",
        icon: "apple",
        color: "sand",
        calories: 105,
        protein: 1,
        carbs: 27,
        fat: 0
    },
    {
        id: "tempeh",
        name: "Tempeh & vegetable stir-fry",
        description: "Tempeh, green beans & bell peppers · 1 plate",
        icon: "leaf",
        color: "green",
        calories: 350,
        protein: 22,
        carbs: 30,
        fat: 16
    },
    {
        id: "smoothie",
        name: "Mango protein smoothie",
        description: "Mango, milk & protein · 1 glass",
        icon: "cup",
        color: "peach",
        calories: 240,
        protein: 20,
        carbs: 32,
        fat: 5
    }
];

export const dateKey = (date = new Date()): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const shiftDate = (key: string, offset: number): string => {
    const date = new Date(`${key}T12:00:00`);
    date.setDate(date.getDate() + offset);
    return dateKey(date);
};

export const seedMeals = (): MealEntry[] => {
    const result: MealEntry[] = [];
    for (let day = 0; day < 30; day++) {
        const date = shiftDate(dateKey(), -day);
        const foods =
            day === 0
                ? ["oats", "chicken", "yogurt"]
                : [
                      day % 2 ? "avocado" : "oats",
                      day % 3 ? "rice" : "chicken",
                      "yogurt",
                      day % 2 ? "tempeh" : "salmon"
                  ];
        foods.forEach((foodId, index) => {
            result.push({
                id: `meal-${date}-${index}`,
                foodId,
                meal: (["Breakfast", "Lunch", "Snack", "Dinner"] as MealType[])[index],
                date,
                time: ["08:00", "12:30", "15:00", "19:00"][index],
                servings: day === 0 ? 1 : day % 4 === 0 && index === 1 ? 1.5 : 1
            });
        });
    }
    return result;
};
