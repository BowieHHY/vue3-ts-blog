import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import ElementPlus from 'element-plus'
import { nextTick } from 'vue'
import flushPromises from 'flush-promises'
import * as mockData from '@/mock'

// 测试数据
jest.mock("axios", () => ({
  get: (url: string) => ({
    data: [mockData.todayPost, mockData.thisWeek, mockData.thisMonth]
  })
}))

describe('Home.vue', () => {
  // it("解决TimeLine异步问题", () => {
  //   mount({
  //     template: `<Suspense><TimeLine /></Suspense>`
  //   })
  // })

  it("测试加载动画", () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [ElementPlus]
      }
    })
    // 是否存在
    expect(wrapper.find("[data-test='progress']").exists()).toBe(true)
  });

  it('测试', async () => {
    // vue3-cli中有提示 : no more createLocalVue
    const wrapper = mount(Home, {
      global: {
        plugins: [ElementPlus]
      }
    })

    //解决异步的问题
    await flushPromises();

    // method one
    // const periods = wrapper.findAll("li")
    // console.log(periods)
    // expect(periods.length).toBe(3)

    //method two
    // expect(wrapper.findAll('li')).toHaveLength(3) 

    //method three
    console.log(wrapper.html()) // <progress class="progress is-primary is-small"></progress>
    expect(wrapper.findAll("[data-test='period']")).toHaveLength(3)

  });
  it("测试li标签的事件功能", async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [ElementPlus]
      }
    })
    //解决异步的问题
    await flushPromises();

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
    const wrapper = mount(Home, {
      global: {
        plugins: [ElementPlus]
      }
    })

    //解决异步的问题
    await flushPromises();

    //还要拿到数据才可以通过

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
