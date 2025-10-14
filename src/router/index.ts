import { createRouter, createWebHistory } from 'vue-router';
import ChatPage from './ChatPage.vue';

const routes = [
  {
    path: '/',
    name: 'ChatPage',
    component: ChatPage,
    meta: {
      title: '채팅',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  document.title = to.meta?.title
    ? `${to.meta.title} - KKK AI Agent`
    : 'KKK AI Agent';
  next();
});

export default router;
