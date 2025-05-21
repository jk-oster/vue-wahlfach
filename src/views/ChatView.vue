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
  <h1>
    Hello Welcome {{ currentUser?.name }}
  </h1>
  <div>
    <RouterLink to="/">
      <button @click="logout()">
        Logout
      </button>
    </RouterLink>
  </div>

  <h2>
    Chat List
  </h2>
  <ul>
    <li v-for="chat in chats" >
      <button @click="handleSetChat(chat.id)">
        {{ chat.name }}
      </button>
    </li>
  </ul>

  <div v-if="currentChat">
    <h2>
      Aktiver Chat Info: {{ currentChat.name }}
      <img v-bind:src="getFileUrl('chats', currentChat?.id, currentChat?.image)" alt="Chat Profile Image">
    </h2>

    <ul>
      <li v-for="message in messages">
        <Message :message="message" :currentUser="currentUser"/>
      </li>
    </ul>

    <input v-model="newMessageText" type="text" />
    <button @click="handleSendMessage()">Senden</button>

  </div>

  <div>
    <h2>
      Create Chat
    </h2>

    <input v-model="newChatName" type="text" />
    <input ref="newChatImageInput" type="file" alt="Chat image"/>
    <button @click="handleCreateChat">Create Chat</button>

  </div>
</template>

<style scoped>

</style>