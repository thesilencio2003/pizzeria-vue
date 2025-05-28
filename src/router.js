import { createRouter, createWebHashHistory } from 'vue-router';
import BranchesList from './components/BranchesList.vue';
import PizzaRawMaterialList from './components/PizzaRawMaterialList.vue';

const routes = [
  {
    path: '/branches',
    name: 'Branches',
    component: BranchesList
  },
  {
    path: '/pizza-raw-materials', 
    name: 'PizzaRawMaterials',
    component: PizzaRawMaterialList
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
