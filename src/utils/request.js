// 这是基于axios封装的一个请求模块
// 以前写在main.js里面，但最好单独一个模块，更清晰

import axios from 'axios'

// axios()
// axios.get()
// axios.post()


const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基础路径
})

// 创建一个 axios 实例，说白了就是复制了一个 axios
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
// request是自定义的，可以使用多个不同的接口，命名不同的名字
// 也可以用axios.defaults.basrURL='http://ttapi.research.itcast.cn/'
// 但这种方式只能用在有一个接口的情况下，多个接口就重复了

//  这是一个请求拦截器
request.interceptors.request.use(
  // 任何所有请求会经过这里
  // config 是当前请求相关的配置信息对象
  // config 是可以修改的
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))

    // 如果有登录用户信息，则统一设置 token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // 然后我们就可以在请求发起之前设置一些要求和内容
    // 例如：统一的设置 token

    // 当这里 return config 之后请求在会真正的发出去
    return config
  },
  // 请求失败，会经过这里
  function (error) {
    return Promise.reject(error)
  }
)




export default request
// 导出请求方法
// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })