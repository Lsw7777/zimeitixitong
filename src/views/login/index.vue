<template>
  <div class="login-container">

    <div class="login-form-wrap">
      <div class="login-head">

      </div>
      <!-- 每个表单项都必须使用 el-form-item 组件包裹 -->
      <el-form class="login-form" ref="login-form" :model="user" :rules="formRules" label-width="100px">
        <el-form-item label="手机号:" prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- v-model="user.mobile" 一定要和下面data中的数据绑定好-->
        <!-- placeholder="请输入手机号" 用于输入框文字提示-->

        <!-- 表单输入内容格式验证步骤
          1.给 el-from 整个表单组件绑定:model="user"为表单验证的数据对象user为具体输入数据的集合对象
          2.给需要验证的各个表单项 el-form-item 绑定 prop 属性，内容为数据名称如prop="mobile"
            绑定的名称作为下面的一个验证规则名称，同时必须绑定在user这个大的数据对象中
          3.通过给 el-from 整个表单组件添加 rules 属性配置验证规则，内容formRules为自定义，要在下面data中定义
          4.设置点击登录按钮时，强制触发表单验证，设置el-from中的ref，名字自定义-->
        <!-- 通过ref调用element ui 自带的validate方法 -->

        <el-form-item label="验证码:" prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
          <!-- 选择是否同意框与下面绑定，默认为false -->
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
          <!-- 这是登录按钮 -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  //   import request from '@/utils/request'
  //  此部分内容在api中封装使用了
  import {
    login
  } from '@/api/user'

  export default {
    name: 'LoginIndex',
    components: {},
    props: {},
    data() {
      return {
        user: {
          mobile: '', // 手机号
          code: '', // 验证码
          agree: false
        },
        loginLoading: false,
        // 点击登录是否开启等待状态，在这里先关闭，等用户点击登录后再开启 
        formRules: {
          // 表单验证规则配置
          // 要验证的数据名称：规则列表[]
          // trigger 用来配置触发校验的时机，有两个选项，change 是当输入的内容发送变化的时候，blur 当失去焦点的时候
          mobile: [{
              required: true,
              message: '请输入您的手机号',
              trigger: 'blur'
            },
            {
              min: 7,
              max: 12,
              message: '长度在 7 到 12 个字符',
              trigger: 'blur'
            }
          ],
          code: [{
              required: true,
              message: '请输入验证码',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 12,
              message: '长度在 5 到 12 个字符',
              trigger: 'blur'
            }
          ],
          agree:
            // validator是element ui定义的 里面的参数对应下面的内容
            [{
              validator: (rule, value, callback) => {
                if (value) {
                  callback()
                  // 验证通过：callback()
                } else {
                  callback(new Error('请同意用户协议'))
                  // 验证失败：callback(new Error('错误消息'))
                }
              },
              // message: '请勾选同意用户协议',
              trigger: 'change'
            }]
        }
      }
    },
    computed: {},
    watch: {},
    created() {},
    // 写在created中的是页面初始化加载时就要加载的内容，在这里调用加载，在下面methods定义具体方法内容
    // 登录请求并不是页面开始就要执行的操作，不写在这里，不调用，写在上面结构中的按钮内，点击后才调用
    mounted() {},
    methods: {
      onLogin() {
        // 实现登录步骤 1.先在methods定义登陆按钮点击的方法（onlogin（））
        // 2.获取表单数据（根据接口要求绑定数据）
        // 3.请求登录
        // 4.处理后端响应的结果 
        // 5.在成功的后面添加 this.$router.push 跳转到指定页面

        // const user = this.user
        // 这里就是根据接口绑定数据，使用下面使用直接用user即可，不用再this.user
        // 因为后来改了方法内容，将登录方法分成了两个，先验证再登录，登录方法独立出去了，写在onLogin中的这个也就没用了
        // 下面login中可以再使用这个，但也可以不用，直接this.user


        // 表单验证，直接复制就行
        // validate 方法是异步的
        this.$refs['login-form'].validate(valid => {
          if (!valid) {
            return
            // 如果表单验证失败，return，不执行下面的登录代码
          }
          // 验证成功，请求登录，调用登录方法
          this.login()
        })
      },
      login() {
        //  将登录的整个内容放进login方法中，使上面表单验证后再调用登录请求，防止无数据无效登录
        this.loginLoading = true
        //  开启登录中等待状态，在下面发完请求后再关闭

        login(this.user).then(res => {
          console.log(res)
          // 这个log是用来测试的，确认是否成功获取数据，用完后最好删除
          // data 就是请求的数据，用来设置 POST 请求体，这里直接用this.user
          // then后面是服务器响应成功后
          this.$message({
            //   添加一个成功的消息提示，写在then的里面
            message: '登录成功',
            type: 'success'
          })
          this.loginLoading = false
          //    关闭登录中

          // 将接口返回的用户相关数据放到本地存储，方便应用数据共享
          // 本地存储只能存储字符串
          // 如果需要存储对象、数组类型的数据，则把他们转为 JSON 格式字符串进行存储
          // setItem方法作为 Storage 接口的方法，用来存储对象，第一个参数是自定义的名字，第二个值是数据
          // JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串
          window.localStorage.setItem('user', JSON.stringify(res.data.data))

          // 跳转到首页
          // this.$router.push('/')，下面这种方法更直观好理解一点
          this.$router.push({
            name: 'home'
            // 可以直接用name来跳转
          })

        }).catch(err => {
          console.log('登录失败', err)
          //  失败的响应结果
          this.$message.error('登录失败，手机号或验证码错误')

          this.loginLoading = false
          //    关闭登录中
        })
      }
    }

  }
</script>
<style scoped lang="less">
  .login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    // 先去除默认的边距
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // 垂直居中
    background: url('./login_bg1.jpg') no-repeat;
    // 设置背景图
    background-size: cover;
    // cover 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。

    .login-form-wrap {
      min-width: 300px;
      padding: 60px 90px 40px 30px;
      background-color: #fff;

      .login-head {
        width: 170px;
        height: 60px;
        background: url('./biaozhi.png') no-repeat;
        background-size: 170px;
        margin: 0 0 50px 110px;
      }

      .login-form {
        .login-btn {
          width: 100%;
        }
      }
    }
  }
</style>