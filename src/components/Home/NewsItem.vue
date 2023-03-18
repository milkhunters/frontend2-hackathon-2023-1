<script>
export default {
  name: "NewsItem",
  data() {
    return {
      isFull: false,
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  }
};
</script>

<template>

  <div class="news" @click="isFull ? isFull = false : isFull = true">
    <h4 class="news_title">{{ title }}</h4>
    <p class="news_desc">{{ body.split(" ").slice(0, 9).join(" ") }}...</p>
  </div>

  <div v-if="isFull" class="news_big">
    <button @click="isFull ? isFull = false : isFull = true">
      назад
    </button>
    <h4 class="news_title">{{ title }}</h4>
    <p class="news_desc">{{ body }}</p>
  </div>

</template>

<style scoped>
@import "@/assets/HomeStyles/style.css";
</style>
