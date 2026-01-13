<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Card from '@/components/Card.vue'
import DetailCard from '@/components/DetailCard.vue'
import type { Product } from '@/interfaces/products.interface'
import Loading from '@/components/Loading.vue'

const store = useStore()
const viewDetailCard = ref(false)

const productsList = computed(() => store.getters['products/productsList'])
const isLoading = computed(() => store.getters['products/isLoading'])

const handleViewDetail = async (product: Product) => {
  viewDetailCard.value = true
  await store.dispatch('products/fetchProductById', product.id)
}

onMounted(async () => {
  store.dispatch('clearStore')
  await store.dispatch('products/fetchProducts')
})
</script>

<template>
  <div class="full-page">
    <div v-if="isLoading && !viewDetailCard" class="flexflex-column justify-center p-8">
      <Loading />
      <p class="text-m--bold text-center">Cargando productos...</p>
    </div>
    <div v-else class="cards-container">
      <Card
        v-for="product in productsList"
        :key="product.id"
        :product="product"
        @viewDetailCard="handleViewDetail"
      />
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
