<script setup>
import {ref} from "vue";
import {useLogin} from "@/useLogin.js";
import { useRouter } from 'vue-router'

const router = useRouter();
const {login} = useLogin();

const email = ref('');
const password = ref('');

async function handleLogin() {
  await login(email.value, password.value);
  await router.push('/chat');
}
</script>

<template>

  <section class="flex justify-center items-center h-full">

    <!-- https://daisyui.com/components/card/ -->
    <div class="card w-96 bg-base-100 shadow-xl mt-20 mb-20">
      <figure>
        <img
            src="https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Green Chat Bubble" />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold">KWM Chat Login!</h2>
        <div class="flex items-center flex-col gap-2 mt-2 w-full">

          <label class="input validator w-full">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
            <input v-model="email" type="email" required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
          </label>

          <label class="input validator w-full">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
            <input v-model="password" @keydown.enter="handleLogin" type="password" required placeholder="Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
          </label>
        </div>
        <div class="card-actions justify-center">
            <button class="btn btn-active btn-primary w-full" @click="handleLogin" v-bind:disabled="!email || !password">Login</button>
        </div>
      </div>
    </div>
  </section>

</template>

<style>

</style>
