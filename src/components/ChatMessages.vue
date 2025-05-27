<script setup>
import {ref} from "vue";
import {useLogin} from "@/useLogin.js";
import {useChats} from "@/useChats.js";
import {getFileUrl} from "@/pocketbase.js";
import {formatDate} from "@/format.js";
import Message from "@/components/Message.vue";
import Modal from "@/components/Modal.vue";

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
      <p class="opacity-50 text-sm">
        Created at: {{ formatDate(currentChat.created) }}, Updated at: {{ formatDate(currentChat.updated) }}
      </p>
    </div>
    <div>
      <button class="btn btn-ghost mr-2" @click="() => console.log('TODO')">
        Add Member
      </button>

      <Modal btn-class="btn btn-info" btn-text="Info">
        <div class="flex items-center">
          <img class="size-10 rounded-box mr-2" :src="getFileUrl('chats', currentChat.id, currentChat.image)" alt="Group Chat Image">
          <div>
            <h2 class="text-lg font-bold">{{ currentChat.name }}</h2>
            <p class="opacity-50 text-sm">
              Created at: {{ formatDate(currentChat.created) }}, Updated at: {{ formatDate(currentChat.updated) }}
            </p>
          </div>
        </div>
        <ul class="list rounded-box border border-base-300 mt-4">
          <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Members
          </li>
          <li class="list-row" v-for="member in currentChat?.expand?.members" :key="member.id">
            <div>
              <img class="size-10 rounded-box" :src="getFileUrl('users', member.id, member.avatar)" alt="Member profile image">
            </div>
            <div>
              <div>{{ member.name ?? member.email ?? 'Anonymous' }}</div>
              <div class="text-xs uppercase font-semibold opacity-60">{{ formatDate(member.created) }}</div>
            </div>
          </li>
        </ul>
      </Modal>
    </div>
  </div>
  <div class="overflow-y-auto h-90 p-4 flex-grow flex flex-col gap-2">

    <ul v-if="currentChat">
      <template v-if="messages.length > 0">
        <Message v-for="message in messages" :key="message.id" :currentUserId="currentUser?.id ?? ''" :message="message"></Message>
      </template>
      <li v-if="currentChat && messages.length === 0" class="chat chat-start">
        <div class="chat-bubble">No messages yet. Start the conversation!</div>
      </li>
    </ul>
    <div v-else-if="!currentChat">
      No chat selected
    </div>

  </div>
  <div class="flex justify-between items-center gap-2 p-4">
    <label class="sr-only" for="message">Message Text</label>
    <textarea id="message" type="text" v-model="newMessageText" placeholder="Type a message..." class="textarea flex-grow"
              :disabled="!currentChat">
    </textarea>
    <button @click="handleSendMessage" :disabled="!currentChat" class="btn btn-accent">Send Message</button>
  </div>
</template>
