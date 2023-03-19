<script setup>
import { onMounted, ref } from "vue";
import NewsItem from "./NewsItem.vue";
import { getArticles } from "@/lib/api/article/article.js";

const companyNews = ref(null);

onMounted(async () => {
  const [_, news] = await getArticles();
  companyNews.value = Object.values(news ?? {});
});
</script>

<template>
  <section class="news_section">
    <div class="container">
      <h2 class="sec-title">Новости</h2>
      <div class="news_wrapper">
        <news-item
          v-for="news in companyNews"
          :key="news.id"
          :title="news.title"
          :text="news.text"
        />
      </div>
    </div>
  </section>
</template>

<!--<style scoped>-->
<!--@import "@/assets/HomeStyles/style.css";-->
<!--</style>-->
