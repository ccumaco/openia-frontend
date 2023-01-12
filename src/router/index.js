import { createWebHistory, createRouter } from "vue-router";
import axios from "axios";
import { useOpenIaStore } from "../stores/global-store";
const protectedRoutes = async (to, from, next) => {
  const globalStore = useOpenIaStore()
  const userLocalStore = window.localStorage.getItem('user')
  if (!Object.entries(globalStore.user).length && userLocalStore) {
      await globalStore.login(JSON.parse(userLocalStore))
      next()
  }
  if (!Object.entries(globalStore.user).length) {
    next('/login')
  } else {
    next()
  }
}


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
    beforeEnter: protectedRoutes,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;