# now-base-layout 组件

该组件使用 FlexBox 进行布局。基本使用方式和原生的 FlexBox 完全兼容。基本使用方式如下:

```
<Flex>
    <FlexItem className='item'>demo</FlexItem>
    <FlexItem className='item'>demo</FlexItem>
    <FlexItem className='item'>demo</FlexItem>
    <FlexItem className='item'>demo</FlexItem>
</Flex>
```

## 基本 API

### Flex 组件
|属性	|说明|	类型|	默认值|
|:---|:---|:---|:---|
|direction	|子元素的排列方向，可选row,row-reverse,column,column-reverse|	String	|row|
|wrap	|子元素的换行方式，可选nowrap,wrap,wrap-reverse|	String	|nowrap|
|justify	|子元素在主轴上的对齐方式，可选start,end,center,between,around|	String	|start|
|align	|子元素在辅轴上的对齐方式，可选start,center,end,baseline,stretch|	String	|center|
|style|定制化的 React 内联样式|Object|无|
|className|定制化的 class 名|String|无|


### FlexItem 组件

|属性	|说明|	类型|	默认值|
|:---|:---|:---|:---|
|style|定制化的 React 内联样式|Object|无|
|className|定制化的 class 名|String|无|

## 安装

```
npm install now-base-layout
```


