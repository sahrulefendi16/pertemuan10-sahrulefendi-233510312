<template>
  <form @submit.prevent="handleSubmit" class="ukm-registration-form">
    <div class="form-group">
      <label for="ukmName">Nama UKM:<span class="required">*</span></label>
      <input type="text" id="ukmName" v-model="formData.name" required />
    </div>

    <div class="form-group">
      <label for="ukmDescription">Deskripsi:<span class="required">*</span></label>
      <textarea id="ukmDescription" v-model="formData.description" required></textarea>
    </div>

    <div class="form-group">
      <label for="ukmLeader">Nama Ketua:<span class="required">*</span></label>
      <input type="text" id="ukmLeader" v-model="formData.leader" required />
    </div>

    <div class="form-group">
      <label for="contactEmail">Email Kontak:<span class="required">*</span></label>
      <input type="email" id="contactEmail" v-model="formData.contactEmail" required />
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Mengirim...' : 'Daftar UKM' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['submit-registration']);

const formData = ref({
  name: '',
  description: '',
  leader: '',
  contactEmail: '',
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  await emit('submit-registration', { ...formData.value });
  isSubmitting.value = false;

  // Optional reset form
  formData.value = {
    name: '',
    description: '',
    leader: '',
    contactEmail: '',
  };
};
</script>

<style scoped>
.ukm-registration-form {
  background-color: #ffffff;
  padding: 30px;
  max-width: 600px;
  margin: 40px auto;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: var(--text-color, #333);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: var(--border-radius, 8px);
  font-size: 1em;
  background-color: #fafafa;
  transition: border 0.2s ease, background-color 0.2s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--primary-color, #007bff);
  background-color: #ffffff;
  outline: none;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: var(--border-radius, 8px);
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color, #007bff);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--primary-dark, #0056b3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.btn:disabled {
  background-color: #bbb;
  cursor: not-allowed;
}

.required {
  color: var(--error-color, #dc3545);
  margin-left: 4px;
}
</style>
