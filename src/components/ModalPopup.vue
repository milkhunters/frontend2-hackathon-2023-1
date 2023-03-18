<script setup>
defineProps({
  opened: {
    type: Boolean,
    required: false,
    default: false,
  },
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits({
  confirmed: null,
  rejected: null,
});

const confirm = () => emit("confirmed");
const reject = () => emit("rejected");
</script>

<template>
  <Teleport to="body">
    <div v-if="opened">
      <p>{{ message }}</p>
      <button @click="confirm">Подтвердит</button>
      <button @click="reject">Отвергнуть</button>
    </div>
  </Teleport>
</template>
