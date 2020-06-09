import { mount } from '@vue/test-utils'
import MediaCarousel from '@/components/MediaCarousel.vue'

describe('MediaCarousel', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(MediaCarousel)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
