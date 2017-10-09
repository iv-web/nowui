import { sandboxStore } from '@now-design/sandbox'
import React,  { Component } from 'react'
import Empty from '../src/index.js'

export default class EmptyWraper extends Component {

  render() {
    return (
      <div>
          支持 5 种 empty 样式, 通过传入的 emptyType 控制, 默认垂直居中
          <div>
            <Empty>
                 不传入 emptyType
            </Empty>
            <hr/>
            <Empty emptyType="search">
                 emptyType 为 "search"
            </Empty>
            <hr/>

            <Empty emptyType="gift">
                  emptyType 为 "gift"
            </Empty>
            <hr/>

            <Empty emptyType="chat">
                  emptyType 为 "chat"
            </Empty>
            <hr/>

            <Empty emptyType="error">
                  emptyType 为 "error"
            </Empty>
          </div>
      </div>
    )
  }
}

sandboxStore.add('empty', EmptyWraper)