<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Agregar Ingrediente a Pizza</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Asignar Ingrediente
            </div>
            <div class="card-body">
                <form @submit.prevent="savePizzaIngredient">
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
    name: 'NewPizzaIngredient',
    data() {
        return {
            pizzaIngredient: {
                pizza_id: '', 
                ingredient_id: '' 
            },
            pizzas: [], 
            ingredients: [] 
        };
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'PizzaIngredients' }); 
        },
        async savePizzaIngredient() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/pizza-ingredients', this.pizzaIngredient);
                
                if (res.status === 200) {
                    this.$router.push({ name: 'PizzaIngredients' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Ingrediente asignado a la pizza correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error("Error al guardar la relación pizza-ingrediente:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al asignar el ingrediente. Revisa la consola para más detalles.'
                });
            }
        },
        async fetchRelatedData() {
            try {
                const [pizzasRes, ingredientsRes] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/pizzas'),
                    axios.get('http://127.0.0.1:8000/api/ingredients')
                ]);
                this.pizzas = pizzasRes.data.pizzas;
                this.ingredients = ingredientsRes.data.ingredients;
            } catch (error) {
                console.error("Error al cargar pizzas o ingredientes:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error de carga',
                    text: 'No se pudieron cargar las pizzas o los ingredientes. Intenta de nuevo.'
                });
            }
        }
    },
    mounted() {
        this.fetchRelatedData(); 
    }
};
</script>