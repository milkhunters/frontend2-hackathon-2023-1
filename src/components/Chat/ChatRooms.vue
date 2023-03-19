<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getAllDialogs } from "@/lib/api/chat/dialog.js";
import { getFileUrl } from "../../lib/api/file/file";

const emit = defineEmits({
  dialogSelected(dialogId) {
    return typeof dialogId === "string";
  },
});

const dialogs = ref(null);

onMounted(async () => {
  dialogs.value = await getAllDialogs();
});

const filter = ref("");

const filteredDialogs = computed(() => {
  if (filter.value === "") return { "Все:": dialogs.value };

  const filterByProp = (prop) => dialogs.value.filter((dialog) => dialog[prop].includes(filter.value));
  const filteredByName = filterByProp("title");
  const filteredByDepartment = filterByProp("departament").filter(
    (dialog) => !filteredByName.includes(dialog),
  );

  return { "По ФИО:": filteredByName, "По отделу:": filteredByDepartment };
});

const selectDialog = (dialogId) => emit("dialogSelected", dialogId);

const router = useRouter();
const goToProfile = (id) => router.push({ name: "profile", params: { id } });
</script>

<template>
  <div class="chats_message_side">
    <div class="header-search">
      <div class="search-container">
        <span class="icon">🔎︎</span>
        <input v-model="filter" type="search" id="search" placeholder="Поиск чатов" />
      </div>
    </div>
    <template v-if="dialogs">
      <div v-for="(dialogs, category) in filteredDialogs" :key="category">
        <template v-if="dialogs.length">
          <p>{{ category }}</p>
          <div
            v-for="dialog in dialogs"
            :key="dialog.id"
            class="chat"
            @click="selectDialog(dialog.id)"
          >
            <div class="chat_content">
              <img :src="getFileUrl(dialog.avatarId)" @click="goToProfile" />
              <p class="chat_name">{{ dialog.title }}</p>
              <p class="chat_who">{{ dialog.departament }}</p>
              <div class="chat_notify">{{ dialog.unreadCount }}</div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped>
@import "@/assets/ChatStyles/chats.css";

img {
  width: 1rem;
  height: 1rem;
}
</style>
