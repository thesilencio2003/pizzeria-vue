<template>
    <div class="container">
        <h1 class="text-start">Listado Ingredientes Extra |
            <button @click="newExtraIngredient()" class="btn btn-success mx-2">
                <font-awesome-icon icon="plus" />
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(extraIngredient, index) in extraIngredients" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ extraIngredient.id }}</td>
                    <td>{{ extraIngredient.name }}</td>
                    <td>${{ extraIngredient.price }}</td>
                    <td>
                        <button @click="deleteExtraIngredient(extraIngredient.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editExtraIngredient(extraIngredient.id)" class="btn btn-warning mx-2">
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
    name: 'ExtraIngredient',
    data() {
        return {
            extraIngredients: []
        };
    },
    methods: {
        deleteExtraIngredient(id) {
            Swal.fire({
                title: `¿Quieres eliminar el ingrediente extra con id ${id}?`,
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/extra-ingredients/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire('¡Eliminado!', '', 'success');
                                this.extraIngredients = response.data.extra_ingredients;
                            }
                        })
                        .catch(error => {
                            console.error("Error al eliminar el ingrediente extra:", error);
                            Swal.fire('Error', 'No se pudo eliminar el ingrediente extra.', 'error');
                        });
                }
            });
        },
        editExtraIngredient(id) {
            this.$router.push({ name: 'EditarExtraIngredient', params: { id: `${id}` } });
        },
        newExtraIngredient() {
            this.$router.push({ name: 'NewExtraIngredient' });
        }
    },
    mounted() {
        axios
            .get('http://127.0.0.1:8000/api/extra-ingredients')
            .then(response => (this.extraIngredients = response.data.extra_ingredients))
            .catch(error => {
                console.error("Error al cargar los ingredientes extra:", error);
                Swal.fire('Error', 'No se pudieron cargar los ingredientes extra.', 'error');
            });
    },
};
</script>