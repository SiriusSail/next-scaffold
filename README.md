[TOC]



# 说明文档

## 项目介绍

### 运行

开发环境

```
npm i（初次运行）
npm run dev
打开 localhost:3000
```

### 技术栈

react（页面）+redux（数据管理）+next.js（后台渲染框架、路由管理）+node（页面路由重定向、接口转发）

> next.js
>
> 一个轻量级的 React 服务端渲染应用框架。

**功能：**

- 热代码更新: 检测磁盘文件更新即更新整个页面
- 自动路由: 映射文件系统路径至任意URL地址，无需任何配置
- 单文件组件: 使用自身集成的styled-jsx，可以给组件直接添加样式
- 服务端渲染: 发送html之前，你可以选择性在服务端渲染React组件
- 自动代码分割: 页面只会加载需要的js文件资源
- 预读取: `Link`链接组件，支持`prefetch`属性用于后台自动预读取页面资源，包括代码分割丢失的代码

**服务端渲染**

> server.js拦截请求，指定渲染相应模块
>
> 页面组件生命周期函数**getInitialProps**异步获取页面初始化数据，得到数据后预渲染界面再将页面返回给客户端展示
>
> 当页面初始化加载时，`getInitialProps`只会加载在服务端。只有当路由跳转（`Link`组件跳转或 API 方法跳转）时，客户端才会执行`getInitialProps`。

`getInitialProps`入参对象的属性如下：
> 
> - `pathname` - URL 的 path 部分
> - `query` - URL 的 query 部分，并被解析成对象
> - `asPath` - 显示在浏览器中的实际路径（包含查询部分），为`String`类型
> - `req` - HTTP 请求对象 (只有服务器端有)
> - `res` - HTTP 返回对象 (只有服务器端有)
> - `jsonPageRes` - 获取数据响应对象(只有客户端有)
> - `err` - 渲染过程中的任何错误

**路由**

> ``<Link>``

> 命令式 ``next/router``

`Router`API 如下：

> - `route` - 当前路由的`String`类型
> - `pathname` - 不包含查询内容的当前路径，为`String`类型
> - `query` - 查询内容，被解析成`Object`类型. 默认为`{}`
> - `asPath` - 展现在浏览器上的实际路径，包含查询内容，为`String`类型
> - `push(url, as=url)` - 页面渲染第一个参数 url 的页面，浏览器栏显示的是第二个参数 url
> - `replace(url, as=url)` - performs a `replaceState` call with the given url
> - `beforePopState(cb=function)` - 在路由器处理事件之前拦截.

路由事件

> - `routeChangeStart(url)` - 路由开始切换时触发
> - `routeChangeComplete(url)` - 完成路由切换时触发
> - `routeChangeError(err, url)` - 路由切换报错时触发
> - `beforeHistoryChange(url)` - 浏览器 history 模式开始切换时触发
> - `hashChangeStart(url)` - 开始切换 hash 值但是没有切换页面路由时触发
> - `hashChangeComplete(url)` - 完成切换 hash 值但是没有切换页面路由时触发

### 项目结构

![](./web.xmind)
查看web.xmind文件

## 高阶组件

介绍

> 接收一个组件并返回另外一个新组件的函数。 相比于普通组件将 `props` 转化成界面UI，高阶组件将一个普通组件转化为另外一个组件。

功能

> 2. `Props` 更改
> 3. `State` 抽象和更改
> 4. 渲染劫持

示例



### with-redux-store.js

> 输出带有redux数据的方法
>
> _app.js使用一次就不用再用，可以新增其他数据
>
## 常用公用组件

> 复用率高，公用组件封装，暴露的属性尽量只增不减。属性备注一定要写清楚，且没有数据绑定

## 编码规范

### css

> 使用'classify-nav-item'这种方案来命名类名，用减号代替空格。
>
> 尽量不要使用嵌入的方式写css样式。
>
> 独立的组件使用``<style scope jsx>{}</style>``的方式写css。
>
> static文件中：
>
> style.less 是写全局css属性的
>
> commStyle.less文件是用来写通用less函数，变量的。。

### js

> 1.命名
>
>   使用驼峰大小写的方式命名变量，如‘const swiperImgs = xxxx'。组件,class,构造函数采用大写开头的驼峰大小写。
>
> 2.变量声明
>
>   使用const和let代替var，尽量使用const，不知道用const还是let就先用const，报错就换成let。
>
> 3.箭头函数
>
>   尽量使用箭头函数替代，有this的调用可不使用。
>
> 4.如若要使用ES6及以上的promise，string.includes等新增方法，必须从core.js中import相关方法再使用。
>
> 5.使用对象属性和方法的简写，例如：
>
> ```
> //good
> 
> const data = 1111;
> const atom = {
>   data,
>   addData(){
> ​    return this.data++
>   }
> }
> 
> //bad
> const atom = {
>   data:data,
>   addData: function(){
> ​    return this.data++
>   }
> }
> ```
>
> 6.不确定引入多少的情况下谨慎使用扩展字符{...arg}.
>
> 7.创建对象和数组使用字面量：{},[]。而不是new Object()。。。
>
> 8.使用解构存取和使用多属性对象，减少临时变量。{a,b} = obj;
>
> 9.需要回传多个值的使用使用对象解构而不是数组解构，可以按需调取需要的变量。
>
> 10.程序化生成字符串的使用使用`${arg}`
>
> 11.永远不要在一个非函数代码块（if、while 等）中声明一个函数，把那个函数赋给一个变量。浏览器允许你这么做，但它们的解析表现不一致。
>
> 12.不要使用arguments而是使用（...rest）
>
> 13.给函数参数定义默认值function(a={})
>
> 14.如果一个函数只有一个参数，一个return值则括号都省略，使用箭头函数即可。test => console.log(test)
>
> 15.使用class，避免操作prototypes，使用extends继承。
>
> 16.一个const或者let一个变量。
>
> 17.优先使用===和!==而不是==或者!=
>
> 18.使用简写，if(a)而不是if(a!=='')
>
> 19.使用TODO:标注解决方式，FIXME:标注问题
>
> 20.使用2个空格作为缩进
>
> 21.使用尾逗号而不是首行逗号，babel会自动去掉尾逗号。
>
> 22.使用parseInt带上基数。
>
> 23.使用_命名私有属性。
>
> 24.不需要使用that或者self保存this，使用箭头函数即可。

### react

> 1.输出的组件名需与文件名一致。
>
> 2.每个文件只包含一个 React 组件， 不过可以包含多个 Stateless 或 Pure 组件。
>
> 3.组件文件使用jsx后缀命名。
>
>  .除非是从一个非 JSX 文件中初始化 app，否则不要使用 React.createElement
>
> 5.如果需要管理内部状态或 refs，优先使用 class extends Component
>
>   反之, 则优先使用普通函数(不建议使用箭头函数)。
>
> 6.不要使用混淆，使用HOC或者props.renders来提升组件的复用性。

### 其他

> 1.组件使用PropTypes规范传入值的类型。
>
> 2.有需求可以在.bablerc里面配置软链接，alias
