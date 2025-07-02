<template>
  <div class="ukm-card card">
    <h3 class="ukm-name">{{ ukm.name }}</h3>
    <p class="ukm-description">{{ ukm.description }}</p>
    <router-link
      :to="{ name: 'ukm-detail', params: { id: ukm.id } }"
      class="btn-detail"
    >
      Lihat Detail
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  ukm: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.ukm-card {
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: var(--border-radius, 10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  height: 100%;
}

.ukm-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.ukm-name {
  font-size: 1.3em;
  font-weight: 600;
  color: var(--primary-dark, #2c3e50);
  margin-bottom: 10px;
}

.ukm-description {
  font-size: 0.95em;
  color: #555;
  line-height: 1.5;
  margin-bottom: 15px;
  flex-grow: 1;
}

.btn-detail {
  align-self: flex-start;
  padding: 8px 16px;
  background-color: var(--primary-color, #42b983);
  color: white;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9em;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-detail:hover {
  background-color: var(--primary-dark, #2c3e50);
}
</style>
