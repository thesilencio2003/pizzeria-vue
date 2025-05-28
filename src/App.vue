<template>
  <div id="app">
    <nav>
      <router-link to="/branches">Ver Sucursales</router-link>
      <router-link to="/pizza-raw-materials">Ver Materias Primas</router-link>
    </nav>
    <router-view></router-view>
  </div>
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
