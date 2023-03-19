<script setup>
import { useRouter } from "vue-router";
import useUserProfile from "@/composables/useUserProfile.js";
import useSubscription from "@/composables/useSubscription.js";
import { subscribeToMessageCount, unsubscribeFromMessageCount } from "@/lib/api/user/messages.js";

const user = useUserProfile();
const unreadMessageCount = useSubscription(subscribeToMessageCount, unsubscribeFromMessageCount, 0);

const router = useRouter();
const goToProfile = () => router.push({ name: "profile" });
const goToChat = () => router.push({ name: "chat" });
</script>

<template>
  <header class="header">
    <div v-if="user" class="container">
      <a class="header_profile" href="#">
        <div class="profile_img">
          <img src="@/assets/img/UserAvatar.jpg" alt="user-avatar" @click="goToProfile" />
        </div>
        <p class="profile_name" @click="goToProfile">{{ user.lastName }} {{ user.firstName }} {{ user.patronymic }}</p>
      </a>
      <div class="header_chats">
        <img alt="chat-icon" src="@/assets/img/chat.svg" @click="goToChat" />
        <div v-if="unreadMessageCount" class="header_chats_notify">
          {{ unreadMessageCount }}
        </div>
      </div>
    </div>
  </header>
</template>
