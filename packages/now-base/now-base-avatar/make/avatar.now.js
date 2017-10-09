import { sandboxStore } from '@now-design/sandbox'
import React,  { Component } from 'react'
import Avatar  from '../src/index.js'

export default class Preview extends Component {
  render() {
    return (
      <div>
         <Avatar />
          <Avatar 
            style={{
              width: '70px',
              height: '70px'
            }}
          />
          <Avatar 
            style={{
              width: '100px',
              height: '100px'
            }}
          />

         <Avatar 
            src="//p.qlogo.cn/hy_personal/4376ae1e0cf0ccce74f621b3e0d93058c7f0609cea733ad7bf18532da290e0c8bd500d5fe65f33a88abe59cccf625a49/80"
         />

          <div style={{
            marginTop: 1000
          }}>
              测试 lazyload
              <Avatar 
                   src="//p.qlogo.cn/hy_personal/df6b72edf9000b318eefcc957021caf4be48ea199772c7bba44c93489721c1865ccbf56fb7cee2f4/80" 
                   onClick={() => {alert('123')}} 
               />
          </div>
      </div>
    )
  }
}

sandboxStore.add('avatar', Preview)