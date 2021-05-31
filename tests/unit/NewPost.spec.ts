import { mount } from '@vue/test-utils'
import NewPost from '@/views/NewPost.vue'
import ElementPlus from 'element-plus'
import { useStore } from '@/store'
import { Post } from '@/types'

const mockRoutes: any[] = []


// 测store 模拟router  还有路由跳转

//模拟路由 要不然报⚠️
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: (url: string) => {
      mockRoutes.push(url)
    }
  }),
}));

jest.mock("axios", () => ({
  post: (url: string, payload: Post) => {
    return { data: payload }
  }
}))

describe('NewPost.vue', () => {

  it("测试添加博客组件", async () => {
    const store = useStore()
    const wrapper = mount(NewPost, {
      global: {
        plugins: [ElementPlus],
        provide: {
          store
        }
      }
    })

    expect(store.getState().posts.ids).toHaveLength(0)
    //需要触发才能
    await wrapper.find('[data-test="submit-post"]').trigger("click")
    //等待页面加载完 再执行测试那一快
    await wrapper.vm.$nextTick()
    expect(store.getState().posts.ids).toHaveLength(1)
    expect(mockRoutes).toEqual(["/"])
    console.log(store.getState().posts)
    console.log(mockRoutes) //[]


    //   wrapper.find('[data-test="submit-post"]').trigger("click")
    //   console.log(wrapper.emitted().savePost) //打印触发事件
  });
})