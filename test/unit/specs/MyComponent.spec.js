import Vue from 'vue'
import MyComponent from '../../../src/components/MyComponent.vue'

function getRenderedText(Component,propsData){
    const Ctor=Vue.extend(Component)
    const vm=new Ctor({propsData:propsData}).$mount()
    return vm.$el.textContent
}
describe('MyComponent',()=>{
    it('renders correctly with different props',()=>{
        expect(getRenderedText(MyComponent,{
            msg:'Hello'
        })).to.equal('Hello')

        expect(getRenderedText(MyComponent,{
            msg:'Bye'
        })).to.equal('Bye')
    })
 
})