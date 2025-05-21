<script setup>

import {ref} from "vue";

defineProps({
  btnClass: {
    type: String,
    class: 'btn'
  },
  btnText: {
    type: String,
    class: 'Open Modal'
  }
});

const dialog = ref(null);

function handleOpen() {
  dialog.value?.showModal();
}

</script>

<template>
  <button :class="btnClass" @click="handleOpen">
    <slot name="openBtn">
      {{ btnText }}
    </slot>
  </button>
  <dialog ref="dialog" class="modal">
    <div class="modal-box">
      <slot name="closeBtn">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
      </slot>
      <slot>
        <h3 class="text-lg font-bold">Hello!</h3>
        <p class="py-4">Press ESC key or click on ✕ button to close</p>
      </slot>
    </div>
  </dialog>
</template>

<style scoped>

</style>