<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    required: false,
  }
});
</script>

<template>
<div class="reg_wrapper">
    <div class="reg">
      <div class="reg_data">
        <div class="reg_change">
          <router-link :to="{ name: 'login' }" class="reg_change_button">Вход</router-link>
          <router-link :to="{ name: 'registration' }" class="reg_change_button">
            Регистрация
          </router-link>
        </div>

        <h1 class="reg_data_title">{{ title }}</h1>
        
        <template v-if="error">
          {{ error }}
        </template>

        <form @submit.prevent>
          <slot></slot>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/sign-form-base.css";
</style>
