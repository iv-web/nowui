import { sandboxStore } from '@now-design/sandbox'
import React,  { Component } from 'react'
import Bubble from '../src/index.js'

export default class BubbleWrapper extends Component {
    constructor (props, context) {
        super(props, context)

        this.state = {
            bubbleMessage: {
                bubbles: []
            }
        }
    }

    makeLoveMessage = () => {
        let bubbleMessage = {
            bubbles: [{
              bubbleImageSrc: 'https://11.url.cn/now/h5/img/pink_b15e31c.png',
              bubbleNum: Math.floor(Math.random() * 10) + 10  
            }],
            seq: new Date().getTime()
        }
        return bubbleMessage
    }

    componentDidMount () {
        this.interval = setInterval(() => {
            this.setState({
                bubbleMessage: this.makeLoveMessage()
            })
        }, 2000)

        this.setState({
            bubbleMessage: this.makeLoveMessage()
        })
    }

    componentWillUnmount () {
        clearInterval(this.interval)
    }

    click = (e) => {
        let bubbleImageSrc = 'https://11.url.cn/now/h5/img/blue_121e1cf.png'
        this.refs.bubble.play(bubbleImageSrc)
    }

    render () {
        const config = {
            bubbleMessage: this.state.bubbleMessage,
            maxBubbleMessageLength: 10,
            canvasWidth: 240,
            canvasHeight: 600,
            canvasBottom: 50,
            canvasRight: 0,
            bubbleRadius: 64,
            showBubbleInterval: 100
        }
        return (
            <div onClick={this.click} >
                <Bubble ref='bubble' {...config} onClick={() => {}} />
            </div>
        )
    }
}

sandboxStore.add('bubble', BubbleWrapper)