# now-base-avatar 基础头像

 特性，支持 lazyload， 具有一个默认头像，默认大小 50px, 50px，  图片为 svg ，自定义大小,不会失真
可传入 style 进行自定义样式修改, 可以透传事件

## API

| 属性          | 说明                               | 类型     | 默认值 | 是否必传 |
| ------------- | ---------------------------------- | -------- | ------ | -------- |  
| placeholder  | 默认图片地址    | string   |  -      | 否       |
| src     |  封面的图片地址                   | string     | -  | 否       |
| style          |  CSS 内联 style | object   | -      | 否       |
| onClick(任意dom事件) |  dom 事件名,  | function | - | 否 | 


## 安装

```
npm install now-base-avatar
```

## 传参示例

```js
import Avatar from 'now-base-avatar'
<Avatar src="a.png">
    显示的文字
</Avatar>
```

