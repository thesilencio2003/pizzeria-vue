<template>
  <div>
    <h2 style="text-align:center;">🛒 Lista de Compras</h2>
    <div v-if="purchases.length === 0" class="empty">No hay compras registradas.</div>

    <div v-else class="purchases-container">
      <div
        v-for="purchase in purchases"
        :key="purchase.id"
        class="purchase-card"
        :style="getCardStyle(purchase)"
      >
        <h3>{{ purchase.product_name }}</h3>
        <p>Cantidad: {{ purchase.quantity }}</p>
        <small>Fecha: {{ formatDate(purchase.purchase_date) }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PurchasesList',
  data() {
    return {
      purchases: []
    };
  },
  methods: {
    async fetchPurchases() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/purchases');
        this.purchases = response.data;
      } catch (error) {
        console.error('Error al obtener compras:', error);
      }
    },
    getCardStyle(purchase) {
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
      if (!dateStr) return 'Fecha no disponible';
      const date = new Date(dateStr);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
  mounted() {
    this.fetchPurchases();
  }
};
</script>

<style scoped>
.purchases-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.purchase-card:hover {
  transform: scale(1.03);
}
.empty {
  text-align: center;
  font-style: italic;
  color: #555;
}
</style>
