# 开发规范

## 主要原则

1. 所有源代码使用 es6 语法，代码发布前都需经过 babel 转码发布
2. babel 编译必须包含以下 preset  `babel-preset-react`, `babel-preset-es2015-loose`, `babel-preset-stage0`
3. 所有组件需要提供测试用例 

## 组件命名
- 基础组件 `now-base-*`
- 展示组件 `now-display-*`
- 数据组件 `now-data-*`
- 高阶组件 `now-highorder-*`

## 函数申明顺序

  1. 可选的 `static` 方法
  1. `constructor` 构造函数
  1. `getChildContext` 获取子元素内容
  1. `componentWillMount` 模块渲染前
  1. `componentDidMount` 模块渲染后
  1. `componentWillReceiveProps` 模块将接受新的数据
  1. `shouldComponentUpdate` 判断模块需不需要重新渲染
  1. `componentWillUpdate` 上面的方法返回 `true`， 模块将重新渲染
  1. `componentDidUpdate` 模块渲染结束
  1. `componentWillUnmount` 模块将从DOM中清除, 做一些清理任务
  1. *点击回调或者事件处理器* 如 `onClickSubmit()` 或 `onChangeDescription()`
  1. *`render` 里的 getter 方法* 如 `getSelectReason()` 或 `getFooterContent()`
  1. *可选的 render 方法* 如 `renderNavigation()` 或 `renderProfilePicture()`
  1. `render` render() 方法


  ## 组件要求
  1. 所有 React 组件必须编写 PropTypps， 申明对应类型
  2. 不运行在 render 方法中 bind 任何组件函数