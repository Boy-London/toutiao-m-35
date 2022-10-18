import request from '@/utils/request'

// 封装频道请求函数
export const getChannelAPl = () => {
  return request({
    url: '/v1_0/user/channels'
    // 需要携带请求头参数,已经封装了请求拦截器,不需要再携带token！
  })
}

// 封装所有频道的接口
/**
 * 获取所有频道的数据
 * @returns promise
 */
export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

// 封装删除我的频道请求函数
/**
 * 删除用户指定模块
 * @param {Number} target
 * @returns  promise
 */

// 携带参数的 拼接请求！
export const delMyChannelAPI = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

// 添加我的频道
/**
 * 添加频道
 * @param {number} id
 * @param {number} seq
 * @returns
 */
// body类型的请求封装！ 'patch'类型请求,需要携带data指定的参数！

export const addMyChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    // 'PATCH'请求需要携带的参数！ 类型是body
    data: {
      channels: [
        {
          id,
          seq
        }
      ]
    }
  })
}
