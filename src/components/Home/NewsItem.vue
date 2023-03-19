<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const isFull = ref(false);
const minifiedBody = computed(() => props.text.slice(0, 80));
const open = () => isFull.value = true;
const close = () => isFull.value = false
</script>

<template>
  <div class="news" @click="open">
    <h4 class="news_title">{{ title }}</h4>
    <p class="news_desc">{{ minifiedBody }}...</p>
  </div>

  <div v-if="isFull" class="news_big">
    <button @click="close">Назад</button>
    <h4 class="news_title">{{ title }}</h4>
    <p class="news_desc">{{ text }}</p>
  </div>
</template>

<style scoped>
@import "@/assets/HomeStyles/style.css";
</style>
