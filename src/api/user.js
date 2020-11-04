// 封装请求模块，这里是user有关用户的请求模块
// 对于项目中的请求操作：接口请求可能会重复使用， 实际工作中，接口非常容易变动，改起来麻烦
// 我们建议的做法是把所有的请求都封装成函数然后统一的组织到模块中进行管理
// 这样做的好处就是：管理维护更方便，也可以重复使用

import request from '@/utils/request'
// 先要将定义好的request导入，原来的index.vue中的可以删掉了

// 用户登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data 用来设置 POST 请求体，这个data自定义的，作为一个参数来接收数据或传输数据
    // 传入或接收的数据是什么它就是什么但一般为了有语义设置如下
    // Body 参数使用 data 设置 一般get用body参数
    // Query 参数使用 params 设置 一般post用query参数
    // Headers 参数使用 headers 设置
    // 封装成函数login(),调用时在括号内加上参数作为请求数据即可使用
    data
  })
}
// 获取用户信息
export const getUserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'))
  // 接口没有参数可以不写
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 后端要求把需要授权的用户身份放到请求头中,具体都要看api的要求
    // axios 可以通过 headers 选项设置请求头
    // headers: {
    //   // 属性名和值都得看接口的要求
    //   // 属性名：Authorization，接口要求的
    //   // 属性值：Bearer空格token数据
    //   // Bearer 就是持票人的意思，就好比你的学生证上写了学生证三个字
    //   Authorization: `Bearer ${user.token}`  `${}`  这是es6最新的拼接字符串格式
    // }
  })
}

// 修改用户信息
// export const updateUser = () => {

// }

// 修改用户头像
// 注意：data 必须传递 FormData 对象
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}

// 修改用户基本信息
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}