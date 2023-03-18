<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import useUserProfile from "@/composables/useUserProfile.js";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ResetPasswordForm from "@/components/Profile/ResetPasswordForm.vue";
import { signOut } from "@/lib/api/auth/login.js";
import { roleDescription } from "@/lib/api/user/formatters.js";
import { getUserProfileInfo } from "@/lib/api/user/profile.js";

const route = useRoute();

const currentUser = useUserProfile();
const watchedUser = ref(null);

const profile = computed(() => watchedUser.value ?? currentUser.value);

const editable = computed(() => {
  const watchingSelf = !route.params.id;
  const hasHigherRole = currentUser.value?.role > watchedUser.value?.role;
  return watchingSelf || hasHigherRole;
});

const error = ref(null);

watch(
  () => route.params.id,
  () => (error.value = null),
);

watchEffect(async () => {
  const id = route.params.id;
  if (!id) return;
  const [errors, watchedUserInfo] = await getUserProfileInfo(id);
  if (errors) error.value = errors;
  else watchedUser.value = watchedUserInfo;
});

const router = useRouter();

const trySignOut = async () => {
  const errors = await signOut();
  if (!errors) router.push({ name: "login" });
};

const changeAvatar = async () => {};
</script>

<template>
  <default-layout>
    <div v-if="profile">
      <p>
        <img :src="profile.avatar_id" alt="user-avatar" />
        <input type="file" />
        <button @click="changeAvatar">Изменить аватарку</button>
      </p>
      <p>ФИО - {{ profile.lastName }} {{ profile.firstName }} {{ profile.patronymic }}</p>
      <p>Отдел - {{ profile.department }}</p>
      <p>Должность - {{ profile.jobTitle }}</p>
      <p>Уровень Доступа - {{ roleDescription(profile.role) }}</p>
      <button @click="trySignOut">Выйти</button>
    </div>

    <div v-if="editable && profile">
      <reset-password-form :profile-id="profile.id" />
    </div>

    <p v-if="error">{{ error }}</p>
  </default-layout>
</template>
