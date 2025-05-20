import {onMounted, ref} from "vue";
import {pb} from './pocketbase.js'
import {useLogin} from "@/useLogin.js";

// Make variables Singletons to not create multiple storages for e.g. currrentChat
// Move them out of the scope of the composable to make them singletons automatically based on JS import/export
const chats = ref([]);
const currentChat = ref(null);
const messages = ref([]);

export function useChats() {

    // Use the existing Login/Auth functionality
    const {currentUser} = useLogin();

    const setChat = async (chatId) => {
        const foundChat = chats.value.find(chat => chat.id === chatId);
        if(foundChat) {
            currentChat.value = foundChat;

            // load all messages of this chat into our message list
            messages.value = await pb.collection('messages').getFullList({
                filter: `chat = "${chatId}"`,
                // TODO expand user
            });
        }
    }

    // TODO create chats (set name & profile image)
    // TODO edit chats (add/remove users, rename,...)

    const fetchChats = async () => {
        chats.value = await pb.collection('chats').getFullList(); // TODO expand users
    }

    onMounted(async () => {
        // TODO manage (un)subscriptions

        // Receiving of sent messages
        pb.collection('messages').subscribe('*', function (e) {
            // ist die message eine in unserem chat gesendete message? dann hinzufügen zu messages
            if (e.action === 'create' && e.record.chat === currentChat.value.id) {
                messages.value = [...messages.value, e.record]
            }
            // TODO send notifications when receiving a message
            // message is in one of the not active user chats -> send notification / elso do nothing
        }, { /* TODO expand user */});

        // TODO send notification when added to a chat / chat has been updated
        // also subscribe to chats to receive notification when being added to a chat
        // if chat is created / updated and has user as member add it to chats list and notify
    });

    const sendMessage = async (newMessageText) => {
        // TODO make sure that there is a current user, else show error message / send to login

        const newMessage = {
            // id: Date.now(), // not necessary -> pb automatically creates one
            text: newMessageText,
            // created: Date.now(), // not necessary -> pb automatically adds it
            user: currentUser.value?.id,
            chat: currentChat.value?.id,
        }

        await pb.collection('messages').create(newMessage);

        // messages.value.push(newMessage); // ❌ using push vue cannot track the change of the array!
        // messages.value = [...messages.value, newMessage]; // ✅ use this syntax so vue reactivity works
    }

    return {
        chats,
        currentChat,
        messages,
        sendMessage,
        setChat,
        fetchChats,
    }
}
