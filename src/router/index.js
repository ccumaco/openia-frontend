import { createWebHistory, createRouter } from "vue-router";
import axios from 'axios'
import { useOpenIaStore } from "../stores/global-store";

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
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/social-media",
    name: "Social-Media",
    component: () => import('../views/social-media.vue'),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/login.vue')
  },
  {
    path: "/register",
    name: "register",
    component: () => import('../views/register.vue')
  },
  {
    path: "/products",
    name: "products",
    component: () => import('../views/products.vue'),
    meta: {
      requiresAuth: true
    }
    
  },
  {
    path: "/articles",
    name: "articles",
    component: () => import('../views/articles.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/emails",
    name: "emails",
    component: () => import('../views/emails.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/free-style",
    name: "free-style",
    component: () => import('../views/free-style.vue'),
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const store = useOpenIaStore()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.$state.isAuthenticated) {
      const token = window.localStorage.getItem("token")
      // El usuario no está autenticado, redirigir a la página de inicio de sesión
      if (token) {
        store.login()
      }
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;