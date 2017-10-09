# aop 

对象函数切入工具

## Author

[fishine](https://github.com/feix760/)

## Install

```
$ lego install aop
```

## API

### aop(obj, prop, before, after)

切入

#### Arguments

- `obj` `{Object}` 切入对象
- `prop` `{String}` 函数名
- `before` `{function(...Object)}` before
- `after` `{function(...Object)}` after

### before(obj, prop, before)

before切入, 等同`aop(obj, prop, before, null)`

### after(obj, prop, after)

after切入, 等同`aop(obj, prop, null, after)`

## Usage

```js
var obj = {
    say: function(msg) {
        console.log(msg);
    }
};

var aop = require('aop');

aop.before(obj, 'say', function(msg) {
    console.log('before say');
});

aop.after(obj, 'say', function() {
    console.log('after say');
});
```
