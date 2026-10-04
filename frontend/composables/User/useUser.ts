import { useNutritionStore } from "~/stores/nutrition";

export const useUser = () => {
    const store = useNutritionStore();
    const loadUser = async () => {
        store.hydrate();
        return { success: true, loading: false, user: { ...store.profile }, error: null };
    };
    return { loadUser };
};
