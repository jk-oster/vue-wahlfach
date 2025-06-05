<script setup lang="ts">

import {VCalendar} from "vuetify/labs/components";
import {ref} from "vue";

const events = ref([
  {
    title: 'Event 1',
    start: new Date('2025-06-05'),
    end: new Date('2025-06-05'),
    color: 'red',
  },
  {
    title: 'Event 2',
    start: new Date('2025-06-05'),
    end: new Date('2025-06-05'),
    color: 'blue',
  },
  {
    title: 'Event 3',
    start: new Date('2025-06-05'),
    end: new Date('2025-06-05'),
    color: 'green',
    allDay: true,
  },
]);
const types = ref(['month', 'week']);
const today = ref([new Date()]);
const color = ref('primary');
const currentViewType = ref<'day'|'week'|'month'>('month');

function handleClickOnEvent(clickEvent, eventData) {
  console.log('Event clicked:', clickEvent, eventData);
}

</script>

<template>

  <label for="type">Ansicht</label>
  <select id="type" v-model="currentViewType">
    <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
  </select>

  <VCalendar
      @click:event="handleClickOnEvent"
      v-model="today"
      :events="events"
      :view-mode="currentViewType"
      :color="color"
      :type="types"
  >
  </VCalendar>

</template>

<style>

.v-calendar-weekly__day-label button {
  background-color: yellow !important;
  color: black !important;

  &.v-calendar-weekly__day-label__today {
    background-color: red !important;
    color: blue !important;
  }
}

</style>