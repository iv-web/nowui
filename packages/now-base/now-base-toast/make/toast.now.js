import { sandboxStore } from '@now-design/sandbox'
import React,  { Component } from 'react'
import Toast from '../src/index.js'
import Button from 'now-base-button'

export default class ToastWraper extends Component {

    handleShowSuccess = () => {
       this.setState({
           type:'success',
           content:'ok'
       })
    }

    handleShowError = () => {
        this.setState({
            type:'error',
            content:'ok'
        })
    }

    handleShowInfo = () => {
        this.setState({
            type:'info',
            content:'ok'
        })
    }

    handleShowWarn = () => {
        this.setState({
            type:'warn',
            content:'ok'
        })
    }

  render() {
    return (
      <div style={{marginTop: 60}}>
        Toast 默认 Fixed 定位， 出现在页面顶部
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
        <Toast  {...this.state}/>
      </div>
    )
  }
}

sandboxStore.add('toast', ToastWraper)