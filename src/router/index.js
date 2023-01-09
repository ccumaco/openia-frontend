import { createWebHistory, createRouter } from "vue-router";


const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('../views/home.vue'),
  },
  {
    path: "/social-media",
    name: "Social-Media",
    component: () => import('../views/social-media.vue'),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/login.vue'),
  },
  {
    path: "/register",
    name: "register",
    component: () => import('../views/register.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;