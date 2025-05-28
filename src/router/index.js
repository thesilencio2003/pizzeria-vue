import { createRouter, createWebHashHistory } from 'vue-router';

import EditarOrder from '../components/Order/EditarOrder.vue';
import NewOrder from '../components/Order/NewOrder.vue';
import Orders from '../views/Order.vue'; 
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders 
  },
  {
    path: '/editar-order/:id',
    name: 'EditarOrder',
    component: EditarOrder
  },
  {
    path: '/add-order',
    name: 'NewOrder',
    component: NewOrder
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
