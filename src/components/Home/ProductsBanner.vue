<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { getBanners } from "@/lib/api/banner/banner.js";

const products = ref(null);

onMounted(async () => {
  const banners = await getBanners();
  products.value = banners ?? [];
  startInterval();
});

const currentBunnerIndex = ref(0);
const banner = computed(() => {
  return products.value ? products.value[currentBunnerIndex.value] : null;
});

const intervalId = ref(null);

const startInterval = () => {
  stopInterval();
  intervalId.value = setInterval(goAhead, 3000);
};

const stopInterval = () => {
  if (intervalId.value) clearInterval(intervalId.value);
};

const goAhead = () => {
  if (currentBunnerIndex.value === products.value.length - 1) currentBunnerIndex.value = 0;
  else currentBunnerIndex.value++;
  startInterval();
};

const goBack = () => {
  if (currentBunnerIndex.value === 0) currentBunnerIndex.value = products.value.length - 1;
  else currentBunnerIndex.value--;
  startInterval();
};

onUnmounted(() => {
  stopInterval();
});
</script>

<template>
  <section class="main_banner">
    <div class="container">
      <img v-if="banner" :src="banner" alt="frame-selection" class="banner_img" />
      <div class="banner_buttons">
        <button @click="goBack">
          <svg
            class="cases-carousel__arrow"
            width="7"
            height="11"
            viewBox="0 0 7 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 1L1.5 5.5L6 10" stroke-width="2"></path>
          </svg>
        </button>
        <button @click="goAhead">
          <svg
            class="cases-carousel__arrow cases-carousel__arrow_right"
            width="7"
            height="11"
            viewBox="0 0 7 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 1L1.5 5.5L6 10" stroke-width="2"></path>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import "@/assets/HomeStyles/style.css";
</style>
