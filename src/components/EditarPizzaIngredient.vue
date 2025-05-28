<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Ingrediente de Pizza</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Editar Asignación
            </div>
            <div class="card-body">
                <form @submit.prevent="updatePizzaIngredient">
                    <div class="row mb-3">
                        <label for="id" class="form-label">ID:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <input type="text" class="form-control" id="id" placeholder="ID de la asignación" disabled
                                v-model="pizzaIngredient.id">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="pizza" class="form-label">Pizza:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="pizza-slice" /></div>
                            <select class="form-select" id="pizza" v-model="pizzaIngredient.pizza_id">
                                <option value="" disabled>Selecciona una pizza</option>
                                <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">{{ pizza.name }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="ingredient" class="form-label">Ingrediente:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="flask" /></div>
                            <select class="form-select" id="ingredient" v-model="pizzaIngredient.ingredient_id">
                                <option value="" disabled>Selecciona un ingrediente</option>
                                <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient.id">{{ ingredient.name }}</option>
                            </select>
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
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'EditarPizzaIngredient',
    data() {
        return {
            pizzaIngredient: {
                id: '',
                pizza_id: '',
                ingredient_id: ''
            },
            pizzas: [],
            ingredients: []
        };
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'PizzaIngredients' }); 
        },
        async updatePizzaIngredient() {
            try {
                const res = await axios.put(`http://127.0.0.1:8000/api/pizza-ingredients/${this.pizzaIngredient.id}`, this.pizzaIngredient);

                if (res.status === 200) {
                    this.$router.push({ name: 'PizzaIngredients' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Asignación actualizada correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error("Error al actualizar la relación pizza-ingrediente:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al actualizar la asignación. Revisa la consola para más detalles.'
                });
            }
        },
        async fetchPizzaIngredientData() {
            try {
                const [pizzaIngredientRes, pizzasRes, ingredientsRes] = await Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/pizza-ingredients/${this.$route.params.id}`),
                    axios.get('http://127.0.0.1:8000/api/pizzas'),
                    axios.get('http://127.0.0.1:8000/api/ingredients')
                ]);

                this.pizzaIngredient = pizzaIngredientRes.data.pizza_ingredient;
                this.pizzas = pizzasRes.data.pizzas;
                this.ingredients = ingredientsRes.data.ingredients;

            } catch (error) {
                console.error("Error al cargar los datos:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error de carga',
                    text: 'No se pudieron cargar los datos de la asignación, pizzas o ingredientes. Intenta de nuevo.'
                });
                this.$router.push({ name: 'PizzaIngredients' }); 
            }
        }
    },
    mounted() {
        this.fetchPizzaIngredientData(); 
    }
};
</script>