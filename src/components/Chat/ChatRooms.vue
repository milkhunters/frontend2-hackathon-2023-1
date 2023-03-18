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
  <aside v-if="dialogs">
    <input v-model="filter" type="text" />
    <div v-for="(categoryDialogs, category) in filteredDialogs" :key="category">
      <template v-if="categoryDialogs.length">
        <p>{{ category }}</p>
        <div v-for="dialog in categoryDialogs" :key="dialog.id" @click="selectDialog(dialog.id)">
          <img :src="dialog.avatart" @click="goToProfile(dialog.id)" alt="dialog-avatar" />
          {{ dialog.name }} -- {{ dialog.department }} -- {{ roleDescription(dialog.role) }}
        </div>
      </template>
    </div>
  </aside>
</template>
