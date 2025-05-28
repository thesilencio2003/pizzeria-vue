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
            <label for="client_id" class="form-label">Cliente</label>
            <select class="form-select" v-model="order.client_id">
              <option value="">Seleccionar Cliente</option>
              <option v-for="client in clients" :value="client.id">
                {{ client.user?.name || 'Sin Nombre' }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="branch_id" class="form-label">Sucursal</label>
            <select class="form-select" v-model="order.branch_id">
              <option value="">Seleccionar Sucursal</option>
              <option v-for="branch in branches" :value="branch.id">
                {{ branch.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="pizza_size_id" class="form-label">Tamaño de Pizza</label>
            <select class="form-select" v-model="order.pizza_size_id">
              <option value="">Seleccionar Tamaño</option>
              <option v-for="pizzaSize in pizzaSizes" :value="pizzaSize.id">
                {{ pizzaSize.size }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="total_price" class="form-label">Precio Total</label>
            <input type="number" step="0.01" class="form-control" v-model="order.total_price">
          </div>

          <div class="mb-3">
            <label for="status" class="form-label">Estado</label>
            <select class="form-select" v-model="order.status">
              <option value="pendiente">Pendiente</option>
              <option value="en_preparacion">En Preparación</option>
              <option value="listo">Listo</option>
              <option value="entregado">Entregado</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="delivery_type" class="form-label">Tipo de Entrega</label>
            <select class="form-select" v-model="order.delivery_type">
              <option value="en_local">En Local</option>
              <option value="a_domicilio">A Domicilio</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="delivery_person_id" class="form-label">Repartidor</label>
            <select class="form-select" v-model="order.delivery_person_id">
              <option value="">Seleccionar Repartidor</option>
              <option v-for="employee in employees" :value="employee.id">
                {{ employee.user?.name || 'Sin Nombre' }}
              </option>
            </select>
          </div>

          <button class="btn btn-primary" type="submit">Guardar Pedido</button>
          <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

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
      const res = await axios.post('http://127.0.0.1:8000/api/orders', this.order)
      if (res.status === 200 || res.status === 201) {
        this.$router.push({ name: 'Orders' })
        Swal.fire({
          icon: 'success',
          title: 'Pedido guardado',
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false
        })
      }
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/clients').then(res => { this.clients = res.data.clients })
    axios.get('http://127.0.0.1:8000/api/branches').then(res => { this.branches = res.data.branches })
    axios.get('http://127.0.0.1:8000/api/pizza-sizes').then(res => { this.pizzaSizes = res.data.pizzaSizes })
    axios.get('http://127.0.0.1:8000/api/employees').then(res => { this.employees = res.data.employees })
  }
}
</script>