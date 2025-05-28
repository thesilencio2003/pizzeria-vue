import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Users from '@/views/Users.vue'
import Pizzas from '@/views/Pizzas.vue'
import EditarPizza from '@/components/EditarPizza.vue'
import NewPizza from '@/components/NewPizza.vue'
import Ingredients from '@/views/Ingredients.vue'
import NewIngredient from '@/components/NewIngredient.vue'
import EditarIngredient from '@/components/EditarIngredient.vue'
import PizzaIngredients from '@/views/PizzaIngredients.vue'
import NewPizzaIngredient from '@/components/NewPizzaIngredient.vue'
import EditarPizzaIngredient from '@/components/EditarPizzaIngredient.vue'
import ExtraIngredients from '@/views/ExtraIngredients.vue'

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
  {
    path: '/ingredients/nueva',
    name: 'NewIngredient',
    component: NewIngredient
  },
  {
    path: '/ingredients/editar/:id',
    name: 'EditarIngredient',
    component: EditarIngredient
  },
  {
    path: '/pizzaingredients',
    name: 'PizzaIngredients',
    component: PizzaIngredients
  },
  {
    path: '/pizzaingredients/nueva',
    name: 'NewPizzaIngredient',
    component: NewPizzaIngredient
  },
  {
    path: '/pizza-ingredients/edit/:id',
    name: 'EditarPizzaIngredient',
    component: EditarPizzaIngredient
  },
  {
    path: '/extra-ingredients', 
    name: 'ExtraIngredients',
    component: ExtraIngredients
  }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
