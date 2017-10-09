# now-base-toast 通知栏

Toast 默认是 fixed 到页面顶部的。最好直接放置在顶级父级组件下。当然，这并不是严格固定的。

## 基本使用

默认 Toast 是自动隐藏的，事件设置是 2000ms （即，就是 2s）。另外，组件还提供，当组件消失时，执行的回调函数的借口。

```
// 默认方式使用
//      2ms 自动隐藏
//      空的回调函数
<Toast />

// 设置 回调时间为 3000ms
<Toast  timeout={3000}/>

// 设置回调函数和时间
<Toast  timeout={3000} callback={this.handleCall}/>

// 不消失 Toast
<Toast  lasting={true}/>
```


## API

| 属性          | 说明                                 | 类型     | 默认值 | 是否必传 |
| ------------- | ------------------------------------ | -------- | ------ | -------- |  
| type         |  Toast 样式 , 'success', 'error', 'info', 'warn'  | string | 无    | 否      |
| content      |  Toast 显示的具体提示信息             | string |  无    | 否      |
| timeout      |  Toast 制定消失时间  | number | 2000     | 否      |
| lasting      |  Toast 是否不消失    | boolean | false     | 否      |
| callback     |  Toast 消失时，执行的回调函数 | function | 空函数     | 否      |



