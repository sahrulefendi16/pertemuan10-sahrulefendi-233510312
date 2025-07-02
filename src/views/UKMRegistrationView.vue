<template>
  <div class="ukm-registration-container">
    <div class="ukm-registration-view">
      <h2 class="title">Form Pendaftaran UKM</h2>

      <p v-if="ukmStore.loading" class="status-message">Memproses pendaftaran...</p>
      <p v-if="ukmStore.error" class="error-message">{{ ukmStore.error }}</p>
      <p v-if="registrationSuccess" class="success-message">Pendaftaran UKM berhasil!</p>

      <RegistrationForm @submit-registration="handleRegistration" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUKMStore } from '../stores/ukm';
import RegistrationForm from '../components/RegistrationForm.vue';

const ukmStore = useUKMStore();
const router = useRouter();
const registrationSuccess = ref(false);

const handleRegistration = async (formData) => {
  try {
    await ukmStore.submitUKMRegistration(formData);
    registrationSuccess.value = true;
    setTimeout(() => {
      router.push('/ukm');
    }, 2000);
  } catch (error) {
    console.error('Failed to register UKM in view:', error);
  }
};
</script>

<style scoped>
.ukm-registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.ukm-registration-view {
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  width: 100%;
  max-width: 720px;
  font-family: 'Poppins', sans-serif;
}

.title {
  font-size: 1.8em;
  font-weight: 700;
  margin-bottom: 24px;
  color: #343a40;
  text-align: center;
}

.status-message {
  font-size: 0.95em;
  margin-bottom: 16px;
  color: #007bff;
  text-align: center;
}

.success-message {
  font-size: 1em;
  font-weight: 600;
  color: var(--success-color);
  background-color: #e6ffed;
  border: 1px solid var(--success-color);
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  text-align: center;
}

.error-message {
  font-size: 1em;
  font-weight: 600;
  color: var(--error-color);
  background-color: #ffe6e6;
  border: 1px solid var(--error-color);
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>

