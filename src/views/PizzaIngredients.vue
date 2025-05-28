<template>
    <div class="container">
        <h1 class="text-start">Listado Ingredientes de Pizza |
            <button @click="newPizzaIngredient()" class="btn btn-success mx-2">
                <font-awesome-icon icon="plus" />
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Pizza</th>
                    <th scope="col">Ingrediente</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(pizzaIngredient, index) in pizzaIngredients" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ pizzaIngredient.id }}</td>
                    <td>{{ pizzaIngredient.pizza_nombre }}</td>
                    <td>{{ pizzaIngredient.ingredient_nombre }}</td>
                    <td>
                        <button @click="deletePizzaIngredient(pizzaIngredient.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editPizzaIngredient(pizzaIngredient.id)" class="btn btn-warning mx-2">
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
    name: 'PizzaIngredient',
    data() {
        return {
            pizzaIngredients: []
        };
    },
    methods: {
        deletePizzaIngredient(id) {
            Swal.fire({
                title: `¿Quieres eliminar la relación de ingrediente de pizza con id ${id}?`,
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/pizza-ingredients/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire('¡Eliminado!', '', 'success');
                                this.pizzaIngredients = response.data.pizza_ingredients;
                            }
                        });
                }
            });
        },
        editPizzaIngredient(id) {
            this.$router.push({ name: 'EditarPizzaIngredient', params: { id: `${id}` } });
        },
        newPizzaIngredient() {
            this.$router.push({ name: 'NewPizzaIngredient' });
        }
    },
    mounted() {
        axios
            .get('http://127.0.0.1:8000/api/pizza-ingredients')
            .then(response => (this.pizzaIngredients = response.data.pizza_ingredients));
    },
};
</script>