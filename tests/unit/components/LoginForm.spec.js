import { mount } from '@vue/test-utils'
import LoginAnd from '../../../src/components/LoginAnd.vue'

describe('LoginAnd.vue', () => {
  it('验证空用户名和密码', async () => {
    const wrapper = mount(LoginAnd)
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.text()).toContain('用户名不能为空')
    expect(wrapper.text()).toContain('密码不能为空')
  })

  it('验证用户名格式', async () => {
    const wrapper = mount(LoginAnd)
    await wrapper.find('#username').setValue('test@')
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.text()).toContain('用户名格式不正确')
  })

  it('验证密码长度', async () => {
    const wrapper = mount(LoginAnd)
    await wrapper.find('#password').setValue('12345')
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.text()).toContain('密码长度至少6位')
  })

  it('验证成功登录', async () => {
    const wrapper = mount(LoginAnd)
    await wrapper.find('#username').setValue('test@example.com')
    await wrapper.find('#password').setValue('123456')
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.emitted()).toHaveProperty('login-success')
  })
})