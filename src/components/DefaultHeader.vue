<script setup>
import useUserProfile from "@/composables/useUserProfile.js";
import useUnreadMessageCount from "@/composables/useUnreadMessageCount.js";

// const user = useUserProfile();
const unreadMessageCount = useUnreadMessageCount();
</script>

<template>
  <div>
    <!-- {{ user }} -->
    <br />
    {{ unreadMessageCount }}
  </div>
</template>
