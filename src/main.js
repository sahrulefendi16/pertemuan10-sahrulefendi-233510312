// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './assets/style.css'; // Pastikan file ini ada dan berisi variabel CSS global

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia); // Pinia harus digunakan sebelum router agar store bisa diakses di router guard

app.mount('#app');