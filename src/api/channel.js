import   request   from "@/utils/request"


// 封装频道请求函数
export const getChannelAPl = () => {
    return request({
        url: '/v1_0/user/channels' 
        // 需要携带请求头参数,已经封装了请求拦截器,不需要再携带token！
    })      
}
