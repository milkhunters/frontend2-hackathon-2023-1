<script>
export default {
  name: "ProductsBanner",

  data() {
    return {
      products: [
        { id: 1, url: "https://i.imgur.com/IVMd5RR.png" },
        { id: 2, url: "https://i.imgur.com/7xyaMce.png" },
        { id: 3, url: "https://i.imgur.com/kwFIUNS.png" }
      ],
      bannerProduct: 0,
      intervalID: null,
    };
  },

  methods: {
    startInterval() {
      this.intervalID = setInterval(this.goAhead, 3000);
    },
    stopInterval() {
      clearInterval(this.intervalID);
    },
    goAhead() {
      this.bannerProduct === this.products.length - 1 ? (this.bannerProduct = 0) : (this.bannerProduct += 1);
      this.stopInterval();
      this.startInterval();
    },
    goBack() {
      this.bannerProduct === 0 ? (this.bannerProduct= this.products.length - 1) : (this.bannerProduct -= 1);
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
      return this.products[this.bannerProduct];
    },
  }
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
