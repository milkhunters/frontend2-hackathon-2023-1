<script>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import ProductsBanner from '@/components/Home/ProductsBanner.vue';
import CompanyNews from '../components/Home/CompanyNews.vue';
import {getCurrentUserProfileInfo} from "../lib/api/user/profile";
import router from "../router";

export default {
  name: "HomePage",
  components: {CompanyNews, ProductsBanner, DefaultLayout},
  mounted() {
    const res = getCurrentUserProfileInfo()
    res.catch((err) => console.log(err))

  }

};
</script>

<template>
  <default-layout>

    <ProductsBanner/>

    <CompanyNews/>

  </default-layout>
</template>

<style>

</style>
