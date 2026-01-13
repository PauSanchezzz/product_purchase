<script setup lang="ts">
import { ErrorMessage, useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useStore } from 'vuex'
import { computed, nextTick, onMounted } from 'vue'

const store = useStore()
const isLoading = computed(() => store.getters['order/isLoading'])
const emit = defineEmits(['nextStep', 'prevStep'])

const { handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      customer: z
        .string({ message: 'El nombre es obligatorio' })
        .min(1, 'El nombre es obligatorio'),
      customerEmail: z
        .string({ message: 'El correo electrónico es obligatorio' })
        .email('Correo electrónico no válido')
        .min(1, 'El correo electrónico es obligatorio'),
      address: z
        .string({ message: 'La dirección es obligatoria' })
        .min(1, 'La dirección es obligatoria'),
      region: z
        .string({ message: 'La región/estado es obligatoria' })
        .min(1, 'La región/estado es obligatoria'),
      city: z.string({ message: 'La ciudad es obligatoria' }).min(1, 'La ciudad es obligatoria'),
      postalCode: z
        .string({ message: 'El código postal es obligatorio' })
        .min(1, 'El código postal es obligatorio'),
      phone: z
        .string({ message: 'El número de teléfono es obligatorio' })
        .min(1, 'El número de teléfono es obligatorio'),
    }),
  ),
})
const { value: customer } = useField<string>('customer')
const { value: customerEmail } = useField<string>('customerEmail')
const { value: address } = useField<string>('address')
const { value: region } = useField<string>('region')
const { value: city } = useField<string>('city')
const { value: postalCode } = useField<string>('postalCode')
const { value: phone } = useField<string>('phone')

const onSubmit = handleSubmit(async (values, $event: any) => {
  emit('nextStep', '3')
})

const setInformation = () => {
  resetForm({
    values: {
      customer: store.state.purchase.shipping.customer,
      customerEmail: store.state.purchase.shipping.customerEmail,
      address: store.state.purchase.shipping.address,
      region: store.state.purchase.shipping.region,
      city: store.state.purchase.shipping.city,
      postalCode: store.state.purchase.shipping.postalCode,
      phone: store.state.purchase.shipping.phone,
    },
  })
}

const addInformation = () => {
  store.commit('setPurchase', {
    ...store.state.purchase,
    shipping: {
      customer: customer.value,
      customerEmail: customerEmail.value,
      address: address.value,
      country: 'CO',
      region: region.value,
      city: city.value,
      postalCode: postalCode.value,
      phone: phone.value,
    },
  })
}

onMounted(() => {
  nextTick(() => {
    setInformation()
  })
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <label class="labels" for="firstName">Nombre:</label>
      <IconField>
        <InputIcon class="pi pi-user" />
        <InputText
          v-model="customer"
          class="w-full"
          id="customer"
          placeholder="Nombre"
          @input="addInformation"
        />
      </IconField>
      <ErrorMessage class="error-message" name="firstName" />
    </div>
    <div class="flex flex-col gap-2">
      <label class="labels" for="customerEmail">Correo electrónico:</label>
      <IconField>
        <InputIcon class="pi pi-envelope" />
        <InputText
          v-model="customerEmail"
          class="w-full"
          id="customerEmail"
          placeholder="Correo electrónico"
          @input="addInformation"
        />
      </IconField>
      <ErrorMessage class="error-message" name="customerEmail" />
    </div>

    <div class="flex flex-col gap-2">
      <label class="labels" for="address">Dirección:</label>
      <IconField>
        <InputIcon class="pi pi-map-marker" />
        <InputText
          v-model="address"
          class="w-full"
          id="address"
          placeholder="Dirección completa"
          @input="addInformation"
        />
      </IconField>
      <ErrorMessage class="error-message" name="address" />
    </div>

    <div class="flex flex-col gap-2">
      <label class="labels" for="region">Región / Estado:</label>
      <IconField>
        <InputIcon class="pi pi-map" />
        <InputText
          v-model="region"
          class="w-full"
          id="region"
          placeholder="Ej: Antioquia"
          @input="addInformation"
        />
      </IconField>
      <ErrorMessage class="error-message" name="region" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col gap-2">
        <label class="labels" for="city">Ciudad:</label>
        <IconField>
          <InputIcon class="pi pi-building" />
          <InputText
            v-model="city"
            class="w-full"
            id="city"
            placeholder="Ej: Medellin"
            @input="addInformation"
          />
        </IconField>
        <ErrorMessage class="error-message" name="city" />
      </div>

      <div class="flex flex-col gap-2">
        <label class="labels" for="postalCode">Código postal:</label>
        <IconField>
          <InputIcon class="pi pi-map" />
          <InputText
            v-keyfilter.int
            v-model="postalCode"
            class="w-full"
            id="postalCode"
            placeholder="Código postal"
            @input="addInformation"
            maxlength="8"
          />
        </IconField>
        <ErrorMessage class="error-message" name="postalCode" />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label class="labels" for="phone">Número de teléfono:</label>
      <IconField>
        <InputIcon class="pi pi-phone" />
        <InputText
          v-keyfilter.int
          v-model="phone"
          class="w-full"
          id="phone"
          placeholder="Número de teléfono"
          @input="addInformation"
          maxlength="10"
        />
      </IconField>
      <ErrorMessage class="error-message" name="phone" />
    </div>

    <div class="flex py-6 gap-2">
      <Button label="Anterior" severity="secondary" @click="emit('prevStep')" />
      <Button type="submit" label="Realizar pago" :loading="isLoading" @click="onSubmit" />
    </div>
  </div>
</template>

<style lang="css" scoped></style>
