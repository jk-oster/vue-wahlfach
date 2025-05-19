<script setup>
import {onMounted, ref} from "vue";
import {useLogin} from "@/useLogin.js";
import {useChats} from "@/useChats.js";
import Message from "@/components/Message.vue";

const {currentUser, logout} = useLogin();
const {chats, currentChat, messages, sendMessage, fetchChats, setChat} = useChats();

const newMessageText = ref('');

onMounted(() => {
  fetchChats();
});

function handleSetChat(chatId) {
  setChat(chatId)
}

function handleSendMessage() {
  sendMessage(newMessageText.value, currentUser.value?.id)
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
      Aktiver Chat Info
    </h2>
    {{ currentChat.name }}

    <ul>
      <li v-for="message in messages">
        <Message :message="message" :currentUser="currentUser"/>
      </li>
    </ul>

    <input v-model="newMessageText" type="text" />
    <button @click="handleSendMessage()">Senden</button>

  </div>
</template>

<style scoped>

</style>