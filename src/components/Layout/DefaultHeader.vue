<script setup>
import { useRouter } from "vue-router";
import useUserProfile from "@/composables/useUserProfile.js";
import useSubscription from "@/composables/useSubscription.js";
import { subscribeToMessageCount, unsubscribeFromMessageCount } from "@/lib/api/user/messages.js";
import { userFullName } from "@/lib/api/user/formatters.js";

const user = useUserProfile();
const unreadMessageCount = useSubscription(subscribeToMessageCount, unsubscribeFromMessageCount, 0);

const router = useRouter();
const goToProfile = () => router.push({name: "profile"});
</script>

<template>
  <header class="header">
    <div v-if="user" class="container">
      <!-- profile -->
      <a class="header_profile" href="#">
        <div class="profile_img">
          <img :src="user.avatarId" alt="user-avatar" @click="goToProfile"/>
        </div>
        <p class="profile_name">{{ userFullName(user) }}</p>
      </a>
      <!-- chats -->
      <div class="header_chats">
        <img alt="chat-icon" src="@/assets/img/chat.svg">
        <div class="header_chats_notify">
          {{ unreadMessageCount }}
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
@import "@/assets/HomeStyles/style.css";
</style>
