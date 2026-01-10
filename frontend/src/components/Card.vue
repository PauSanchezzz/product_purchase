<script setup lang="ts">
import { truncateWords, formatPrice } from '@/utils/mixins'
import Button from 'primevue/button'

const emit = defineEmits(['viewDetailCard'])
</script>

<template>
  <div class="card">
    <div class="card-img-container">
      <img
        class="card-img-product"
        src="https://hips.hearstapps.com/hmg-prod/images/camisa-blanca-01-67d2ba0eb95ce.jpg"
        alt=""
      />
    </div>
    <div class="card-information">
      <p class="text-m--bold pt-2">Camisa de manga corta</p>
      <p class="text-s--gray">
        {{
          truncateWords(
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            16,
          )
        }}
      </p>
      <p class="text-m--bold">{{ formatPrice(1000) }} c/u</p>
      <div class="pt-2">
        <Button
          label="Ver más"
          class="general-button"
          icon="pi pi-sparkles"
          iconPos="right"
          @click="emit('viewDetailCard')"
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
