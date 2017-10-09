# now-display-bubble 点赞组件

## Props

| 属性          | 说明                 | 类型              | 默认值 | 是否必传 |  
| ------------- | -------------------- | ----------------- | ------ | -------- |  
|  bubbleMessage  | 点赞数组, loveMessage.seq    | object  | {}     | 是       |
|  maxBubbleMessageLength  | 当前绘制队列最大长度    | number  | 10     | 否       |
|  canvasWidth  | 画布宽度，canvas节点的css宽度为画布宽度的一半    | number  | 240     | 否       |
|  canvasHeight  | 画布高度，canvas节点的css高度为画布高度的一半    | number  | 600     | 否       |
|  canvasBottom  | 该组件为绝对定位，该值为canvas节点的bottom值    | number  | 50     | 否       |
|  canvasRight  | 该组件为绝对定位，该值为canvas节点的right值    | number  | 0     | 否       |
|  bubbleRadius  | 点赞气泡图片的直径，图片应该为长宽相等的png图片，如64*64  | number  | 64     | 否       |
|  showBubbleInterval  | 展示点赞气泡的时间间隔，单位毫秒    | number  | 100     | 否       |
| onClick  | 点击事件  |  function |  - |  否 |
参数结构  
```
let bubbleMessage = {
  bubbles: [{
    bubbleImageSrc: 'https://11.url.cn/now/h5/img/pink_b15e31c.png', //点赞冒泡图片src，也可以使用base64
    bubbleNum: 10, // 这个type的bubble 的个数，会连续展现
  }],
  seq: new Date().getTime(), loveMessage 的 key， 传入的 seq 改变，才会触发新的点赞效果
}

let config = {
            bubbleMessage: bubbleMessage,
            maxBubbleMessageLength: 10,
            canvasWidth: 240,
            canvasHeight: 600,
            canvasBottom: 50,
            canvasRight: 0,
            bubbleRadius: 64,
            showBubbleInterval: 100
        }
```

## play方法
组件暴露了play(bubbleImageSrc)方法，入参bubbleImageSrc为点赞冒泡图片路径，也可以使用base64，该方法供用户主动触发点赞行为。

## 安装
```
npm install now-display-bubble
```

## 使用示例

```
import Bubble from '@now/display-bubble' 

let bubbleMessage = {
  bubbles: [{
    bubbleImageSrc: 'https://11.url.cn/now/h5/img/pink_b15e31c.png', //点赞冒泡图片src，也可以使用base64
    bubbleNum: Math.floor(Math.random() * 10) + 10  
  }],
  seq: new Date().getTime()
};
let config = {
            bubbleMessage: bubbleMessage,
            maxBubbleMessageLength: 10,
            canvasWidth: 240,
            canvasHeight: 600,
            canvasBottom: 50,
            canvasRight: 0,
            bubbleRadius: 64,
            showBubbleInterval: 100
        };
let click = (e) => {
  let bubbleImageSrc = 'https://11.url.cn/now/h5/img/blue_121e1cf.png'; //点赞冒泡图片src，也可以使用base64
  this.refs.bubble.play(bubbleImageSrc);
};

<Bubble 
    ref='bubble'
    {...config}
    onClick={click}
/>
```

