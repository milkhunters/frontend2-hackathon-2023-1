<script>
export default {
  name: "NewsItem",

  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="newsItem">
    <div>{{ title }}</div>
    <div>{{ body }}</div>
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
