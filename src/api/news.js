import request from '@/utils/request'

// 封装获取文章求情函数

/**
 *
 * @param {String,NUmber} channel_id  // 频道的id
 * @param {NUmber}} timestamp 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
 * @returns
 */

export const getArticlesAPI = (channel_id, timestamp) => {
  return request({
    // 默认get请求!
    url: '/v1_0/articles',
    // 需要携带两个参数,去请求相应的数据
    params: {
      channel_id,
      timestamp
    }
  })
}
