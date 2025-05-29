<template>
    <div class="container">
        <h1 class="text-start">Listado Ingredientes |
            <button @click="newIngredient()" class="btn btn-success mx-2">
                <font-awesome-icon icon="plus" />
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(ingredient, index) in ingredients" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ ingredient.id }}</td>
                    <td>{{ ingredient.name }}</td>
                    <td>
                        <button @click="deleteIngredient(ingredient.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editIngredient(ingredient.id)" class="btn btn-warning mx-2">
                            <font-awesome-icon icon="pencil" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'Ingredient',
    data() {
        return {
            ingredients: []
        };
    },
    methods: {
        deleteIngredient(id) {
            Swal.fire({
                title: `¿Quieres eliminar el ingrediente con id ${id}?`,
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/ingredients/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire('¡Eliminado!', '', 'success');
                                this.ingredients = response.data.ingredients;
                            }
                        });
                }
            });
        },
        editIngredient(id) {
            this.$router.push({ name: 'EditarIngredient', params: { id: `${id}` } });
        },
        newIngredient() {
            this.$router.push({ name: 'NewIngredient' });
        }
    },
    mounted() {
        axios
            .get('http://127.0.0.1:8000/api/ingredients')
            .then(response => (this.ingredients = response.data.ingredients));
    },
};
</script>