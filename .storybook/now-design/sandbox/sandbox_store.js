import React, { Component } from 'react'
/** 
 *  存储需要预览的组件
 *  移动端组件需要用到, 常常有 fixed ，这些元素, 
 *  同时 使其拥有查看 代码 功能
 */

 let cnt = 0;

 function getId() {
   cnt += 1;
   return cnt;
 }


class SandBox {
  constructor () {
    this._component = {}
  }

  add(name, component) {
    if(this._component[name]) {
      console.warn(`sandbox ${name} 已经存在`)
    }

    this._component[name] = {
      id: getId(),
      component
    }

    return this
  }

  get(name) {
    if(this._component[name]) {
      return this._component[name]
    } else {
      return null
    }
  }
}

export default SandBox