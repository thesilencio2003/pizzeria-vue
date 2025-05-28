<template>
    <div class="container">
        <h1 class="text-start">Listado de Usuarios |
            <button @click="newUser()" class="btn btn-success mx-2">
                <font-awesome-icon icon="plus" />
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th scope="col">Relación Empleado</th>
                    <th scope="col">Relación Cliente</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.employee_relation_id ? 'Sí' : 'No' }}</td>
                    <td>{{ user.client_relation_id ? 'Sí' : 'No' }}</td>
                    <td>
                        <button @click="deleteUser(user.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editUser(user.id)" class="btn btn-warning mx-2">
                            <font-awesome-icon icon="pencil" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'Clients',
    data() {
        return {
            users: []
        }
    },
    methods: {
        deleteUser(id) {
            Swal.fire({
                title: `¿Quieres eliminar el usuario con ID ${id}?`,
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire('¡Eliminado!', '', 'success')
                                this.users = response.data.users
                            }
                        })
                        .catch(error => {
                            console.error("Hubo un error al eliminar el usuario:", error);
                            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
                        });
                }
            })
        },
        editUser(id) {
            this.$router.push({ name: 'EditUser', params: { id: `${id}` } }) 
        },
        newUser() {
            this.$router.push({ name: 'NewUser' }); 
        }
    },
    mounted() {
        axios
            .get('http://127.0.0.1:8000/api/users')
            .then(response => (this.users = response.data.users))
            .catch(error => {
                console.error("Hubo un error al obtener los usuarios:", error);
            });
    },
}
</script>
