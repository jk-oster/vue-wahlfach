<script setup>
import {ref} from "vue";
import {useLogin} from "@/useLogin.js";

const {login} = useLogin();

const email = ref('');
const password = ref('');

function handleLogin() {
  login(email.value, password.value);
}
</script>

<template>
  <h1>
    Login
  </h1>
  <input v-model="email" type="email" placeholder="E-Mail">
  <input v-model="password" type="password" placeholder="Password" @keydown.enter="handleLogin" />

  <RouterLink to="/chat">
    <button @click="handleLogin" v-bind:disabled="!email || !password">Login</button>
  </RouterLink>
</template>

<style>

</style>
