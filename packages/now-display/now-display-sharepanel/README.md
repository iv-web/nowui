# now-display-sharepanel  分享面板

## API


| 属性          | 说明                                               | 类型     | 默认值 | 是否必传 |
| ------------- | -------------------------------------------------- | -------- | ------ | -------- |  
| types      |  需要分享的渠道和排列顺序， 支持 wechat(微信好友) timeline(朋友圈) qq(手机qq) qzone(qq空间) weibo(微博) 5种渠道 | array   |  ['wechat', 'timeline', 'qq', 'qzone', 'weibo']      | 否       |
| show    |  展示还是隐藏分享面板  |  boolean | true | 否 |
| onCancel   | 点击取消时的回调  | function | - | 是 |
| onClick    |  点击每个渠道时的回调 | function | - | 是 |

## Method

- create(opts)

opts 与 Props 构造一样， 调用 create 后会直接创建一个 Dialog。

会返回一个引用，可以通过该引用关闭分享面板
```
const sharePanel = SharePanel.create({
    types: ['wechat', 'timeline', 'qq', 'qzone', 'weibo'],
    onClick(typeName) {
        // Do somethine
    },
    onCancel() {
        sharePanel.remove()
    }
});
```

``

## 安装
```
npm install now-display-sharepanel
```


## 使用示例

``` 
import Sharepanel from 'now-display-sharepanel'

let show = true;

<Sharepanel show={show} types={ ['wechat', 'timeline', 'qq', 'qzone', 'weibo'] } onCancel={() => { show = false; }} />
```

