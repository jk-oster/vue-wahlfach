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

  <main class="max-w-[1200px] p-5 mx-auto mt-0 md:mt-16 mb-16 md:mb-0">
    <slot>
      Your content goes here 😉
    </slot>
  </main>

  <footer>
    <slot name="footer">
      <Dock class="md:hidden"></Dock>
    </slot>
  </footer>

</template>

<style scoped>

</style>