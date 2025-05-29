import { createRouter, createWebHashHistory } from 'vue-router';
import BranchesList from './components/BranchesList.vue';
import PizzaRawMaterialList from './components/PizzaRawMaterialList.vue';
import RawMaterialsList from './components/RawMaterialsList.vue';
import PurchasesList from './components/PurchasesList.vue';
import SuppliersList from './components/SuppliersList.vue';

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
import EditarOrder from '../components/Order/EditarOrder.vue'
import NewOrder from '../components/Order/NewOrder.vue'
import EditarOrderPizza from '../components/OrderPizza/EditarOrderPizza.vue'
import NewOrderPizza from '../components/OrderPizza/NewOrderPizza.vue'
import EditarPizzaSize from '../components/PizzaSize/EditarPizzaSize.vue'
import NewPizzaSize from '../components/PizzaSize/NewPizzaSize.vue'
import OrderExtraIngredient from '../views/OrderExtraIngredient.vue'
import NewOrderExtraIngredient from '../components/OrderExtraIngredient/NewOrderExtraIngredient.vue'
import EditarOrderExtraIngredient from '../components/OrderExtraIngredient/EditarOrderExtraIngredient.vue'
import Orders from '../views/Order.vue'
import OrderPizza from '../views/OrderPizza.vue'
import PizzaSize from '../views/PizzaSize.vue'


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
    },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/users/nueva',
    name: 'NuevoUsuario',
    component: NewUser
  },
  {
    path: '/users/editar/:id',
    name: 'EditarUsuario',
    props: true,
    component: EditarUser
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
  },
  {
    path: '/extra-ingredients/new',
    name: 'NewExtraIngredient',
    component: NewExtraIngredient
  },
  {
    path: '/extra-ingredients/edit/:id',
    name: 'EditarExtraIngredient',
    component: EditarExtraIngredient
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients
  },
  {
    path: '/clients/new',
    name: 'NewClient',
    component: NewClient
  },
  {
    path: '/clients/edit/:id',
    name: 'EditClient',
    component: EditarClient
  },
  {
    path: '/employees',
    name: 'EmployeeList',
    component: Employees
  },
  {
    path: '/employees/new',
    name: 'NewEmployee',
    component: NewEmployee
  },
  {
    path: '/employees/edit/:id',
    name: 'EditEmployee',
  },
  {
    path: '/employees/edit/:id',
    name: 'EditEmployee',
    component: EditarEmployee
  },
{ 
    path: '/orders', 
    name: 'Orders', 
    component: Orders },
 { 
    path: '/orders/new', 
    name: 'NewOrder', 
    component: NewOrder },
  { 
    path: '/orders/edit/:id', 
    name: 'EditarOrder', 
    component: EditarOrder },
  { 
    path: '/order_pizza', 
    name: 'OrderPizza', 
    component: OrderPizza },
  { 
    path: '/order_pizza/new', 
    name: 'NewOrderPizza', 
    component: NewOrderPizza },
  { 
    path: '/order_pizza/edit/:id', 
    name: 'EditarOrderPizza', 
    component: EditarOrderPizza },
  { 
    path: '/pizza_sizes', 
    name: 'PizzaSize', 
    component: PizzaSize },
  { 
    path: '/pizza_sizes/new', 
    name: 'NewPizzaSize', 
    component: NewPizzaSize },
  { 
    path: '/pizza_sizes/edit/:id', 
    name: 'EditarPizzaSize', 
    component: EditarPizzaSize },
  { 
    path: '/order_extra_ingredient', 
    name: 'OrderExtraIngredient', 
    component: OrderExtraIngredient },
  { 
    path: '/order_extra_ingredient/new', 
    name: 'NewOrderExtraIngredient', 
    component: NewOrderExtraIngredient },
  { 
    path: '/order_extra_ingredient/edit/:id', 
    name: 'EditarOrderExtraIngredient', 
    component: EditarOrderExtraIngredient }  

];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
