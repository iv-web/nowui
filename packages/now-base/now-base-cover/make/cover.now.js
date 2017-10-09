import React, { Component } from 'react'
import Cover from '../src/index.js'
import { sandboxStore } from '@now-design/sandbox'

export default class CoverWraper extends Component {
  render() {
    return (
      <div>
         <Cover />

          <Cover 
            style={{
              marginTop: '100px',
              width: '100px',
              height: '100px'
            }}
          />

         可以透传事件与子元素， 点击下面封面试试
         <Cover
              src="http://p.qlogo.cn/hy_personal_room/49147425/491474251478672476/640" 
              onClick={() => {alert('123')}} 
          >
            <div style={{
                margin:  "100px auto",
                textAlign: 'center',
                fontSize: '30px',
                color: '#fff'
            }}>
              点我播放
            </div>
          </Cover>

          <div style={{
            marginTop: 1000
          }}>
              测试 lazyload
              <Cover 
                   src="//p.qlogo.cn/hy_personal/df6b72edf9000b318eefcc957021caf4be48ea199772c7bba44c93489721c1865ccbf56fb7cee2f4/640" 
               />
          </div>
      </div>
    )
  }
}

sandboxStore.add('cover', CoverWraper)

