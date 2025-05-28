<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Pedido</h1>
    <div class="card">
      <div class="card-header fw-bold">Formulario de Pedido</div>
      <div class="card-body">
        <form @submit.prevent="updateOrder">

          <div class="mb-3">
            <label for="client_id" class="form-label">Cliente</label>
            <select v-model="order.client_id" id="client_id" class="form-select" required>
              <option disabled value="">Seleccionar Cliente</option>
              <option v-for="client in clients" :key="client.id" :value="client.id">
                {{ client.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="branch_id" class="form-label">Sucursal</label>
            <select v-model="order.branch_id" id="branch_id" class="form-select" required>
              <option disabled value="">Seleccionar Sucursal</option>
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                {{ branch.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="total_price" class="form-label">Precio Total</label>
            <input type="number" step="0.01" v-model="order.total_price" id="total_price" class="form-control" required>
          </div>

          <div class="mb-3">
            <label for="status" class="form-label">Estado</label>
            <select v-model="order.status" id="status" class="form-select" required>
              <option value="pendiente">Pendiente</option>
              <option value="en_preparacion">En preparación</option>
              <option value="listo">Listo</option>
              <option value="entregado">Entregado</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="delivery_type" class="form-label">Tipo de Entrega</label>
            <select v-model="order.delivery_type" id="delivery_type" class="form-select" required>
              <option value="en_local">En local</option>
              <option value="a_domicilio">A domicilio</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="delivery_person_id" class="form-label">Repartidor</label>
            <select v-model="order.delivery_person_id" id="delivery_person_id" class="form-select">
              <option value="">No asignado</option>
              <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                {{ employee.name }}
              </option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">Actualizar Pedido</button>
          <button type="button" class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'EditarOrder',
  data() {
    return {
      order: {
        id: this.$route.params.id,
        client_id: '',
        branch_id: '',
        total_price: '',
        status: '',
        delivery_type: '',
        delivery_person_id: ''
      },
      clients: [],
      branches: [],
      employees: []
    }
  },
  methods: {
    cancelar() {
      this.$router.push({ name: 'Orders' });
    },
    async updateOrder() {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/orders/${this.order.id}`, this.order);
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Pedido actualizado correctamente',
            toast: true,
            position: 'top-end',
            timer: 2000,
            showConfirmButton: false
          });
          this.$router.push({ name: 'Orders' });
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo actualizar el pedido.', 'error');
      }
    },
    async fetchData() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/orders/${id}`);
        this.order = response.data.order;
        this.clients = response.data.clients;
        this.branches = response.data.branches;
        this.employees = response.data.employees;
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>