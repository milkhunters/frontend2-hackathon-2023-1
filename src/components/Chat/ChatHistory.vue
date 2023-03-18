<script setup>
import { computed, ref, watchEffect } from "vue";
// import ChatMessageInput from "@/components/Chat/ChatMessageInput.vue";
import { group } from "@/lib/arrays.js";
import { getDialogHistory } from "@/lib/api/chat/dialog.js";

const props = defineProps({
  dialogId: {
    type: String,
    required: true,
  },
});

const history = ref(null);

watchEffect(async () => {
  const [error, content] = await getDialogHistory(props.dialogId);
  if (!error) history.value = content;
});

const formattedHistory = computed(() => {
  if (!history.value) return [];
  const groupedHistory = group(history.value, ({ createdAt }) => createdAt);
  return Object.entries(groupedHistory);
});

const addMessage = (message) => {
  history.value.push({ id: message, text: message, createdAt: Date.now() });
};
</script>

<template>

  <div class="chats_message_side">
    <!-- поиск чатов -->
    <div class="header-search">
      <div class="search-container">
        <span class="icon">🔎︎</span>
        <input type="search" id="search" placeholder="Поиск чатов" />
      </div>
    </div>
    <!-- чат -->
    <div class="chat">
      <div class="chat_content">
        <p class="chat_name">Роман Тузов</p>
        <p class="chat_who">отдел продаж</p>
      </div>
      <div class="chat_notify">9+</div>
    </div>
  </div>
  <main>

    <div v-for="[date, messages] in formattedHistory" :key="date">
      <p>{{ date }}</p>
      <div v-for="message in messages" :key="message.id">Text: {{ message.text }}</div>
    </div>

    <chat-message-input :dialog-id="dialogId" @message-sent="addMessage" />

  </main>

</template>

<style scoped>
@import "@/assets/ChatStyles/chats.css";
@import "@/assets/HomeStyles/base.css";
@import "@/assets/HomeStyles/style.css";
@import "@/assets/HeaderStyles/default-header.css";
</style>

