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

const isOpenEditPart = ref(false);

const openEditPart = () => isOpenEditPart.value = true

const closeEditPart = () => isOpenEditPart.value = false

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
    <body>
    <div v-if="profile" class="profile">
      <div class="container">

        <div class="profile_content_img">
          <img src="@/assets/img/UserAvatar.jpg" alt="logo-user">
          <button v-if="canSignOut" @click="trySignOut">Выйти</button>
        </div>

        <div  class="profile_content">
          <h2 class="profile_content_name">{{ profile.lastName }} {{ profile.firstName }} {{ profile.patronymic }}</h2>
          <p class="profile_content_place"><span>Место:</span><br> {{ profile.department }}</p>
          <p class="profile_content_dolg"><span>Должность:</span><br> {{ profile.jobTitle }}</p>

          <button class="profile_content_change-button" @click="openEditPart">Редактировать профиль</button>

          <div  class="profile_content_change">

            <div class="profile_change_item">
              <p class="profile_change_item_title">Изменить аватарку</p>
              <div class="profile_change_item_row">
                <input id="file_img" ref="files" type="file" />
                <button @click="tryChangeAvatar" >Изменить аватарку</button>
              </div>
            </div>

            <div v-if="editable && profile">
              <reset-password-form :profile-id="profile.id" />
            </div>

          </div>

          <p v-if="error">{{ error }}</p>

        </div>
      </div>
    </div>

    </body>
  </default-layout>
</template>

<style scoped>
@import "@/assets/ProfileStyles/profile-styles.css"
</style>
