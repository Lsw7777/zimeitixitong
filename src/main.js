// 项目的启动入口， 前三行分别加载了vue，vue根组件，路由
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'
// 创建的全局样式表 index.less需要在main中加载导入后才能生效,字符串必须使用单引号
// import语句必须放在最前面中间不能有其他语句
import request from './utils/request'

const a = 123

Vue.use(ElementUI)
// 全局注册后才能正常使用



Vue.config.productionTip = false
// 这是关闭了生产环境提示

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
// 首先创建了根实例
// 然后把router配置到根实例中
// 再通过render方法，把app根组件渲染到了index.html首页中
// $mount('#app')等价于el:'#app'
// 创建vue cli中的babel是用来把JavaScript中es6的新语法转化为 es5，让低端浏览器能够认识并执行
