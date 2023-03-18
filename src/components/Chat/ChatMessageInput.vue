<script setup>
import { computed, ref } from "vue";
import ModalPopup from "@/components/ModalPopup.vue";
import { sendMessage } from "@/lib/api/chat/dialog.js";
import { findLinksInString, replaceLinksInString } from "@/lib/regex.js";

const props = defineProps({
  dialogId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits({
  messageSent(message) {
    return typeof message === "string" && message !== "";
  },
});

const message = ref("");
const askedToDeleteLinks = ref(false);

const files = ref(null);

const requestSendMessage = async (formattedMessage) => {
  message.value = "";
  askedToDeleteLinks.value = false;
  await sendMessage(props.dialogId, formattedMessage, files.value?.files);
  emit("messageSent", formattedMessage);
};

const trySendMessage = async () => {
  if (message.value === "") return;
  const hasLinks = findLinksInString(message.value);
  if (hasLinks) askedToDeleteLinks.value = true;
  else requestSendMessage(message.value);
};

const messageWithoutLinks = computed(() => replaceLinksInString(message.value, "(ссылка удалена)"));
</script>

<template>
  <div>
    <input v-model="message" @keydown.enter="trySendMessage" type="text" />
    <button @click="trySendMessage">Send</button>
    <input ref="files" type="file" multiple />
  </div>

  <modal-popup
    :opened="askedToDeleteLinks"
    @confirmed="requestSendMessage"
    @rejected="requestSendMessage(messageWithoutLinks)"
    message="Прикрепляя ссылку на сторонний ресурс вы полность несете ответственноть за любые возможные негативные последствия."
  />
</template>
