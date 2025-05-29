import { createRouter, createWebHashHistory } from 'vue-router'

// Vistas principales
import HomeView from '../views/HomeView.vue'
import Orders from '../views/Order.vue'
import OrderPizza from '../views/OrderPizza.vue'
import PizzaSize from '../views/PizzaSize.vue'
import AboutView from '../views/AboutView.vue'

// Componentes Order
import EditarOrder from '../components/Order/EditarOrder.vue'
import NewOrder from '../components/Order/NewOrder.vue'

// Componentes OrderPizza
import EditarOrderPizza from '../components/OrderPizza/EditarOrderPizza.vue'
import NewOrderPizza from '../components/OrderPizza/NewOrderPizza.vue'

// Componentes PizzaSize
import EditarPizzaSize from '../components/PizzaSize/EditarPizzaSize.vue'
import NewPizzaSize from '../components/PizzaSize/NewPizzaSize.vue'

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
    path: '/orders/new',
    name: 'NewOrder',
    component: NewOrder
  },
  {
    path: '/orders/edit/:id',
    name: 'EditarOrder',
    component: EditarOrder
  },
  {
    path: '/order_pizza',
    name: 'OrderPizza',
    component: OrderPizza
  },
  {
    path: '/order_pizza/new',
    name: 'NewOrderPizza',
    component: NewOrderPizza
  },
  {
    path: '/order_pizza/edit/:id',
    name: 'EditarOrderPizza',
    component: EditarOrderPizza
  },
  {
    path: '/pizza_sizes',
    name: 'PizzaSize',
    component: PizzaSize
  },
  {
    path: '/pizza_sizes/new',
    name: 'NewPizzaSize',
    component: NewPizzaSize
  },
  {
    path: '/pizza_sizes/edit/:id',
    name: 'EditarPizzaSize',
    component: EditarPizzaSize
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