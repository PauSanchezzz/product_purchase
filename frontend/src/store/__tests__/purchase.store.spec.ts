import { createPurchaseStore, initialState } from '../purchase.store'

jest.mock('../products.store', () => ({
  __esModule: true,
  default: {
    namespaced: true,
    state: () => ({
      productsList: [],
      loading: false,
      error: null,
    }),
    getters: {
      productsList: () => [],
      isLoading: () => false,
      error: () => null,
    },
    mutations: {
      set_products: jest.fn(),
      set_loading: jest.fn(),
      set_error: jest.fn(),
    },
    actions: {
      fetchProducts: jest.fn(),
    },
  },
}))

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {}
  return {
    getItem: function (key: string) {
      return store[key] || null
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString()
    },
    removeItem: function (key: string) {
      delete store[key]
    },
    clear: function () {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('purchase.store.ts', () => {
  let store: any

  beforeEach(() => {
    localStorage.clear()
    store = createPurchaseStore()
  })

  describe('getters', () => {
    it('product returns the product state', () => {
      const product = { name: 'Test Product', price: 10, quantity: 2 }
      store.commit('setProduct', product)
      expect(store.getters.product).toEqual(product)
    })

    it('totalPrice returns the correct total', () => {
      store.commit('setProduct', { name: 'Test', price: 10, quantity: 3 })
      expect(store.getters.totalPrice).toBe(30)
    })
  })

  describe('mutations', () => {
    it('setProduct updates the product state', () => {
      const product = { name: 'New Product', price: 20, quantity: 1 }
      store.commit('setProduct', product)
      expect(store.state.product).toEqual(product)
    })

    it('clearStore resets the state to initial', () => {
      store.commit('setProduct', { name: 'To be cleared', price: 10, quantity: 1 })
      store.commit('clearStore')
      expect(store.state.product.name).toBe(initialState.product.name)
      expect(store.state.product.price).toBe(initialState.product.price)
    })
  })

  describe('actions', () => {
    it('clearStore action commits clearStore and removes from localStorage', () => {
      localStorage.setItem('purchase_store', JSON.stringify({ product: { name: 'Persisted' } }))
      // Create store AFTER setting localStorage to test hydration if needed,
      // but here we test the action which removes it.
      store.dispatch('clearStore')
      expect(store.state.product.name).toBe('')
      expect(localStorage.getItem('purchase_store')).toBeNull()
    })
  })
})
