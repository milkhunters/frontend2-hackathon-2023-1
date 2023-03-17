<script setup>
import { onMounted, ref } from "vue";
import { signOut } from "@/lib/api/auth/login.js";
import { getCurrentUserProfileInfo } from "@/lib/api/user/profile.js";
import { useRouter } from "vue-router";

const user = ref(null);

const router = useRouter();

onMounted(async () => {
  const [error, userInfo] = await getCurrentUserProfileInfo();
  if (error) {
    router.push({ name: "login" });
  } else {
    user.value = userInfo;
  }
});

const trySignOut = async () => {
  await signOut();
  router.push({ name: "login" });
};
</script>

<template>
  <default-layout>
    <div v-if="user">
      UserPage
      <div>Email - {{ user.email }}</div>
      <div>Name - {{ user.username }}</div>
      <button @click="trySignOut">Выйти</button>
    </div>
  </default-layout>
</template>
