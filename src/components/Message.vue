<script setup>

import {getFileUrl} from "@/pocketbase.js";
import {formatDate} from "@/format.js";

defineProps({
  message: {
    type: Object,
    required: true,
  },
  currentUserId: {
    type: String,
    required: true
  }
})

</script>

<template>

  <!-- https://daisyui.com/components/chat/#chat-with-image-header-and-footer -->
   <li class="chat" :class="{ 'chat-end': message.user === currentUserId, 'chat-start': message.user !== currentUserId }">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img
            :alt="'Avatar of ' + message.expand?.user?.name ?? message.expand?.user?.email ?? 'anonymous user'"
            :src="getFileUrl('users', message.user, message.expand?.user?.avatar)"   />
      </div>
    </div>
    <div class="chat-header">
      {{ message.expand?.user?.name ?? message.expand?.user?.email ?? 'anonymous' }}
      <time class="text-xs opacity-50">{{ formatDate(message.created) }}</time>
    </div>
    <div class="chat-bubble">{{message.text}}</div>
   </li>
</template>

<style>

</style>
