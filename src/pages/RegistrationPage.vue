<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SignForm from "@/components/SignForm.vue";
import { signUp } from "@/lib/api/auth/register.js";
import useFormError from "@/composables/useFormError";

const username = ref("");
const email = ref("");
const password = ref("");

const errorMessage = useFormError([username, email, password]);
const router = useRouter();

const formatError = (errors) => {
  return errors.map(({ message }) => message).join("\n");
};

const trySignUp = async () => {
  const errors = await signUp({
    username: username.value,
    email: email.value,
    password: password.value,
  });

  if (errors) {
    errorMessage.value = Array.isArray(errors) ? formatError(errors) : errors;
  } else {
    router.push({ name: "registration-success" });
  }
};
</script>

<template>
  <sign-form title="Регистрация" :error="errorMessage">
    <label>
      <p>Логин</p>
      <input v-model="username" type="text" />
    </label>

    <label>
      <p>ФИО</p>
      <input type="text" />
    </label>

    <label>
      <p>E-mail</p>
      <input v-model="email" type="email" />
    </label>

    <label>
      <p>Название организации</p>
      <input type="text" />
    </label>

    <label>
      <p>ИНН</p>
      <input type="text" />
    </label>

    <label>
      <p class="log-pass">Пароль</p>
      <input v-model="password" type="password" />
    </label>

    <button @click.stop="trySignUp" class="form_btn">Зарегистрироваться</button>
  </sign-form>
</template>

<style scoped>
@import "@/assets/sign-form.css";
</style>
