<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Ingredient
            </div>
            <div class="card-body">
                <form @submit.prevent="updateIngredient">
                    <div class="row mb-3">
                        <label for="id" class="form-label">ID:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <input type="text" class="form-control" id="id" placeholder="ID ingrediente" disabled
                                v-model="ingredient.id">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="name" class="form-label">Nombre :</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="flask" />
                            </div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre ingrediente"
                                v-model="ingredient.name">
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Actualizar</button>
                    <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'EditarIngredient',
    data() {
        return {
            ingredient: {
                id: 0,
                name: ''
            }
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Ingredients' })
        },
        async updateIngredient() {
            const res = await axios.put(`http://127.0.0.1:8000/api/ingredients/${this.ingredient.id}`, this.ingredient)

            if (res.status === 200) {
                this.$router.push({ name: 'Ingredients' })
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Ingredient has been updated',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    },
    mounted() {
        this.ingredient.id = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/ingredients/${this.ingredient.id}`)
            .then(response => {
                this.ingredient = response.data.ingredient;
            })
    }
}
</script>