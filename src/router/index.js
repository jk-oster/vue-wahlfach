import { createRouter, createWebHistory } from 'vue-router'
import ExampleView from '../views/ExampleView.vue'
import LoginView from "@/views/LoginView.vue";
import ChatView from "@/views/ChatView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/example',
      name: 'example',
      component: () => import('../views/ExampleView.vue'),
    },    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      // TODO make sure user can't enter if no current user is logged in
    },
  ],
})

export default router
