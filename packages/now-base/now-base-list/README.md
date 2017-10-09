# now-base-list 组件

now-base-list 提供的是如果 ul>li 式的列表 table。样式如果下列展示样式，目前支持的特性较少，只是提供一个简单的 container。
所以，这里暴露了一些借口供开发者实现可定制化操作。如果后期有什么需求，可以手动 @Me，进行组件升级。

## 具体使用
```
<List>
       <ListItem>1</ListItem>
       <ListItem>2</ListItem>
       <ListItem>3</ListItem>
       <ListItem>4</ListItem>
</List>
```

## API
主要暴露的借口都是集中在 ListItem 里，有:

 - className: 定制化显示的 className
 - style: 使用 react inline style 方式，实现 css 样式书写
 - onClick: 暴露点击该 item 的点击事件

例如:
```
// 使用 className 方式配置样式
<List>
       <ListItem className="red">1</ListItem>
       <ListItem className="yellow">2</ListItem>
       {/*...*/}
</List>

// 直接使用 React style 方式

<List>
       <ListItem style={{color:'red';background-color:'green'}}>1</ListItem>
</List>
```


## 安装

```
npm install now-base-list
```


