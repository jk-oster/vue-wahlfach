<script setup>

import Dock from "@/components/Dock.vue";
import Navbar from "@/components/Navbar.vue";

</script>

<template>

  <header>
    <slot name="header">
      <Navbar class="md:mb-5 md:absolute md:top-0"></Navbar>
    </slot>
  </header>

  <main class="max-w-[1200px] mx-auto min-h-screen">
    <div class="pt-0 md:pt-16 pb-16 md:pb-0 min-h-screen">
      <div class="p-5 h-full">
        <slot>
          Your content goes here 😉
        </slot>
      </div>
    </div>
  </main>

  <footer>
    <slot name="footer">
      <Dock class="md:hidden"></Dock>
    </slot>
  </footer>

</template>

<style scoped>

</style>