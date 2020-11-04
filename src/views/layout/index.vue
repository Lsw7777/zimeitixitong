<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
      <AppAside class="aside-menu" />
      <!-- 导入子组件 -->
    </el-aside>
    <el-container>
      <el-header class="header">说明：这是一个类似今日头条的自媒体博客后台管理系统
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="">
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <!-- 组件默认是不识别原生事件的，除非有些组件内部自带做了处理 如el-button按钮 -->
            <!-- 解决方法：加 .native 修饰符 -->
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import AppAside from './components/aside'
  // export default 内的组件内容用 important..from..引入
  // 只有export的组件用import {  } from..
  import {
    getUserProfile
  } from '@/api/user'



  export default {
    name: 'LayoutIndex',
    components: {
      AppAside
      // 导入子组件步骤：1.创建子组件，并命名 
      // 2.在父组件中import..from..导入,并插入目标盒子位置中
      // 3.还必须写在父组件的comonents中
    },
    props: {},
    data() {
      return {
        user: {},
        // 当前用户的登录信息，绑定上面的用户名和头像
        // 向服务器发起请求来获取，再绑定到这
      }
    },
    computed: {},
    watch: {},
    created() {
      this.loadUserProfile()
      // 加载用户配置文件
      //  一般来说加载一个需要获取服务器响应的数据（如登录后显示的个人信息，页面中一打开就有的动态信息，如小说主页推荐的内容，广告热点等）
      // 步骤：1.先找到服务器接口以及发起请求的接口参数等要求
      // 2.使用封装好的方法发起服务器请求，这是一个方法
      // 3.在created中调用这个请求方法
      // 3把请求来的数据绑定在想要呈现在的目标位置中

      // this.user = data // 注意：不要这么做，对象之间赋值的是引用，会导致相互影响的问题
      this.user.name = data.name
      this.user.photo = data.photo
    },

    mounted() {},
    methods: {
      // 除了登录接口，其它所有接口都需要授权才能请求使用
      // 或者说，除了登录接口，其它接口都需要提供你的身份令牌才能获取数据
      // token就是令牌的意思
      loadUserProfile() {
        getUserProfile().then(res => {
          this.user = res.data.data
          // res是自定义的，接收到的服务器数据，这里作为参数，res.data.XXX 具体的某个数据
          // 把获取到的服务器数据赋值给组件内部的数据user

        })
      },

      onLogout() {
        // 退出就是两步 先清除登录状态，再跳转页面
        // this.$confirm是element ui 确认消息框，直接复制 记得去掉分号
        this.$confirm('确认退出吗？', '退出提示', {
          confirmButtonText: '确定',
          // 确定就会执行then后面的代码
          cancelButtonText: '取消',
          // 取消会执行catch后面的代码
          type: 'warning'
        }).then(() => {
          // 把用户的登录状态清除
          window.localStorage.removeItem('user')

          // 跳转到登录页面
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .layout-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 18px;
  }

  // 用定位四边都为零，就撑大了盒子
  .aside {
    background-color: #d3dce6;

    .aside-menu {
      height: 100%;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;

    .avatar-wrap {
      display: flex;
      align-items: center;

      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }

  .main {
    background-color: #e9eef3;
  }
</style>