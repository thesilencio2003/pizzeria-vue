import { createRouter, createWebHashHistory } from 'vue-router';
import BranchesList from './components/BranchesList.vue';
import PizzaRawMaterialList from './components/PizzaRawMaterialList.vue';
import RawMaterialsList from './components/RawMaterialsList.vue';
import PurchasesList from './components/PurchasesList.vue';
import SuppliersList from './components/SuppliersList.vue';


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
  },
   {
    path: '/raw-materials', 
    name: 'RawMaterials',
    component: RawMaterialsList
  },
   {
    path: '/purchases',
    name: 'PurchasesList',
    component: PurchasesList
  },
  {
    path: '/suppliers', 
    name: 'SuppliersList',
    component: SuppliersList
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
