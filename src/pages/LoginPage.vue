<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SignForm from "@/components/SignForm.vue";
import { signIn } from "@/lib/api/auth/login";
import useFormError from "@/composables/useFormError";

const username = ref("");
const password = ref("");

const errorMessage = useFormError([username, password]);
const router = useRouter();

const trySignIn = async () => {
  const error = await signIn({
    username: username.value,
    password: password.value,
  });

  if (error) {
    errorMessage.value = "Пользователь не найден!";
  } else {
    router.push({ name: "profile" });
  }
};
</script>

<template>
  <sign-form title="Вход" :error="errorMessage">
    <label>
      <p>Логин</p>
      <input v-model="username" class="form_input" type="text" />
    </label>

    <label>
      <p class="log-pass">Пароль</p>
      <input v-model="password" class="form_input" type="password" />
    </label>

    <button @click.stop="trySignIn" class="form_btn">Авторизоваться</button>
  </sign-form>
</template>

<style scoped>
@import "@/assets/sign-form.css";
</style>
