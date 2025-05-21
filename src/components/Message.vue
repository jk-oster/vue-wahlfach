<script setup>

import {getFileUrl} from "@/pocketbase.js";
import {formatDate} from "@/format.js";

defineProps({
  message: Object,
  currentUser: Object
})

</script>

<template>
 <li class="chat" :class="{ 'chat-end': message.user === currentUser?.id, 'chat-start': message.user !== currentUser?.id }">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img
          alt="User Avatar"
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
