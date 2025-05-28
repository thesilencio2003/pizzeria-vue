import { createRouter, createWebHashHistory } from 'vue-router';
import BranchesList from '../components/BranchesList.vue';
import PizzaRawMaterialsList from '../components/PizzaRawMaterialsList.vue';

const routes = [
  { path: '/branches', component: BranchesList },
  { path: '/pizza-raw-materials', component: PizzaRawMaterialsList }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
