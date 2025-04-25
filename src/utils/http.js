import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: "http://192.168.31.213:7070", // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 例如：统一添加token
    // if (store.getters.token) {
    //   config.headers['Authorization'] = 'Bearer ' + store.getters.token
    // }
    return config
  },
  error => {
    // 对请求错误做些什么
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    const res = response.data
    // 这里可以根据后端返回的状态码进行判断
    // if (res.code !== 200) {
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
    return res
  },
  error => {
    // 对响应错误做点什么
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service