## git 操作

### 核心操作

1. 将代码提交到本地仓库

- 提交到暂存区 git add . 将目录下所有的文件添加到暂存区
- 提交到本地仓库 git commit -m 'commit message'

2. 将本地仓库同步到远程仓库

- 建立本地仓库和远程仓库的链接 git remote add 远程仓库的小名(origin) 远程仓库的地址(https/ssh)
- 推送代码 git push
  - 第一次推送新分支代码的时候 git push -u 远程仓库的小名(origin) 本地分支名:远程分支名
    如果说本地分支名和远程分支名一样, 可以省略 eg: git push -u origin master

### 杂项

// 2. git log
// - 查看 commit 记录
// - 查看有一条 commit 记录, 是 vue 帮我们初始化的

// 3. git status
// - 查看当前 git 仓库状态

// 4. git add . 将所有文件添加的暂存区

// 5. git commit -m''
// - 将文件提交到本地仓库

// 6. git remote add origin 仓库地址
// - 建立本地仓库和远程仓库的链接

// 7. git remote -v
// - 查看当前仓库关联的远程仓库, 显示你给远程仓库起的小名还有远程仓库的具体地址

// 8. git push -u origin 本地分支名:远程分支名
// - 推送代码到远程仓库指定分支
// - 如果本地分支名和远程分支名相同可以省略

// 9. 创建并切换分支
// - git checkout -b 分支名

// 10. 查看分支
// - git branch



// 11. 切换分支名
// - git checkout 分支名

// 1. 安装vant(注意: 安装的vue2对应的vant)
//   -  yarn add vant@latest-v2 -S
// 2.在main.js引入vant
//  - import Vant from 'vant'
//  - import 'vant/lib/index.css'
//  - Vue.use(Vant)
// 3. 测试vant
//  - cv button那妞
// 4. 提交代码
// - git add .
// - git commit -m 'feat:初始化vant'
// - git push


### 路由的懒加载

1. 什么是多页面应用: 有多个 html 文件
2. 什么是单页面应用(SPA --> single page application) : 有一个 html 文件
3. 单页面应用的缺点?

- 首屏加载速度慢?
- webpack 打包的时候 是从入口(main.js)打包, 打包到出口(app.js), 他会把所有的路由组件打包进 app.js
  并且在第一次请求的时候, 加载所有的路由组件

- 使用路由懒加载
- 只有使用到了路由组件, 采取加载他


### Eslint

> 代码风格检查工具

1. 如何关闭 eslint

- lintOnSave: false
- 关闭 elint 的检查, 关闭的编译时候的检查, 不关闭插件的 eslint 检查

2. 插件 VScode 的插件 Eslint

   > 功能就是读取根目录下的 eslint 的配置, 违反了规则, 在编辑器上提示

3. 如何根据 eslint 的规则格式化代码

   > vscode 的插件 prettier-eslint

- @installed 显示已经安装过的插件
- 1.关闭其他的格式化代码工具 (prettier,beautify,err-lens)
- 2. 将 prettier-eslint 设置为默认的格式化工具
- 3. 保存的时候自动格式化

4. 缺点

- 不能读取所有的 eslint 配置

5. 手动关闭 eslint 规则

   > 1. eslintrc 里修改 rules

   ```js
   // 规则: 新增一些规则, 关闭规则
   // key: 规则名称 : off/0关闭, error/2错误, warn/1 警告
   rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //手动需要关闭的规则！
    'vue/multi-word-component-names': 'off'
   }

   2. /* eslint-disable-next-line */ /* eslint-disable-line */

    3.
   /* eslint-disable */ 禁用从这个注释一下的eslint规则


   4. 项目的根目录下 新建.eslintignore, 和gitignore写法一样
   ```