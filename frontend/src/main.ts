import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import NbPaymentsComponents from '@vlalg-nimbus/nb-payments'
import '@vlalg-nimbus/nb-payments/dist/style.css'
import ToastService from 'primevue/toastservice'
import store from '@/store/purchase.store'
import KeyFilter from 'primevue/keyfilter'

const customPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e5f0fa',
      100: '#cce0f5',
      200: '#99c2eb',
      300: '#66a3e0',
      400: '#3385d6',
      500: '#0d6bb4',
      600: '#0b5ea0',
      700: '#09508a',
      800: '#074275',
      900: '#05355f',
      950: '#032644',
    },
  },
})

const app = createApp(App)
app.use(ToastService)
app.directive('keyfilter', KeyFilter)

app.use(PrimeVue, {
  theme: {
    preset: customPreset,
    options: {
      darkModeSelector: false || 'none',
    },
  },
})
app.use(NbPaymentsComponents)
app.use(router)
app.use(store)

app.mount('#app')
