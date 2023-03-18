<script setup>
import DefaultHeader from "@/components/Layout/DefaultHeader.vue";
import DefaultFooter from "@/components/Layout/DefaultFooter.vue";
</script>

<template>
  <default-header />
  <slot></slot>
  <default-footer />
</template>
