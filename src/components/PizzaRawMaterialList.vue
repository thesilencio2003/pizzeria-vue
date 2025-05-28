<template>
  <div>
    <h2 style="text-align:center;">🍕 Lista de Materias Primas para Pizza</h2>
    <div v-if="materials.length === 0" class="empty">No hay materias primas registradas.</div>

    <div v-else class="materials-container">
      <div
        v-for="material in materials"
        :key="material.id"
        class="material-card"
        :style="getCardStyle()"
      >
        <h3>{{ material.name }}</h3>
        <p>Cantidad: {{ material.quantity }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PizzaRawMaterialList',
  data() {
    return {
      materials: []
    };
  },
  methods: {
    async fetchMaterials() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pizza-raw-materials');
        this.materials = response.data;
      } catch (error) {
        console.error('Error al obtener materias primas:', error);
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
.empty {
  text-align: center;
  font-style: italic;
  color: #ffffff;
}
</style>
