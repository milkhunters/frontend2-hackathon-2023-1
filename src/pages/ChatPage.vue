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
    <main class="chats">
      <div class="container">
        <div class="chats_wrapper">
          <chat-rooms @dialog-selected="changeDialog" />
          <chat-history v-if="currentDialog" :dialog-id="currentDialog" />
      </div>
      </div>
    </main>
  </default-layout>
</template>

 <style scoped>
 @import "@/assets/ChatStyles/chats.css";
 </style>
