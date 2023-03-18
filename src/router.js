import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import ChatPage from "@/pages/ChatPage.vue";
import DeathPage from "@/pages/DeathPage.vue";

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
      path: "/profile/:id?",
      name: "profile",
      component: ProfilePage,
    },
    {
      path: "/chat",
      name: "chat",
      component: ChatPage,
    },
    {
      path: "/license",
      name: "death",
      component: DeathPage,
    }
  ],
});

export default router;
