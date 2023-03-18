<script>
export default {
  name: "ProductsBanner",

  data() {
    return {
      products: [
        { id: 1, url: "https://i.imgur.com/Y3AnsBO.png" },
        { id: 2, url: "https://i.imgur.com/3l95q2c.png" },
        { id: 3, url: "https://i.imgur.com/XMwqK3E.png" }
      ],
      bannerProductId: 1,
      intervalID: null,
    };
  },

  methods: {
    startInterval() {
      this.intervalID = setInterval(this.goAhead, 1000);
    },
    stopInterval() {
      clearInterval(this.intervalID);
    },
    goAhead() {
      this.bannerProductId === 1 ? (this.bannerProductId = 3) : (this.bannerProductId -= 1);
      this.stopInterval();
      this.startInterval();
    },
    goBack() {
      this.bannerProductId === 3 ? (this.bannerProductId = 1) : (this.bannerProductId += 1);
      this.stopInterval();
      this.startInterval();
    },
  },
  
  mounted() {
    this.startInterval();
  },

  unmounted() {
    this.stopInterval();
  },

  computed: {
    banner() {
      return this.products[this.bannerProductId - 1];
    },
  },
};
</script>

<template>
  <section class="main_banner">
    <div class="container">
      <img :src=banner.url alt="frame-selection" class="banner_img">
      <div class="banner_buttons">
        <button @click="goBack">
          <svg class="cases-carousel__arrow" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1L1.5 5.5L6 10" stroke-width="2"></path></svg>
        </button>
        <button @click="goAhead">
          <svg class="cases-carousel__arrow cases-carousel__arrow_right" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1L1.5 5.5L6 10" stroke-width="2"></path></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import "@/assets/HomeStyles/style.css";
</style>
