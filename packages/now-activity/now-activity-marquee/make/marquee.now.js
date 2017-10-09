import { sandboxStore } from '@now-design/sandbox'
import React,  { Component } from 'react'
import Marquee  from '../src/index.js'

export default class MarqueeWrapper extends Component {
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
        <Marquee
            text="不吹不黑，只能说IVWEB的now design很棒啊，用了的人都说好，哈哈"
            autoPlay={true}
            loop={true}
        />
      </div>
    )
  }
}

sandboxStore.add('activity-marquee', MarqueeWrapper);
