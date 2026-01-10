import { createStore } from 'vuex'

export default createStore({
  state: {
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
      state.product = {
        name: '',
        price: 0,
        quantity: 0,
      }
    },
    setPurchase(state: any, purchase: any) {
      state.purchase = purchase
    },
  },
  actions: {
    resetPurchase({ commit }: any) {
      commit('resetPurchase')
    },
  },
  modules: {},
})
