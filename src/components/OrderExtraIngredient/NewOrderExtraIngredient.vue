<template>
  <div class="container mt-4">
    <h2 class="text-primary mb-4">Agregar Ingrediente Extra a Pedido</h2>
    <form @submit.prevent="storeExtraIngredient">
      <div class="mb-3">
        <label for="order_id" class="form-label">Pedido</label>
        <select v-model="form.order_id" class="form-select" required>
          <option disabled value="">Seleccione un pedido</option>
          <option v-for="order in orders" :key="order.id" :value="order.id">
            #{{ order.id }} - Cliente: {{ order.client_name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="extra_ingredient_id" class="form-label">Ingrediente Extra</label>
        <select v-model="form.extra_ingredient_id" class="form-select" required>
          <option disabled value="">Seleccione un ingrediente</option>
          <option v-for="ingredient in extraIngredients" :key="ingredient.id" :value="ingredient.id">
            {{ ingredient.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="quantity" class="form-label">Cantidad</label>
        <input type="number" v-model="form.quantity" class="form-control" min="1" required>
      </div>

      <button type="submit" class="btn btn-primary">Agregar</button>
      <router-link to="/order_extra_ingredient" class="btn btn-secondary ms-2">Volver</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NewOrderExtraIngredient',
  data() {
    return {
      orders: [],
      extraIngredients: [],
      form: {
        order_id: '',
        extra_ingredient_id: '',
        quantity: 1
      }
    }
  },
  methods: {
    storeExtraIngredient() {
      axios.post('http://127.0.0.1:8000/api/order_extra_ingredient', this.form)
        .then(() => {
          this.$router.push({ name: 'OrderExtraIngredient' })
        })
        .catch(error => {
          console.error('Error al guardar:', error)
        })
    },
    loadData() {
      axios.get('http://127.0.0.1:8000/api/order_extra_ingredient/create')
        .then(response => {
          this.orders = response.data.orders
          this.extraIngredients = response.data.extra_ingredients
        })
        .catch(error => {
          console.error('Error al cargar datos:', error)
        })
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>