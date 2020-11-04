<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {}
    },
    methods: {},
    created() {}
  }
  // 根实例只有一个，根实例的对象只有一个，不存在重用的问题，一旦重用会出现组件之间数据互相干扰，所以根实例的data是一个对象
  // 而其他组件可能会存在重用的情况，所以为了避免重用组件之间数据互相干扰，所以组件中的data使用函数，每个组重用的时候就会调用这个函数
  // 生产一个单独的data，数据在自己的内部管理，不会影响其他组件

  // 当你加载的目录路径只写到目录文件夹，没有指定到文件，它会自动查找index.js>index.vue>index.json，如果都没找到就会报错


  // 后端负责管理数据的存储，接口的开发
  // 前端是写能用户看到的内容
</script>

<style lang="less"></style>