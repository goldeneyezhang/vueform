import Vue from 'vue'
import Message1 from '../../../src/components/Message1.vue'

describe('Message1', () => {
    // Inspect the generated HTML after a state update
it('updates the rendered message when vm.message updates', done => {
    const vm = new Vue(Message1).$mount()
    vm.message = 'foo'
  
    // wait a "tick" after state change before asserting DOM updates
    Vue.nextTick(() => {
      console.log(vm.$el.textContent)
      expect(vm.$el.textContent).to.equal('foo')
      done()
    })
  })
})