<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    required: false,
    default: null,
  }
});
</script>

<template>
<div class="reg_wrapper">
    <div class="reg">
      <div class="reg_data">
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
@import "@/assets/LoginStyles/sign-form-base.css";
</style>
