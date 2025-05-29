<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/orders">Order</router-link> |
    <router-link to="/order_pizza">Order Pizza</router-link> |
    <router-link to="/pizza_sizes">Pizza Size</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
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
