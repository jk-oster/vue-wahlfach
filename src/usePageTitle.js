import {ref, watch} from "vue";

/**
 * A reactive variable synced to the document title
 */
export function usePageTitle() {
    const title = ref(document.title);

    watch(title, () => {
        document.title = title.value;
    });

    return {
        title,
    }
}