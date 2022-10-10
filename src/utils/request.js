
//配置总的服务请求地址,基地址

// 导入axios
import axios from 'axios'

const  request = axios.create({
    baseURL:'http://toutiao.itheima.net', //基地址
   timeout:'3000' //请求延时 超过时间直接404
})
export default request  //向外暴露
 
/**不要用传统的 :axios.defaults.baseURL:'xxxxxxx'
传统的配置会导致一个项目只能用一个baseurl地址!
而aixos.create()方法可以配置多个url地址,适用不同的请求方法!

*/
