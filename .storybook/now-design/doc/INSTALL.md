# 安装与使用


## 安装
nowui 已经打通 npm 生态圈， 直接通过 npm 安装即可

以安装 now-base-button 为例:

```shell
npm install now-base-button 
```

## 使用
下面以 Button 组件作为使用示例，具体组件的使用方法请查看每个组件具体使用文档。

- es6

```javascript
import Button from now-base-button

<Header />
```

- es5 

```javascript
var Header = require('now-base-button').default

<Header />
```

## 构建支持
在项目中使用 NowUI 组件，构建工具需要提供具备一下能力

1. 支持 require `sass` `css` `png` `jpg`  等类型文件( require anythin)
2. 支持 sass 编译
3. 支持 jsx 编译

- webpack 参考插件与配置 `sass-loader` `css-loader` `style-loader` `url-loader`
- fis 参考插件配置 ` fis-plugin-node-sass`, `js-require-css`

## 参考构建配置

- fis3 版本
```javascript 
fis.hook('annotation')
    .unhook('components')
    .hook('node_modules', {
        shimProcess: false // 不要注入 process.env
    })
    .hook('commonjs', {
        paths: alias
    })
    .match(/\/(.+)\.tpl$/, {
        isMod: true,
        rExt: 'js',
        id: '$1_tpl',
        release: '$0.tpl',
        parser: fis.plugin('imweb-tpl')
    })
    .match('*.scss', {
        rExt: '.css',
        parser: fis.plugin('node-sass')
    })
    .match('_*.scss', {
        release: false
    })
    .match('*.{scss,css}', {
        useSprite: true,
        postprocessor: [
            fis.plugin('autoprefixer', {
                browsers: ['Android >= 2.3', 'iOS >= 6'],
                cascade: true
            })
        ]
    })
    .match('**.js', {
        isMod: true,
        useSameNameRequire: true,
        preprocessor: [
            fis.plugin('js-require-file', {
                useEmbedWhenSizeLessThan: 0 //不使用 base64
            }),
            fis.plugin('js-require-css')
        ],
        moduleId: '$1',
        parser: fis.plugin('babel-6.x', {
            presets: ['react', 'es2015-loose', 'stage-0']
        })
    })
    .match('node_modules/*/src/**.js', {
        isMod: false
    })
    .match('node_modules/**/*.js', {
        parser: null
    })
    .match('::package', {
        spriter: fis.plugin('csssprites-group', {
            htmlUseSprite: true,
            margin: 4,
            // 移动端高清图, pc端去除scale
            scale: 0.5
        })
    });
```

```webpack
``` javascript
fis.hook('annotation')
    .unhook('components')
    .hook('node_modules', {
        shimProcess: false // 不要注入 process.env
    })
    .hook('commonjs', {
        paths: alias
    })
    .match(/\/(.+)\.tpl$/, {
        isMod: true,
        rExt: 'js',
        id: '$1_tpl',
        release: '$0.tpl',
        parser: fis.plugin('imweb-tpl')
    })
    .match('*.scss', {
        rExt: '.css',
        parser: fis.plugin('node-sass')
    })
    .match('_*.scss', {
        release: false
    })
    .match('*.{scss,css}', {
        useSprite: true,
        postprocessor: [
            fis.plugin('autoprefixer', {
                browsers: ['Android >= 2.3', 'iOS >= 6'],
                cascade: true
            })
        ]
    })
    .match('**.js', {
        isMod: true,
        useSameNameRequire: true,
        preprocessor: [
            fis.plugin('js-require-file', {
                useEmbedWhenSizeLessThan: 0 //不使用 base64
            }),
            fis.plugin('js-require-css')
        ],
        moduleId: '$1',
        parser: fis.plugin('babel-6.x', {
            presets: ['react', 'es2015-loose', 'stage-0']
        })
    })
    .match('node_modules/*/src/**.js', {
        isMod: false
    })
    .match('node_modules/**/*.js', {
        parser: null
    })
    .match('::package', {
        spriter: fis.plugin('csssprites-group', {
            htmlUseSprite: true,
            margin: 4,
            // 移动端高清图, pc端去除scale
            scale: 0.5
        })
    });
```
```