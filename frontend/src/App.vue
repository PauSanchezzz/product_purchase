<script setup lang="ts">
import Header from './components/Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <Header />
  <RouterView />
</template>

<style scoped>
.full-page {
  width: 100%;
  padding-top: 100px;
}
</style>
