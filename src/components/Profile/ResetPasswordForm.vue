<script setup>
import { ref } from "vue";
import useFormError from "@/composables/useFormError.js";
import { resetPassword } from "@/lib/api/user/profile.js";

const props = defineProps({
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

  const [errors] = await resetPassword(props.profileId);
  if (errors) setError(errors);
  else setSuccess("Пароль изменен.");
};
</script>

<template>
  <input v-model="currentPassword" type="password" />
  <input v-model="newPassword" type="password" />
  <input v-model="newPasswordRepeated" type="password" />
  <p>{{ error }}</p>
  <p>{{ success }}</p>
  <button @click="tryResetPassword">Reset</button>
</template>
