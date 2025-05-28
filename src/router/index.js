import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import Orders from '../views/Order.vue'
import EditarOrder from '../components/Order/EditarOrder.vue'
import NewOrder from '../components/Order/NewOrder.vue'
import AboutView from '../views/AboutView.vue'

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
    path: '/orders/edit/:id',
    name: 'EditarOrder',
    component: EditarOrder
  },
  {
    path: '/orders/new',
    name: 'NewOrder',
    component: NewOrder
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router