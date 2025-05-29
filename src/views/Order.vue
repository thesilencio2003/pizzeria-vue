<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">
      Listado de Órdenes |
      <button @click="newOrder" class="btn btn-success btn-sm mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table table-bordered table-hover">
      <thead class="table-light text-center">
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Sucursal</th>
          <th>Precio Total</th>
          <th>Estado</th>
          <th>Tipo de Entrega</th>
          <th>Repartidor</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.client?.user?.name ?? 'Sin cliente' }}</td>
          <td>{{ order.branch?.name ?? 'Sin sucursal' }}</td>
          <td>{{ formatPrice(order.total_price) }}</td>
          <td>{{ capitalize(order.status) }}</td>
          <td>{{ capitalize(order.delivery_type) }}</td>
          <td>{{ order.delivery_person?.user?.name ?? 'Sin repartidor' }}</td>
          <td>
            <button @click="editOrder(order.id)" class="btn btn-warning btn-sm mx-1">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deleteOrder(order.id)" class="btn btn-danger btn-sm mx-1">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
        <tr v-if="orders.length === 0">
          <td colspan="8">No hay órdenes registradas.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'OrderList',
  data() {
    return {
      orders: []
    }
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
      }).format(value || 0)
    },
    capitalize(str) {
      return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
    },
    newOrder() {
      this.$router.push({ name: 'NewOrder' })
    },
    editOrder(id) {
      this.$router.push({ name: 'EditarOrder', params: { id } })
    },
    deleteOrder(id) {
      Swal.fire({
        title: `¿Deseas eliminar la orden con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/orders/${id}`)
            .then(() => {
              this.loadOrders()
              Swal.fire('Orden eliminada correctamente', '', 'success')
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar la orden', 'error')
            })
        }
      })
    },
    loadOrders() {
      axios.get('http://127.0.0.1:8000/api/orders')
        .then(response => {
          this.orders = response.data.orders || []
        })
        .catch(error => {
          console.error('Error al cargar las órdenes:', error)
        })
    }
  },
  mounted() {
    this.loadOrders()
  }
}
</script>

<style scoped>
.container {
  max-width: 90%;
}
</style>