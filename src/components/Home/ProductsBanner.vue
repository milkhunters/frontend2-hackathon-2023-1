<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const products = ref([
  { id: 1, url: "https://i.imgur.com/IVMd5RR.png" },
  { id: 2, url: "https://i.imgur.com/7xyaMce.png" },
  { id: 3, url: "https://i.imgur.com/kwFIUNS.png" },
]);
const bannerProduct = ref(0);
const intervalID = ref(null);

const startInterval = () => {
  intervalID.value = setInterval(goAhead, 3000);
};

const stopInterval = () => {
  clearInterval(intervalID);
};

const goAhead = () => {
  if (bannerProduct.value === products.value.length - 1) (bannerProduct.value = 0)
  else (bannerProduct.value += 1);
  stopInterval();
  startInterval();
};

const goBack = () => {
  if (bannerProduct.value === 0) (bannerProduct.value = products.value.length - 1)
  else (bannerProduct.value -= 1);
  stopInterval();
  startInterval();
};

onMounted(() => {
  startInterval();
});

onUnmounted(() => {
  stopInterval();
});
const banner = computed(() => {
  return this.products[this.bannerProduct];
});
</script>

<template>
  <section class="main_banner">
    <div class="container">
      <img :src="banner.url" alt="frame-selection" class="banner_img" />
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
