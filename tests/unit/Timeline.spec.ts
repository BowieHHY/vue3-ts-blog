import { mount } from '@vue/test-utils'
import TimeLine from '@/components/TimeLine.vue'
import ElementPlus from 'element-plus'
import { createApp } from '@vue/runtime-dom'

describe('TimeLine.vue', () => {
  it('测试', () => {
    // vue3-cli中有提示 : no more createLocalVue
    const wrapper = mount(TimeLine, {
      global: {
        plugins: [ElementPlus]
      }
    })

    // method one
    // const periods = wrapper.findAll("li")
    // console.log(periods)
    // expect(periods.length).toBe(3)

    //method two
    // expect(wrapper.findAll('li')).toHaveLength(3) 

    //method three
    expect(wrapper.findAll("[data-test='period']")).toHaveLength(3)


  })
})
