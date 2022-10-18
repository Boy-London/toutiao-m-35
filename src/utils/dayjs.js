// 导入dayjs
import dayjs from 'dayjs'
// 导入中文配置包
require('dayjs/locale/zh-cn')
// 告诉dayjs 需要使用dayjs的简体中文！
dayjs.locale('zh-cn')

// 配置插件,显示绝对时间
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
// 必须在组件导入 adyjs封装的这个包！
export default dayjs
