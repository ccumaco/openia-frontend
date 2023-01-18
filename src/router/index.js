import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import('../views/404.vue'),
  },
  {
    path: "/",
    name: "Home",
    component: () => import('../views/home.vue'),
  },
  {
    path: "/social-media",
    name: "Social-Media",
    component: () => import('../views/social-media.vue'),
    // beforeEnter: protectedRoutes,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/login.vue')
    
  },
  {
    path: "/register",
    name: "register",
    component: () => import('../views/register.vue'),
  },
  {
    path: "/plans",
    name: "plans",
    component: () => import('../views/plans.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;