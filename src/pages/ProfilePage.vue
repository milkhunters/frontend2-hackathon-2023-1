<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import useUserProfile from "@/composables/useUserProfile.js";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ResetPasswordForm from "@/components/Profile/ResetPasswordForm.vue";
import signOut from "@/lib/api/auth/signOut.js";
import { roleDescription } from "@/lib/api/user/formatters.js";
import { getUserProfileInfo, changeAvatar } from "@/lib/api/user/profile.js";

const loggedUser = useUserProfile();
const watchedUser = ref(null);
const profile = computed(() => watchedUser.value ?? loggedUser.value);

const route = useRoute();

const canSignOut = computed(() => !route.params.id);

const editable = computed(() => {
  const watchingSelf = !route.params.id;
  const loggedUserHasHigherRole = loggedUser.value?.role === 5 && watchedUser.value?.role !== 5;
  return watchingSelf || loggedUserHasHigherRole;
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
  const [errors] = await signOut();
  if (!errors) router.push({ name: "login" });
};

const files = ref(null);

const tryChangeAvatar = async () => {
  const [errors, content] = await changeAvatar(files.value?.files[0]);
  if (errors) {
    error.value = errors;
  } else {
    error.value = null;
    // TODO: update image.
  }
};
</script>

<template>
  <default-layout>
    <div v-if="profile">
      <p>
        <img :src="profile.avatar_id" alt="user-avatar" />
        <input ref="files" type="file" />
        <button @click="tryChangeAvatar">Изменить аватарку</button>
      </p>
      <p>ФИО - {{ profile.lastName }} {{ profile.firstName }} {{ profile.patronymic }}</p>
      <p>Отдел - {{ profile.department }}</p>
      <p>Должность - {{ profile.jobTitle }}</p>
      <p>Уровень Доступа - {{ roleDescription(profile.role) }}</p>
      <button v-if="canSignOut" @click="trySignOut">Выйти</button>
    </div>

    <div v-if="editable && profile">
      <reset-password-form :profile-id="profile.id" />
    </div>

    <p v-if="error">{{ error }}</p>
  </default-layout>
</template>
