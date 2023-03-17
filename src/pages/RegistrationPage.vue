<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SignForm from "@/components/SignForm.vue";
import { signUp } from "@/lib/api/register.js";
import useFormError from "@/composables/useFormError";

const username = ref("");
const password = ref("");

const errorMessage = useFormError([username, password]);
const router = useRouter();

const trySignUp = async () => {
  const error = await signUp({
    username: username.value,
    password: password.value,
  });

  if (error) {
    errorMessage.value = error;
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
      <input type="email" />
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
