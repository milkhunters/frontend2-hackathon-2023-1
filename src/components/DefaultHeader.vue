<script setup>
import { useRouter } from "vue-router";
import useUserProfile from "@/composables/useUserProfile.js";
import useUnreadMessageCount from "@/composables/useUnreadMessageCount.js";
import { userFullName } from "@/lib/api/user/profile.js";

const user = useUserProfile();
const unreadMessageCount = useUnreadMessageCount();

const router = useRouter();

const goToProfile = () => router.push({ name: "profile" });
</script>

<template>
  <div v-if="user">
    <img :src="user.avatar_id" @click="goToProfile" alt="user-avatar" />
    {{ userFullName(user) }}
    <br />
    {{ unreadMessageCount }}
  </div>
</template>
