<script setup>

import Modal from "@/components/Modal.vue";
import {onMounted, ref} from "vue";
import {useLogin} from "@/useLogin.js";
import {useChats} from "@/useChats.js";
import ChatListItem from "@/components/ChatListItem.vue";

const {currentUser} = useLogin();
const {chats, fetchChats, setChat, createChat} = useChats();

onMounted(() => {
  fetchChats();
});

function handleSetChat(chatId) {
  setChat(chatId)
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
  <div class="overflow-y-auto flex-grow">

    <!-- https://daisyui.com/components/list/ -->
    <ul class="list bg-base-100 rounded-box shadow-md">

      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between items-center">
        <div>
          <h2>Most recent chats</h2>
        </div>
        <div>
          <Modal btnClass="btn btn-ghost btn-sm" btnText="Add chat">
              <div class="flex flex-col gap-5">
                <h2 class="text-lg font-bold">
                  Create chat
                </h2>

                <label class="floating-label w-full">
                  <span>Name</span>
                  <input v-model="newChatName" type="text" placeholder="Chat Name" class="input input-sm w-full"/>
                </label>

                <label class="floating-label w-full">
                  <span>Image</span>
                  <input ref="newChatImageInput" type="file" class="file-input file-input-sm file-input-ghost w-full"/>
                </label>

                <button class="btn btn-success" @click="handleCreateChat">Create Chat</button>
              </div>
          </Modal>
        </div>
      </li>

      <ChatListItem v-for="chat in chats" :key="chat.id" @click="handleSetChat(chat.id)" :chat="chat"/>

    </ul>
  </div>
</template>
