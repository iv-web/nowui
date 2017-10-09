# now-base-dialog 基础按钮

默认支持 onClick , onTouchStart 等 原生 DOM 事件，
可传入 style 进行自定义样式修改

## API


| 属性          | 说明                                 | 类型     | 默认值 | 是否必传 |
| ------------- | ------------------------------------ | -------- | ------ | -------- |  
| title         | 对话框标题，不传入时不显示           | number   | 1      | 否       |
| text          | 对话框文本，不传入时不显示           | bool     | false  | 否       |
| onEnter       | "确定"按钮的回调事件                 | function | -      | 是       |
| onCancel      | "取消"按钮的回调事件，不传入时不显示 | function | -      | 否       |
| skin   |  类名，对话框的类名  | string | - | 否 |
| enterText | 确定按钮的文字 | string | '确定' | 否 |
| cancelText | 取消按钮的文字 | string | '取消' | 否 |

## Method

- create(opts)

opts 与 Props 构造一样， 调用 create 后会直接创建一个 Dialog。

会返回一个引用，可以通过该引用关闭 Dialog。
```
const dialog = Dialog.create({
  title: '提示'，
  text: '错误'
});

dialog.remove()
```

``

## 安装

```
npm install now-base-dialog
```

## 传参示例

``` 
<Dialog onEnter={() => {alert('now')}}>
  显示的文字
</Dialog>
```

