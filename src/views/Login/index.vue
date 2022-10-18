<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="登录" class="navbar" />

    <!-- 登录表单 -->
    <!--
1，input没有name属性不能提交数据!必须有name属性！代表收集用户的输入的信息
2,form表当中,任何一个button都会触发submit事件!不一定需要type='submit'
3，name属性是表当的标识符！
 -->
    <van-form @submit="onSubmit" class="from" ref="form">
      <!-- ref表示获取组件的实例,获取表单元素对象 -->
      <van-field
        v-model="mobile"
        name="moblie"
        type="number"
        placeholder="请输入手机号"
        :rules="mobliRrules"
        maxlength="11"
      >
        <!--使用插槽就不能使用单标签了,最好还是用双标签！-->
        <!-- 插槽不在form表单中，而是在field输入框--slots组件中！ -->
        <!--#left-icon表示具名插槽 -->
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>

      <van-field
        v-model="code"
        type="number"
        maxlength="6"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRrules"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>

        <!-- 验证码 -->
        <template #button>
          <van-count-down
            v-if="isShowCodeBtn"
            :time="3000"
            format="ss 秒"
            @finish="isShowCodeBtn = false"
          />

          <van-button
            v-else
            class="code-btn"
            type="default"
            size="small"
            round
            native-type="button"
            @click="getCode"
            >验证码</van-button
          >
        </template>
      </van-field>

      <!--提交按钮  -->
      <div>
        <van-button block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 按需导入longAPi请求接口
import { loginAPI, getCodeAPI } from '@/api'
import { mapMutations } from 'vuex' // 导入token

export default {
  data() {
    // 正则数组可以书写在这
    const mobliRrules = [
      { required: true, message: '请输入手机号' },
      {
        trigge: 'onChange',
        pattern:
          /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
        message: '请输入正确的手机号'
      }
    ]

    const codeRrules = [
      { required: true, message: '验证码' },
      {
        trigge: 'onChange',
        pattern: /^\d{6}$/,
        message: '请输入正确验证码'
      }
    ]

    return {
      // 手机号,验证码变量
      mobile: '',
      code: '',
      // 定义的正则规则变量!
      mobliRrules,
      codeRrules,
      isShowCodeBtn: false
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']), // 解构token
    // 登录验证
    async onSubmit() {
      // 表示这俩数据,用this.code this.moblie进行结构! 少写this
      const { code, mobile } = this

      // $toast是vant组件自带的语法！用于提示语句！
      this.$toast.loading({
        message: '登录中...',
        forbidClick: 0 // 持续时间默认为0
      })

      try {
        const res = await loginAPI(mobile, code) // 获取后台数据！
        console.log(res)

        const { data } = res // 解构token！！！获取data,获取data.token!

        this.$router.push('/profile') // 登录跳转

        this.$toast.success('登录成功')

        this.SET_TOKEN(data.data) // 必须存储touken,作为身份令牌！

        console.log(res)
        // 将错误信息细分,判断出具体的错误
      } catch (error) {
        // 区分js导致的错误还是axios导致的错误
        // axios封装的错误对象
        // - 对象.response.data存储这后端返回的具体数据！
        // -对象 .response .status 后端返回的状态码
        if (error.response?.status === 400) {
          // ?. 是es11的语法,表示判断一个对象有没有这个值，没有放回的一个undefend === false!
          this.$toast.fail(error.response.data.message)
        } else {
          // js 导致的错误，或者507
          throw error // 抛出错误! 返回控制台！
        }
      }
    },

    // 验证码验证登录
    async getCode() {
      // 1,获取表单元素,识别具体表单对象！
      // validate用来验证哪一个表单元素.通过name值识别！
      await this.$refs.form.validate('moblie')

      // 2,显示倒计时
      this.isShowCodeBtn = true

      //  3,提示looding
      this.$toast.loading({
        message: '发送中....',
        forbidClick: true
      })

      // 4,发送验证码
      try {
        await getCodeAPI(this.mobile)
        this.$toast.success('发送验证码成功')
        this.SET_TOKEN(data.data) // 验证token
      } catch (error) {
        // 细分错误细节!
        if (error.response?.status === 429) {
          this.$toast.fail(error.response.data.message)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
//最好不要用组件中的类名,自定义类名！
.navbar {
  background: #007bff;

  // 如果设置不了组件的样式,使用vue中的：deep语法,对组件库中的样式进行穿透,可以自定义样式！
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .toutiao {
    padding: 120px;
  }
}

//组件样式添加不上注意权重的问题,可以自己加类名或者用:(deep)穿透
:deep(form) {
  .toutiao {
    font-size: 40px;
  }
  .van-field__label {
    flex: 1;
  }
  .van-field__value {
    flex: 30;
  }
}

.van-button {
  background-color: skyblue;
  border: 0;
}
.code-btn {
  height: 0.64rem;
  background-color: #ededed;
  width: 160px;
}
</style>
