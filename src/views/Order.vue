<template>
  <div class="container py-4">
    <h1 class="mb-4 d-flex justify-content-between align-items-center">
      Listado de Pedidos
      <button @click="newOrder" class="btn btn-success">
        <font-awesome-icon icon="plus" /> Agregar Pedido
      </button>
    </h1>

    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>

    <table class="table table-striped">
      <thead>
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
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.client?.user?.name || 'Cliente no asignado' }}</td>
          <td>{{ order.branch?.name }}</td>
          <td>{{ formatPrice(order.total_price) }}</td>
          <td>{{ capitalize(order.status) }}</td>
          <td>{{ capitalize(order.delivery_type) }}</td>
          <td>{{ order.deliveryPerson?.user?.name || 'Repartidor no asignado' }}</td>
          <td>
            <button @click="editOrder(order.id)" class="btn btn-primary btn-sm">Editar</button>
            <button @click="deleteOrder(order.id)" class="btn btn-danger btn-sm mx-1">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'OrderList',
  data() {
    return {
      orders: [],
      successMessage: ''
    };
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
    },
    capitalize(str) {
      return str?.charAt(0).toUpperCase() + str?.slice(1);
    },
    newOrder() {
      this.$router.push({ name: 'NewOrder' });
    },
    editOrder(id) {
      this.$router.push({ name: 'EditOrder', params: { id } });
    },
    deleteOrder(id) {
      Swal.fire({
        title: `¿Estás seguro de eliminar el pedido ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar'
      }).then(result => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/orders/${id}`)
            .then(() => {
              this.loadOrders();
              this.successMessage = 'Pedido eliminado correctamente';
            });
        }
      });
    },
    loadOrders() {
      axios.get('http://127.0.0.1:8000/api/orders')
        .then(response => {
          this.orders = response.data;
        })
        .catch(error => {
          console.error('Error al cargar los pedidos:', error);
        });
    }
  },
  mounted() {
    this.loadOrders();
  }
};
</script>

<style scoped>
.container {
  max-width: 90%;
}
</style>
