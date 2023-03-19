<script setup>
import { ref } from "vue";
import useFormError from "@/composables/useFormError.js";
import { resetPassword } from "@/lib/api/user/profile.js";

defineProps({
  profileId: {
    type: String,
    required: true,
  },
});

const currentPassword = ref("");
const newPassword = ref("");
const newPasswordRepeated = ref("");

const error = useFormError([newPassword, newPasswordRepeated]);
const success = ref(null);

const setError = (errorMessage) => {
  error.value = errorMessage;
  success.value = null;
};

const setSuccess = (successMessage) => {
  error.value = null;
  success.value = successMessage;
};

const tryResetPassword = async () => {
  if (newPassword.value !== newPasswordRepeated.value) {
    setError("Пароли не совпадают.");
    return;
  }

  const [errors] = await resetPassword(currentPassword.value, newPassword.value);
  if (errors) setError(errors);
  else setSuccess("Пароль изменен.");
};
</script>

<template>
  <div class="profile_change_item profile_change_item-pass">
    <p class="profile_change_item_title">Изменить пароль</p>
    <div class="profile_change_item_col">

      <label for="pass">Введите пароль</label>
      <input v-model="currentPassword" type="password" />

      <label for="passconfirm">Введите новый пароль</label>
      <input v-model="newPassword" type="password" name="passconfirm" />

      <label for="passconfirm">Подтвердить новый пароль</label>
      <input v-model="newPasswordRepeated" type="password" name="passconfirm" />

      <button @click="tryResetPassword">Поменять пароль</button>

      <p>{{ error }}</p>
      <p>{{ success }}</p>

    </div>
  </div>
</template>

<style scoped>
@import "@/assets/ProfileStyles/profile-styles.css"
</style>

