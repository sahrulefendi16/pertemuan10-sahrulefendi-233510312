<script>
export default {
  name: 'Home'
}
</script>

<template>
  <div class="container welcome">
    <h1>Selamat Datang di Sistem Informasi UKM UIR</h1>
    <router-link to="/ukm" class="btn-link">Lihat Daftar UKM</router-link>
  </div>
</template>


<style scoped>
.welcome {
  text-align: center;
  padding: 40px;
  background: #fff;
  margin: 50px auto;
  width: 80%;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 120px;
  margin-bottom: 20px;
}

h1 {
  color: #0b703f;
  font-size: 28px;
  margin-bottom: 20px;
}

.btn-link {
  display: inline-block;
  margin-top: 20px;
  background-color: #0b703f;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: background 0.3s;
}

.btn-link:hover {
  background-color: #095d34;
}
</style>
