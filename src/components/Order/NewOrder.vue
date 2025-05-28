<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo Pedido</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Pedido
      </div>
      <div class="card-body">
        <form @submit.prevent="saveOrder">
          <div class="mb-3">
            <label class="form-label">Cliente</label>
            <select class="form-select" v-model="order.client_id" required>
              <option value="">Seleccionar Cliente</option>
              <option v-for="client in clients" :key="client.id" :value="client.id">
                {{ client.user?.name || 'Sin Nombre' }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Sucursal</label>
            <select class="form-select" v-model="order.branch_id" required>
              <option value="">Seleccionar Sucursal</option>
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                {{ branch.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Tamaño de Pizza</label>
            <select class="form-select" v-model="order.pizza_size_id" required>
              <option value="">Seleccionar Tamaño</option>
              <option v-for="pizzaSize in pizzaSizes" :key="pizzaSize.id" :value="pizzaSize.id">
                {{ pizzaSize.size }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Precio Total</label>
            <input type="number" class="form-control" step="0.01" v-model.number="order.total_price" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Estado</label>
            <select class="form-select" v-model="order.status" required>
              <option value="pendiente">Pendiente</option>
              <option value="en_preparacion">En Preparación</option>
              <option value="listo">Listo</option>
              <option value="entregado">Entregado</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Tipo de Entrega</label>
            <select class="form-select" v-model="order.delivery_type" required>
              <option value="en_local">En Local</option>
              <option value="a_domicilio">A Domicilio</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Repartidor</label>
            <select class="form-select" v-model="order.delivery_person_id">
              <option value="">Seleccionar Repartidor</option>
              <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                {{ employee.user?.name || 'Sin Nombre' }}
              </option>
            </select>
          </div>

          <button class="btn btn-primary" type="submit">Guardar Pedido</button>
          <button type="button" class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewOrder',
  data() {
    return {
      order: {
        client_id: '',
        branch_id: '',
        pizza_size_id: '',
        total_price: '',
        status: 'pendiente',
        delivery_type: 'en_local',
        delivery_person_id: ''
      },
      clients: [],
      branches: [],
      pizzaSizes: [],
      employees: []
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Orders' })
    },
    async saveOrder() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/orders', this.order)
        if (res.status === 201 || res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Pedido guardado exitosamente',
            toast: true,
            position: 'top-end',
            timer: 2000,
            showConfirmButton: false
          })
          this.$router.push({ name: 'Orders' })
        }
      } catch (error) {
        console.error('Error al guardar pedido:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar el pedido',
          text: error.response?.data?.message || 'Error interno del servidor'
        })
      }
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/clients').then(res => {
      this.clients = res.data.clients
    })
    axios.get('http://127.0.0.1:8000/api/branches').then(res => {
      this.branches = res.data.branches
    })
    axios.get('http://127.0.0.1:8000/api/pizza-sizes').then(res => {
      this.pizzaSizes = res.data.pizzaSizes
    })
    axios.get('http://127.0.0.1:8000/api/employees').then(res => {
      this.employees = res.data.employees
    })
  }
}
</script>