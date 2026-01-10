<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import Dialog from 'primevue/dialog'
import { formatPrice } from '@/utils/mixins'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { computed } from 'vue'

const toast = useToast()
const router = useRouter()
const store = useStore()
const emit = defineEmits(['closeModal', 'onSubmit'])

const dialog = ref(true)
const quantity = ref(0)

/* Store */
const productSelected = computed(() => store.state.product)
const totalPrice = computed(() => store.getters.totalPrice)

const goToPayment = () => {
  if (quantity.value === 0) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Debes seleccionar al menos un producto',
      life: 2000,
    })
    return
  }

  router.push('/checkout')
}

const changeQuantity = () => {
  /* TODO */
  store.commit('setProduct', {
    name: 'Camisa de manga corta - store',
    price: 1000,
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
      <div class="flex max-md:flex-col items-center w-full gap-6">
        <div class="w-[400px] max-md:w-[200px]">
          <img
            class="img-product"
            src="https://hips.hearstapps.com/hmg-prod/images/camisa-blanca-01-67d2ba0eb95ce.jpg"
            alt="image product"
          />
        </div>
        <div class="w-full flex flex-col gap-3 p-4">
          <p class="heading-1">Camisa de manga corta</p>
          <p class="text-m--gray">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quod.
          </p>
          <p class="text-l--bold">{{ formatPrice(1000) }} c/u</p>
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
            <p class="text-m--gray">Stock: 10</p>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex flex-wrap items-center justify-between w-full">
        <p class="text-l--bold">Total: {{ formatPrice(totalPrice) }}</p>
        <Button
          label="¡Pagar ahora!"
          class="general-button payment"
          icon="pi pi-shopping-cart"
          iconPos="right"
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
