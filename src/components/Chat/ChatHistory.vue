<script setup>
import { computed, ref, watchEffect } from "vue";
import ChatMessageInput from "@/components/Chat/ChatMessageInput.vue";
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
  <main>
    <div v-for="[date, messages] in formattedHistory" :key="date">
      <p>{{ date }}</p>
      <div v-for="message in messages" :key="message.id">Text: {{ message.text }}</div>
    </div>

    <chat-message-input :dialog-id="dialogId" @message-sent="addMessage" />
  </main>
</template>
