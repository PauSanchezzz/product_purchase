import type {
  CreateOrderResponse,
  FormCreateOrder,
  FormUpdatePrefirmedToken,
  GetOrderResponse,
} from '@/interfaces/order.interface'

export interface OrderState {
  orderResponse: CreateOrderResponse | GetOrderResponse | null
  loading: boolean
  error: string | null
}

const ORDER_URL = `${import.meta.env.VITE_BASE_URL || '/api'}/orders`
const ORDER_STORAGE_KEY = 'order_store'

// Load initial state from localStorage
const loadOrderFromStorage = (): CreateOrderResponse | GetOrderResponse | null => {
  try {
    const stored = localStorage.getItem(ORDER_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Error loading order from localStorage:', error)
    return null
  }
}

// Save order to localStorage
const saveOrderToStorage = (orderResponse: CreateOrderResponse | GetOrderResponse | null) => {
  try {
    if (orderResponse) {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orderResponse))
    } else {
      localStorage.removeItem(ORDER_STORAGE_KEY)
    }
  } catch (error) {
    console.error('Error saving order to localStorage:', error)
  }
}

const orderModule = {
  namespaced: true,
  state: (): OrderState => ({
    orderResponse: loadOrderFromStorage(),
    loading: false,
    error: null,
  }),
  getters: {
    orderResponse: (state: OrderState) => state.orderResponse,
    isLoading: (state: OrderState) => state.loading,
    error: (state: OrderState) => state.error,
  },
  mutations: {
    set_order_response(
      state: OrderState,
      orderResponse: CreateOrderResponse | GetOrderResponse | null,
    ) {
      state.orderResponse = orderResponse
      saveOrderToStorage(orderResponse)
    },
    set_one_order(state: OrderState, orderResponse: CreateOrderResponse | GetOrderResponse | null) {
      state.orderResponse = orderResponse
    },
    set_loading(state: OrderState, loading: boolean) {
      state.loading = loading
    },
    set_error(state: OrderState, error: string | null) {
      state.error = error
    },
    clearStore(state: any) {
      state.orderResponse = null
    },
  },
  actions: {
    async createOrder({ commit }: any, payload: FormCreateOrder) {
      commit('set_loading', true)
      commit('set_error', null)
      try {
        const response = await fetch(ORDER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        if (!response.ok) {
          throw new Error(`Fetch error: ${response.statusText}`)
        }
        const data: CreateOrderResponse = await response.json()
        commit('set_order_response', data)
        return data
      } catch (error: any) {
        commit('set_error', error.message)
        console.error('Fetch error:', error)
        throw error
      } finally {
        commit('set_loading', false)
      }
    },
    async updatePrefirmedToken(
      { commit }: any,
      { orderId, payload }: { orderId: string; payload: FormUpdatePrefirmedToken },
    ) {
      commit('set_loading', true)
      commit('set_error', null)
      try {
        const response = await fetch(`${ORDER_URL}/update-links/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        if (!response.ok) {
          throw new Error(`Fetch error: ${response.statusText}`)
        }
        return response.json()
      } catch (error: any) {
        commit('set_error', error.message)
        console.error('Fetch error:', error)
        throw error
      } finally {
        commit('set_loading', false)
      }
    },

    async getPaymentResult({ commit }: any, { orderId }: { orderId: string }) {
      commit('set_loading', true)
      commit('set_error', null)
      try {
        const response = await fetch(`${ORDER_URL}/${orderId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error(`Fetch error: ${response.statusText}`)
        }
        const data = await response.json()
        commit('set_order_response', data)
        return data
      } catch (error: any) {
        commit('set_error', error.message)
        console.error('Fetch error:', error)
        throw error
      } finally {
        commit('set_loading', false)
      }
    },
    clearOrder({ commit }: any) {
      commit('set_order_response', null)
    },
  },
}

export default orderModule
