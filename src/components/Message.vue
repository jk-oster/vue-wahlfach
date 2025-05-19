<script setup>

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
          :src="'https://jet-escape.pockethost.io/api/files/users/' + message.user + '/' + message.expand?.user?.avatar"   />
    </div>
  </div>
  <div class="chat-header">
    {{ message.user ?? 'anonymous' }}
    <time class="text-xs opacity-50">{{ message.created }}</time>
  </div>
  <div class="chat-bubble">{{message.text}}</div>
 </li>
</template>

<style>

</style>
