<template>
  <div class="home-view">
    <section class="hero-section">
      <div class="hero-content">
        <h2>Selamat Datang di Portal UKM UIR!</h2>
        <p>
          Jelajahi berbagai Unit Kegiatan Mahasiswa yang aktif dan berprestasi
          di Universitas Islam Riau.
        </p>
        <div class="cta-buttons">
          <router-link to="/ukm" class="btn btn-primary">Lihat Semua UKM</router-link>
        </div>
      </div>
    </section>

    <section class="featured-ukm-list">
      <div class="container">
        <h3>UKM Unggulan</h3>
        <p>Temukan UKM-UKM pilihan kami.</p>
        <UKMListView :showTitle="false" :showRegisterButton="false" />
        <div class="text-center mt-4">
            <router-link to="/ukm" class="btn btn-secondary">Jelajahi Semua UKM</router-link>
        </div>
      </div>
    </section>

    <section class="about-ukm-section">
      <h3>Tentang UKM UIR</h3>
      <p>
        Unit Kegiatan Mahasiswa (UKM) di Universitas Islam Riau adalah wadah bagi mahasiswa
        untuk mengembangkan minat, bakat, dan potensi diri di berbagai bidang. Mulai dari olahraga,
        seni, penalaran, hingga sosial kemasyarakatan. Bergabunglah dengan kami untuk pengalaman
        kampus yang lebih bermakna!
      </p>
      <router-link to="/about" class="read-more-link">Baca Selengkapnya</router-link>
    </section>

    <section class="featured-achievements-section">
      <h3>Prestasi Terkini</h3>
      <p>Lihatlah beberapa pencapaian membanggakan dari UKM-UKM kami.</p>
      <router-link to="/achievements" class="read-more-link">Semua Prestasi</router-link>
    </section>
  </div>
</template>

<script setup>
import UKMListView from './UKMListView.vue';
</script>

<style scoped>
.home-view {
  text-align: center;
  font-family: 'Poppins', sans-serif;
  animation: fadeIn 0.4s ease-in;
}

/* ========== HERO SECTION ========== */
.hero-section {
  background: linear-gradient(to right, #42b983, #2c3e50);
  color: white;
  padding: 80px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-content {
  max-width: 800px;
}

.hero-content h2 {
  font-size: 2.8em;
  margin-bottom: 20px;
  animation: fadeInDown 0.7s ease;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

.hero-content p {
  font-size: 1.2em;
  margin-bottom: 30px;
  animation: fadeInUp 0.9s ease;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: white;
  color: #2c3e50;
}

.btn-primary:hover {
  background-color: #f1f1f1;
}

/* ========== ABOUT SECTION ========== */
.about-ukm-section,
.featured-achievements-section {
  padding: 60px 20px;
}

.about-ukm-section {
  background-color: #f9f9f9;
}

.about-ukm-section h3,
.featured-achievements-section h3 {
  font-size: 2em;
  margin-bottom: 15px;
  color: #2c3e50;
}

.about-ukm-section p,
.featured-achievements-section p {
  max-width: 800px;
  margin: 0 auto 20px auto;
  font-size: 1.1em;
  line-height: 1.6;
  color: #444;
}

.read-more-link {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.read-more-link:hover {
  color: #2c3e50;
}

/* ========== ANIMASI ========== */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

/* ========== RESPONSIF ========== */
@media (max-width: 768px) {
  .hero-content h2 {
    font-size: 2.2em;
  }

  .hero-content p {
    font-size: 1em;
  }

  .about-ukm-section,
  .featured-achievements-section {
    padding: 40px 16px;
  }
}
</style>
