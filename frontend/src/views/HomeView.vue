<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import Card from '@/components/Card.vue'
import DetailCard from '@/components/DetailCard.vue'

const store = useStore()
const viewDetailCard = ref(false)

onMounted(() => {
  store.dispatch('clearStore')
})
</script>

<template>
  <div class="full-page">
    <div class="cards-container">
      <Card v-for="value in 10" @viewDetailCard="viewDetailCard = true" />
    </div>
    <DetailCard v-if="viewDetailCard" @closeModal="viewDetailCard = false" />
  </div>
</template>

<style scoped>
.full-page {
  .cards-container {
    margin: 1rem;
    margin-top: 0;
    display: grid;
    gap: 1.5rem 10px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    justify-items: center;
  }
}
</style>
