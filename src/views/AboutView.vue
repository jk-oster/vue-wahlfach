<script setup>

import Dock from "@/components/Dock.vue";
import AppNavigation from "@/components/layouts/AppNavigation.vue";

</script>

<template>

  <AppNavigation>

    <div class="about">
      <h1>This is an about page</h1>
    </div>

  </AppNavigation>

</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>