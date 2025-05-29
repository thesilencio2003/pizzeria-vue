<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">
      Listado de Tamaños de Pizza |
      <button @click="newPizzaSize" class="btn btn-success btn-sm mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table table-bordered table-hover">
      <thead class="table-light text-center">
        <tr>
          <th>ID</th>
          <th>Pizza</th>
          <th>Tamaño</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="size in pizzaSizes" :key="size.id">
          <td>{{ size.id }}</td>
          <td>{{ size.pizza_name }}</td>
          <td>{{ capitalize(size.size) }}</td>
          <td>{{ formatPrice(size.price) }}</td>
          <td>
            <button @click="editPizzaSize(size.id)" class="btn btn-info btn-sm mx-1">Editar</button>
            <button @click="deletePizzaSize(size.id)" class="btn btn-danger btn-sm mx-1">Eliminar</button>
          </td>
        </tr>
        <tr v-if="pizzaSizes.length === 0">
          <td colspan="5">No hay registros de tamaños de pizza.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'PizzaSize',
  data() {
    return {
      pizzaSizes: []
    }
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
      }).format(value || 0)
    },
    capitalize(str) {
      return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
    },
    newPizzaSize() {
      this.$router.push({ name: 'NewPizzaSize' })
    },
    editPizzaSize(id) {
      this.$router.push({ name: 'EditarPizzaSize', params: { id } })
    },
    deletePizzaSize(id) {
      Swal.fire({
        title: `¿Seguro que deseas eliminar el tamaño de pizza con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/pizza_sizes/${id}`)
            .then(res => {
              if (res.data.success) {
                this.loadPizzaSizes()
                Swal.fire('Eliminado correctamente', '', 'success')
              }
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar', 'error')
            })
        }
      })
    },
    loadPizzaSizes() {
      axios.get('http://127.0.0.1:8000/api/pizza_sizes')
        .then(response => {
          this.pizzaSizes = response.data.pizza_sizes ?? []
        })
        .catch(error => {
          console.error('Error al cargar los tamaños de pizza:', error)
        })
    }
  },
  mounted() {
    this.loadPizzaSizes()
  }
}
</script>

<style scoped>
.container {
  max-width: 90%;
}
</style>