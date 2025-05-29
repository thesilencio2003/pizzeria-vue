<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo Pedido</h1>
    <div class="card">
      <div class="card-header fw-bold">Pedido</div>
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
              <option v-for="size in pizzaSizes" :key="size.id" :value="size.id">
                {{ size.size }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Precio Total</label>
            <input type="number" class="form-control" step="0.01" v-model.number="order.total_price" min="0" required>
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
        const response = await axios.post('http://127.0.0.1:8000/api/orders', this.order)
        if (response.status === 201 || response.status === 200) {
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
        console.error('Error al guardar el pedido:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar el pedido',
          text: error.response?.data?.message || 'Ocurrió un error inesperado'
        })
      }
    },
    async fetchData() {
      const endpoints = [
        { url: 'clients', target: 'clients' },
        { url: 'branches', target: 'branches' },
        { url: 'pizza_sizes', target: 'pizzaSizes' },
        { url: 'employees', target: 'employees' }
      ]

      for (const { url, target } of endpoints) {
        try {
          const res = await axios.get(`http://127.0.0.1:8000/api/${url}`)
          this[target] = res.data[target] || []
        } catch (error) {
          console.error(`Error al cargar ${target}:`, error)
        }
      }
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>