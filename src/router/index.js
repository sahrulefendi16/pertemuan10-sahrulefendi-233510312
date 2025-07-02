// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
// Hapus import { useAuthStore } } dari './stores/auth';
// Hapus import 'router' dari api.js jika ada import router di sana

// Import semua view
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import UserProfileView from '../views/UserProfileView.vue';
import UKMListView from '../views/UKMListView.vue';
import UKMDetailView from '../views/UKMDetailView.vue';
import UKMRegistrationView from '../views/UKMRegistrationView.vue';
import AchievementsView from '../views/AchievementsView.vue';
// Hapus import LoginView dan RegisterView
// import LoginView from '../views/LoginView.vue'; 
// import RegisterView from '../views/RegisterView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  // Rute profil tetap ada, tapi tidak lagi dilindungi login
  { path: '/profile', name: 'profile', component: UserProfileView },
  { path: '/ukm', name: 'ukm-list', component: UKMListView },
  // Rute pendaftaran UKM, bisa tetap dilindungi 'admin' jika diperlukan
  { path: '/ukm/register', name: 'ukm-register', component: UKMRegistrationView, meta: { requiresAdmin: true } }, 
  { path: '/ukm/:id', name: 'ukm-detail', component: UKMDetailView, props: true },
  { path: '/achievements', name: 'achievements', component: AchievementsView },
  // Hapus rute login dan register
  // { path: '/login', name: 'login', component: LoginView, meta: { requiresGuest: true } },
  // { path: '/register', name: 'register', component: RegisterView, meta: { requiresGuest: true } },

  // Catch-all route untuk mengarahkan ke beranda jika rute tidak ditemukan
  { path: '/:catchAll(.*)', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// --- Sederhanakan/Hapus Navigation Guard Global ---
// Jika Anda tidak ingin ada perlindungan sama sekali, hapus blok router.beforeEach ini.
// Jika Anda hanya ingin melindungi rute admin (misal '/ukm/register') tanpa login, 
// Anda harus menambahkan logika peran ke "data dummy admin" di store atau cara lain.
// Untuk saat ini, kita akan asumsikan hanya ada 'admin' jika Anda mengaturnya di store (lihat di bawah).
router.beforeEach(async (to, from, next) => {
  // Karena tidak ada login, useAuthStore() akan mengembalikan state default.
  // Anda harus memutuskan bagaimana 'role' admin akan ditentukan tanpa login.
  // Misalnya, Anda bisa memiliki variabel global atau setter di store.
  // Contoh DUMMY peran admin tanpa login:
  const isAdmin = true; // Ganti ini dengan logika Anda sendiri, misal dari config atau query param

  if (to.meta.requiresAdmin && !isAdmin) {
    alert('Hanya admin yang bisa mengakses halaman ini.');
    next('/'); // Arahkan ke beranda jika bukan admin
  } else {
    next(); // Lanjutkan ke rute yang dituju
  }
});


export default router;