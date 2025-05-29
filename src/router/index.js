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
import NewExtraIngredient from '@/components/NewExtraIngredient.vue'
import EditarExtraIngredient from '@/components/EditarExtraIngredient.vue'
import NewUser from '@/components/NewUser.vue'
import EditarUser from '@/components/EditarUser.vue'
import Clients from '@/views/Clients.vue'
import NewClient from '@/components/NewClient.vue'
import EditarClient from '@/components/EditarClient.vue'
import Employees from '@/views/Employees.vue'
import NewEmployee from '@/components/NewEmployee.vue'
import EditarEmployee from '@/components/EditarEmployee.vue'
import AboutView from '../views/AboutView.vue'



const routes = [
  { 
    
    path: '/', 
    name: 'home', 
    component: HomeView },
  { 
    path: '/about', 
    name: 'about', 
    component: AboutView },
  { 
    path: '/users', 
    name: 'users', 
    component: Users },
  { 
    path: '/users/nueva', 
    name: 'NuevoUsuario', 
    component: NewUser },
  { 
    path: '/users/editar/:id', 
    name: 'EditarUsuario', 
    props: true, 
    component: EditarUser },
  { 
    path: '/pizzas', 
    name: 'Pizzas', 
    component: Pizzas },
  { 
    path: '/pizzas/editar/:id', 
    name: 'EditarPizza', 
    component: EditarPizza },
  { 
    path: '/pizzas/nueva', 
    name: 'NewPizza', 
    component: NewPizza },
  { 
    path: '/ingredients', 
    name: 'Ingredients', 
    component: Ingredients },
  { 
    path: '/ingredients/nueva', 
    name: 'NewIngredient', 
    component: NewIngredient },
  { 
    path: '/ingredients/editar/:id', 
    name: 'EditarIngredient', 
    component: EditarIngredient },
  { 
    path: '/pizzaingredients', 
    name: 'PizzaIngredients', 
    component: PizzaIngredients },
  { 
    path: '/pizzaingredients/nueva', 
    name: 'NewPizzaIngredient', 
    component: NewPizzaIngredient },
  { 
    path: '/pizza-ingredients/edit/:id', 
    name: 'EditarPizzaIngredient', 
    component: EditarPizzaIngredient },
  { 
    path: '/extra-ingredients', 
    name: 'ExtraIngredients', 
    component: ExtraIngredients },
  { 
    path: '/extra-ingredients/new', 
    name: 'NewExtraIngredient', 
    component: NewExtraIngredient },
  { 
    path: '/extra-ingredients/edit/:id', 
    name: 'EditarExtraIngredient', 
    component: EditarExtraIngredient },
  { 
    path: '/clients', 
    name: 'Clients', 
    component: Clients },
  { 
    path: '/clients/new', 
    name: 'NewClient', 
    component: NewClient },
  { 
    path: '/clients/edit/:id', 
    name: 'EditClient', 
    component: EditarClient },
  { 
    path: '/employees', 
    name: 'EmployeeList', 
    component: Employees },
  { 
    path: '/employees/new', 
    name: 'NewEmployee', 
    component: NewEmployee },
  { 
    path: '/employees/edit/:id', 
    name: 'EditEmployee', 
    component: EditarEmployee },
  
    
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
