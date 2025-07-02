<template>
  <div class="user-profile-view container card">
    <h2 class="text-center">Profil Pengguna</h2>

    <div class="profile-info-display">
      <!-- Mode Edit -->
      <div v-if="isEditMode" class="edit-mode">
        <div class="profile-edit-grid">
          <div class="edit-item" v-for="(value, key) in editableUserData" :key="key">
            <label>{{ key }}:</label>
            <input 
              v-model="editableUserData[key]" 
              :type="getInputType(key)"
              class="form-input"
              :placeholder="`Masukkan ${key.toLowerCase()}`"
            />
          </div>
        </div>
        
        <div class="edit-actions text-center mt-4">
          <button @click="saveChanges" class="btn btn-success me-2">
            <i class="fas fa-save"></i> Simpan
          </button>
          <button @click="cancelEdit" class="btn btn-secondary">
            <i class="fas fa-times"></i> Batal
          </button>
        </div>
      </div>

      <!-- Mode Display -->
      <div v-else class="display-mode">
        <div class="profile-detail-grid">
          <div class="profile-item" v-for="(value, key) in displayUserData" :key="key">
            <strong>{{ key }}:</strong>
            <span>{{ value || 'Tidak Tersedia' }}</span>
          </div>
        </div>

        <div class="profile-actions text-center mt-4">
          <button @click="startEdit" class="btn btn-primary me-2">
            <i class="fas fa-edit"></i> Edit Profil
          </button>
          <button @click="confirmDelete" class="btn btn-danger">
            <i class="fas fa-trash"></i> Hapus Profil
          </button>
        </div>

        <div class="text-center mt-3">
          <p>Anda saat ini Browse sebagai pengguna tamu. Tidak ada sesi yang aktif.</p>
        </div>
      </div>
    </div>

    <!-- Modal Konfirmasi Hapus -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="closeDeleteModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Konfirmasi Hapus</h3>
          <button @click="closeDeleteModal" class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <p>Apakah Anda yakin ingin menghapus profil ini?</p>
          <p class="text-danger"><strong>Tindakan ini tidak dapat dibatalkan!</strong></p>
        </div>
        <div class="modal-footer">
          <button @click="deleteProfile" class="btn btn-danger me-2">
            <i class="fas fa-trash"></i> Ya, Hapus
          </button>
          <button @click="closeDeleteModal" class="btn btn-secondary">
            <i class="fas fa-times"></i> Batal
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast" :class="toastType">
      <i :class="toastIcon"></i>
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue';

// Data dummy pengguna
const dummyUser = reactive({
  nama: "Sahrul Efendi",
  email: "sahrul@example.com",
  npm: "233510312",
  jurusan: "Teknik Informatika",
  tanggal_lahir: "30 April 2005",
  Alamat: "Jln. Karya 1",
  No_hp: "085828271722",
  Status: "Mahasiswa"
});

// State management
const isEditMode = ref(false);
const showDeleteModal = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('success');

// Data yang bisa diedit
const editableUserData = reactive({});

// Computed untuk menampilkan data
const displayUserData = computed(() => {
  return {
    'Nama': dummyUser.nama,
    'Email': dummyUser.email,
    'NPM': dummyUser.npm,
    'Jurusan': dummyUser.jurusan,
    'Tanggal Lahir': dummyUser.tanggal_lahir,
    'Alamat': dummyUser.Alamat,
    'Nomor Telepon': dummyUser.No_hp,
    'Status': dummyUser.Status
  };
});

// Computed untuk icon toast
const toastIcon = computed(() => {
  return toastType.value === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
});

// Fungsi untuk menentukan tipe input
const getInputType = (key) => {
  if (key.toLowerCase().includes('email')) return 'email';
  if (key.toLowerCase().includes('telepon') || key.toLowerCase().includes('hp')) return 'tel';
  if (key.toLowerCase().includes('tanggal')) return 'date';
  return 'text';
};

// Fungsi untuk memulai mode edit
const startEdit = () => {
  isEditMode.value = true;
  // Copy data untuk editing
  Object.assign(editableUserData, {
    'Nama': dummyUser.nama,
    'Email': dummyUser.email,
    'NPM': dummyUser.npm,
    'Jurusan': dummyUser.jurusan,
    'Tanggal Lahir': dummyUser.tanggal_lahir,
    'Alamat': dummyUser.Alamat,
    'Nomor Telepon': dummyUser.No_hp,
    'Status': dummyUser.Status
  });
};

// Fungsi untuk menyimpan perubahan
const saveChanges = () => {
  // Validasi sederhana
  if (!editableUserData['Nama'] || !editableUserData['Email']) {
    showToastMessage('Nama dan Email harus diisi!', 'error');
    return;
  }

  // Update data asli
  dummyUser.nama = editableUserData['Nama'];
  dummyUser.email = editableUserData['Email'];
  dummyUser.npm = editableUserData['NPM'];
  dummyUser.jurusan = editableUserData['Jurusan'];
  dummyUser.tanggal_lahir = editableUserData['Tanggal Lahir'];
  dummyUser.Alamat = editableUserData['Alamat'];
  dummyUser.No_hp = editableUserData['Nomor Telepon'];
  dummyUser.Status = editableUserData['Status'];

  isEditMode.value = false;
  showToastMessage('Profil berhasil diperbarui!', 'success');
};

// Fungsi untuk membatalkan edit
const cancelEdit = () => {
  isEditMode.value = false;
  // Reset data editing
  Object.keys(editableUserData).forEach(key => {
    delete editableUserData[key];
  });
};

// Fungsi untuk konfirmasi hapus
const confirmDelete = () => {
  showDeleteModal.value = true;
};

// Fungsi untuk menutup modal hapus
const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

// Fungsi untuk menghapus profil
const deleteProfile = () => {
  // Reset data ke nilai default
  Object.assign(dummyUser, {
    nama: "Data Terhapus",
    email: "deleted@example.com",
    npm: "000000000",
    jurusan: "Data Terhapus",
    tanggal_lahir: "Data Terhapus",
    Alamat: "Data Terhapus",
    No_hp: "Data Terhapus",
    Status: "Data Terhapus"
  });
  
  showDeleteModal.value = false;
  showToastMessage('Profil berhasil dihapus!', 'success');
};

// Fungsi untuk menampilkan toast
const showToastMessage = (message, type = 'success') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};
</script>

<style scoped>
.user-profile-view {
  padding: 2rem;
  margin: 2rem auto;
  max-width: 850px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Poppins', sans-serif;
  animation: fadeIn 0.4s ease;
  position: relative;
}

.user-profile-view h2 {
  margin-bottom: 1.5rem;
  color: var(--primary-dark, #2c3e50);
  font-size: 1.8rem;
}

/* Display Mode Styles */
.profile-detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;
}

.profile-item {
  background-color: var(--bg-light, #f9f9f9);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color, #ccc);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.profile-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-item strong {
  color: var(--primary-color, #3498db);
  font-size: 0.85rem;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.profile-item span {
  font-size: 1.05rem;
  color: var(--text-color, #333);
  font-weight: 500;
}

/* Edit Mode Styles */
.profile-edit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.2rem;
}

.edit-item {
  display: flex;
  flex-direction: column;
}

.edit-item label {
  color: var(--primary-color, #3498db);
  font-size: 0.85rem;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.form-input {
  padding: 0.75rem;
  border: 2px solid var(--border-color, #ddd);
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color, #3498db);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

/* Button Styles */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
  color: #fff;
}

.btn-success:hover {
  background-color: #1e7e34;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.me-2 {
  margin-right: 0.5rem;
}

.mt-3 {
  margin-top: 1rem;
}

.mt-4 {
  margin-top: 2rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.modal-close:hover {
  color: #333;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  margin-bottom: 1rem;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* Toast Styles */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  z-index: 1001;
  animation: slideInRight 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 250px;
}

.toast.success {
  background-color: #28a745;
}

.toast.error {
  background-color: #dc3545;
}

/* Utility Classes */
.text-center {
  text-align: center;
}

.text-danger {
  color: #dc3545;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 600px) {
  .user-profile-view {
    padding: 1rem;
    margin: 1rem;
  }

  .user-profile-view h2 {
    font-size: 1.5rem;
  }

  .profile-edit-grid {
    grid-template-columns: 1fr;
  }

  .profile-detail-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    width: 95%;
    margin: 1rem;
  }

  .toast {
    right: 10px;
    left: 10px;
    min-width: auto;
  }

  .btn {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }
}
</style>
