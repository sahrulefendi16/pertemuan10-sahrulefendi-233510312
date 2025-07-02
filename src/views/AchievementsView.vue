<template>
  <div class="achievements-view container">
    <h2 class="text-center">Prestasi UKM UIR</h2>
    <p v-if="achievementsStore && achievementsStore.loading" class="text-center">Memuat daftar prestasi...</p>
    <p v-if="achievementsStore && achievementsStore.error" class="error-message text-center">{{ achievementsStore.error }}</p>
    
    <div v-if="achievementsStore && !achievementsStore.loading && !achievementsStore.error && achievementsStore.achievements && achievementsStore.achievements.length > 0" class="achievement-cards-container cards-container">
      <AchievementCard
        v-for="achievement in achievementsStore.achievements"
        :key="achievement.id"
        :achievement="achievement"
      />
    </div>
    <p v-else-if="achievementsStore && !achievementsStore.loading && !achievementsStore.error && (!achievementsStore.achievements || achievementsStore.achievements.length === 0)" class="text-center">Belum ada prestasi yang tercatat.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAchievementsStore } from '../stores/achievements';
import AchievementCard from '../components/AchievementCard.vue';

const achievementsStore = useAchievementsStore();
// Hapus console.log debugging jika sudah tidak diperlukan
// console.log('AchievementsView: achievementsStore instance after useAchievementsStore():', achievementsStore);

onMounted(() => {
  // Hapus console.log debugging jika sudah tidak diperlukan
  // console.log('AchievementsView: onMounted triggered. Current achievementsStore.achievements:', achievementsStore.achievements);
  if (achievementsStore && (!achievementsStore.achievements || achievementsStore.achievements.length === 0)) { // Tambahkan cek achievementsStore
      achievementsStore.loadAchievements();
  }
});
</script>

<style scoped>
.achievements-view {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
  animation: fadeIn 0.3s ease;
}

.achievements-view h2 {
  font-size: 2.4em;
  color: var(--primary-dark, #2c3e50);
  margin-bottom: 10px;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: var(--text-light, #666);
  font-size: 1.1em;
  margin-bottom: 35px;
}

.loading-message {
  text-align: center;
  color: var(--secondary-color, #42b983);
  font-weight: 500;
  font-size: 1em;
  margin-top: 20px;
}

.error-message {
  text-align: center;
  color: var(--error-color, #c0392b);
  background-color: #ffeaea;
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
  margin: 20px 0;
}

.empty-message {
  grid-column: 1 / -1;
  text-align: center;
  font-style: italic;
  color: #777;
  margin-top: 30px;
  font-size: 1.05em;
}

.achievement-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  animation: fadeInUp 0.5s ease;
}

/* ANIMASI */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsif ekstra */
@media (max-width: 768px) {
  .achievements-view {
    padding: 30px 16px;
  }
}

.achievement-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.achievement-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

</style>
