import { createStore } from 'vuex'

const STORAGE_KEY = 'purchase_store'

const initialState = {
  product: {
    name: '',
    price: 0,
    quantity: 0,
  },
  purchase: {
    terms: {
      term1: false,
      term2: false,
    },
    shipping: {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    payment: {
      cardNumber: '',
      cardHolder: '',
      cardExpiration: '',
      cardCvv: '',
    },
  },
}

const persistedState = localStorage.getItem(STORAGE_KEY)
const state = persistedState ? JSON.parse(persistedState) : initialState

export default createStore({
  state,
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
      Object.assign(state, JSON.parse(JSON.stringify(initialState)))
    },
    setPurchase(state: any, purchase: any) {
      state.purchase = purchase
    },
    clearStore(state: any) {
      Object.assign(state, JSON.parse(JSON.stringify(initialState)))
    },
  },
  actions: {
    resetPurchase({ commit }: any) {
      commit('resetPurchase')
    },
    clearStore({ commit }: any) {
      commit('clearStore')
      localStorage.removeItem(STORAGE_KEY)
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
