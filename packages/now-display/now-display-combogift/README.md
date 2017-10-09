# now-display-combogift 连击展示效果
连击礼物的展示效果

## Props

| 属性          | 说明                 | 类型              | 默认值 | 是否必传 |
| ------------- | -------------------- | ----------------- | ------ | -------- |  
| messages      | 要展示的礼物信息，message详细构造参考示例     | array             | []     | 是       |
| mustShowCount | 如果传入的 combocount 是 50， mustShowCount 是 5， 则连击显示时，会从 45 开始显示到 50  | number | 3 | 否 |

## 安装
```
npm install now-display-combogift
```

## 使用说明

messages 中每个对象必须传入 key 对象， key 对象会用于判断， 这是一次新的连击，还是再之前显示的连击数上增长。
如果要移除掉正在展示的某条连击消息, 则该消息对应的 message 对象, 从数据中移除即可。

## 传参示例

``` 
import ComboGift from 'now-display-combogift'

<ComboGift
  messages = {
    [{
        gift: {
          smallIcon: "//8.url.cn/huayang/resource/yule/new_gift/ilivenew/memeda91.png?1474554672",
          giftName: "么么哒",
          comboCount: "50",
          pageX: 0,  // 抛出礼物动画的起始位置 X
          pageY: 0   // 抛出礼物动画的起始位置 Y
        },
        key: 'comboevent1',
        userPic: "http://p.qlogo.cn/hy_personal/2af2c7169c4994d8b72f45ef7ef5651b9d42fc293c9222477feca52da3eaeaabc35bb6000b246a99/",
        userNick: "风靡万千少女"
    }]
  }
/>
```

