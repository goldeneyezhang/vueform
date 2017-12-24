import Vue from 'vue'
import SelfButton from '../../../src/components/SelfButton.vue'
describe('SelfButton', () => {
  it('has a created hook', () => {
    expect(typeof SelfButton.created).to.equal('function')
  })

  it('sets the correct default data', () => {
    const defaultData = SelfButton.data()
    expect(defaultData.text).to.equal('Hello Spec')
  })

  it('sets new text when created', () => {
    const vm = new Vue(SelfButton).$mount()
    expect(vm.text).to.equal('Bye Spec')
  })

  it('renders the correct text', () => {
    const Ctor = Vue.extend(SelfButton)
    const vm = new Ctor().$mount()
    expect(vm.$el.textContent).to.equal('Bye Spec')
  })
})