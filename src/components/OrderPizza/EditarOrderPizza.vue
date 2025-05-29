<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Pizza en Orden</h1>
    <div class="card">
      <div class="card-header fw-bold">Pizza en Orden</div>
      <div class="card-body">
        <form @submit.prevent="updateOrderPizza">
          <div class="mb-3">
            <label class="form-label">ID</label>
            <input type="text" class="form-control" :value="orderPizza.id" disabled>
          </div>

          <div class="mb-3">
            <label class="form-label">Orden</label>
            <select class="form-select" v-model="orderPizza.order_id" required>
              <option value="">Seleccionar Orden</option>
              <option v-for="order in orders" :key="order.id" :value="order.id">
                {{ order.id }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Tamaño de Pizza</label>
            <select class="form-select" v-model="orderPizza.pizza_size_id" required>
              <option value="">Seleccionar Tamaño</option>
              <option v-for="size in pizzaSizes" :key="size.id" :value="size.id">
                {{ size.size }} - {{ formatPrice(size.price) }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Cantidad</label>
            <input type="number" min="1" class="form-control" v-model.number="orderPizza.quantity" required>
          </div>

          <button type="submit" class="btn btn-primary">Actualizar</button>
          <button type="button" class="btn btn-warning mx-2" @click="cancel">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditarOrderPizza',
  data() {
    return {
      orderPizza: {
        id: null,
        order_id: '',
        pizza_size_id: '',
        quantity: 1
      },
      orders: [],
      pizzaSizes: []
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'OrderPizza' })
    },
    formatPrice(value) {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value || 0)
    },
    async updateOrderPizza() {
      try {
        const res = await axios.put(`http://127.0.0.1:8000/api/order_pizza/${this.orderPizza.id}`, this.orderPizza)
        if (res.status === 200 || res.data.success) {
          this.$router.push({ name: 'OrderPizza' })
          Swal.fire({
            icon: 'success',
            title: 'Pizza en orden actualizada correctamente',
            toast: true,
            position: 'top-end',
            timer: 2000,
            showConfirmButton: false
          })
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar el registro.', 'error')
      }
    },
    async loadData() {
      try {
        const id = this.$route.params.id
        const res = await axios.get(`http://127.0.0.1:8000/api/order_pizza/${id}`)
        this.orderPizza = res.data.order_pizza
        this.orders = res.data.orders
        this.pizzaSizes = res.data.pizza_sizes
      } catch (err) {
        Swal.fire('Error', 'No se pudo cargar el registro.', 'error')
      }
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>