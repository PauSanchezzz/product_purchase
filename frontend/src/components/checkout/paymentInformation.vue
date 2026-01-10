<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const emit = defineEmits(['nextStep', 'prevStep'])

export interface getCardValues {
  number: string
  name: string
  expMonth: string
  expYear: string
  ccv: string
}

const { handleSubmit, errors, meta, setFieldValue } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      number: z.string().min(16, 'Número de tarjeta incompleto').max(19),
      name: z.string().min(2, 'Nombre del titular requerido'),
      expMonth: z.string().min(2, 'Mes requerido'),
      expYear: z.string().min(4, 'Año requerido'),
      ccv: z.string().min(3, 'CVV incompleto').max(4),
    }),
  ),
})
const sendFormActive = ref(false)
const currentYear = new Date().getFullYear()
const years = ref(Array.from({ length: 15 }, (_, i) => currentYear + i))

const setCardValues = (values: getCardValues) => {
  store.commit('setPurchase', {
    ...store.state.purchase,
    payment: {
      cardNumber: values.number,
      cardHolder: values.name,
      cardExpiration: values.expMonth + '/' + values.expYear,
      cardCvv: values.ccv,
    },
  })
  setFieldValue('number', values.number)
  setFieldValue('name', values.name)
  setFieldValue('expMonth', values.expMonth)
  setFieldValue('expYear', values.expYear)
  setFieldValue('ccv', values.ccv)
}

const sendForm = () => {
  sendFormActive.value = true
  onSubmit()
}

const onSubmit = handleSubmit(async (values, $event: any) => {
  emit('nextStep')
})
</script>

<template>
  <div class="payment-container">
    <div class="errors-container" v-if="Object.keys(errors).length > 0 && sendFormActive">
      <p v-for="(error, field) in errors" :key="field" class="error-message">
        {{ error }}
      </p>
    </div>
    <NbCreditCard
      :flip-on-hover="false"
      :form-shadow="false"
      :show-form="true"
      @card-values="setCardValues"
      cardBackground="linear-gradient(315deg, #3A68A2, #6CBCE7)"
      cardCcvText="CVV"
      cardExpirationText="Exp."
      cardHolderText="Titular"
      chip-model="two"
      form-input-active-color="#0d6bb4"
      form-input-background="white"
      form-input-border="#d4d6d4"
      format-mode="two"
      formBackground="transparent"
      formCcvText="CVV"
      formColor="black"
      formExpMonthDefaultText="Mes"
      formExpMonthText="Mes"
      formExpYearDefaultText="Año"
      formExpYearText="Año"
      formInputRadius="6"
      formHolderText="Titular"
      formNumberText="Número de tarjeta"
      nb-id="credit-card"
      :years="years"
    />
    <div class="flex py-6 gap-2">
      <Button label="Anterior" severity="secondary" @click="emit('prevStep')" />
      <Button label="Siguiente" class="general-button" @click="sendForm" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.payment-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.errors-container {
  margin-top: 1rem;
  padding: 10px;
  background-color: #fff5f5;
  border-left: 4px solid #f56565;
  border-radius: 4px;
}
</style>
