<script setup>
import {ref, computed, watch} from 'vue'
import {usePageTitle} from "@/usePageTitle.js";
import {useActivePage} from "@/useActivePage.js";

const list = ref([
  { id: 1, name: 'Vue.js' },
  { id: 2, name: 'React' },
  { id: 3, name: 'Angular' },
  { id: 4, name: 'Svelte' },
]);

const search = ref('');
const newItemName = ref('');

const filteredItems = computed(() => {
  return list.value.filter(item => item.name.toLowerCase().includes(search.value.toLowerCase()));
});

function addNewItem() {
  if (newItemName.value.trim()) {
    const newItem = {
      id: list.value.length + 1,
      name: newItemName.value,
    };
    list.value = [...list.value, newItem];
    newItemName.value = '';
  }
}

function deleteItem(id) {
  list.value = list.value.filter(item => item.id !== id);
}

function setSearch(event) {
  search.value = event.target.value;
}

// Show a message in page title when the user leaves the page
const {title} = usePageTitle();
const {isActive} = useActivePage();
watch(isActive, () => {
  if (isActive.value) {
    title.value = 'Hallo User';
  } else {
    title.value = '👋 Please come back!'
  }
}, {immediate: true});

</script>

<template>

  <h1 :class="search ? 'red' : ''">Hello</h1>

  <input type="text" v-model="search" placeholder="Search mit automatischem Bi-Directional Data-Binding..." />
  <input type="text" :value="search" @input="setSearch" placeholder="Suche mit manuellem Bi-Directional Data-Binding..." />

  <ul>
    <li v-for="item in filteredItems" :key="item.id">
      {{ item.name }} <button @click="deleteItem(item.id)">Delete</button>
    </li>

    <li v-if="filteredItems.length === 0">No {{ filteredItems.length }} items found of {{ list.length }}</li>
  </ul>

  <input type="text" v-model="newItemName" placeholder="Add new item..." />
  <button @click="addNewItem">Add</button>

</template>

<style>

.red {
  color: red;
}

</style>
