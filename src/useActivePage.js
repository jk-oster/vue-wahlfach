import {ref} from "vue";

/**
 * A reactive variable representing if the user is currently active on the page or if he is on another tab in the browser
 */
export function useActivePage() {
    const isActive = ref(true)

    document.addEventListener("visibilitychange", (e) => {
        isActive.value = document.visibilityState !== "hidden";
    });

    return {
        isActive
    }
}