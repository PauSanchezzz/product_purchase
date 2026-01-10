<script setup lang="ts">
import { formatPrice, truncateWords } from '@/utils/mixins'
</script>

<template>
  <div class="summary">
    <p class="text-l pb-4">Resumen de la compra</p>
    <div class="detail-product">
      <div class="image-container">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/camisa-blanca-01-67d2ba0eb95ce.jpg"
          alt="product-image"
        />
      </div>
      <div>
        <p class="text-m--bold">Camisa de manga corta</p>
        <p class="text-s--gray">
          {{
            truncateWords(
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
              12,
            )
          }}
        </p>
        <p class="text-m--semibold">{{ `${formatPrice(1000)} x 10` }}</p>
      </div>
    </div>
    <hr />
    <div class="detail-summary">
      <div>
        <p class="text-m--bold">Subtotal</p>
        <p class="text-m--semibold">{{ formatPrice(10000) }}</p>
      </div>
      <div>
        <p class="text-m--bold">Envío</p>
        <p class="text-m--semibold">{{ formatPrice(10000) }}</p>
      </div>
      <hr />
      <div>
        <p class="text-m--bold">Total</p>
        <p class="text-m--semibold">{{ formatPrice(10000) }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.summary {
  background-color: white;
  margin: 0 auto;
  max-width: 500px;
  padding: 2rem;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 3px 6px #0c17431a;
  hr {
    margin: 1rem 0;
    color: #d4d4d4;
  }
  .detail-product {
    display: flex;
    align-items: center;
    gap: 1rem;
    .image-container {
      width: 100px;
      height: 100px;
      border-radius: 8px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .detail-summary {
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
