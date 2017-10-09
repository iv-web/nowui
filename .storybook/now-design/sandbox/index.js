import './assets/reset.scss'
import React from 'react'
import ReactDom from 'react-dom'
import SandboxStore from './sandbox_store'
/*
 * 用于展示组件时， 形成一个单独的 iframe, 使其拥有一个相对独立的 浏览器环境
 */

    // cursor: url(http://gtms02.alicdn.com/tps/i2/T1_PMSFLBaXXcu5FDa-20-20.png) 10 10,pointer!important;
 function query(name) {
     return location.search
         .match(new RegExp('(\\?|&)' + name + '=([^&]*)(&|$)')) 
             ? decodeURIComponent(RegExp.$2) : '';
 }

export const sandboxStore = new SandboxStore()

export function render (loaderPreview) {
  const componentName = query('name')
  loaderPreview(componentName)
}