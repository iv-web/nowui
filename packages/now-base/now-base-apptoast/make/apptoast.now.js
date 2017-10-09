import { sandboxStore } from '@now-design/sandbox'
import React,  { Component } from 'react'
import AppToast from '../src/index.js'
import Button from 'now-base-button'

export default class AppToastWraper extends Component {
  state = {
    type: 'info',
    content: ''
  }

  handleShowSuccess = () => {
    this.setState({
      type: 'success',
      content: '这是一条成功信息'
    })
  }

  handleShowError = () => {
    this.setState({
      type: 'error',
      content: '这是一条错误信息'
    })
  }

  handleShowInfo = () => {
    this.setState({
      type: 'info',
      content: '这是一条普通信息'
    })
  }

  handleShowWarn = () => {
    this.setState({
      type: 'warn',
      content: '这是一条告警信息'
    })
  }

  render() {
    return (
      <div style={{marginTop: 60}}>
        AppToast 默认 Fixed 定位， 出现在页面顶部
        <Button onClick={this.handleShowSuccess}>
          成功
        </Button>
        <Button onClick={this.handleShowWarn}>
          警告
        </Button>
        <Button onClick={this.handleShowError}>
          错误
        </Button>
        <Button onClick={this.handleShowInfo}>
          普通消息
        </Button>
        <AppToast type={this.state.type} content={this.state.content} top={0} />
      </div>
    )
  }
}

sandboxStore.add('apptoast', AppToastWraper)
