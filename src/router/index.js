import { createWebHistory, createRouter } from "vue-router";
import axios from 'axios'
import { useOpenIaStore } from "../stores/global-store";
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user = await userStore.currentUser();
  if (user) {
      next();
  } else {
      next("/login");
  }
  userStore.loadingSession = false;
};

const redirection = async (to, from, next) => {
  const databaseStore = useDatabaseStore();
  const userStore = useUserStore();
  userStore.loadingSession = true;
  // console.log(to.params.pathMatch[0]);
  const name = await databaseStore.getURL(to.params.pathMatch[0]);
  if (!name) {
      next();
      userStore.loadingSession = false;
  } else {
      window.location.href = name;
      userStore.loadingSession = true;
      next();
  }
};

const routes = [
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import('../views/404.vue'),
    beforeEnter: redirection,
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
    beforeEnter: requireAuth,
  },
  {
    path: "/social-media",
    name: "Social-Media",
    component: () => import('../views/social-media.vue'),
    beforeEnter: requireAuth,
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
  {
    path: "/products",
    name: "products",
    component: () => import('../views/products.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: "/articles",
    name: "articles",
    component: () => import('../views/articles.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: "/resumes",
    name: "resumes",
    component: () => import('../views/resumes.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: "/emails",
    name: "emails",
    component: () => import('../views/emails.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: "/free-style",
    name: "free-style",
    component: () => import('../views/free-style.vue'),
    beforeEnter: requireAuth,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;