<script setup>
import { useRouter } from "vue-router";
import useUserProfile from "@/composables/useUserProfile.js";
import useSubscription from "@/composables/useSubscription.js";
import { subscribeToMessageCount, unsubscribeFromMessageCount } from "@/lib/api/user/messages.js";
import { userFullName } from "@/lib/api/user/formatters.js";

const user = useUserProfile();
const unreadMessageCount = useSubscription(subscribeToMessageCount, unsubscribeFromMessageCount, 0);

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
