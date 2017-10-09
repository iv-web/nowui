# now-base-titlebar 视图滑动切换组件

## 说明

该组件用于不同的视图层间，通过滑动切换来切换的组件

## Props

| 属性          | 说明                                           | 类型     | 默认值 | 是否必传 |
| ------------- | ----------------------------------------------| -------- | ------ | -------- |
| showBack     | 是否显示回退按钮                           | bool   | true        | 否       |
| showShare |  是否显示分享按钮                           | bool   | true     | 否       |
| onBack     | 点击回退按钮的回调                            | function   | -         | 否       |
| onShare     | 点击分享按钮的回调                           | function   | -         | 否       |

onIndexChange(index)

当容器里面的Panel切换时候的回调


## 安装
```
npm install now-base-scroller
```


## 传参示例

``` javascript
import TitleBar from 'now-base-scroller'
<TitleBar
   onShare={() => {}}
   onBack={ ()=> {}}
>
```
