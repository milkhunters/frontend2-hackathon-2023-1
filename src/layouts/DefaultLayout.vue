<script setup>
import DefaultHeader from "../components/DefaultHeader.vue";
import DefaultFooter from "../components/DefaultFooter.vue";
</script>

<template>
  <default-header />
  <slot></slot>
  <default-footer />
</template>
