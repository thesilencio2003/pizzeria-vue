<template>
  <div>
    <h2 style="text-align:center;">🌾 Lista de Materias Primas Base</h2>
    <div v-if="materials.length === 0" class="empty">No hay materias primas base registradas.</div>

    <div v-else class="materials-container">
      <div
        v-for="material in materials"
        :key="material.id"
        class="material-card"
        :style="getCardStyle()"
      >
        <h3>{{ material.name }}</h3>
        <p>Disponible: {{ material.quantity }}</p>

        <label>Seleccionar cantidad:</label>
        <input
          type="number"
          min="0"
          :max="material.quantity"
          v-model.number="selectedQuantities[material.id]"
        />

        <button @click="addToOrder(material)">Agregar a orden</button>

        <p v-if="selectedQuantities[material.id] > 0">
          Cantidad seleccionada: {{ selectedQuantities[material.id] }}
        </p>
      </div>
    </div>

    <!-- Vista de la orden actual -->
    <div v-if="order.length > 0" class="order-summary">
      <h3>📝 Orden actual:</h3>
      <ul>
        <li v-for="item in order" :key="item.id">
          {{ item.name }} - Cantidad: {{ item.quantity }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RawMaterialsList',
  data() {
    return {
      materials: [],
      selectedQuantities: {},
      order: []
    };
  },
  methods: {
    async fetchMaterials() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/raw-materials');
        this.materials = response.data;
        this.materials.forEach(material => {
          this.selectedQuantities[material.id] = 0;
        });
      } catch (error) {
        console.error('Error al obtener materias primas base:', error);
      }
    },
    addToOrder(material) {
      const quantity = this.selectedQuantities[material.id];
      if (quantity > 0) {
        const existingIndex = this.order.findIndex(item => item.id === material.id);
        if (existingIndex !== -1) {
          // Si ya está en la orden, actualiza la cantidad
          this.order[existingIndex].quantity = quantity;
        } else {
          // Si no está, lo agrega
          this.order.push({
            id: material.id,
            name: material.name,
            quantity
          });
        }
        // Guarda en localStorage por si quieres persistir
        localStorage.setItem('orden', JSON.stringify(this.order));
      }
    },
    getCardStyle() {
      return {
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer'
      };
    }
  },
  mounted() {
    this.fetchMaterials();
    // Recupera orden previa si existe
    const storedOrder = localStorage.getItem('orden');
    if (storedOrder) {
      this.order = JSON.parse(storedOrder);
    }
  }
};
</script>

<style scoped>
.materials-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.material-card:hover {
  transform: scale(1.03);
}
input[type="number"] {
  width: 100%;
  padding: 5px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
button {
  margin-top: 8px;
  padding: 6px 10px;
  background-color: #50d449;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: #50d449(120 12% 31%);
}
.order-summary {
  background: #f0f0f0;
  padding: 15px;
  border-radius: 10px;
  max-width: 600px;
  margin: 20px auto;
}
.empty {
  text-align: center;
  font-style: italic;
  color: #ffffff;
}
</style>
