<template>
  <div class="container mt-4">
    <h2 class="text-primary">Ingredientes Extra por Pedido</h2>
    <div class="my-3">
      <router-link :to="{ name: 'NewOrderExtraIngredient' }" class="btn btn-success">
        Agregar
      </router-link>
    </div>

    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>

    <table class="table table-bordered table-hover">
      <thead class="table-light text-center">
        <tr>
          <th>ID</th>
          <th>Pedido</th>
          <th>Ingrediente Extra</th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>#{{ item.order_id }}</td>
          <td>{{ item.extra_ingredient_name }}</td>
          <td>{{ item.quantity }}</td>
          <td>
            <router-link :to="{ name: 'EditarOrderExtraIngredient', params: { id: item.id } }" class="btn btn-primary btn-sm me-1">
              Editar
            </router-link>
            <button @click="deleteItem(item.id)" class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
        <tr v-if="items.length === 0">
          <td colspan="5">No hay registros</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'OrderExtraIngredient',
  data() {
    return {
      items: [],
      successMessage: ''
    }
  },
  methods: {
    loadData() {
      axios.get('http://127.0.0.1:8000/api/order_extra_ingredient')
        .then(res => {
          this.items = res.data.order_extra_ingredients
        })
        .catch(() => {
          this.items = []
        })
    },
    deleteItem(id) {
      if (confirm(`¿Eliminar el registro con ID ${id}?`)) {
        axios.delete(`http://127.0.0.1:8000/api/order_extra_ingredient/${id}`)
          .then(() => {
            this.successMessage = 'Registro eliminado correctamente.'
            this.loadData()
          })
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
  max-width: 90%;
}
</style>