<script setup>

import {formatDate} from "@/format.js";
import {getFileUrl} from "@/pocketbase.js";

defineProps({
  chat: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <li class="list-row cursor-pointer">
    <div>
      <img class="size-10 rounded-box" :src="getFileUrl('chats', chat.id, chat.image)"
           alt="Chat Group Profile Image"/>
    </div>
    <div>
      <div>{{ chat.name }}</div>
      <time class="text-xs uppercase font-semibold opacity-60">{{ formatDate(chat.updated) }}</time>
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
</template>
