<script>
import NewsItem from "./NewsItem.vue";

export default {
  name: "CompanyNews",
  components: {NewsItem},
  data() {
    return {
      newsCompany: [
        {id: 1, title: "Мы написали свою бибилеотеку компонентов...", body: "Мы написали свою бибилеотеку компонентов"},
        {id: 2, title: "У нас миллион пользователей...", body: "У нас миллион пользователей"},
        {id: 3, title: "Мы запускаем авторские курсы...", body: "Мы запускаем авторские курсы"},
      ]
    }
  },
  methods: {}
}
</script>

<template>
  <div class="news">
    <NewsItem
        v-for="news in newsCompany"
        :news=news
    />
  </div>
</template>

<style scoped>

</style>