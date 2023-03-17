<script>
export default {
  name: "NewsItem",
  props: {
    news: {
      type: Object
    }
  }
}
</script>

<template>
  <div class="newsItem">
    <div> {{ news.title }}</div>
    <div> {{ news.body }}</div>
  </div>
</template>


<style scoped>
.newsItem {
  border: 2px solid teal;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
}
</style>