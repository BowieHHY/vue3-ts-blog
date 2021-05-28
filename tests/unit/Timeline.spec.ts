import { mount } from '@vue/test-utils'
import TimeLine from '@/components/TimeLine.vue'
import ElementPlus from 'element-plus'
import { nextTick } from 'vue'

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

  });
  it("测试li标签的事件功能", async () => {
    const wrapper = mount(TimeLine, {
      global: {
        plugins: [ElementPlus]
      }
    })
    const $today = wrapper.findAll("li")[0];
    console.log($today)
    expect($today.classes()).toContain("is-active")

    const $thisWeek = wrapper.findAll("[data-test='period']")[1];
    $thisWeek.trigger('click')
    //让 dom 更新完毕 否则报错
    await nextTick()
    expect($today.classes()).not.toContain("is-active")
    expect($thisWeek.classes()).toContain("is-active")

    const $thisMonth = wrapper.findAll("[data-test='period']")[2];
    $thisMonth.trigger('click')
    //让 dom 更新完毕 否则报错
    await nextTick()
    expect($thisWeek.classes()).not.toContain("is-active")
    expect($thisMonth.classes()).toContain("is-active")
  });

  it("测试数据加载", async () => {
    const wrapper = mount(TimeLine, {
      global: {
        plugins: [ElementPlus]
      }
    })
    // 刚加载时
    expect(wrapper.findAll("[data-test='post']")).toHaveLength(1)

    const $thisWeek = wrapper.findAll("[data-test='period']")[1]
    await $thisWeek.trigger("click")
    expect(wrapper.findAll("[data-test='post']")).toHaveLength(2)

    const $thisMonth = wrapper.findAll("[data-test='period']")[2]
    await $thisMonth.trigger("click")
    expect(wrapper.findAll("[data-test='post']")).toHaveLength(3)
  })
})
