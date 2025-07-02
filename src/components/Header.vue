<template>
  <header class="main-header">
    <div class="container header-content">
      <h1>Web UKM UIR</h1>

      <div class="nav-and-auth">
        <nav>
          <ul>
            <li><router-link to="/">Beranda</router-link></li>
            <li><router-link to="/ukm">Daftar UKM</router-link></li>
            <li><router-link to="/achievements">Prestasi</router-link></li>
            <li><router-link to="/about">Tentang Kami</router-link></li>
            <li><router-link to="/profile">Profil</router-link></li>
          </ul>
        </nav>

        </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth'; // Impor store autentikasi

const authStore = useAuthStore(); // Gunakan store autentikasi
const router = useRouter();

</script>

<style scoped>
.main-header {
  background-color: #3e8e41; /* Warna hijau gelap */
  color: white;
  padding: 15px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.header-content {
  display: flex;
  justify-content: space-between; /* Menjaga judul dan nav/auth terpisah */
  align-items: center;
  flex-wrap: wrap; /* Agar responsif */
  max-width: 1200px; /* Gunakan container width */
  margin: 0 auto;
  padding: 0 20px; /* Padding horizontal */
}

.main-header h1 {
  margin: 0;
  font-size: 1.8em;
  color: white;
}

/* Container baru untuk navigasi dan kontrol auth */
.nav-and-auth {
  display: flex;
  align-items: center;
  gap: 30px; /* Jarak antara navigasi dan kontrol auth */
  flex-wrap: wrap; /* Untuk responsif */
  justify-content: flex-end; /* Dorong ke kanan di desktop */
}

.main-header nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Untuk mobile, bisa diubah */
}

.main-header nav li {
  margin-left: 25px; /* Jarak antar item navigasi */
}

.main-header nav a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.main-header nav a:hover,
.main-header nav a.router-link-active {
  text-decoration: underline;
  color: #d4fcd4; /* Warna terang saat hover/aktif */
}

/* Gaya untuk tombol Login/Logout */
.auth-controls {
  display: flex;
  align-items: center;
  gap: 15px; /* Jarak antara teks "Halo" dan tombol Logout */
}

.btn-header-login {
  background-color: #5cb85c; /* Warna hijau yang berbeda */
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
}

.btn-header-login:hover {
  background-color: #4cae4c;
}

.user-info-header {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 0.9em;
  font-weight: 500;
}

.btn-header-logout {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8em;
  transition: all 0.3s ease;
}

.btn-header-logout:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: white;
  color: white;
}


/* Responsif */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .nav-and-auth {
    flex-direction: column; /* Ubah ke kolom */
    width: 100%; /* Penuh lebar */
    gap: 15px; /* Kurangi jarak */
    margin-top: 15px;
  }

  .main-header nav ul {
    flex-direction: column; /* Tautan navigasi vertikal */
    width: 100%;
    margin-bottom: 10px;
  }

  .main-header nav li {
    margin: 8px 0; /* Jarak vertikal antar tautan */
    width: 100%;
  }
  .main-header nav a {
    display: block; /* Agar tautan mengambil seluruh lebar item */
    padding: 5px 0;
  }

  .auth-controls {
    flex-direction: column; /* Tombol/info auth juga vertikal */
    width: 100%;
    gap: 10px;
  }
}
</style>