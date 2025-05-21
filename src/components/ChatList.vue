<script setup>

import Modal from "@/components/Modal.vue";
import {onMounted, ref} from "vue";
import {useLogin} from "@/useLogin.js";
import {useChats} from "@/useChats.js";
import {getFileUrl} from "@/pocketbase.js";
import {formatDate} from "@/format.js";

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
    <ul class="list bg-base-100 rounded-box shadow-md">

      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between items-center">
        <div>
          <h2>Most recent chats</h2>
        </div>
        <div>
          <Modal btnClass="btn btn-ghost btn-sm">
            <template v-slot:openBtn>Add chat</template>
            <template v-slot:default>

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
            </template>
          </Modal>
        </div>
      </li>

      <li class="list-row cursor-pointer" v-for="chat in chats" :key="chat.id" @click="handleSetChat(chat.id)">
        <div>
          <img class="size-10 rounded-box" :src="getFileUrl('chats', chat.id, chat.image)"
               alt="Chat Group Profile Image"/>
        </div>
        <div>
          <div>{{ chat.name }}</div>
          <div class="text-xs uppercase font-semibold opacity-60">{{ formatDate(chat.updated) }}</div>
        </div>
        <button class="btn btn-square btn-ghost">
          <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
              <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </g>
          </svg>
        </button>
      </li>

    </ul>
  </div>
</template>
