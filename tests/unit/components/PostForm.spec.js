import { mount } from '@vue/test-utils'
import PostForm from '../../../src/components/PostForm.vue'

describe('PostForm.vue', () => {
  it('验证空标题和内容', async () => {
    const wrapper = mount(PostForm)
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.text()).toContain('标题不能为空')
    expect(wrapper.text()).toContain('内容不能为空')
  })

  it('验证标签格式', async () => {
    const wrapper = mount(PostForm)
    await wrapper.find('#tags').setValue('tag1,tag2,tag3')
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.text()).not.toContain('标签格式不正确')
  })

  it('验证成功发帖', async () => {
    const wrapper = mount(PostForm)
    await wrapper.find('#title').setValue('测试标题')
    await wrapper.find('#content').setValue('测试内容')
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.emitted()).toHaveProperty('post-success')
  })
})