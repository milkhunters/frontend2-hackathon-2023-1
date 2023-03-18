<script>
import NewsItem from "./NewsItem.vue";

export default {
  name: "CompanyNews",

  components: { NewsItem },

  data() {
    return {
      newsCompany: [
        {
          id: 1,
          title: "Новость дня - запукаем ракету!",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto tempora, pariatur debitis eos natus dolor voluptatem consectetur minus est in molestiae sed similique magni maiores optio. Voluptatum aliquam maxime iusto dolore exercitationem porro excepturi quae, debitis dolores doloribus! Nam odit cum repellendus rem accusamus nisi voluptate a magnam sed? Dolorum.",
        },
        {
          id: 2,
          title: "У нас миллион пользователей...",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto tempora, pariatur debitis eos natus dolor voluptatem consectetur minus est in molestiae sed similique magni maiores optio. Voluptatum aliquam maxime iusto dolore exercitationem porro excepturi quae, debitis dolores doloribus! Nam odit cum repellendus rem accusamus nisi voluptate a magnam sed? Dolorum."
        },
        {
          id: 3,
          title: "Мы запускаем авторские курсы...",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto tempora, pariatur debitis eos natus dolor voluptatem consectetur minus est in molestiae sed similique magni maiores optio. Voluptatum aliquam maxime iusto dolore exercitationem porro excepturi quae, debitis dolores doloribus! Nam odit cum repellendus rem accusamus nisi voluptate a magnam sed? Dolorum."
        }
      ],
    };
  },
};
</script>

<template>

    <section class="news_section">
      <div class="container">
        <h2 class="sec-title">Новости</h2>
        <div class="news_wrapper">
          <!-- Новость -->
          <news-item v-for="news in newsCompany" :key="news.id" v-bind="news"/>
        </div>
      </div>
    </section>
</template>

<style scoped>
@import "@/assets/HomeStyles/style.css";
</style>
