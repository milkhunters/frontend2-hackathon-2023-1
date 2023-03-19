<script setup>
import { computed, onUnmounted, ref, watch, watchEffect } from "vue";
import ModalPopup from "@/components/ModalPopup.vue";
import useUserProfile from "@/composables/useUserProfile.js";
import { getFileUrl } from "@/lib/api/banner/banner.js";
import { subscribeToDialog, unsubscribeFromDialog } from "@/lib/api/chat/history.js";
import { getDialogHistory } from "@/lib/api/chat/dialog.js";
import { markMessageAsRead } from "@/lib/api/chat/message.js";
import { group } from "@/lib/arrays.js";
import { findLinksInString, replaceLinksInString } from "@/lib/regex.js";

const props = defineProps({
  dialogId: {
    type: String,
    required: true,
  },
});

const history = ref([]);

watch(() => props.dialogId, async () => {
  const historyReversed = await getDialogHistory(props.dialogId);
  if (!historyReversed) return;
  historyReversed.forEach(({ id }) => markMessageAsRead(id));
  history.value = historyReversed.sort(({ createAt: a }, { createAt: b }) => Date.parse(a) - Date.parse(b)).reverse();
}, { immediate: true });

let sendMessage;

const onMessage = (error, message) => {
  if (error === null) history.value.unshift(message);
};  

watchEffect((newId, oldId) => {
  if (oldId) unsubscribeFromDialog(oldId);
  sendMessage = subscribeToDialog(props.dialogId, onMessage);
});

onUnmounted(() => {
  unsubscribeFromDialog(props.dialogId);
});

const formattedHistory = computed(() => {
  if (!history.value) return [];
  const groupedHistory = group(history.value, ({ createAt }) => createAt.split("T")[0]);
  return Object.entries(groupedHistory);
});

const user = useUserProfile();
const messageStyleClass = ({ ownerId }) => (ownerId === user.id ? "my_splash" : "person_splash");

const message = ref("");
const askedToDeleteLinks = ref(false);
const files = ref(null);

const requestSendMessage = async (formattedMessage) => {
  message.value = "";
  askedToDeleteLinks.value = false;
  sendMessage(formattedMessage, files.value?.files ?? []);
  files.value.value = "";
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
  <main>
    <div class="chat_message_content">
      <div class="chat_message_splash_wrapper">
        <template v-for="[date, messages] in formattedHistory" :key="date">
          {{ date }}
          <div
            v-for="message in messages"
            :key="message.id"
            class="chat_message_splash"
            :class="messageStyleClass(message)"
          >
            <p class="splash_name">{{ message.firstName }}</p>
            <p class="splash_text">
              {{ message.text }}
              <div 
                v-for="file in message.files" 
                :key="file.title" 
              >
                <a :href="getFileUrl(file.file_id)" download>{{ file.title }}</a>
              </div>
            </p>
            <p class="splash_date">{{ message.createdAt }}</p>
          </div>
        </template>
      </div>
      <div class="text_input_wrapper">
        <div class="text_input">
          <label for="file" class="text_input_attach-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6f6a6a"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
              <path d="M14 2v6h6" />
              <path d="M2 15h10" />
              <path d="m9 18 3-3-3-3" />
            </svg>
          </label>
          <input ref="files" id="file" name="file" type="file" hidden />
          <input v-model="message" @keydown.enter="trySendMessage" type="text" placeholder="Введите сообщение" />
          <button @click="trySendMessage" class="text_input_send-button">
            <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g
                id="send_24__Page-2"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g id="send_24__send_24">
                  <path id="send_24__Rectangle-76" d="M0 0h24v24H0z"></path>
                  <path
                    d="M5.74 15.75a39.14 39.14 0 0 0-1.3 3.91c-.55 2.37-.95 2.9 1.11 1.78 2.07-1.13 12.05-6.69 14.28-7.92 2.9-1.61 2.94-1.49-.16-3.2C17.31 9.02 7.44 3.6 5.55 2.54c-1.89-1.07-1.66-.6-1.1 1.77.17.76.61 2.08 1.3 3.94a4 4 0 0 0 3 2.54l5.76 1.11a.1.1 0 0 1 0 .2L8.73 13.2a4 4 0 0 0-3 2.54Z"
                    id="send_24__Mask"
                    fill="#5361ff"
                  ></path>
                </g>
              </g>
            </svg>
          </button>
        </div>
        <p class="text_input_filename">Lorem ipsum dolor sit amet.</p>
      </div>
    </div>

     <modal-popup
      :opened="askedToDeleteLinks"
      @confirmed="requestSendMessage"
      @rejected="requestSendMessage(messageWithoutLinks)"
      message="Прикрепляя ссылку на сторонний ресурс вы полность несете ответственноть за любые возможные негативные последствия."
    /> 
  </main>
</template>

<!--<style scoped>-->
<!--@import "@/assets/ChatStyles/chats.css";-->
<!--@import "@/assets/HomeStyles/style.css";-->
<!--@import "@/assets/HeaderStyles/default-header.css";-->
<!--</style>-->
