<template>
  <div class="achievement-card">
    <h4 class="achievement-title">{{ achievement.title }}</h4>
    <p class="achievement-meta">
      <strong>UKM:</strong> {{ getUkmName(achievement.ukmId) }}<br />
      <strong>Tahun:</strong> {{ achievement.year }}
    </p>
    <p class="achievement-description">
      {{ achievement.description.substring(0, 150) }}...
    </p>
    <router-link
      :to="{ name: 'ukm-detail', params: { id: achievement.ukmId } }"
      class="view-link"
    >
      🔍 Lihat Detail UKM
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useUKMStore } from '../stores/ukm';

const props = defineProps({
  achievement: {
    type: Object,
    required: true,
  },
});

const ukmStore = useUKMStore();

const getUkmName = (ukmId) => {
  // Menggunakan == untuk perbandingan yang lebih toleran terhadap tipe data (string vs number)
  // Pastikan ukmStore.ukms sudah terisi (dimuat di UKMListView atau UKMDetailView)
  const ukm = ukmStore.ukms.find(u => u.id == ukmId); 
  return ukm ? ukm.name : 'UKM Tidak Dikenal';
};
</script>

<style scoped>
/* (Tidak ada perubahan gaya yang diperlukan, sudah bagus) */
.achievement-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-align: left;
}

.achievement-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.achievement-title {
  color: var(--primary-dark);
  font-size: 1.3em;
  margin-bottom: 10px;
  font-weight: 600;
}

.achievement-meta {
  color: #555;
  font-size: 0.9em;
  margin-bottom: 10px;
  line-height: 1.5;
}

.achievement-description {
  color: #444;
  font-size: 0.95em;
  margin-bottom: 15px;
}

.view-link {
  display: inline-block;
  padding: 8px 14px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 6px;
  font-size: 0.9em;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.view-link:hover {
  background-color: var(--primary-dark);
}
</style>