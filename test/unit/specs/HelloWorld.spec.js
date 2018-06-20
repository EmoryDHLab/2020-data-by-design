import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'

const init = () => {
  const Constructor = Vue.extend(HelloWorld)
  const vm = new Constructor().$mount()  
}

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const vm = init()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
