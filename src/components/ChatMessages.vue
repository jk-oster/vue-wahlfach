<script setup>
import {ref} from "vue";
import {useLogin} from "@/useLogin.js";
import {useChats} from "@/useChats.js";
import {getFileUrl} from "@/pocketbase.js";
import {formatDate} from "@/format.js";
import Message from "@/components/Message.vue";

const {currentUser} = useLogin();
const {currentChat, messages, sendMessage} = useChats();

const newMessageText = ref('');
function handleSendMessage() {
  if(!newMessageText.value) {
    alert('Bitte Nachricht eingeben');
    return;
  }

  sendMessage(newMessageText.value, currentUser.value?.id);
  newMessageText.value = '';
}
</script>

<template>
  <div v-if="currentChat" class="p-4 rounded-t-box border-b-1 border-base-100 flex items-center justify-between gap-2">
    <div class="mr-2">
      <img class="size-10 rounded-box" :src="getFileUrl('chats', currentChat.id, currentChat.image)"
           alt="User Profile Image"/>
    </div>

    <div class="flex-grow">
      <h2 class="text-lg font-bold">{{ currentChat.name }}</h2>
      <p class="opacity-50 text-sm">Created at: {{ formatDate(currentChat.created) }}, Updated at: {{
        formatDate(currentChat.updated) }}</p>
    </div>
    <div>
      <button class="btn btn-ghost mr-2" @click="() => console.log('TODO')">
        Add Member
      </button>

      <button class="btn btn-info" @click="() => console.log('TODO')">
        Info
      </button>
    </div>
  </div>
  <div class="overflow-y-auto h-100 p-4 flex-grow flex flex-col gap-2">

    <ul v-if="messages.length && currentChat">
      <Message v-for="message in messages" :key="message.id" :currentUser="currentUser" :message="message"></Message>
      <li v-if="currentChat && messages.length === 0" class="chat chat-start">
        <div class="chat-bubble">No messages yet. Start the conversation!</div>
      </li>
    </ul>
    <div v-else-if="!currentChat">
      No chat selected
    </div>
    <div v-else-if="currentChat && messages.length <= 0">
      No messages yet - be the first one ;)
    </div>

  </div>
  <div class="flex justify-between items-center gap-2 p-4">
    <textarea type="text" v-model="newMessageText" placeholder="Type a message..." class="textarea flex-grow"
              :disabled="!currentChat"></textarea>
    <button @click="handleSendMessage" class="btn btn-ghost">Send</button>
  </div>
</template>
