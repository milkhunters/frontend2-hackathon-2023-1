<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getAllDialogs } from "@/lib/api/chat/dialog.js";
import { roleDescription } from "@/lib/api/user/formatters.js";

const emit = defineEmits({
  dialogSelected(dialogId) {
    return typeof dialogId === "string";
  },
});

const dialogs = ref(null);

onMounted(async () => {
  const [error, content] = await getAllDialogs();
  if (!error) dialogs.value = content;
});

const filter = ref("");

const filteredDialogs = computed(() => {
  if (filter.value === "") return { "Все:": dialogs.value };

  const filterByProp = (prop) => dialogs.value.filter((dialog) => dialog[prop].includes(filter.value));
  const filteredByName = filterByProp("name");
  const filteredByDepartment = filterByProp("department")
    .filter((dialog) => !filteredByName.includes(dialog));

  return { "По ФИО:": filteredByName, "По отделу:": filteredByDepartment };
});

const selectDialog = (dialogId) => emit("dialogSelected", dialogId);

const router = useRouter();
const goToProfile = (id) => router.push({ name: "profile", params: { id } });
</script>

<template>
  <div class="chat_message_content">
    <div class="chat_message_splash_wrapper">
      <div class="chat_message_splash my_splash">
        <p class="splash_name">Роман Тузов</p>
        <p class="splash_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ab aspernatur nobis culpa esse corrupti quos assumenda ducimus illo ad.</p>
        <p class="splash_date">15:30</p>
      </div>
      <div class="chat_message_splash person_splash">
        <p class="splash_name">Иван Иванов</p>
        <p class="splash_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam reiciendis praesentium sapiente magnam sunt, voluptatem necessitatibus cum dicta saepe corrupti nostrum qui, iure ipsa minus dignissimos ea adipisci, modi laboriosam?</p>
        <p class="splash_date">15:30</p>
      </div>
      <div class="chat_message_splash my_splash">
        <p class="splash_name">Роман Тузов</p>
        <p class="splash_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ab aspernatur nobis culpa esse corrupti quos assumenda ducimus illo ad.</p>
        <p class="splash_date">15:30</p>
      </div>
      <div class="chat_message_splash person_splash">
        <p class="splash_name">Иван Иванов</p>
        <p class="splash_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam reiciendis praesentium sapiente magnam sunt, voluptatem necessitatibus cum dicta saepe corrupti nostrum qui, iure ipsa minus dignissimos ea adipisci, modi laboriosam?</p>
        <p class="splash_date">15:30</p>
      </div>
    </div>
    <div class="text_input_wrapper">
      <div class="text_input">
        <label for="file" class="text_input_attach-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6f6a6a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" /> <path d="M14 2v6h6" /> <path d="M2 15h10" /> <path d="m9 18 3-3-3-3" /> </svg>
        </label>
        <input id="file" name="file" type="file" multiple hidden />
        <input type="text" placeholder="Введите сообщение">
        <button class="text_input_send-button">
          <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="send_24__Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="send_24__send_24"><path id="send_24__Rectangle-76" d="M0 0h24v24H0z"></path><path d="M5.74 15.75a39.14 39.14 0 0 0-1.3 3.91c-.55 2.37-.95 2.9 1.11 1.78 2.07-1.13 12.05-6.69 14.28-7.92 2.9-1.61 2.94-1.49-.16-3.2C17.31 9.02 7.44 3.6 5.55 2.54c-1.89-1.07-1.66-.6-1.1 1.77.17.76.61 2.08 1.3 3.94a4 4 0 0 0 3 2.54l5.76 1.11a.1.1 0 0 1 0 .2L8.73 13.2a4 4 0 0 0-3 2.54Z" id="send_24__Mask" fill="#5361ff"></path></g></g></svg>
        </button>
      </div>
      <p class="text_input_filename">Lorem ipsum dolor sit amet.</p>
    </div>
  </div>
<!--  <aside v-if="dialogs">-->
<!--    <input v-model="filter" type="text" />-->
<!--    <div v-for="(categoryDialogs, category) in filteredDialogs" :key="category">-->
<!--      <template v-if="categoryDialogs.length">-->
<!--        <p>{{ category }}</p>-->
<!--        <div v-for="dialog in categoryDialogs" :key="dialog.id" @click="selectDialog(dialog.id)">-->
<!--          <img :src="dialog.avatart" @click="goToProfile(dialog.id)" alt="dialog-avatar" />-->
<!--          {{ dialog.name }} &#45;&#45; {{ dialog.department }} &#45;&#45; {{ roleDescription(dialog.role) }}-->
<!--        </div>-->
<!--      </template>-->
<!--    </div>-->
<!--  </aside>-->
</template>

<style scoped>
@import "@/assets/ChatStyles/chats.css";
</style>

