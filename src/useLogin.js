import {ref} from "vue";
import {pb} from '@/pocketbase.js'

// Make variable Singleton to not create multiple storages for currentUser
// Move it out of the scope of the composable to make it a singleton automatically based on JS import/export
const currentUser = ref(null);

export function useLogin() {

    const login = async (email, password) => {
        const data = await pb.collection('users').authWithPassword(
            email,
            password,
        );
        currentUser.value = data.record;
    }

    const logout = () => {
        currentUser.value = null;
        pb.authStore.clear();
    }

    // TODO add registering as a user
    const register = () => {
        // create user in PB -> triggers E-Mail verification
    }

    // TODO enable staying logged in
    // upon mounting this composable check if the user is still logged in through pb.authStore / token saved in localStorage
    // If yes set the saved user to be the current user

    return {
        currentUser,
        login,
        logout
    }
}