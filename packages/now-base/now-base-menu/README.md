# now-base-menu 基础菜单组件
底部弹出菜单

## Props

| 属性          | 说明                 | 类型              | 默认值 | 是否必传 |
| ------------- | -------------------- | ----------------- | ------ | -------- |  
| options      | 要展示的礼物信息     | array             | []     | 是       |
| show         | 是否展示            | boolean           |  -      | 是 |
| onClose      | 关闭时的回调        | function          | -       | 否 |


## 安装
```
npm install now-base-menu
```


## 传参示例

``` 
import Menu from 'now-base-menu'

const data = [{
    name: "管理",
    onClick: function() {}
}, {
    name: "个人中心",
    onClick: function() {}
}]

<Menu options={data} show={true} onClose={new Function()} />
```

