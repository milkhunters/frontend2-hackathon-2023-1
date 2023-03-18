<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ProductsBanner from "@/components/Home/ProductsBanner.vue";
import CompanyNews from "@/components/Home/CompanyNews.vue";

export default {
  name: "HomePage",

  components: { CompanyNews, ProductsBanner, DefaultLayout },
};
</script>

<template>
  <default-layout>
    <ProductsBanner />
    <CompanyNews />
  </default-layout>
</template>
