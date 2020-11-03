<template>
  <!-- default-active是默认的激活的index地址 ，active-text-color激活的文字颜色-->
  <el-menu class="nav-menu el-menu-vertical-demo" :default-active="$route.path" background-color="#002033"
    text-color="#fff" active-text-color="#ffd04b" router>
    <!-- router开启导航模式，开启之后，点击下面绑定好index的按键才能路由跳转 -->
    <img src="@/views/login/biaozhi.png" alt="">
    <!-- 记住文件图片路径是  /  不是   \  -->
    <el-menu-item index="/">
      <!-- index是路由的地址，也就是点击后跳转到的网址 -->
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-document"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="el-icon-picture"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="el-icon-platform-eleme"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="el-icon-s-order"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="el-icon-star-off"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'AppAside',
    components: {},
    props: [],
    data() {
      return {

      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<style scoped lang="less">
  img {
    width: 200px;
    height: 58px;
  }

  .el-menu-item {

    span {
      font-size: 17px !important;
    }

  }
</style>