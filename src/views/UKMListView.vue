<template>
  <div class="ukm-list-view container">
    <h2 v-if="showTitle" class="text-center">Daftar Unit Kegiatan Mahasiswa (UKM)</h2>
    <p v-if="ukmStore && ukmStore.loading" class="text-center">Memuat daftar UKM...</p>
    <p v-if="ukmStore && ukmStore.error" class="error-message text-center">{{ ukmStore.error }}</p>
    
    <div v-if="ukmStore && !ukmStore.loading && !ukmStore.error && ukmStore.ukms && ukmStore.ukms.length > 0" class="ukm-cards-container cards-container">
      <UKMCard
        v-for="ukm in ukmStore.ukms"
        :key="ukm.id"
        :ukm="ukm"
      />
    </div>
    <p v-else-if="ukmStore && !ukmStore.loading && !ukmStore.error && (!ukmStore.ukms || ukmStore.ukms.length === 0)" class="text-center">Tidak ada UKM yang terdaftar.</p>

    <div v-if="showRegisterButton" class="text-center mt-4">
      <router-link to="/ukm/register" class="btn btn-primary">Daftar UKM Baru</router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps } from 'vue'; // Tambahkan defineProps
import { useUKMStore } from '../stores/ukm';
import UKMCard from '../components/UKMCard.vue';

// Definisikan props
const props = defineProps({
  showTitle: {
    type: Boolean,
    default: true
  },
  showRegisterButton: {
    type: Boolean,
    default: true
  }
});

const ukmStore = useUKMStore();

onMounted(() => {
  if (ukmStore && (!ukmStore.ukms || ukmStore.ukms.length === 0)) {
      ukmStore.loadUKMs();
  }
});
</script>

<style scoped>
.ukm-list-view {
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
  animation: fadeIn 0.3s ease;
}

.ukm-list-view h2 {
  text-align: center;
  color: var(--primary-dark, #2c3e50);
  margin-bottom: 2rem;
  font-size: 2rem;
}

.ukm-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.loading-message,
.empty-message {
  text-align: center;
  font-style: italic;
  color: #666;
  margin-top: 2rem;
  font-size: 1.1rem;
}

.error-message {
  color: var(--error-color, #dc3545);
  background-color: #ffeaea;
  padding: 1rem;
  border-radius: 8px;
  font-weight: bold;
  margin: 1.5rem 0;
  text-align: center;
}

.mt-4 {
  margin-top: 2rem;
}

.btn-register {
  background-color: var(--secondary-color, #007bff);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  display: inline-block;
}

.btn-register:hover {
  background-color: var(--secondary-dark, #0056b3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .ukm-list-view {
    padding: 1rem;
  }

  .ukm-list-view h2 {
    font-size: 1.5rem;
  }
}
</style>

