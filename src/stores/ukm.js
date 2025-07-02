// src/stores/ukm.js
import { defineStore } from 'pinia';
// Pastikan fetchUKMById juga diimpor dari api.js
import { fetchUKMs, createUKM, fetchUKMById } from '../services/api'; 

export const useUKMStore = defineStore('ukm', {
  state: () => ({
    ukms: [],
    loading: false,
    error: null,
    // --- TAMBAHKAN INI UNTUK MENYIMPAN DETAIL UKM YANG SEDANG DILIHAT ---
    currentUKM: null, 
  }),
  actions: {
    async loadUKMs() {
      this.loading = true;
      this.error = null;
      try {
        const data = await fetchUKMs();
        this.ukms = data;
      } catch (err) {
        this.error = 'Gagal memuat daftar UKM: ' + err.message;
        console.error('Error loading UKMs:', err);
      } finally {
        this.loading = false;
      }
    },

    // --- TAMBAHKAN ACTION INI UNTUK MEMUAT DETAIL UKM ---
    async loadUKMDetail(id) {
      this.loading = true;
      this.error = null;
      try {
        const data = await fetchUKMById(id); // Memanggil fungsi dari api.js
        this.currentUKM = data; // Simpan detail UKM yang diambil ke state `currentUKM`
      } catch (err) {
        // Jika error adalah Network Error (ERR_CONNECTION_REFUSED), berikan pesan spesifik
        if (err.message && err.message.includes('Network Error')) {
            this.error = 'Gagal terhubung ke server. Pastikan server backend berjalan.';
        } else {
            this.error = 'Gagal memuat detail UKM: ' + err.message;
        }
        console.error(`Error loading UKM with ID ${id}:`, err);
        throw err; // Penting: Lempar error agar komponen yang memanggil juga bisa menanganinya
      } finally {
        this.loading = false;
      }
    },
    // --- AKHIR PENAMBAHAN ACTION ---

    async submitUKMRegistration(registrationData) {
      this.loading = true;
      this.error = null;
      try {
        const newUKM = await createUKM(registrationData);
        
        // Debugging lines (bisa dihapus setelah yakin berfungsi)
        console.log('Inside submitUKMRegistration action:');
        console.log('   this:', this);
        console.log('   this.ukms before push:', this.ukms); 
        
        this.ukms.push(newUKM); // Ini baris yang menyebabkan error "push on undefined"
        // Catatan: Error "push on undefined" (jika masih muncul) kemungkinan besar karena `this.ukms` belum diinisialisasi sebagai array.
        // Namun, di `state` kamu sudah ada `ukms: []`, jadi seharusnya ini aman.

        return newUKM;
      } catch (err) {
        this.error = 'Gagal membuat UKM baru: ' + err.message;
        console.error('Error creating new UKM:', err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});