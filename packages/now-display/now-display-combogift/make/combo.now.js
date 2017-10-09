import ComboGift from '../src/index.js'
import React, { Component } from 'react'
import Button from 'now-base-button'
import { sandboxStore } from '@now-design/sandbox'

export default class ComboGiftWrapper extends Component {
  constructor (props, context) {
    super(props, context)
    this.state ={
      messages: []
    }
  }

  componentWillUnmount () {
    clearInterval(this._interval)
  }

  clear = () => {
      this.setState({
          messageIndex: -1,
          messages: []
      })
  }

  createMockData = (comboCount = Math.floor(Math.random() * 100)) => {
    let newMessage = Object.assign({
      createTime: new Date().getTime(),
      key: new Date().getTime(),
      comboCount
    }, mockData)

    return newMessage
  }

  comboClick = () => {
    const {
      messages 
    } = this.state

    if(messages.length > 0) {
      let newMessage = messages.splice(-1)[0]
      newMessage.comboCount += 1
      newMessage.createTime = new Date().getTime()

      let newMessages = messages.concat([newMessage])

      this.setState({
        messages: newMessages
      })
    }
  }

  addMessage = () => {
    const {
      messages 
    } = this.state

    this.setState({
      messages: messages.concat([this.createMockData()]).splice(-2)
    })
  }

  render () {
    console.log('messages', this.state.messages)
    return (
      <div>
        <Button onClick={this.addMessage}>
           增加消息数
        </Button>
         <Button onClick={this.comboClick}> 
            连击
         </Button>
         <Button onClick={this.clear}>
            隐藏
         </Button>
         <div style={{
            position: 'absolute',
            bottom: '216px',
            left: '10px'
         }}>
           {
            this.state.messages.length > 0 ? (
                <ComboGift messages={this.state.messages}/> 
            ) : null
           }
         </div>
      </div>
    )
  }

  state = {
    customGift: mockData
  }
}

const mockData = {
  gift: {
    image: "//8.url.cn/huayang/resource/yule/new_gift/ilivenew/memeda91.png",
    giftName: "么么哒"
  },
  userPic: "http://p.qlogo.cn/hy_personal/2af2c7169c4994d8b72f45ef7ef5651b9d42fc293c9222477feca52da3eaeaabc35bb6000b246a99/",
  userNick: "风靡万千少女"
}

sandboxStore.add('combogift', ComboGiftWrapper)