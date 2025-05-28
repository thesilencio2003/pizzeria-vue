<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo Ingrediente Extra</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Ingrediente Extra
            </div>
            <div class="card-body">
                <form @submit.prevent="saveExtraIngredient">
                    <div class="row mb-3">
                        <label for="name" class="form-label">Nombre :</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="burger" /></div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre ingrediente extra"
                                v-model="extraIngredient.name">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="price" class="form-label">Precio :</label>
                        <div class="input-group">
                            <div class="input-group-text">$</div>
                            <input type="number" step="0.01" class="form-control" id="price" placeholder="Precio"
                                v-model.number="extraIngredient.price">
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Guardar</button>
                    <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'NewExtraIngredient',
    data() {
        return {
            extraIngredient: {
                name: '',
                price: 0
            }
        };
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'ExtraIngredients' });
        },
        async saveExtraIngredient() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/extra-ingredients', this.extraIngredient);
                if (res.status === 200) {
                    this.$router.push({ name: 'ExtraIngredients' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Ingrediente extra guardado correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error("Error al guardar el ingrediente extra:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al guardar el ingrediente extra. Revisa la consola para más detalles.'
                });
            }
        }
    }
};
</script>