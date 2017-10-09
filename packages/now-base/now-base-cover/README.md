# now-base-cover 基础组件 封面

默认支持 onClick , onTouchStart 等 原生 DOM 事件，
可传入 style 进行自定义样式修改

## API

| 属性          | 说明                               | 类型     | 默认值 | 是否必传 |
| ------------- | ---------------------------------- | -------- | ------ | -------- |  
| placeholder  | 默认图片地址    | string   |  -      | 否       |
| src     |  封面的图片地址                   | string     | -  | 否       |
| style          |  CSS 内联 style | object   | -      | 否       |
| onClick(任意dom事件) |  dom 事件名,  | function | - | 否 | 


## 安装

```
npm install now-base-cover
```

## 传参示例

``` 
import Cover from 'now-base-cover'
<Cover src="a.png">
  封面里的内容
</Cover>
```

