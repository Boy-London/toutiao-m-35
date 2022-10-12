
//login组件请求接口
import request from "@/utils/request" 
// 获取token 令牌
import  store  from  '@/store' 

/**
 * 
 * @param {string} mobile //手机号 
 * @param {string} code  //验证码
 * @returns promise 对象
 */

export const loginAPI = (mobile,code) => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data: {
            mobile,
            code,
        }
})
}

// 封装请求验证码接口

/**
 * 
 * @param {string} moblie //手机号 
 * @returns  promise    
 * 所有请求接口放回的都是promise实例对象!
 */

// 发送验证码接口 senSms接口
export const getCodeAPI = moblie => { //data表示箭头函数的形参
    return request({     //必须要ruten出结果
      method: 'GET',//类型
      // moblie表示传过来的参数，当前手机号
      url:`/v1_0/sms/codes/${moblie}` //monlie为参数需要携带参数过去
    })  
  }

  // 获取用户信息
export const getUserInfoAPI = () => {
  return request({
      url:'/v1_0/user',
    //理解headers, 请求头！将用户的token 进行传递进行识别！必须先导入store!
    // header表示后台规定传递的请求头！headers ==>params！
    // headers: {
    //   //传递用户的token,bearer 表示用户令牌！
    //   Authorization: ` Bearer  ${Bearerstore.state.tokenObj.token}`
    // }
    })
  }
// 获取用户信息,判断是否登录，每次都需要token令牌，过于冗余！
//基于aixos进行封装请求拦截器,每次get请求都会将token 传入后台，判断是否登录!