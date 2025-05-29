<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Tamaño de Pizza</h1>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="updatePizzaSize">
          <div class="mb-3">
            <label class="form-label">ID</label>
            <input type="text" class="form-control" :value="pizzaSize.id" disabled>
          </div>

          <div class="mb-3">
            <label class="form-label">Pizza</label>
            <select class="form-select" v-model="pizzaSize.pizza_id" required>
              <option value="" disabled>Seleccionar Pizza...</option>
              <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">
                {{ pizza.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Tamaño</label>
            <select class="form-select" v-model="pizzaSize.size" required>
              <option value="" disabled>Seleccionar Tamaño...</option>
              <option value="pequeña">Pequeña</option>
              <option value="mediana">Mediana</option>
              <option value="grande">Grande</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Precio</label>
            <input type="number" step="0.01" class="form-control" v-model.number="pizzaSize.price" required>
          </div>

          <button type="submit" class="btn btn-primary">Actualizar Tamaño de Pizza</button>
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
  name: 'EditarPizzaSize',
  data() {
    return {
      pizzaSize: {
        id: null,
        pizza_id: '',
        size: '',
        price: ''
      },
      pizzas: []
    }
  },
  methods: {
    async loadData() {
      try {
        const id = this.$route.params.id
        const res = await axios.get(`http://127.0.0.1:8000/api/pizza_size/${id}`)
        this.pizzaSize = res.data.pizza_size
        this.pizzas = res.data.pizzas
      } catch (err) {
        Swal.fire('Error', 'No se pudo cargar el registro.', 'error')
      }
    },
    async updatePizzaSize() {
      try {
        const res = await axios.put(`http://127.0.0.1:8000/api/pizza_size/${this.pizzaSize.id}`, this.pizzaSize)
        if (res.status === 200 || res.data.success) {
          Swal.fire('Actualizado', 'Tamaño de pizza actualizado correctamente.', 'success')
          this.$router.push({ name: 'PizzaSize' })
        }
      } catch (err) {
        Swal.fire('Error', 'No se pudo actualizar el registro.', 'error')
      }
    },
    cancel() {
      this.$router.push({ name: 'PizzaSize' })
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