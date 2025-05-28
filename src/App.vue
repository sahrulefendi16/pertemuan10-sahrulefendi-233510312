<script>
export default {
  name: 'App'
}
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Beranda</router-link>
      <router-link to="/ukm">Daftar ukm</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
nav {
  background: #eee;
  padding: 10px;
}
nav a {
  margin-right: 10px;
}
</style>
