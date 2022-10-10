
//login组件请求接口
import request from "@/utils/request" 

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
