<template>
  <div class="home-container">


  </div>
  <!-- 为什么需要分页？第一页，第二页... -->
  <!-- 分页是为了缓解查询数据和渲染的压力，提高页面的响应速度，让用户更快看到页面 -->
  <!-- 因为网络上页面的数据大多是动态的，如文章，商品，评论等，数量也很庞大，如果一次性全加载，速度很慢 -->
  <!-- ctrl+f查找，alt+鼠标选择 多选统一操作 -->
</template>

<script>
  export default {
    name: 'HomeIndex',
    // 指定 name 便于调试代码。
    // 引入其他组件的时候要用到name
    // 另外，当在有 vue-devtools，未命名组件将显示成 <AnonymousComponent>，这没有语义。
    // 通过提供 name 选项，可以获得更有语义信息的组件树。
    // 结论：给一个组件起个名字是非常有意义的，尽量不要让组件的名字重复
    components: {},
    props: {},
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<style scoped lang="less">
  .home-container {
    width: 100%;
    height: 100%;
    background: url('./login_bg1.jpg') no-repeat;
  }
</style>