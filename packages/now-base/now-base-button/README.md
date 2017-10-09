# now-base-button 按钮组件

默认支持 onClick , onTouchStart 等 原生 DOM 事件，
可传入 style 进行自定义样式修改，
可传入子组件定义样式

## API

| 属性          | 说明                               | 类型     | 默认值 | 是否必传 |
| ------------- | ---------------------------------- | -------- | ------ | -------- |  
| type          | 按钮类型 可选值 1，2，3            | number   | 1      | 否       |
| dislabed      | 是否显示礼物面板                   | bool     | false  | 否       |
| size          | 余额信息 可选值 large,middle,small | string   | -      | 否       |


## 安装 
```
npm install now-base-button
```

## 传参示例

``` 
import Button from 'now-base-button'

<Button type={1} disabled={true} style={buttonStyle}>
  显示的文字
</Button>
```

