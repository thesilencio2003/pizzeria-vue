<template>
  <div>
    <h2 style="text-align:center;">📦 Lista de Proveedores</h2>

    <div v-if="suppliers.length === 0" class="empty">
      No hay proveedores registrados.
    </div>

    <div v-else class="suppliers-container">
      <div
        v-for="supplier in suppliers"
        :key="supplier.id"
        class="supplier-card"
      >
        <h3>{{ supplier.name }}</h3>
        <p><strong>Contacto:</strong> {{ supplier.contact_info }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SuppliersList',
  data() {
    return {
      suppliers: []
    };
  },
  methods: {
    async fetchSuppliers() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/suppliers');
        this.suppliers = response.data;
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
      }
    }
  },
  mounted() {
    this.fetchSuppliers();
  }
};
</script>

<style scoped>
.suppliers-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.supplier-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}
.supplier-card:hover {
  transform: scale(1.03);
}
.empty {
  text-align: center;
  font-style: italic;
  color: #555;
}
</style>
