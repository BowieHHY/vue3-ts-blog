import { mount } from '@vue/test-utils'
import PostsWriter from '@/components/PostsWriter.vue'
import ElementPlus from 'element-plus'
import { basePost } from '@/mock'


describe('PostsWriter.vue', () => {

  it("测试写博客组件", () => {
    const wrapper = mount(PostsWriter, {
      global: {
        plugins: [ElementPlus]
      },
      props: {
        post: { ...basePost }
      }
    })

    wrapper.find('[data-test="post-title"]').setValue("hhytest") //赋值没有问题
    wrapper.find<HTMLDivElement>('[data-test="markdown"]').element.innerText = 'hhy markdown' //需要触发事件
    wrapper.find('[data-test="markdown"]').trigger("input")
    wrapper.find('[data-test="submit-post"]').trigger("click")
    console.log(wrapper.emitted().savePost) //打印触发事件
  });
})