# now-base-animation Keyframes 转场动画容器

## API


| 属性          | 说明                                               | 类型     | 默认值 | 是否必传 |
| ------------- | -------------------------------------------------- | -------- | ------ | -------- |
| aniamtionName |                                            | string   | -      | 是       |
| show       | 是否展示或隐藏组件                                       | boolean    | -      | 是    |
| onEnter    | 切换为展示后的回调 | callback | - | 否 |
| onLeave    | 切换为隐藏时的回调 | callback | - | 否 |

## 说明
通过设置 show 来展示或隐藏组件， animationName 是 `float` 
则隐藏切换到显示的时候，会添加 `float-enter` 这个类，当动画执行完成后会移除 float-enter， 
从显示切换到隐藏的时候，会添加 `float-leave` 这个类，当动画执行完后会溢出 `float-leave`, 并设置 `style: 'none'`

## 安装
```
npm install now-base-animation
```


## 传参示例

javascript
``` 
import Aniamtion from 'now-display-animation'

<Animation 
    animationName='float'
    show={true}
>
```

css
```
.float-enter {
  animation: floatTop 0.2s both;
}
.float-leave {
  animation: floatBottom 0.2s both;
}

@keyframes floatTop {
  0%{
    opacity: 0.01;
    transform: translate3d(0, 100%, 0);
  }
}

@keyframes floatBottom {
  100%{
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}

```