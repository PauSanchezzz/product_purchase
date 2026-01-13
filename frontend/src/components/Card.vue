<script setup lang="ts">
import { truncateWords, formatPrice } from '@/utils/mixins'
import Button from 'primevue/button'
import type { Product } from '@/interfaces/products.interface'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits(['viewDetailCard'])
</script>

<template>
  <div class="card">
    <div class="card-img-container">
      <img class="card-img-product" :src="props.product.image" alt="image_product" />
    </div>
    <div class="card-information">
      <p class="text-m--bold pt-2">{{ props.product.name }}</p>
      <p class="text-s--gray">
        {{ truncateWords(props.product.description, 16) }}
      </p>
      <p class="text-m--bold">{{ formatPrice(props.product.price) }} c/u</p>
      <div class="pt-2">
        <Button
          label="Ver más"
          class="general-button"
          icon="pi pi-sparkles"
          iconPos="right"
          @click="emit('viewDetailCard', props.product)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 3px 6px #0c17431a;
  min-height: 300px;
  padding: 1rem;
  width: 250px;
  .card-information {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 3px;
    justify-content: space-between;
    text-align: center;
  }
  .card-img-container {
    height: 120px;
    width: 100%;
    .card-img-product {
      border-radius: 8px;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }
}
</style>
