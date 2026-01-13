import { createStore } from 'vuex'
import productsModule from './products.store'
import orderModule from './order.store'

const STORAGE_KEY = 'purchase_store'

export const initialState = {
  product: {
    name: '',
    price: 0,
    id: 0,
    image: '',
    description: '',
    quantity: 0,
  },
  purchase: {
    step: 1,
    terms: {
      personalDataAuth: {
        accepted: false,
        acceptance_token: '',
      },
      endUserPolicy: {
        accepted: false,
        acceptance_token: '',
      },
    },
    shipping: {
      customer: '',
      customerEmail: '',
      address: '',
      country: 'CO',
      region: '',
      city: '',
      postalCode: '',
      phone: '',
    },
    payment: {
      cardNumber: '',
      cardHolder: '',
      cardExpiration: '',
      cardCvv: '',
    },
  },
}

export const createPurchaseStore = (preloadedState?: any) => {
  const state = preloadedState || JSON.parse(JSON.stringify(initialState))

  return createStore({
    state,
    modules: {
      products: productsModule,
      order: orderModule,
    },
    getters: {
      product: (state: any) => state.product,
      totalPrice: (state: any) => state.product.price * state.product.quantity,
      purchase: (state: any) => state.purchase,
    },
    mutations: {
      setProduct(state: any, product: any) {
        state.product = product
      },
      resetPurchase(state: any) {
        state.product = { ...initialState.product }
        state.purchase = JSON.parse(JSON.stringify(initialState.purchase))
      },
      setPurchase(state: any, purchase: any) {
        state.purchase = purchase
      },
      clearStore(state: any) {
        state.product = { ...initialState.product }
        state.purchase = JSON.parse(JSON.stringify(initialState.purchase))
      },
    },
    actions: {
      resetPurchase({ commit }: any) {
        commit('resetPurchase')
      },
      clearStore({ commit }: any) {
        commit('clearStore')
        commit('order/clearStore')
        localStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem('order_store')
      },
    },
    plugins: [
      (store) => {
        store.subscribe((mutation, state) => {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        })
      },
    ],
  })
}

const persistedState = localStorage.getItem(STORAGE_KEY)
const preloadedState = persistedState ? JSON.parse(persistedState) : undefined

export default createPurchaseStore(preloadedState)
