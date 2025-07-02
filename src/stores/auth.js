// src/stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Tetapkan nilai user default karena tidak ada login autentikasi
    user: {
      id: 'guest',
      name: 'Pengunjung', // Default nama pengguna
      email: 'guest@example.com',
      role: 'guest', // Default role untuk pengunjung
      nim: 'NIM Tidak Ada', // Contoh biodata default
      major: 'Jurusan Umum', // Contoh biodata default
      birthDate: '0000-00-00',
      address: 'Alamat Tidak Diketahui',
      phone: '00000000000',
    },
    isAuthenticated: false, // Selalu false karena tidak ada proses login yang sebenarnya
    token: null, // Selalu null
    loading: false, // Tidak ada proses loading untuk login/register
    error: null, // Tidak ada error terkait login/register
  }),

  actions: {
    // Aksi login ini tidak akan melakukan apa-apa atau hanya memberi log
    login(credentials) {
      console.log('Login dinonaktifkan. Menggunakan profil pengunjung.');
      this.error = 'Fitur login dinonaktifkan.';
      // Optionally, you might want to put the hardcoded guest user data here
      // if you want 'login' to trigger a 'guest user session' visually.
      // But for a truly disabled login, it simply fails/does nothing.
      return false;
    },
    
    // Aksi register ini juga tidak akan melakukan apa-apa
    register(userData) {
      console.log('Pendaftaran dinonaktifkan.');
      this.error = 'Fitur pendaftaran dinonaktifkan.';
      return false;
    },

    // Aksi logout akan mereset state ke profil guest default
    logout() {
      console.log('Logout dilakukan (reset ke profil pengunjung).');
      this.user = { 
        id: 'guest', 
        name: 'Pengunjung', 
        email: 'guest@example.com', 
        role: 'guest',
        nim: 'NIM Tidak Ada',
        major: 'Jurusan Umum',
        birthDate: '0000-00-00',
        address: 'Alamat Tidak Diketahui',
        phone: '00000000000',
      };
      this.isAuthenticated = false;
      this.token = null;
      this.error = null;
      // Hapus data autentikasi dari localStorage jika sebelumnya ada
      localStorage.removeItem('userToken');
      localStorage.removeItem('currentUser');
    },

    // Aksi ini tidak akan memuat user dari token karena tidak ada login
    loadUserFromToken() {
      console.log('Tidak ada pengguna yang dimuat secara otomatis, fitur login dinonaktifkan.');
      // Memastikan state sesuai dengan profil guest
      this.user = { 
        id: 'guest', 
        name: 'Pengunjung', 
        email: 'guest@example.com', 
        role: 'guest',
        nim: 'NIM Tidak Ada',
        major: 'Jurusan Umum',
        birthDate: '0000-00-00',
        address: 'Alamat Tidak Diketahui',
        phone: '00000000000',
      };
      this.isAuthenticated = false;
    },

    // Aksi tambahan untuk menghapus pesan error secara manual
    clearError() {
      this.error = null;
    },
    // Jika Anda punya validasi token di tempat lain, ini akan selalu gagal
    validateToken() {
      return false;
    }
  },

  getters: {
    getUserFullName: (state) => state.user ? state.user.name : 'Pengunjung',
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    userRole: (state) => state.user ? state.user.role : null,
    userEmail: (state) => state.user ? state.user.email : null,
  },
});