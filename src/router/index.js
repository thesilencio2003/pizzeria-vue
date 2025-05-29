import { createRouter, createWebHashHistory } from 'vue-router';
import BranchesList from '../components/BranchesList.vue';
import PizzaRawMaterialsList from '../components/PizzaRawMaterialsList.vue';
import RawMaterialsList from '../components/RawMaterialsList.vue'; 
import PurchasesList from './components/PurchasesList.vue';

const routes = [
  { path: '/branches', component: BranchesList },
  { path: '/pizza-raw-materials', component: PizzaRawMaterialsList },
  { path: '/raw_materials', component: RawMaterialsList },
  { path: '/purchases', component: PurchasesList }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
