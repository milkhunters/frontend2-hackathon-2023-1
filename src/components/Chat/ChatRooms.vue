<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getAllDialogs, getAllUsers, openDialog } from "@/lib/api/chat/dialog.js";
import { getFileUrl } from "@/lib/api/file/file.js";

const emit = defineEmits({
  dialogSelected(dialogId) {
    return typeof dialogId === "string";
  },
});

const dialogs = ref(null);
const allUsers = ref(null);

const fetchDialogs = async () => {
  const allDialogs = await getAllDialogs();
  const users = await getAllUsers();
  dialogs.value = allDialogs;
  allUsers.value = users;
};

onMounted(() => fetchDialogs());

const filter = ref("");

const filteredDialogs = computed(() => {
  if (filter.value === "") return { "": dialogs.value };

  const filterByProp = (prop) =>
    allUsers.value.filter((dialog) => {
      const field = dialog[prop];
      if (!field) return false;
      return field.toLowerCase().includes(filter.value.toLowerCase());
    });
  const filteredByName = filterByProp("firstName");
  const filteredByDepartment = filterByProp("departament").filter(
    (dialog) => !filteredByName.includes(dialog),
  );

  return { "По ФИО:": filteredByName, "По отделу:": filteredByDepartment };
});

const selectDialog = async (dialogId) => {
  if (dialogs.value.filter(({ id }) => id === dialogId).length === 0) await openDialog(dialogId);
  await fetchDialogs();
  emit("dialogSelected", dialogId);
};

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
          <p v-if="category">{{ category }}</p>
          <div
            v-for="dialog in dialogs"
            :key="dialog.id"
            class="chat"
            @click="selectDialog(dialog.id)"
          >
            <div class="chat_content">
              <img :src="getFileUrl(dialog.avatarId)" @click="goToProfile(dialog.ownerId ?? dialog.id)" />
              <p class="chat_name">{{ dialog.title ?? dialog.firstName }}</p>
              <p class="chat_who">{{ dialog.department }}</p>
              <div class="chat_notify">{{ dialog.unreadCount ?? 0 }}</div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<!--<style scoped>-->
<!--@import "@/assets/ChatStyles/chats.css";-->

<!--img {-->
<!--  width: 1rem;-->
<!--  height: 1rem;-->
<!--}-->
<!--</style>-->
