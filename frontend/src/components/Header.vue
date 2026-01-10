<script setup lang="ts">
import { formatDate } from '@/utils/mixins'
import 'primeicons/primeicons.css'
</script>

<template>
  <header>
    <div>
      <p class="text-m--gray">{{ formatDate(new Date().toString()) }}</p>
      <p class="text-l--bold">¡Bienvenido a Tú Tienda!</p>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: fixed;
  background-color: #f5f6fa;
  width: 100%;
  z-index: 10;
}
</style>
