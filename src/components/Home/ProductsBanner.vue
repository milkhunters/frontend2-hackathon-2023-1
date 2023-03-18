<script>
export default {
  name: "ProductsBanner",

  data() {
    return {
      products: [
        { id: 1, title: "Ноутбук Asus Pro", body: "Наш новый продукт - Asus Pro ..." },
        { id: 2, title: "Моно-колесо U-M35", body: "Крутой товар -  моно-колеса U-M35" },
        { id: 3, title: "PowerBank 1500ВТ", body: "Инженеры выпустили - PowerBank" },
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
  <button @click="goAhead">Назад</button>

  <div class="banners">
    <div>Название товара: {{ banner.title }}</div>
    <div>Описание товара: {{ banner.body }}</div>
  </div>

  <button @click="goBack">Вперед</button>
</template>

<style scoped>
.banners {
  border: 2px solid teal;
  border-radius: 10px;
  margin-left: 100px;
  width: 500px;
  padding: 10px;
}
</style>
