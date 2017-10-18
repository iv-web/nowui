<p align="center">
  <a href="https://at.aotu.io/">
    <img width="200" src="https://pub.idqqimg.com/pc/misc/files/20171009/b20bf161c22d4a54ab29ac3067f4cd17.png"/>
  </a>
</p>



# NowUI

>NowUI 是一款基于 React 的移动端 UI 组件框架，涵盖了常见的各类 UI 组件以及部分
工具组件。

[和 IVWEB 一起完善 NOWUI !](https://www.lagou.com/jobs/3308775.html)

--------


##  安装  

NowUI 支持多种引用方式

### 1. npm 安装 ， 配合 webpack ，fis 等构建工具使用

http://nowui.ivweb.io/cdn/nowui.min.js

遵循最小依赖原则，所有的组件都是单独的 npm 包， 需要使用对应的组件时，安装对应的包即可。

```
$ npm install 需要的组件名(now-xxx-xxx)
```

### 2. 直接引用 cdn 文件

在浏览器中使用 script 直接引入文件，并使用全局变量 Now
`<script src="//nowui.ivweb.io/cdn/nowui.min.js"></script>`

同时也会引入全局的 React，ReactDom 对象，可直接使用

```
ReactDom.render(React.createElement(Now.base.empty), document.body)
```

## 使用

具体组件使用方法，可[查看文档](nowui.ivweb.io/doc/index.html)
```
import Button from now-base-button

<Button />
```

每个组件的具体使用方法可参考对应组件的[文档](http://nowui.ivweb.io/doc/index.html)

## 许可证
MIT
