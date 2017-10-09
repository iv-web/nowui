# now-base-topic 组件

该组件主要用于信息展示。基本用法如下:

```
<Topic>
    <TopicItem fontColor="grey" src="http://static.zybuluo.com/jimmythr/9mglukb7zlnfey84q2o4zv97/test.png">#话题#</TopicItem>
    <TopicItem fontColor="grey" src="http://static.zybuluo.com/jimmythr/9mglukb7zlnfey84q2o4zv97/test.png">#话题#</TopicItem>
    <TopicItem fontColor="grey" src="http://static.zybuluo.com/jimmythr/9mglukb7zlnfey84q2o4zv97/test.png">#话题#</TopicItem>
    <TopicItem fontColor="grey" src="http://static.zybuluo.com/jimmythr/9mglukb7zlnfey84q2o4zv97/test.png">#话题#</TopicItem>
</Topic>
```

## 基本 API

该组件主要分为两个部分，Topic 和 TopicItem。

### Topic 组件
|属性	|说明|	类型|	默认值|
|:---|:---|:---|:---|
|height	|设置外层容器的高度，基本内容就是 css 中的高度值，比如：100px,2rem,100%|	String	|160px|
|width	|设置外层容器的宽度，基本内容就是 css 中的宽度值，比如：100px,2rem,100%|	String	|100%|


### TopicItem 组件

|属性	|说明|	类型|	默认值|
|:---|:---|:---|:---|
|src|背景图的 http 路径|string|无|
|url|点击当前展示块，发生跳转的 url |string|无|
|fontSize|设置字体大小|string|18px|
|fontColor|设置字体颜色|string|#fff|
|onClick|设置话题块的点击效果，如果和 url 同时设置，则会在执行完 onClick 事件后跳转|function|无|

## 安装

```
npm install now-base-topic
```


