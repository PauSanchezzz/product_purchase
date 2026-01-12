import type {
  Product,
  GetProductsResponse,
  GetProductResponse,
} from '@/interfaces/products.interface'

export interface ProductsState {
  productsList: Product[]
  selectedProduct: Product | null
  loading: boolean
  error: string | null
}

const PRODUCTS_URL = `${import.meta.env.VITE_BASE_URL || '/api'}/products`

const productsModule = {
  namespaced: true,
  state: (): ProductsState => ({
    productsList: [],
    selectedProduct: null,
    loading: false,
    error: null,
  }),
  getters: {
    productsList: (state: ProductsState) => state.productsList,
    selectedProduct: (state: ProductsState) => state.selectedProduct,
    isLoading: (state: ProductsState) => state.loading,
    error: (state: ProductsState) => state.error,
  },
  mutations: {
    set_products(state: ProductsState, products: Product[]) {
      state.productsList = products
    },
    set_selected_product(state: ProductsState, product: Product | null) {
      state.selectedProduct = product
    },
    set_loading(state: ProductsState, loading: boolean) {
      state.loading = loading
    },
    set_error(state: ProductsState, error: string | null) {
      state.error = error
    },
  },
  actions: {
    async fetchProducts({ commit }: any) {
      commit('set_loading', true)
      commit('set_error', null)
      try {
        const response = await fetch(PRODUCTS_URL)
        if (!response.ok) {
          throw new Error(`Fetch error: ${response.statusText}`)
        }
        const data: GetProductsResponse = await response.json()
        commit('set_products', data.productsList)
      } catch (error: any) {
        commit('set_error', error.message)
        console.error('Fetch error:', error)
      } finally {
        commit('set_loading', false)
      }
    },
    async fetchProductById({ commit }: any, id: number) {
      commit('set_loading', true)
      commit('set_error', null)
      commit('set_selected_product', null)
      try {
        const response = await fetch(`${PRODUCTS_URL}/${id}`)
        if (!response.ok) {
          throw new Error(`Fetch error: ${response.statusText}`)
        }
        const data: GetProductResponse = await response.json()
        commit('set_selected_product', data.product)
      } catch (error: any) {
        commit('set_error', error.message)
        console.error('Fetch error:', error)
      } finally {
        commit('set_loading', false)
      }
    },
  },
}

export default productsModule
