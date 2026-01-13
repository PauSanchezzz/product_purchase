<script setup lang="ts">
import { computed, nextTick, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { formatDate, formatPrice } from '@/utils/mixins'
import router from '@/router'
import { Button } from 'primevue'

const store = useStore()
const route = useRoute()

const status = computed(() => route.params.status as string)
const product = computed(() => store.state.product)
const orderResponse = computed(() => store.getters['order/orderResponse'])
const purchase = computed(() => store.state.purchase)

const statusInfo = computed(() => {
  switch (orderResponse?.value?.status.toLowerCase()) {
    case 'approve':
      return {
        image: '/img/approve.png',
        title: 'Gracias por su compra',
        subtitle: 'Hemos recibido su pago y aquí está un resumen de su compra.',
        color: '#3ab549',
      }
    case 'pending':
      return {
        image: '/img/pending.png',
        title: 'Pago pendiente',
        subtitle: 'Estamos procesando su pago y le notificaremos pronto',
        color: '#f39c12',
      }
    case 'rejected':
    case 'failed':
      return {
        image: '/img/rejected.png',
        title: 'Pago rechazado',
        subtitle: 'Hubo un problema al procesar su pago. Por favor, intente de nuevo',
        color: '#e74c3c',
      }
    default:
      return {
        image: '/img/pending.png',
        title: 'Estado desconocido',
        subtitle: 'Verificando el estado de su pago...',
        color: '#95a5a6',
      }
  }
})

onMounted(() => {
  nextTick(() => {
    if (orderResponse?.value?.id) {
      store.dispatch('order/getPaymentResult', { orderId: orderResponse?.value?.id })
    } else {
      router.push('/')
    }
  })
})
</script>

<template>
  <div class="payment-result-container">
    <div class="payment-card">
      <div class="status-header">
        <img :src="statusInfo.image" alt="status" class="status-icon" />
        <h1 class="title">{{ statusInfo.title }}</h1>
        <p class="subtitle mb-4">{{ statusInfo.subtitle }}</p>
        <Button
          class="general-button payment-result"
          :style="{ 'background-color': statusInfo.color }"
          @click="router.push('/')"
          >Regresar al inicio</Button
        >
      </div>

      <div class="divider"></div>

      <div class="details-section">
        <div class="detail-item">
          <p class="label">Cliente:</p>
          <p class="value">
            {{ purchase.shipping.name }} ({{ orderResponse?.customerEmail || 'n/a' }})
          </p>
        </div>

        <div class="detail-item">
          <p class="label">Método de pago:</p>
          <p class="value">Tarjeta de crédito/debito</p>
        </div>

        <div class="detail-item">
          <p class="label">Fecha de pago:</p>
          <p class="value">{{ formatDate(new Date()) }}</p>
        </div>
      </div>

      <div class="divider"></div>

      <div class="summary-section">
        <div class="summary-item">
          <p class="item-name">
            {{ `${orderResponse?.productName} (${orderResponse?.quantity})` }}
          </p>
          <p class="item-price whitespace-nowrap">
            {{ formatPrice(orderResponse?.subtotal) }}
          </p>
        </div>
        <div class="summary-item">
          <p class="item-name">Envío</p>
          <p class="item-price whitespace-nowrap">
            {{ formatPrice(orderResponse?.shippingCost) }}
          </p>
        </div>
        <div class="summary-total" :style="{ color: statusInfo.color }">
          <p class="total-label">Total pagado</p>
          <p class="total-amount">{{ formatPrice(orderResponse?.total) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.payment-result-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  padding-bottom: 6rem;
  padding-top: 110px;
}

.payment-card {
  background: white;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: left;
}

.status-header {
  text-align: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.status-icon {
  width: 200px;
  height: 200px;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6c757d;
  font-size: 1rem;
}

.divider {
  height: 1px;
  background-color: #eee;
  margin: 2rem 0;
}

.details-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.label {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.value {
  font-weight: 600;
  font-size: 1.1rem;
  color: #1a1a1a;
}

.summary-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #495057;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.2rem;
}

.total-amount {
  font-size: 1.2rem;
}

@media (max-width: 480px) {
  .payment-card {
    padding: 1.5rem;
  }
  .title {
    font-size: 1.5rem;
  }
}
</style>
