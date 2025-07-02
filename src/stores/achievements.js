// src/stores/achievements.js
import { defineStore } from 'pinia';
import { fetchAchievements } from '../services/api'; // Akan dibuat di api.js

export const useAchievementsStore = defineStore('achievements', {
  state: () => ({
    achievements: [],
    loading: false,
    error: null,
  }),
  actions: {
    async loadAchievements() {
      this.loading = true;
      this.error = null;
      try {
        this.achievements = await fetchAchievements();
      } catch (err) {
        this.error = 'Gagal memuat daftar prestasi: ' + err.message;
        console.error('Error loading achievements:', err);
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    getAchievementsCount: (state) => state.achievements.length,
    getAchievementsByUKM: (state) => (ukmId) => state.achievements.filter(achievement => achievement.ukmId === ukmId),
  },
});