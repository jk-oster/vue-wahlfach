import {onMounted, readonly, ref} from "vue";
import {pb} from './pocketbase.js'
import {useLogin} from "@/useLogin.js";
import {useWebNotification} from "@vueuse/core";

// Make variables Singletons to not create multiple storages for e.g. currrentChat
// Move them out of the scope of the composable to make them singletons automatically based on JS import/export
const chats = ref(null);
const currentChat = ref(null);
const messages = ref([]);

export function useChats() {


    // Use the existing Login/Auth functionality
    const {currentUser} = useLogin();

    const setChat = async (chatId) => {
        const foundChat = chats.value.find(chat => chat.id === chatId);
        if(foundChat) {
            currentChat.value = foundChat;

            localStorage.currentChat = JSON.stringify(foundChat);

            // load all messages of this chat into our message list
            messages.value = await pb.collection('messages').getFullList({
                filter: `chat = "${chatId}"`,
                expand: 'user'
            });

            console.log('Set new active chat: ', foundChat);
        }
    }

    const createChat = async (name, members, image) => {
        const newChat = {
            name: name,
            members: members,
            image: image
        };
        await pb.collection('chats').create(newChat);
        console.log('Chat created: ', newChat)
    }

    const editChat = async (chatData) => {
        // TODO edit chats (add/remove users, rename,...)
        alert('editChat: implement me!');
    }

    const sendMessage = async (newMessageText) => {
        const newMessage = {
            text: newMessageText,
            user: currentUser.value?.id,
            chat: currentChat.value?.id,
        }
        await pb.collection('messages').create(newMessage);
        console.log('Message sent: ', newMessage);

        // messages.value.push(newMessage); // ❌ using push vue cannot track the change of the array!
        // messages.value = [...messages.value, newMessage]; // ✅ use this syntax so vue reactivity works
    }

    const fetchChats = async () => {
        chats.value = await pb.collection('chats').getFullList({
            expand: 'members'
        });
        console.log('Chats fetched: ', chats.value);

        const savedCurrentChat = JSON.parse(localStorage.currentChat ?? 'null') ?? null;
        if (savedCurrentChat) {
            await setChat(savedCurrentChat.id);
            console.log('Loaded last current chat')
        }
    }

    onMounted(async () => {
        // Remove previous existing subscription
        await pb.collection("messages").unsubscribe("*");
        // Receiving sent messages of other users
        await pb.collection('messages').subscribe('*', function (messageEvent) {
            console.log('New message event received: ', messageEvent);

            if (
                messageEvent.action === 'create' &&
                messageEvent.record.chat === currentChat.value?.id
            ) {
                messages.value = [...messages.value, messageEvent.record]
            }

            if (
                messageEvent.record.user !== currentUser.value?.id &&
                messageEvent.record.chat !== currentChat.value?.id
            ) {
                const { show, onClick} = useWebNotification({
                    title: 'NEW: ' + messageEvent.record.text,
                    dir: 'auto',
                    lang: 'en',
                    renotify: true,
                    tag: 'test',
                });
                show();
                // Open the corresponding chat when notification is clicked
                onClick(() => {
                    setChat(messageEvent.record?.chat)
                })
            }
        }, {
            expand: 'user'
        });

        // Remove previous existing subscription
        await pb.collection("chats").unsubscribe("*");
        // Subscribe to chats to receive notification when being added to a chat
        await pb.collection('chats').subscribe('*', function (chatsEvent) {
            console.log('New chat event received: ', chatsEvent);

            if (
                chatsEvent.action === 'create' &&
                chatsEvent.record?.members?.includes(currentUser.value?.id)
            ) {
                chats.value = [...chats.value, chatsEvent.record];
                const { show, onClick} = useWebNotification({
                    title: 'You have been added to a new Chat: ' + chatsEvent.record.name,
                    dir: 'auto',
                    lang: 'en',
                    renotify: true,
                    tag: 'test',
                });
                show();
                // Open the corresponding chat when notification is clicked
                onClick(() => {
                    setChat(chatsEvent.record.id);
                })
            }
        }, {
            expand: 'members'
        });
    });

    return {
        chats: readonly(chats),
        currentChat: readonly(currentChat),
        messages: readonly(messages),
        createChat,
        sendMessage,
        setChat,
        fetchChats,
    }
}
