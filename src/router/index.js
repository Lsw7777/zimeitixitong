import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
// @表示src，不受当前路径的影响，不要忘记/，这是在webpack中定义的，方便填写路径
// 当名字为index时，可以省略后面的具体文件，系统会自动找到
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
// 每一个新的组件都分三步，第一取好name，第二引入路由组件，第三写进routes中写好path和component

Vue.use(VueRouter)

// 这是路由配置表
// 路由配置表
const routes = [{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // 路由中的name是为了动态地传递参数，参考login 164行
    // 命名路由 layout 有一个子路由，这个名字没有意义，所以警告
    // 正确的做法是：如果有子路由，就不要给父路由起名字了！
    // name: 'layout',
    component: Layout,
    children: [{
      // 我们通常会把根路径 / 设置为网站的首页，网站首页其实都有/只是省略了，如www.baidu.com
      // 为啥呢？因为我们在手动输入网址访问网站的时候，可以省略 /
      path: '', // path 为空，会作为默认子路由渲染，即进入页面默认为该子路由

      // 路由的名字是干啥的？
      // 参考：https://gitee.com/lipengzhou/toutiao-publish-admin/issues/I1F1BA
      name: 'home',
      component: Home
    }, {
      path: '/article',
      name: 'article',
      component: Article
    }, ]
  }
]

const router = new VueRouter({
  routes
})



// 路由导航守卫（拦截器）的作用就是控制页面的访问状态
// beforeEach 是全局前置守卫，任何页面的访问都要经过这里
// 路由导航守卫：说白了所有页面的导航都会经过这里
// 守卫页面的导航的
// to：要去的路由信息
// from：来自哪里的路由信息
// next：放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  // 允许通过
  // next()

  const user = JSON.parse(window.localStorage.getItem('user'))

  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录，允许通过
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})

// 我们在组件中使用的 this.$router 其实就是这个模块中的 router
export default router