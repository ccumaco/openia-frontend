import { createWebHistory, createRouter } from "vue-router";
import axios from 'axios'
import { useOpenIaStore } from "../stores/global-store";

const guard = async (to, from, next) => {
  const store = useOpenIaStore()
  const token = localStorage.getItem('token');
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
  if (await store.validateToken() == false) {
    next()
  } else {
    return next('/free-style');
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
  // {
  //   path: "/payments",
  //   name: "Payments",
  //   component: () => import('../views/payments.vue'),
  // },
  {
    path: "/profile",
    name: "profile",
    component: () => import('../views/profile.vue'),
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
  },
  {
    path: "/products",
    name: "products",
    component: () => import('../views/products.vue'),
    beforeEnter: guard
  },
  {
    path: "/articles",
    name: "articles",
    component: () => import('../views/articles.vue'),
    beforeEnter: guard
  },
  {
    path: "/resumes",
    name: "resumes",
    component: () => import('../views/resumes.vue'),
    beforeEnter: guard
  },
  {
    path: "/emails",
    name: "emails",
    component: () => import('../views/emails.vue'),
    beforeEnter: guard
  },
  {
    path: "/free-style",
    name: "free-style",
    component: () => import('../views/free-style.vue'),
    beforeEnter: guard
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;