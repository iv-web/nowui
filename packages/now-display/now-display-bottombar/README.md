# now-display-bottombar 底部提示条

一般用于下载 APP 提示。

## API

| 属性        | 说明           | 类型     | 默认值 | 是否必传 |
| ----------- | -------------- | -------- | ------ | -------- |  
| wording     | 下载提示信息   | string   | -      | 否       |
| downWording | 下载按钮文案   | string   | -      | 否       |
| logo        | 展示的 APP logo| string  | -      | 否       |
| onClick     | 点击下载条事件 | function | -      | 否       |
  

## 安装
```
npm install now-display-downloadbar
```

## 传参示例

``` 
import Downloadbar from 'now-display-downloadbar'
const props = {
    wording: '点我下载now',
    downWording: '下载',
    logo: 'https://11.url.cn/now/activity/april-lottery/img/logo_e29054a.png',
    onClick: () => {
        console.log('click')
    }
}

<Downloadbar {...props} />
```

