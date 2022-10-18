//  index作为所有请求的出口文件！
// index.js中按需导出的loginAPI
// 引入所有的按需导出东西,再原封不动的按需导出！

// index.js代表所有请求接口的出口·
export * from './user'

// 中间桥梁导出 chaner 请求函数
export * from './channel'

// 中间导出新闻列表请求函数
export * from './news'

// 导出search 搜索函数
export * from './search'
