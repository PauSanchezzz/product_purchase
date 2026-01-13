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
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const purchase = computed(() => store.state.purchase)

const orderResponse = computed(() => store.getters['order/orderResponse'])
const orderId = computed(() => orderResponse.value?.id)
const personalDataAuthStore = computed(() => store.state.purchase.terms.personalDataAuth)
const endUserPolicyStore = computed(() => store.state.purchase.terms.endUserPolicy)
const step = computed(() => store.state.purchase.step)

const approveTerms = () => {
  const prefirmedToken = {
    personalDataAuth: {
      acceptance_token: personalDataAuthStore.value.acceptance_token,
    },
    endUserPolicy: {
      acceptance_token: endUserPolicyStore.value.acceptance_token,
    },
  }
  store.dispatch('order/updatePrefirmedToken', {
    orderId: orderId.value,
    payload: prefirmedToken,
  })
}

const sendOrder = async () => {
  const payment = store.state.purchase.payment
  const [exp_month, exp_year] = payment.cardExpiration.split('/')

  const paymentTransformed = {
    number: payment.cardNumber.replace(/\s/g, ''),
    cvc: payment.cardCvv,
    exp_month: exp_month,
    exp_year: exp_year.slice(-2),
    card_holder: payment.cardHolder,
  }

  const sendData = {
    card: paymentTransformed,
    orderId: orderId.value,
    shippingInformation: purchase.value.shipping,
  }

  try {
    await store.dispatch('order/processPayment', sendData)
  } finally {
    router.push({ name: 'payment-result' })
  }
}
</script>

<template>
  <div class="full-page max-md:flex-col md:px-[3rem] md:pt-[120px] pb-6">
    <div class="w-full max-md:pr-[1rem] max-md:order-2">
      <div class="card">
        <Stepper :value="String(step)" linear>
          <StepItem value="1">
            <Step>Terminos y condiciones</Step>
            <StepPanel v-slot="{ activateCallback }">
              <ApproveTerms
                @nextStep="
                  () => {
                    approveTerms()
                    activateCallback('2')
                  }
                "
              />
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
                @nextStep="
                  () => {
                    sendOrder()
                  }
                "
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
