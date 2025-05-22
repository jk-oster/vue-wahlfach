<script setup>

import Dock from "@/components/Dock.vue";

</script>

<template>

  <main class="p-4 xl:max-w-[1200px] mx-auto md:h-[100vh]">

    <!-- Router outlet - displays the view component of the active route -->
    <RouterView />

  </main>
</template>

<style scoped>

</style>
