 <script setup>
import { ref } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ChatRooms from "@/components/Chat/ChatRooms.vue";
import ChatHistory from "@/components/Chat/ChatHistory.vue";

const currentDialog = ref(null);

const changeDialog = (dialogId) => {
  currentDialog.value = dialogId;
};
</script>

<template>
  <default-layout>
    <chat-rooms @dialog-selected="changeDialog" /> 
    <chat-history v-if="currentDialog" :dialog-id="currentDialog" />
  </default-layout>
</template>
