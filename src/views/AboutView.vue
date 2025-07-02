<template>
  <div class="about-view">
    <h2>Tentang Kami</h2>
    <p class="intro">
      Selamat datang di halaman informasi Unit Kegiatan Mahasiswa (UKM) Universitas Islam Riau.
    </p>

    <section class="vision-mission">
      <h3>Visi</h3>
      <p class="vision-text">
        Menjadi pusat pengembangan minat dan bakat mahasiswa yang unggul, berlandaskan nilai-nilai Islam,
        serta berkontribusi positif bagi masyarakat dan bangsa.
      </p>

      <h3>Misi</h3>
      <ul>
        <li>Menyediakan wadah bagi mahasiswa untuk menyalurkan minat dan bakat di berbagai bidang.</li>
        <li>Meningkatkan kualitas SDM mahasiswa melalui kegiatan ekstrakurikuler yang terstruktur.</li>
        <li>Membangun karakter mahasiswa yang religius, mandiri, dan berjiwa sosial.</li>
        <li>Mengukir prestasi di tingkat regional, nasional, dan internasional.</li>
        <li>Membangun kemitraan strategis dengan berbagai pihak untuk mendukung kegiatan UKM.</li>
      </ul>
    </section>

    <section class="contact-info">
      <h3>Kontak Kami</h3>
      <p>Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami:</p>
      <ul class="contact-list">
        <li><strong>Email:</strong> <a href="mailto:ukm.uir@example.com">ukm.uir@example.com</a></li>
        <li><strong>Telepon:</strong> (0761) 123456</li>
        <li><strong>Alamat:</strong> Gedung Pusat Kegiatan Mahasiswa (PKM), Kampus UIR,<br />Jl. Kaharuddin Nasution No.113, Pekanbaru.</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
// Tidak ada logika khusus
</script>

<style scoped>
.about-view {
  padding: 40px 20px;
  max-width: 960px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  font-family: 'Poppins', sans-serif;
  animation: fadeIn 0.3s ease;
}

.about-view h2 {
  text-align: center;
  color: var(--primary-dark, #2c3e50);
  margin-bottom: 20px;
  font-size: 2.4em;
  font-weight: 700;
}

.intro {
  font-size: 1.1em;
  text-align: center;
  color: var(--text-color, #555);
  margin-bottom: 35px;
  line-height: 1.6;
}

.vision-mission,
.contact-info {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--border-color, #ddd);
}

.vision-mission h3,
.contact-info h3 {
  color: var(--primary-color, #42b983);
  font-size: 1.8em;
  margin-bottom: 15px;
}

.vision-text {
  color: #444;
  line-height: 1.7;
  margin-bottom: 20px;
  font-style: italic;
}

.vision-mission ul {
  list-style: disc;
  padding-left: 25px;
}

.vision-mission li {
  margin-bottom: 12px;
  color: #555;
  line-height: 1.6;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin-top: 15px;
}

.contact-list li {
  margin-bottom: 12px;
  color: #444;
  line-height: 1.6;
}

.contact-info a {
  color: var(--secondary-color, #007bff);
  text-decoration: none;
  font-weight: 500;
}

.contact-info a:hover {
  text-decoration: underline;
}

/* Animasi */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsif */
@media (max-width: 768px) {
  .about-view {
    padding: 30px 15px;
  }

  .about-view h2 {
    font-size: 2em;
  }

  .vision-mission h3,
  .contact-info h3 {
    font-size: 1.5em;
  }
}
</style>
