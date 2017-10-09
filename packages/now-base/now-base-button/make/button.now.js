import { sandboxStore } from '@now-design/sandbox'
import React,  { Component } from 'react'
import Button  from '../src/index.js'

export default class ButtonWraper extends Component {
  state = {
    show: true
  }

  toggle = () => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const {
      show
    } = this.state

    const buttonStyle = {
      margin: 10
    }

    return (
      <div>
        三种大小
        <div>
          <Button size="large" style={buttonStyle}>
            large
          </Button>
          <Button size="middle" style={buttonStyle}>
            middle
          </Button>
          <Button size="small" style={buttonStyle}>
            small
          </Button>
        </div>
        <div>
          三种样式
          <Button type={1} style={buttonStyle}>
            样式1
          </Button>
          <Button type={2} style={buttonStyle}>
            样式2
          </Button>
          <Button type={3} style={buttonStyle}>
            样式3
          </Button>
        </div>
        <div>
          disabled 态
          <Button type={1} disabled={true} style={buttonStyle}>
            样式1
          </Button>
          <Button type={2} disabled={true} style={buttonStyle}>
            样式2
          </Button>
          <Button type={3} disabled={true} style={buttonStyle}>
            样式3
          </Button>
        </div>
      </div>
    )
  }
}

sandboxStore.add('button', ButtonWraper)