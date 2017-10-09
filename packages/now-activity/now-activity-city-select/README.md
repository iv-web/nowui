# now-activity-city-select 城市选择组件

默认支持 onClick , onTouchStart 等 原生 DOM 事件，
可传入 style 进行自定义样式修改，
可传入子组件定义样式

## API

| 属性          | 说明                               | 类型     | 默认值 | 是否必传 |
| ------------- | ---------------------------------- | -------- | ------ | -------- |  
| onCityClick          | 城市点击回调            | function   | 1      | 是       |


## 安装 
```
npm install now-activity-city-select
```

## 传参示例

``` 
import CitySelect from 'now-activity-city-select'

<CitySelect onCityClick={(item) => {alert(item)}}/>
```

