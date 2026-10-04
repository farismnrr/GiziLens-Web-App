import { h, render } from "vue";
import Toast from "../components/Utils/Toast.vue";

let currentToast: { container: HTMLElement; removeToast: () => void } | null = null;

function showToast(
    message: string | undefined,
    type: "info" | "success" | "danger" | "warning" = "success"
) {
    const safeMessage = message || "Please try again.";

    if (currentToast) {
        currentToast.removeToast();
        currentToast = null;
    }

    const container = document.createElement("div");
    document.body.appendChild(container);

    const removeToast = () => {
        if (container.parentNode) {
            render(null, container);
            document.body.removeChild(container);
        }
        if (currentToast?.container === container) {
            currentToast = null;
        }
    };

    const vnode = h(Toast, {
        message: safeMessage,
        type,
        onDismiss: removeToast
    });

    render(vnode, container);

    currentToast = { container, removeToast };

    setTimeout(() => {
        if (currentToast?.container === container) {
            removeToast();
        }
    }, 4500);
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            showToast
        }
    };
});

export { showToast };
