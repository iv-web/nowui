# now-activity-tab 活动选项卡组件

活动tab 选项卡组件

## API

| 属性          | 说明                               | 类型     | 默认值 | 是否必传 |
| ------------- | ---------------------------------- | -------- | ------ | -------- |  
| tabsData          | 选项卡数据            | array   | -      | 是       |
| defaultSelectIndex      | 默认选择的选项卡位置                   | number     | 0  | 否       |
| callback          | 回调选择选项卡(Index,name) | function   | -      | 否       |


## 安装 
```
npm install now-activity-tab
```

## 传参示例

``` 
import Tab from 'now-activity-tab'

    const tabs = ['女神榜', '男神榜', '新人榜', '潜力榜'];
	<Tab
        callback={this.tabClick}
        defaultSelectIndex={selectedTabIndex}
        tabsData={tabs}
    />
```

