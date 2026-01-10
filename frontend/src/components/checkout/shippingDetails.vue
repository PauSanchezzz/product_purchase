<script setup lang="ts">
import { ErrorMessage, useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useStore } from 'vuex'
import { nextTick, onMounted } from 'vue'

const store = useStore()
const emit = defineEmits(['nextStep', 'prevStep'])

const { handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      firstName: z
        .string({ message: 'El nombre es obligatorio' })
        .min(1, 'El nombre es obligatorio'),
      lastName: z
        .string({ message: 'El apellido es obligatorio' })
        .min(1, 'El apellido es obligatorio'),
      address: z
        .string({ message: 'La dirección es obligatoria' })
        .min(1, 'La dirección es obligatoria'),
      postalCode: z
        .string({ message: 'El código postal es obligatorio' })
        .min(1, 'El código postal es obligatorio'),
      phoneNumber: z
        .string({ message: 'El número de teléfono es obligatorio' })
        .min(1, 'El número de teléfono es obligatorio'),
    }),
  ),
})

const { value: firstName } = useField<string>('firstName')
const { value: lastName } = useField<string>('lastName')
const { value: address } = useField<string>('address')
const { value: postalCode } = useField<string>('postalCode')
const { value: phoneNumber } = useField<string>('phoneNumber')

const onSubmit = handleSubmit(async (values, $event: any) => {
  emit('nextStep', '3')
})

const setInformation = () => {
  resetForm({
    values: {
      firstName: store.state.purchase.shipping.firstName,
      lastName: store.state.purchase.shipping.lastName,
      address: store.state.purchase.shipping.address,
      postalCode: store.state.purchase.shipping.postalCode,
      phoneNumber: store.state.purchase.shipping.phoneNumber,
    },
  })
}

const addInformation = () => {
  store.commit('setPurchase', {
    ...store.state.purchase,
    shipping: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      postalCode: postalCode.value,
      phoneNumber: phoneNumber.value,
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
          v-model="firstName"
          class="w-full"
          id="firstName"
          placeholder="Nombre"
          @input="addInformation"
        />
      </IconField>
      <ErrorMessage class="error-message" name="firstName" />
    </div>

    <div class="flex flex-col gap-2">
      <label class="labels" for="lastName">Apellido:</label>
      <IconField>
        <InputIcon class="pi pi-user" />
        <InputText
          v-model="lastName"
          class="w-full"
          id="lastName"
          placeholder="Apellido"
          @input="addInformation"
        />
      </IconField>
      <ErrorMessage class="error-message" name="lastName" />
    </div>

    <div class="flex flex-col gap-2">
      <label class="labels" for="address">Dirección:</label>
      <IconField>
        <InputIcon class="pi pi-map-marker" />
        <InputText
          v-model="address"
          class="w-full"
          id="address"
          placeholder="Dirección completo"
          @input="addInformation"
        />
      </IconField>
      <ErrorMessage class="error-message" name="address" />
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

    <div class="flex flex-col gap-2">
      <label class="labels" for="phoneNumber">Número de teléfono:</label>
      <IconField>
        <InputIcon class="pi pi-phone" />
        <InputText
          v-keyfilter.int
          v-model="phoneNumber"
          class="w-full"
          id="phoneNumber"
          placeholder="Número de teléfono"
          @input="addInformation"
          maxlength="10"
        />
      </IconField>
      <ErrorMessage class="error-message" name="phoneNumber" />
    </div>

    <div class="flex py-6 gap-2">
      <Button label="Anterior" severity="secondary" @click="emit('prevStep')" />
      <Button label="Siguiente" class="general-button" @click="onSubmit" />
    </div>
  </div>
</template>

<style lang="css" scoped></style>
