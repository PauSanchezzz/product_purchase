import { mount } from '@vue/test-utils'
import Card from '../Card.vue'
import Button from 'primevue/button'

const mockProduct = {
  id: 1,
  name: 'Camisa de manga corta',
  image: 'https://example.com/image.jpg',
  price: 1000,
  stock: 10,
  description: 'Una camisa muy bonita',
}

describe('Card.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(Card, {
      props: {
        product: mockProduct,
      },
      global: {
        components: {
          Button,
        },
      },
    })
    expect(wrapper.text()).toContain('Camisa de manga corta')
    expect(wrapper.text()).toContain('$ 1,000')
    expect(wrapper.find('.card-img-product').exists()).toBe(true)
  })

  it('emits viewDetailCard when button is clicked', async () => {
    const wrapper = mount(Card, {
      props: {
        product: mockProduct,
      },
      global: {
        components: {
          Button,
        },
      },
    })
    const button = wrapper.findComponent(Button)
    await button.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('viewDetailCard')
    expect(wrapper.emitted().viewDetailCard[0]).toEqual([mockProduct])
  })
})
