<template>
  <div class="ukm-detail-view">
    <p v-if="ukmStore.loading" class="loading-message">Memuat detail UKM...</p>
    <p v-if="ukmStore.error" class="error-message">{{ ukmStore.error }}</p>

    <div
      v-if="ukmStore.currentUKM && !ukmStore.loading && !ukmStore.error"
      class="ukm-info-card"
    >
      <h2>{{ ukmStore.currentUKM.name }}</h2>
      <p><strong>Deskripsi:</strong> {{ ukmStore.currentUKM.description }}</p>
      <p><strong>Ketua:</strong> {{ ukmStore.currentUKM.leader }}</p>
      <p><strong>Jumlah Anggota:</strong> {{ ukmStore.currentUKM.membersCount }}</p>

      <div class="prestasi-section">
        <h3>Prestasi UKM Ini</h3>

        <p v-if="achievementsStore.loading" class="loading-message">Memuat prestasi...</p>
        <p v-if="achievementsStore.error" class="error-message">{{ achievementsStore.error }}</p>

        <div v-if="!achievementsStore.loading && !achievementsStore.error" class="achievements-text-container">
          <p v-if="filteredAchievements.length === 0" class="empty-message">
            Belum ada prestasi untuk UKM ini.
          </p>
          <div v-else class="achievements-description">
            <p>{{ achievementsText }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <router-link to="/ukm" class="btn-back">← Kembali ke Daftar UKM</router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUKMStore } from '../stores/ukm';
import { useAchievementsStore } from '../stores/achievements';

const route = useRoute();
const ukmStore = useUKMStore();
const achievementsStore = useAchievementsStore();

const ukmId = route.params.id;

onMounted(() => {
  ukmStore.loadUKMDetail(ukmId);
  achievementsStore.loadAchievements();
});

const filteredAchievements = computed(() => {
  return achievementsStore.achievements.filter(
    (achievement) => achievement.ukmId == ukmId
  );
});

const achievementsText = computed(() => {
  if (filteredAchievements.value.length === 0) {
    return '';
  }

  const achievements = filteredAchievements.value;
  const ukmName = ukmStore.currentUKM?.name || 'UKM ini';
  
  let text = `${ukmName} telah meraih berbagai prestasi yang membanggakan sepanjang perjalanannya. `;

  achievements.forEach((achievement, index) => {
    if (index === 0) {
      text += `Prestasi yang paling menonjol adalah ${achievement.title} pada tahun ${achievement.year}`;
    } else if (index === achievements.length - 1 && achievements.length > 1) {
      text += `, dan ${achievement.title} pada tahun ${achievement.year}`;
    } else {
      text += `, ${achievement.title} pada tahun ${achievement.year}`;
    }

    // Tambahkan deskripsi jika tersedia
    if (achievement.description && achievement.description.trim() !== '') {
      text += ` yang merupakan ${achievement.description.toLowerCase()}`;
    }
  });

  text += '. ';

  // Tambahkan kalimat penutup yang motivational
  if (achievements.length === 1) {
    text += `Prestasi ini menunjukkan dedikasi dan komitmen tinggi dari seluruh anggota ${ukmName} dalam mengembangkan potensi mereka.`;
  } else {
    text += `Prestasi-prestasi ini mencerminkan kerja keras, dedikasi, dan semangat juang yang tinggi dari seluruh anggota ${ukmName}.`;
  }

  text += ` Setiap pencapaian menjadi bukti nyata bahwa ${ukmName} terus berkembang dan memiliki potensi besar untuk meraih prestasi yang lebih gemilang di masa mendatang. Dengan semangat yang sama, ${ukmName} terus berkomitmen untuk memberikan kontribusi terbaik bagi lingkungan kampus dan masyarakat.`;

  return text;
});
</script>

<style scoped>
.ukm-detail-view {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
  animation: fadeIn 0.3s ease;
}

.ukm-info-card {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
  margin-bottom: 2.5rem;
}

.ukm-info-card h2 {
  margin-bottom: 1rem;
  color: var(--primary-dark, #2c3e50);
  font-size: 1.8rem;
}

.ukm-info-card p {
  margin: 10px 0;
  color: #444;
  line-height: 1.6;
  word-wrap: break-word;
}

.ukm-info-card p strong {
  color: var(--primary-color, #007bff);
}

.prestasi-section {
  margin-top: 2rem;
}

.prestasi-section h3 {
  margin-bottom: 1rem;
  color: var(--secondary-dark, #0062cc);
  font-size: 1.3rem;
}

.achievements-text-container {
  margin-top: 1rem;
}

.achievements-description {
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%);
  padding: 2rem;
  border-radius: 12px;
  border-left: 5px solid var(--primary-color, #007bff);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.achievements-description::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color, #007bff), var(--secondary-color, #28a745));
}

.achievements-description p {
  margin: 0;
  text-align: justify;
  color: #2c3e50;
  line-height: 1.8;
  font-size: 1.05rem;
  font-weight: 400;
  letter-spacing: 0.3px;
}

.loading-message,
.empty-message {
  color: #666;
  font-style: italic;
  margin-top: 10px;
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.error-message {
  color: var(--error-color, #dc3545);
  background-color: #ffeaea;
  padding: 1rem;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0;
}

.btn-back {
  display: inline-block;
  margin-top: 1.5rem;
  background-color: var(--secondary-color, #007bff);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-back:hover {
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
  .ukm-detail-view {
    padding: 1rem;
  }

  .ukm-info-card {
    padding: 1.5rem;
  }

  .ukm-info-card h2 {
    font-size: 1.5rem;
  }

  .prestasi-section h3 {
    font-size: 1.2rem;
  }

  .achievements-description {
    padding: 1.5rem;
  }

  .achievements-description p {
    font-size: 1rem;
    line-height: 1.7;
  }
}
</style>