# now-display-banner 滚动banner

默认支持的图片的高宽比是 2:5,  并且根据宽度变化，高度会自适应，
如果需要支持其他尺寸的图片，请参考Props 设置.

## API

| 属性          | 说明             | 类型     | 默认值 | 是否必传 |
| --------------| -----------------| -------- | ------ | -------- |
| width         | banner 展示的区域宽度 | number | 父级元素的宽度 |  否 |
| ratio         | banner 展示图片的高宽比，用于适配, 例如banner 图片是 100* 40 那么 ratio=40/100 | number | 0.4 | 否 |
| items         | bannner的数据    | object   | -      | 是       |
| currentIndex  | 展示的banner索引 | number   | -      | 否        |
| onClickBanner | 点击banner       | function | -      | 否       |
| autoChange    | 是否自动切换      | boolean  | true   | 否       |
| rate          | 自动切换的频率（ms）| number  | 5000   | 否       |

## 安装
```
npm install now-display-banner
```

## 传参示例

``` 
import Banner from 'now-display-banner'
const props = {
    items: [{
        picUrl: 'https://pub.idqqimg.com/pc/misc/files/20170324/8d0f7c5842054d37a7b2bc12660986b0.png',
    }, {
        picUrl: 'https://pub.idqqimg.com/pc/misc/files/20170324/52425fcfe6564c349352fe0a66fdbb84.png'
    }, {
        picUrl: 'https://p.qpic.cn/qqconadmin/0/4bd001ff385c45ddac39f3e0827ac30f/0'
    }],
    currentIndex: 0
}

<Banner {...props} />
```

