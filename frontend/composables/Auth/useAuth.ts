import type { ValidationErrors } from "~/models/error";
import { INITIAL_PROFILE } from "~/data/nutrition";
import { useNutritionStore } from "~/stores/nutrition";

interface AuthResult {
    success: boolean;
    validationErrors?: ValidationErrors;
    message?: string;
}

const validateLogin = (email: string, password: string): ValidationErrors => {
    const errors: ValidationErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errors.email = "Enter a valid email address.";
    }
    if (password.length < 6) errors.password = "Use at least 6 characters.";
    return errors;
};

export const useAuth = () => {
    const store = useNutritionStore();

    const loginUser = async (form: { email: string; password: string }): Promise<AuthResult> => {
        const validationErrors = validateLogin(form.email, form.password);
        if (Object.keys(validationErrors).length) return { success: false, validationErrors };
        store.signIn(form.email.trim().toLowerCase());
        return { success: true };
    };

    const registerUser = async (form: {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        confirm_password: string;
    }): Promise<AuthResult> => {
        const validationErrors = validateLogin(form.email, form.password);
        if (!form.first_name.trim()) validationErrors.first_name = "Enter your first name.";
        if (!form.last_name.trim()) validationErrors.last_name = "Enter your last name.";
        if (form.password !== form.confirm_password) {
            validationErrors.confirm_password = "Passwords must match.";
        }
        if (Object.keys(validationErrors).length) return { success: false, validationErrors };
        store.register({
            first_name: form.first_name.trim(),
            last_name: form.last_name.trim(),
            email: form.email.trim().toLowerCase(),
            photo: INITIAL_PROFILE.photo
        });
        return { success: true, message: "Your account is ready." };
    };

    const logoutUser = async (): Promise<AuthResult> => {
        store.signOut();
        return { success: true };
    };

    return { loginUser, registerUser, logoutUser };
};
