import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '../views/ListView.vue'
import { useAuthStore } from '@/stores/auth';
import LoginView from '@/views/LoginView.vue';
import axios from 'axios';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/list',
      name: 'list',
      component: ListView,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.checkInitialization();
  console.log('%crouter.beforeEach', 'background-color: green;')
  console.log('axios.defaults.headers.common: ', axios.defaults.headers.common)
  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    console.log('next login')
    next('/login');
  }
  else {
    console.log('next')
    next();
  }
});

export default router
