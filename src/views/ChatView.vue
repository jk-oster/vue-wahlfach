<script setup>
import {useLogin} from "@/useLogin.js";
import ChatList from "@/components/ChatList.vue";
import ChatMessages from "@/components/ChatMessages.vue";
import Dock from "@/components/Dock.vue";

const {currentUser, logout} = useLogin();
</script>

<template>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-0 md:gap-x-4 mb-12 md:mb-0 h-full">

    <section class="col-span-1 flex flex-col h-full">

      <div class="flex flex-col justify-end pb-4">
        <div class="text-lg font-bold text-center">
          <h1>
            Hello Welcome {{ currentUser?.name }}
          </h1>
        </div>

        <div class="flex justify-between items-center gap-2 h-fit">
          <RouterLink to="/" class="btn btn-active btn-warning cursor-pointer">
            <button @click="logout()">
              Logout
            </button>
          </RouterLink>
        </div>
      </div>

      <ChatList/>

    </section>
    <section class="col-span-2 bg-base-100 rounded-box shadow-md h-full flex flex-col">

      <ChatMessages/>

    </section>
  </div>

  <Dock></Dock>

</template>