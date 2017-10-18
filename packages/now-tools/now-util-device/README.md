# device

获取设备类型

## API

### device.isXXX `{Boolean}`

is标示

### device.XXXVersion `{String}`

版本字段

### device.XXXUpper(version) `{Function(String):Boolean}`

版本大于等于判断

### device.XXXLower(version) `{Function(String):Boolean}`

版本小于等于判断

### device.XXXCompare(version) `{Function(String):Number}`

版本比较

#### return

- 1 高于版本
- 0 等于版本
- -1 低于版本
- -2 非相应客服端

### device.netType `{String}` `WIFI|4G|3G|2G`

从userAgent里提取的网络类型(QQ,微信均支持)

## Usage

```javascript
if (device.isQQ && device.QQUpper('6.3.5')) {
    console.log(device.androidVersion);
}
```

## 支持的设备

- device.isAndroid
- device.isIOS
- device.isQQ
- device.isQQBrowser QQ浏览器/X5
- device.isWeixin
- device.isHuayang 花样
- device.isJiaoyou 交友
- device.isJiaoyouDev 交友测试版
- device.isNow NowUI

