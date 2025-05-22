<script setup>
import {useLogin} from "@/useLogin.js";
import ChatList from "@/components/ChatList.vue";
import ChatMessages from "@/components/ChatMessages.vue";
import Dock from "@/components/Dock.vue";
import AppNavigation from "@/components/layouts/AppNavigation.vue";

const {currentUser, logout} = useLogin();
</script>

<template>

  <AppNavigation>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-0 md:gap-x-4">

      <section class="col-span-1 flex flex-col h-full">

        <ChatList/>

      </section>
      <section class="col-span-2 bg-base-100 rounded-box shadow-md h-full flex flex-col">

        <ChatMessages/>

      </section>
    </div>

  </AppNavigation>

</template>