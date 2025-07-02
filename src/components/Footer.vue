<template>
  <footer class="main-footer">
    <div class="container">
      <p>&copy; {{ currentYear }} UKM UIR. Hak Cipta Dilindungi.</p>
      <p>Dibuat Oleh Sahrul Efendi (NPM: 233510312)</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.main-footer {
  background-color: var(--footer-bg); /* Menggunakan variabel warna */
  color: white;
  text-align: center;
  padding: var(--spacing-unit) 0; /* Menggunakan variabel spasi */
  margin-top: auto; /* Penting: Membuat footer menempel di bawah */
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.1); /* Bayangan di atas footer */
}

.main-footer p {
  margin: 5px 0;
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.8); /* Teks sedikit transparan */
}
</style>