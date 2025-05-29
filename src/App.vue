<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>|
    <router-link to="/users">users</router-link>|
    <router-link to="/pizzas">Pizzas</router-link>|
    <router-link to="/ingredients">ingredients</router-link>|
    <router-link to="/pizzaingredients">PizzaIngredient</router-link>|
    <router-link to="/extra-ingredients">ExtraIngredient</router-link>|
    <router-link to="/clients">Clients</router-link>|
    <router-link to="/employees">Employees</router-link>|
    <router-link to="/branches">Ver Sucursales</router-link>|
    <router-link to="/pizza-raw-materials">Ver Materias Primas</router-link> |
    <router-link to="/orders">Order</router-link> |
    <router-link to="/order_pizza">Order Pizza</router-link> |
    <router-link to="/pizza_sizes">Pizza Size</router-link> 
  </nav>
  <router-view/>
</template>

<style>
nav {
  background: #df0000;
  padding: 10px;
}
a {
  color: white;
  margin-right: 10px;
  text-decoration: none;
}
</style>
