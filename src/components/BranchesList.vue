<template>
  <div>
    <h2 style="text-align:center;">📍 Lista de Sucursales</h2>
    <div v-if="branches.length === 0" class="empty">No hay sucursales registradas.</div>

    <div v-else class="branches-container">
      <div
        v-for="branch in branches"
        :key="branch.id"
        class="branch-card"
        :style="getCardStyle(branch)"
      >
        <h3>{{ branch.name }}</h3>
        <p>{{ branch.address }}</p>
        <small>{{ formatDate(branch.created_at) }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BranchesList',
  data() {
    return {
      branches: []
    };
  },
  methods: {
    async fetchBranches() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/branches');
        this.branches = response.data;
      } catch (error) {
        console.error('Error al obtener sucursales:', error);
      }
    },
    getCardStyle(branch) {
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
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
  mounted() {
    this.fetchBranches();
  }
};
</script>

<style scoped>
.branches-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.branch-card:hover {
  transform: scale(1.03);
}
.empty {
  text-align: center;
  font-style: italic;
  color: #ffffff;
}
</style>
