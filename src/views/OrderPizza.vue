<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">
      Listado Pizzas por Orden |
      <button @click="newOrderPizza" class="btn btn-success btn-sm mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table table-bordered table-hover">
      <thead class="table-light text-center">
        <tr>
          <th>ID</th>
          <th>Orden</th>
          <th>Tamaño</th>
          <th>Precio Unitario</th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="pizza in orderPizzas" :key="pizza.id">
          <td>{{ pizza.id }}</td>
          <td>{{ pizza.order_id }}</td>
          <td>{{ pizza.pizza_size_name || 'No definido' }}</td>
          <td>{{ formatPrice(pizza.pizza_size_price) }}</td>
          <td>{{ pizza.quantity }}</td>
          <td>
            <button @click="editOrderPizza(pizza.id)" class="btn btn-warning btn-sm mx-1">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deleteOrderPizza(pizza.id)" class="btn btn-danger btn-sm mx-1">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'OrderPizza',
  data() {
    return {
      orderPizzas: []
    }
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
      }).format(value || 0)
    },
    newOrderPizza() {
      this.$router.push({ name: 'NewOrderPizza' })
    },
    editOrderPizza(id) {
      this.$router.push({ name: 'EditarOrderPizza', params: { id } })
    },
    deleteOrderPizza(id) {
      Swal.fire({
        title: `¿Deseas eliminar la pizza con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/order_pizza/${id}`)
            .then(response => {
              if (response.data.success) {
                this.orderPizzas = response.data.orderPizzas
                Swal.fire('Pizza eliminada correctamente', '', 'success')
              }
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar la pizza', 'error')
            })
        }
      })
    },
    loadOrderPizzas() {
      axios.get('http://127.0.0.1:8000/api/order_pizza')
        .then(response => {
          this.orderPizzas = response.data.orderPizzas || []
        })
        .catch(error => {
          console.error('Error al cargar las pizzas por orden:', error)
        })
    }
  },
  mounted() {
    this.loadOrderPizzas()
  }
}
</script>

<style scoped>
.container {
  max-width: 90%;
}
</style>