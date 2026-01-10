<script setup lang="ts">
import Stepper from 'primevue/stepper'
import StepItem from 'primevue/stepitem'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import ApproveTerms from '@/components/checkout/approveTerms.vue'
import PaymentInformation from '@/components/checkout/paymentInformation.vue'
import ShippingDetails from '@/components/checkout/shippingDetails.vue'
import SummaryCard from '@/components/summaryCard.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const purchase = computed(() => store.state.purchase)
</script>

<template>
  <div class="full-page max-md:flex-col md:px-[3rem] md:pt-[120px]">
    <div class="w-full max-md:pr-[1rem] max-md:order-2">
      <div class="card">
        <Stepper value="1" linear>
          <StepItem value="1">
            <Step>Terminos y condiciones</Step>
            <StepPanel v-slot="{ activateCallback }">
              <ApproveTerms @nextStep="activateCallback('2')" />
            </StepPanel>
          </StepItem>
          <StepItem value="2">
            <Step>Información de pago</Step>
            <StepPanel v-slot="{ activateCallback }">
              <PaymentInformation
                @nextStep="activateCallback('3')"
                @prevStep="activateCallback('1')"
              />
            </StepPanel>
          </StepItem>
          <StepItem value="3">
            <Step>Detalle de envío</Step>
            <StepPanel v-slot="{ activateCallback }">
              <ShippingDetails
                @nextStep="activateCallback('4')"
                @prevStep="activateCallback('2')"
              />
            </StepPanel>
          </StepItem>
        </Stepper>
      </div>
    </div>
    <div class="w-full max-md:px-[1rem] max-md:pb-[1rem] max-md:order-1">
      <SummaryCard />
    </div>
  </div>
</template>

<style lang="css" scoped>
.full-page {
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
}
</style>
