import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/home.vue";
import SocialMedia from "../views/social-media.vue";
import Login from "../views/login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/social-media",
    name: "Social-Media",
    component: SocialMedia,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;