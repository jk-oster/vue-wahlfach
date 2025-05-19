<script setup>

defineProps({
  message: Object,
  currentUser: Object
})

</script>

<template>
  <div v-bind:class="message.user === currentUser?.id ? 'user-message' : ''">
    {{ message.text }}
    <span>
      {{ message.created }}
    </span>
  </div>
</template>

<style>
.user-message {
  background: aqua;
}
</style>
