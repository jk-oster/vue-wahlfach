<script setup>
import {onMounted, ref} from "vue";
import {useLogin} from "@/useLogin.js";
import {useChats} from "@/useChats.js";
import Message from "@/components/Message.vue";
import {getFileUrl} from "@/pocketbase.js";

const {currentUser, logout} = useLogin();
const {chats, currentChat, messages, sendMessage, fetchChats, setChat, createChat} = useChats();

const newMessageText = ref('');

onMounted(() => {
  fetchChats();
});

function handleSetChat(chatId) {
  setChat(chatId)
}

function handleSendMessage() {
  if(!newMessageText.value) {
    alert('Bitte Nachricht eingeben');
    return;
  }

  sendMessage(newMessageText.value, currentUser.value?.id);
  newMessageText.value = '';
}

const newChatName = ref('');
const newChatImageInput = ref(null);

function handleCreateChat() {
  if(!newChatName.value) {
    alert('Bitte Chat Name eingeben');
    return;
  }

  const image = newChatImageInput.value?.files[0];
  createChat(newChatName.value, [currentUser.value.id], image);
  newChatName.value = '';
}

</script>

<template>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 h-full">

    <section class="col-span-1 flex flex-col  h-full">

      <div class="flex flex-col justify-end pb-4">
        <div class="text-lg font-bold text-center">
          <h1>
            Hello Welcome {{ currentUser?.name }}
          </h1>
        </div>

        <div class="flex justify-between items-center gap-2 h-fit">
          <RouterLink to="/" class="btn btn-active btn-warning">
            <button @click="logout()">
              Logout
            </button>
          </RouterLink>
        </div>
      </div>

      <div class="overflow-y-auto flex-grow">
        <ul class="list bg-base-100 rounded-box shadow-md">

          <li class="p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between items-center">
            <div>
              <h2>Most recent chats</h2>
            </div>
            <div>
              <button class="btn btn-ghost btn-sm" @click="console.log('TODO implement')">
                Add chat
              </button>
            </div>
          </li>

          <li class="list-row cursor-pointer" v-for="chat in chats" :key="chat.id" @click="handleSetChat(chat.id)">
            <div>
              <img class="size-10 rounded-box" :src="getFileUrl('chats', chat.id, chat.image)"  alt="Chat Group Profile Image"/>
            </div>
            <div>
              <div>{{ chat.name }}</div>
              <div class="text-xs uppercase font-semibold opacity-60">{{ chat.updated }}</div>
            </div>
            <button class="btn btn-square btn-ghost">
              <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
            </button>
          </li>

        </ul>
      </div>
    </section>
    <section class="col-span-2 bg-base-100 rounded-box shadow-md h-full flex flex-col">
      <div v-if="currentChat" class="p-4 rounded-t-box border-b-1 border-base-100 flex items-center justify-between gap-2">
        <div class="mr-2">
          <img class="size-10 rounded-box" :src="'https://jet-escape.pockethost.io/api/files/chats/' + currentChat.id + '/' + currentChat.image"  alt="User Profile Image"/>
        </div>

        <div class="flex-grow">
          <h2 class="text-lg font-bold">{{ currentChat.name }}</h2>
          <p class="opacity-50 text-sm">Created at: {{ currentChat.created }}, Updated at: {{ currentChat.updated }}</p>
        </div>
        <div>
          <button class="btn btn-ghost mr-2"  @click="() => console.log('TODO')">
            Add Member
          </button>

          <button class="btn btn-info" @click="() => console.log('TODO')">
            Info
          </button>
        </div>
      </div>

      <div class="overflow-y-auto h-100 p-4 flex-grow flex flex-col gap-2">

        <ul v-if="messages.length && currentChat">
          <Message v-for="message in messages"  :key="message.id" :currentUser="currentUser" :message="message"></Message>
          <li v-if="currentChat && messages.length === 0" class="chat chat-start">
            <div class="chat-bubble">No messages yet. Start the conversation!</div>
          </li>
        </ul>
        <div v-else-if="!currentChat">
          No chat selected
        </div>
      </div>

      <div class="flex justify-between items-center gap-2 p-4">
        <textarea type="text" v-model="newMessageText" placeholder="Type a message..." class="textarea flex-grow" :disabled="!currentChat"></textarea>
        <button @click="handleSendMessage" class="btn btn-ghost">Send</button>
      </div>

    </section>
  </div>

</template>

<style scoped>

</style>