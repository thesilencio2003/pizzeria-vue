<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Crear Tamaño de Pizza</h1>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="createPizzaSize">
          <div class="mb-3">
            <label class="form-label">ID</label>
            <input type="text" class="form-control" disabled placeholder="Se genera automáticamente">
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

          <button type="submit" class="btn btn-primary">Guardar Tamaño de Pizza</button>
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
  name: 'NewPizzaSize',
  data() {
    return {
      pizzaSize: {
        pizza_id: '',
        size: '',
        price: ''
      },
      pizzas: []
    }
  },
  methods: {
    async loadPizzas() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/pizza_size/create')
        this.pizzas = res.data.pizzas
      } catch (err) {
        Swal.fire('Error', 'No se pudieron cargar las pizzas.', 'error')
      }
    },
    async createPizzaSize() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/pizza_size', this.pizzaSize)
        if (res.status === 200 || res.data.success) {
          Swal.fire('Guardado', 'Tamaño de pizza creado correctamente.', 'success')
          this.$router.push({ name: 'PizzaSize' })
        }
      } catch (err) {
        Swal.fire('Error', 'No se pudo guardar el registro.', 'error')
      }
    },
    cancel() {
      this.$router.push({ name: 'PizzaSize' })
    }
  },
  mounted() {
    this.loadPizzas()
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>