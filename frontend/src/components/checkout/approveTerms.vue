<script setup lang="ts">
import { ErrorMessage, useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import Checkbox from 'primevue/checkbox'
import { nextTick, onMounted, computed } from 'vue'
import Button from 'primevue/button'
import { useStore } from 'vuex'

const store = useStore()
const emit = defineEmits(['nextStep'])

const orderResponse = computed(() => store.getters['order/orderResponse'])
const personalDataAuthStore = computed(() => orderResponse.value?.prefirmedToken?.personalDataAuth)
const endUserPolicyStore = computed(() => orderResponse.value?.prefirmedToken?.endUserPolicy)

const { handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      personalDataAuth: z
        .boolean({ message: 'Debes aceptar el tratamiento de datos personales' })
        .refine((value) => value === true, {
          message: 'Debes aceptar el tratamiento de datos personales',
        }),
      endUserPolicy: z
        .boolean({ message: 'Debes aceptar la política de usuario final' })
        .refine((value) => value === true, {
          message: 'Debes aceptar la política de usuario final',
        }),
    }),
  ),
})

const { value: personalDataAuth } = useField<boolean>('personalDataAuth')
const { value: endUserPolicy } = useField<boolean>('endUserPolicy')

const onSubmit = handleSubmit(async (values, $event: any) => {
  emit('nextStep', '2')
  store.commit('setPurchase', {
    ...store.state.purchase,
    step: 2,
  })
})

const onTermsChange = () => {
  store.commit('setPurchase', {
    ...store.state.purchase,
    step: 1,
    terms: {
      personalDataAuth: {
        accepted: personalDataAuth.value,
        acceptance_token: personalDataAuthStore.value.acceptance_token,
      },
      endUserPolicy: {
        accepted: endUserPolicy.value,
        acceptance_token: endUserPolicyStore.value.acceptance_token,
      },
    },
  })
}

const setInformation = () => {
  resetForm({
    values: {
      personalDataAuth: store.state.purchase.terms.personalDataAuth.accepted,
      endUserPolicy: store.state.purchase.terms.endUserPolicy.accepted,
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
  <div class="flex flex-col gap-3">
    <div>
      <div class="flex items-center gap-3">
        <Checkbox
          v-model="personalDataAuth"
          binary
          inputId="personalDataAuth"
          @change="onTermsChange"
        />
        <label for="personalDataAuth">
          Acepto
          <a :href="personalDataAuthStore.permalink" target="_blank" class="link">
            Tratamiento de datos Personales
          </a>
        </label>
      </div>
      <ErrorMessage class="error-message" name="personalDataAuth" />
    </div>
    <div>
      <div class="flex items-center gap-3">
        <Checkbox v-model="endUserPolicy" binary inputId="endUserPolicy" @change="onTermsChange" />
        <label for="endUserPolicy">
          Acepto
          <a :href="endUserPolicyStore.permalink" target="_blank" class="link">
            Politica de usuario final
          </a>
        </label>
      </div>
      <ErrorMessage class="error-message" name="endUserPolicy" />
    </div>
  </div>
  <div class="py-6">
    <Button label="Siguiente" class="general-button" @click="onSubmit" />
  </div>
</template>

<style lang="css" scoped></style>
