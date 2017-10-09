# now-base-apptoast app阻断式通知栏

Toast 默认 Fixed 定位， 出现在页面顶部， 文字默认距离顶部 20px

## Props

| 属性          | 说明                                 | 类型     | 默认值 | 是否必传 |
| ------------- | ------------------------------------ | -------- | ------ | -------- |  
| type         |  Toast 样式 , 'success', 'error', 'info', 'warn'    | string | 'info'     | 否      |
| top           |  文字距离顶部位置 | number | 20 | 否 |


## Method 

- create(opts)

opts 与 Props 构造一样， 调用 create 后会直接创建一个 Toast。

会返回一个引用，可以通过该引用关闭Toast。
```
const appToast = AppToast.create({
  type: 'error'
  content: '错误'
});

appToast.remove()
```

``

## 传参示例

``` 
import AppToast from 'now-base-apptoast'
<AppToast type={1} disabled={true} style={buttonStyle} top={0}>
  显示的文字
</AppToast>


```

