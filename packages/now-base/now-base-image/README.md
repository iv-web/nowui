# now-base-image 图片加载器

支持 placeholder 的图片加载器， 当图片加载前和图片加载失败时，都会使用 placeholder 图片

## API

| 属性          | 说明                                 | 类型     | 默认值 | 是否必传 |
| ------------- | ------------------------------------ | -------- | ------ | -------- |
| src         | 要加载的图片地址  | 'string' | - | 是 |
| placeholder |  'default' 'search', 'chat', 'gift', 'error' 中选择一个   | 可选  |  'default'      | 否       |
| forceshow   | 无论加载与否， 失败与否，强制使用 src 作为图片 | 可选 | false | 否 |
| tag         | 要用什么标签展示这个图片 | string | div | 否 |
| className   | - | string | - | 否 | 
| style       | - | object | - | 否 |


## 安装

```
npm install now-base-image
```

## 使用示例
```
import Image from 'now-base-image'

<Image src="avatar.png" placeholder="logo.jpg">
  显示的文字
</Image>
```