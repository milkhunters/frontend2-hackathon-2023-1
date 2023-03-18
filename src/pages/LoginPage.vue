<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SignForm from "@/components/Login/SignForm.vue";
import { signIn, signOut } from "@/lib/api/auth/login.js";
import useFormError from "@/composables/useFormError.js";

const email = ref("");
const password = ref("");

const errorMessage = useFormError([email, password]);
const router = useRouter();

const trySignIn = async () => {
  await signOut();
  const error = await signIn({
    email: email.value,
    password: password.value,
  });

  if (error) errorMessage.value = "Пользователь не найден!";
  else router.push({ name: "profile" });
};
</script>

<template>
  <sign-form title="Вход" :error="errorMessage">
    <label>
      <p>Логин</p>
      <input v-model="email" class="form_input" type="text" />
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
