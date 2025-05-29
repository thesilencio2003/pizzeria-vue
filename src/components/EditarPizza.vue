<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Pizza
            </div>
            <div class="card-body">
                <form @submit.prevent="updatePizza">
                    <div class="row mb-3">
                        <label for="id" class="form-label">ID:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <input type="text" class="form-control" id="id" placeholder="ID pizza" disabled
                                v-model="pizza.id">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="name" class="form-label">Nombre :</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="pizza-slice" />
                            </div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre pizza"
                                v-model="pizza.name">
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
    name: 'EditarPizza',
    data() {
        return {
            pizza: {
                id: 0,
                name: ''
            }
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Pizzas' })
        },
        async updatePizza() {
            const res = await axios.put(`http://127.0.0.1:8000/api/pizzas/${this.pizza.id}`, this.pizza)

            if (res.status === 200) {
                this.$router.push({ name: 'Pizzas' })
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Pizza has been updated',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    },
    mounted() {
        this.pizza.id = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/pizzas/${this.pizza.id}`)
            .then(response => {
                this.pizza = response.data.pizza;
            })
    }
}
</script>
