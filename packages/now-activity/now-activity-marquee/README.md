# now-activity-marquee 跑马灯组件

默认支持 onClick , onTouchStart 等 原生 DOM 事件，
可传入 style 进行自定义样式修改，
可传入子组件定义样式

## API

| 属性          | 说明                               | 类型     | 默认值 | 是否必传 |
| ------------- | ---------------------------------- | -------- | ------ | -------- |  
| text          | 文字内容            | string   | ''      | 否       |
| autoPlay      | 是否自动播放                   | bool     | false  | 否       |
| loop          | 是否循环播放 | bool   | false      | 否       |


## 安装 
```
npm install now-activity-marquee
```

## 传参示例

``` 
import Marquee from 'now-activity-marquee'

<Marquee
    text="不吹不黑，只能说IVWEB的now design很棒啊，用了的人都说好，哈哈"
    autoPlay={true}
    loop={true}
/>
```

