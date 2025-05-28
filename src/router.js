// src/router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import BranchesList from './components/BranchesList.vue';

const routes = [
  {
    path: '/branches',
    name: 'Branches',
    component: BranchesList
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
