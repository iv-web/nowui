# now-base-scroller 视图滑动切换组件

## 说明
该组件用于不同的视图层间，通过滑动切换来切换的组件

## Props
| 属性          | 说明                                           | 类型     | 默认值 | 是否必传 |
| ------------- | ----------------------------------------------| -------- | ------ | -------- |
| className     | 所有视图的容器的类名                           | bool   | -         | 否       |
| showIndicator | 是否展示翻页提示点                             | bool   | false     | 否       |
 
## Method 

onIndexChange(index)

当容器里面的Panel切换时候的回调


## 安装
```
npm install now-base-scroller
```


## 传参示例

``` 
import Scroller from 'now-base-scroller'
<Scroller>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
</Scroller>

// Scroller 的子元素都会添加 display: flex , 保证水平排列
```

