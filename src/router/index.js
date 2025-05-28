import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Users from '@/views/Users.vue'
import Pizzas from '@/views/Pizzas.vue'
import EditarPizza from '@/components/EditarPizza.vue'
import NewPizza from '@/components/NewPizza.vue'
import Ingredients from '@/views/Ingredients.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/pizzas',
    name: 'Pizzas',
    component: Pizzas
  },
  {
    path: '/pizzas/editar/:id',
    name: 'EditarPizza',
    component: EditarPizza
  },
  {
    path: '/pizzas/nueva',
    name: 'NewPizza',
    component: NewPizza
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: Ingredients
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
