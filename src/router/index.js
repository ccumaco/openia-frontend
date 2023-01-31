import { createWebHistory, createRouter } from "vue-router";
import axios from 'axios'
import { useOpenIaStore } from "../stores/global-store";

const guard = async (to, from, next) => {
  const store = useOpenIaStore()
  const token = localStorage.getItem('token').replace(/['"]+/g, '');
  if (!token || token.length < 10) {
    return next('/login');
  }
  if (await store.validateToken()) {
    return next()
  } else {
    return next('/login')
  }
  
}
const guardLoginRegister = async (to, from, next) => {
  const store = useOpenIaStore()
  const token = localStorage.getItem('token').replace(/['"]+/g, '');
  console.log(await store.validateToken(), 'store.validateToken');
  if (await store.validateToken() == false) {
    console.log('entro a login');
    next()
  } else {
    return next('/social-media');
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
    component: () => import('../views/login.vue'),
    beforeEnter: guardLoginRegister    
  },
  {
    path: "/register",
    name: "register",
    component: () => import('../views/register.vue'),
    beforeEnter: guardLoginRegister
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;