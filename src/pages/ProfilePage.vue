<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import useUserProfile from "@/composables/useUserProfile.js";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ResetPasswordForm from "@/components/Profile/ResetPasswordForm.vue";
import signOut from "@/lib/api/auth/signOut.js";
import { getUserProfileInfo, changeAvatar } from "@/lib/api/user/profile.js";

const loggedUser = useUserProfile();
const watchedUser = ref(null);
const profile = computed(() => watchedUser.value ?? loggedUser.value);

const route = useRoute();

const canSignOut = computed(() => !route.params.id);

const watchable = computed(() => {
  const watchingSelf = !route.params.id;
  const loggedUserHasHigherRole = loggedUser.value?.role >= watchedUser.value?.role;
  return watchingSelf || loggedUserHasHigherRole;
});

const editable = computed(() => {
  const watchingSelf = !route.params.id;
  const loggedUserHasHigherRole = loggedUser.value?.role > watchedUser.value?.role;
  return watchingSelf || loggedUserHasHigherRole;
});

const isOpenEditPart = ref(false);

const error = ref(null);

watch(
  () => route.params.id,
  () => (error.value = null),
);

watchEffect(async () => {
  const id = route.params.id;
  if (!id) return;
  const [errors, watchedUserInfo] = await getUserProfileInfo(id);
  console.log(error, watchedUserInfo);
  if (errors) error.value = errors;
  else watchedUser.value = watchedUserInfo;
});

const router = useRouter();

const trySignOut = async () => {
  await signOut();
  router.push({ name: "login" });
};

const files = ref(null);

const goToProfile = async () => {
  document.getElementById("profile_content_change").style.display = "none";
};

const goToOptions = async () => {
  document.getElementById("profile_content_change").style.display = "initial";
};
const tryChangeAvatar = async () => {
  const file = files.value?.files[0];
  if (!file) return;
  const [errors, _] = await changeAvatar(file);
  if (errors) error.value = errors;
  else error.value = null;
};
</script>

<template>
  <default-layout>
    <div class="profile">
      <div v-if="profile" class="container">
        <div class="profile_content_img">
          <img src="@/assets/img/UserAvatar.jpg" alt="logo-user" />
          <button @click="trySignOut">Выйти</button>
        </div>
        <div class="profile_content">
          <template v-if="watchable">
            <h2 class="profile_content_name">
              {{ profile.lastName }} {{ profile.firstName }} {{ profile.patronymic }}
            </h2>
            <p class="profile_content_place">
              <span>Место:</span><br />
              {{ profile.department }}
            </p>
            <p class="profile_content_dolg">
              <span>Должность:</span><br />
              {{ profile.jobTitle }}
            </p>
            <button v-if="editable" class="profile_content_change-button" @click="goToOptions">
              Редактировать профиль
            </button>
            <!-- Плашка с изменениями (открывать при нажатии на редактировать профиль) -->
            <div id="profile_content_change">
              <div class="profile_change_item">
                <p class="profile_change_item_title">Изменить аватарку</p>
                <div class="profile_change_item_row">
                  <input id="file_img" name="file" type="file" />
                  <button>Изменить аватарку</button>
                </div>
              </div>

              <reset-password-form :profile-id="profile.id" />
              <button class="profile_content_change-button" @click="goToProfile">Назад</button>
            </div>
          </template>
          <template v-else> Вы не можете это просматривать. </template>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<!--<style scoped>-->
<!--@import "@/assets/ProfileStyles/profile-styles.css";-->
<!--</style>-->
