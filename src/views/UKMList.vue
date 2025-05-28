<script>
export default {
  name: 'UKMList',
  data() {
    return {
      ukms: ['Petanque', 'Sepak Bola', 'Voli', 'Tenis', 'Bola Tangan', 'Panahan']
    }
  }
}
</script>

<template>
  <div>
    <div class="container"></div>
    <h2>Daftar UKM UIR</h2>
    <ul>
      <li v-for="ukm in ukms" :key="ukm">
        <router-link :to="`/ukm/${ukm}`">{{ ukm }}</router-link>
      </li>
    </ul>
  </div>
</template>