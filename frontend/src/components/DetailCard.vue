<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import Dialog from 'primevue/dialog'
import { formatPrice } from '@/utils/mixins'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Loading from './Loading.vue'

const toast = useToast()
const router = useRouter()
const store = useStore()
const emit = defineEmits(['closeModal', 'onSubmit'])

const dialog = ref(true)
const quantity = ref(0)

/* Store */
const product = computed(() => store.getters['products/selectedProduct'])
const isLoading = computed(() => store.getters['products/isLoading'])
const totalPrice = computed(() => (product.value ? product.value.price * quantity.value : 0))

const goToPayment = async () => {
  if (quantity.value === 0) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Debes seleccionar al menos un producto',
      life: 2000,
    })
    return
  }

  try {
    await store.dispatch('order/createOrder', {
      productId: product.value.id,
      quantity: quantity.value,
    })
    router.push('/checkout')
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo crear la orden. Intenta nuevamente.',
      life: 3000,
    })
  }
}

const changeQuantity = () => {
  store.commit('setProduct', {
    description: product.value.description,
    id: product.value.id,
    image: product.value.image,
    name: product.value.name,
    price: product.value.price,
    quantity: quantity.value,
  })
}

watch(
  () => dialog.value,
  (newVal: boolean) => {
    if (!newVal) {
      emit('closeModal')
    }
  },
)
</script>

<template>
  <Dialog :visible="dialog" modal :draggable="false" class="general-dialog md:w-[800px]">
    <template #header>
      <p class="title">Detalle Producto</p>
    </template>
    <template #closeicon>
      <i class="pi pi-times" style="font-size: 1.5rem" @click="emit('closeModal')"></i>
    </template>
    <template #default>
      <Loading v-if="isLoading" />
      <div v-else-if="product" class="flex max-md:flex-col items-center w-full gap-6">
        <div class="w-[400px] max-md:w-[200px]">
          <img class="img-product" :src="product.image" alt="image product" />
        </div>
        <div class="w-full flex flex-col gap-3 p-4">
          <p class="heading-1">{{ product.name }}</p>
          <p class="text-m--gray">
            {{ product.description }}
          </p>
          <p class="text-l--bold">{{ formatPrice(product.price) }} c/u</p>
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="w-40">
              <InputNumber
                v-model="quantity"
                inputId="horizontal-buttons"
                placeholder="0"
                showButtons
                buttonLayout="horizontal"
                :useGrouping="false"
                fluid
                :step="1"
                :min="0"
                :max="product.stock"
                @input="changeQuantity"
              >
                <template #incrementbuttonicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
            </div>
            <p class="text-m--gray">Stock: {{ product.stock }}</p>
          </div>
        </div>
      </div>
      <div v-else class="text-center p-8">No fue posible cargar la información del producto.</div>
    </template>
    <template #footer>
      <div class="flex flex-wrap items-center justify-between w-full">
        <p class="text-l--bold">Total: {{ formatPrice(totalPrice) }}</p>
        <Button
          label="¡Pagar ahora!"
          class="general-button payment"
          icon="pi pi-shopping-cart"
          iconPos="right"
          :disabled="!product || quantity <= 0"
          @click="goToPayment"
        />
      </div>
    </template>
  </Dialog>
</template>
<style scoped>
.img-product {
  width: 100%;
  border-radius: 8px;
}
</style>
