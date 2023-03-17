import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegistrationPage from "@/pages/RegistrationPage.vue";
import RegistrationSuccessPage from "@/pages/RegistrationSuccessPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/registration",
      name: "registration",
      component: RegistrationPage,
    },
    {
      path: "/registration-success",
      name: "registration-success",
      component: RegistrationSuccessPage,
    },
  ],
});

export default router;
