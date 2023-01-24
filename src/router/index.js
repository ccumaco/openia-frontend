import { createWebHistory, createRouter } from "vue-router";
import axios from 'axios'
import { useOpenIaStore } from "../stores/global-store";

const guard = (to, from, next) => {
  const store = useOpenIaStore()
  const token = localStorage.getItem('token').replace(/['"]+/g, '');
  if (!token || token.length < 10) {
    return next('/login');
  }
  if (store.validateToken()) {
    return next()
  } else {
    return next('/login')
  }
  
}
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
    beforeEnter: guard,
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;