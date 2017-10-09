# now-activity-rule 活动规则组件

默认支持 onClick , onTouchStart 等 原生 DOM 事件，
可传入 style 进行自定义样式修改，
可传入子组件定义样式

## API

| 属性          | 说明                               | 类型     | 默认值 | 是否必传 |
| ------------- | ---------------------------------- | -------- | ------ | -------- |  
| title          | 标题            | string   |       | 否       |
| ruleList      | 规则列表                   | array     |   | 否       |


## 安装 
```
npm install now-activity-rule
```

## 传参示例

``` 
import Button from 'now-activity-rule'

    const ruleList = [
        {
            subTitle: '活动时间：',
            subContent: '2017年4月10号~2017年4月15号'
        },
        {
            subTitle: '活动规则',
            subContent: '活动规则文案描述'
        },
        {
            subTitle: '奖励规则',
            subContent: '奖励规则描述文案'
        },
        {
            subTitle: '注意事项',
            subContent: '用户只能用一个账号绑定一个手机参加活动，官方认定的违规用户，将取消活动的参与资格；本活动的最终解释权归Now直播所有，如有任何疑问，可进行反馈。'
        }
    ];

<Rule title="活动细则"
      ruleList={ruleList}
    />
```

