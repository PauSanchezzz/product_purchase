<script setup lang="ts">
import { ErrorMessage, useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import Checkbox from 'primevue/checkbox'
import { nextTick, onMounted } from 'vue'
import Button from 'primevue/button'

const emit = defineEmits(['nextStep'])

const { handleSubmit, errors, meta } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      terms: z
        .boolean({ message: 'Debes aceptar los términos y condiciones' })
        .refine((value) => value === true, {
          message: 'Debes aceptar los términos y condiciones',
        }),
      secondTerms: z
        .boolean({ message: 'Debes aceptar los términos y  2' })
        .refine((value) => value === true, {
          message: 'Debes aceptar los términos y  2',
        }),
    }),
  ),
})

const { value: terms } = useField<boolean>('terms')
const { value: secondTerms } = useField<boolean>('secondTerms')

const onSubmit = handleSubmit(async (values, $event: any) => {
  console.log(values)
  emit('nextStep', '2')
})

onMounted(() => {
  nextTick(async () => {})
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div>
      <div class="flex items-center gap-3">
        <Checkbox v-model="terms" binary inputId="terms" />
        <label for="terms"> Terminos y condiciones </label>
      </div>
      <ErrorMessage class="error-message" name="terms" />
    </div>
    <div>
      <div class="flex items-center gap-3">
        <Checkbox v-model="secondTerms" binary inputId="secondTerms" />
        <label for="secondTerms"> Terminos y condiciones </label>
      </div>
      <ErrorMessage class="error-message" name="secondTerms" />
    </div>
  </div>
  <div class="py-6">
    <Button label="Siguiente" class="general-button" @click="onSubmit" />
  </div>
</template>

<style lang="css" scoped></style>
